/** Vault folder scanning and server synchronization for smart folder placement */
import type { App } from "obsidian";
import { apiPut } from "./api";
import type { AIChatClipSettings } from "./types";

interface FolderEntry {
	path: string;
	description: string;
}

export async function scanFolders(
	app: App,
	scanRoot: string,
	markerFilename: string,
): Promise<FolderEntry[]> {
	const entries: FolderEntry[] = [];
	const marker = markerFilename || "README";

	const markerFiles = app.vault
		.getFiles()
		.filter((f) => {
			if (f.basename !== marker) return false;
			if (scanRoot === "") return true;
			return f.path.startsWith(`${scanRoot}/`);
		});

	for (const file of markerFiles) {
		const content = await app.vault.read(file);
		const dir = file.parent?.path;
		if (!dir) continue;

		const relativePath =
			scanRoot === ""
				? dir
				: dir.startsWith(`${scanRoot}/`)
					? dir.slice(scanRoot.length + 1)
					: dir;

		if (relativePath) {
			entries.push({ path: relativePath, description: content.slice(0, 3000) });
		}
	}

	return entries;
}

export async function syncFoldersToApi(
	settings: AIChatClipSettings,
	folders: FolderEntry[],
): Promise<void> {
	const res = await apiPut(settings, "/api/folders", { folders });
	if (res.status !== 200) {
		throw new Error(`Failed to sync folders: ${res.status}`);
	}
}
