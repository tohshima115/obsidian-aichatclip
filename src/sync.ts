import { type App, requestUrl } from "obsidian";
import { extractDatePrefix, formatClipToMarkdown } from "./formatter";
import type { AIChatClipSettings, Clip } from "./types";

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

async function resolveFilePath(app: App, folderPath: string, datePrefix: string): Promise<string> {
	const baseName = `${datePrefix}-ChatLog`;
	let candidate = `${folderPath}/${baseName}.md`;
	let counter = 2;

	while (app.vault.getAbstractFileByPath(candidate)) {
		candidate = `${folderPath}/${baseName}-${counter}.md`;
		counter++;
	}

	return candidate;
}

export async function syncClips(app: App, settings: AIChatClipSettings): Promise<SyncResult> {
	const result: SyncResult = { synced: 0, failed: 0, errors: [] };

	const clips = await fetchPendingClips(settings);
	if (clips.length === 0) return result;

	await ensureFolder(app, settings.inboxFolder);

	const existingIds = await getExistingSyncedClipIds(app, settings.inboxFolder);

	for (const clip of clips) {
		try {
			if (existingIds.has(clip.id)) {
				await markClipSynced(settings, clip.id);
				result.synced++;
				continue;
			}

			const markdown = formatClipToMarkdown(clip);
			const datePrefix = extractDatePrefix(clip.createdAt);
			const filePath = await resolveFilePath(app, settings.inboxFolder, datePrefix);

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
