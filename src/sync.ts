import { type App, requestUrl } from "obsidian";
import { scanFolders, syncFoldersToApi } from "./folders";
import { formatClipToMarkdown, formatLocalDate } from "./formatter";
import type { AIChatClipSettings, Clip, UserPlan } from "./types";

const SYNCED_CLIP_IDS_MAX = 1000;

export interface SyncResult {
	synced: number;
	failed: number;
	errors: string[];
}

async function fetchPendingClips(settings: AIChatClipSettings): Promise<Clip[]> {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}/api/clips/pending`,
		method: "GET",
		headers: { Authorization: `Bearer ${settings.token}` },
	});

	if (res.status !== 200) {
		throw new Error(`Failed to fetch pending clips: ${res.status}`);
	}

	return res.json as Clip[];
}

async function fetchUserPlan(settings: AIChatClipSettings): Promise<UserPlan> {
	try {
		const res = await requestUrl({
			url: `${settings.apiBaseUrl}/api/me`,
			method: "GET",
			headers: { Authorization: `Bearer ${settings.token}` },
		});
		if (res.status === 200) {
			const data = res.json as { user?: { plan?: string } };
			return (data.user?.plan === "pro" ? "pro" : "free") as UserPlan;
		}
	} catch {
		// fall through
	}
	return "free";
}

async function markClipSynced(settings: AIChatClipSettings, clipId: string): Promise<void> {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}/api/clips/${clipId}/sync`,
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${settings.token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ syncedAt: new Date().toISOString() }),
	});

	if (res.status !== 200) {
		throw new Error(`Failed to mark clip ${clipId} as synced: ${res.status}`);
	}
}

async function ensureFolder(app: App, folderPath: string): Promise<void> {
	const parts = folderPath.split("/");
	let current = "";

	for (const part of parts) {
		current = current ? `${current}/${part}` : part;
		if (!app.vault.getAbstractFileByPath(current)) {
			await app.vault.createFolder(current);
		}
	}
}

async function getExistingSyncedClipIds(app: App, folderPath: string): Promise<Set<string>> {
	const ids = new Set<string>();
	const folder = app.vault.getAbstractFileByPath(folderPath);
	if (!folder) return ids;

	const files = app.vault.getMarkdownFiles().filter((f) => f.path.startsWith(`${folderPath}/`));

	for (const file of files) {
		const cache = app.metadataCache.getFileCache(file);
		const clipId = cache?.frontmatter?.clip_id;
		if (typeof clipId === "string") {
			ids.add(clipId);
		}
	}

	return ids;
}

