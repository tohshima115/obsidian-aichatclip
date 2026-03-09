export const API_BASE_URL = "https://api.aichatclip.com";
export const WEB_URL = "https://aichatclip.com";

export const CLIP_SOURCES = ["chatgpt", "gemini", "claude", "grok"] as const;
export type ClipSource = (typeof CLIP_SOURCES)[number];

export interface Clip {
	id: string;
	userId: string;
	source: ClipSource;
	prompt: string | null;
	content: string;
	title: string | null;
	summary: string | null;
	tags: string | null;
	folderPath: string | null;
	fileName: string | null;
	url: string | null;
	chatTitle: string | null;
	createdAt: string;
	syncedAt: string | null;
}

export type UserPlan = "free" | "pro";

export interface AIChatClipSettings {
	apiBaseUrl: string;
	token: string;
	inboxFolder: string;
	autoSyncOnLoad: boolean;
	syncIntervalMinutes: number;
	scanRoot: string;
	markerFilename: string;
	autoScanFolders: boolean;
	timezone: string;
	fileNameTemplate: string;
	tagRulePath: string;
	deviceId: string;
	syncedClipIds: string[];
}

export const DEFAULT_SETTINGS: AIChatClipSettings = {
	apiBaseUrl: API_BASE_URL,
	token: "",
	inboxFolder: "AIChatClip/Inbox",
	autoSyncOnLoad: true,
	syncIntervalMinutes: 0,
	scanRoot: "",
	markerFilename: "README",
	autoScanFolders: true,
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	fileNameTemplate: "{yyyy}-{MM}-{dd}-{title}",
	tagRulePath: "TagRule",
	deviceId: "",
	syncedClipIds: [],
};