function sanitizeFileName(name: string): string {
	return name
		.replace(/[/\\:*?"<>|]/g, "-")
		.replace(/-+/g, "-")
		.replace(/^-|-$/g, "")
		.trim();
}

export function applyFileNameTemplate(
	template: string,
	clip: Clip,
	timezone: string,
	userPlan: UserPlan,
): string {
	const localDate = formatLocalDate(clip.createdAt, timezone);
	// Parse: 2026-03-08T14:08:06
	const [datePart, timePart] = localDate.split("T");
	const [yyyy, MM, dd] = datePart.split("-");
	const [hh, mm, ss] = timePart.split(":");

	let result = template
		.replace(/\{yyyy\}/g, yyyy)
		.replace(/\{MM\}/g, MM)
		.replace(/\{dd\}/g, dd)
		.replace(/\{hh\}/g, hh)
		.replace(/\{mm\}/g, mm)
		.replace(/\{ss\}/g, ss)
		.replace(/\{source\}/g, clip.source)
		.replace(/\{chat_title\}/g, sanitizeFileName(clip.chatTitle || "Untitled"));

	if (userPlan === "pro") {
		result = result.replace(/\{title\}/g, sanitizeFileName(clip.title || "Untitled"));
	} else {
		result = result.replace(/\{title\}/g, "title-only-pro-plan");
	}

	return result;
}

async function resolveFilePath(
	app: App,
	targetFolder: string,
	baseName: string,
): Promise<string> {
	let candidate = `${targetFolder}/${baseName}.md`;
	let counter = 2;

	while (app.vault.getAbstractFileByPath(candidate)) {
		candidate = `${targetFolder}/${baseName}-${counter}.md`;
		counter++;
	}

	return candidate;
}

async function syncTagRule(app: App, settings: AIChatClipSettings): Promise<void> {
	if (!settings.tagRulePath || !settings.token) return;
	try {
		const filePath = `${settings.tagRulePath}.md`;
		const file = app.vault.getAbstractFileByPath(filePath);
		if (!file) return;

		const mdFile = app.vault.getMarkdownFiles().find((f) => f.path === filePath);
		if (!mdFile) return;

		const content = await app.vault.read(mdFile);
		await requestUrl({
			url: `${settings.apiBaseUrl}/api/preferences`,
			method: "PUT",
			headers: {
				Authorization: `Bearer ${settings.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tagRule: content }),
		});
	} catch {
		console.warn("AIChatClip: TagRule sync failed");
	}
}

export async function syncClips(app: App, settings: AIChatClipSettings): Promise<SyncResult> {
	const result: SyncResult = { synced: 0, failed: 0, errors: [] };

	// Sync vault folder structure to API for AI categorization
	if (settings.autoScanFolders) {
		try {
			const folders = await scanFolders(app, settings.scanRoot, settings.markerFilename);
			await syncFoldersToApi(settings, folders);
		} catch (e) {
			console.warn("AIChatClip: folder sync failed, continuing with clip sync", e);
		}
	}

	// Sync TagRule.md to API if exists
	await syncTagRule(app, settings);

	const [clips, userPlan] = await Promise.all([
		fetchPendingClips(settings),
		fetchUserPlan(settings),
	]);
	if (clips.length === 0) return result;

	await ensureFolder(app, settings.inboxFolder);

	const existingIds = await getExistingSyncedClipIds(app, settings.inboxFolder);

	const syncedSet = new Set(settings.syncedClipIds);

	for (const clip of clips) {
		try {
			if (existingIds.has(clip.id) || syncedSet.has(clip.id)) {
				await markClipSynced(settings, clip.id);
				result.synced++;
				continue;
			}

			const markdown = formatClipToMarkdown(clip, settings);
			const targetFolder = userPlan === "pro" && clip.folderPath
				? clip.folderPath
				: settings.inboxFolder;
			await ensureFolder(app, targetFolder);
			const baseName = applyFileNameTemplate(
				settings.fileNameTemplate,
				clip,
				settings.timezone,
				userPlan,
			);
			const filePath = await resolveFilePath(app, targetFolder, baseName);

			await app.vault.create(filePath, markdown);

			await markClipSynced(settings, clip.id);
			result.synced++;
		} catch (e) {
			result.failed++;
			result.errors.push(`Clip ${clip.id}: ${e instanceof Error ? e.message : String(e)}`);
		}
	}

	return result;
}

async function fetchClipById(settings: AIChatClipSettings, clipId: string): Promise<Clip> {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}/api/clips/${clipId}`,
		method: "GET",
		headers: { Authorization: `Bearer ${settings.token}` },
	});

	if (res.status !== 200) {
		throw new Error(`Failed to fetch clip ${clipId}: ${res.status}`);
	}

	return res.json as Clip;
}

function addSyncedClipId(settings: AIChatClipSettings, clipId: string): void {
	if (settings.syncedClipIds.includes(clipId)) return;
	settings.syncedClipIds.push(clipId);
	if (settings.syncedClipIds.length > SYNCED_CLIP_IDS_MAX) {
		settings.syncedClipIds = settings.syncedClipIds.slice(-SYNCED_CLIP_IDS_MAX);
	}
}

export async function syncSingleClip(
	app: App,
	settings: AIChatClipSettings,
	clipId: string,
	saveSettings: () => Promise<void>,
): Promise<boolean> {
	// Idempotency: skip if already synced
	if (settings.syncedClipIds.includes(clipId)) return false;

	const existingIds = await getExistingSyncedClipIds(app, settings.inboxFolder);
	if (existingIds.has(clipId)) {
		addSyncedClipId(settings, clipId);
		await saveSettings();
		return false;
	}

	const clip = await fetchClipById(settings, clipId);
	const userPlan = await fetchUserPlan(settings);

	await ensureFolder(app, settings.inboxFolder);

	const markdown = formatClipToMarkdown(clip, settings);
	const targetFolder = userPlan === "pro" && clip.folderPath
		? clip.folderPath
		: settings.inboxFolder;
	await ensureFolder(app, targetFolder);
	const baseName = applyFileNameTemplate(
		settings.fileNameTemplate,
		clip,
		settings.timezone,
		userPlan,
	);
	const filePath = await resolveFilePath(app, targetFolder, baseName);

	await app.vault.create(filePath, markdown);
	await markClipSynced(settings, clip.id);

	addSyncedClipId(settings, clipId);
	await saveSettings();

	return true;
}
