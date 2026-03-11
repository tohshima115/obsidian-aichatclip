/** Shared types, constants, and default settings */

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

export const SYNCED_CLIP_IDS_MAX = 1000;

export interface AIChatClipSettings {
	apiBaseUrl: string;
	token: string;
	inboxFolder: string;
	autoSyncOnLoad: boolean;
	syncOnForeground: boolean;
	scanRoot: string;
	markerFilename: string;
	autoScanFolders: boolean;
	timezone: string;
	fileNameTemplate: string;
	tagRulePath: string;
	deviceId: string;
	syncedClipIds: string[];
	pluginLanguage: "auto" | "en" | "ja" | "zh" | "ko";
	cachedUserPlan: UserPlan;
}

export const DEFAULT_SETTINGS: AIChatClipSettings = {
	apiBaseUrl: API_BASE_URL,
	token: "",
	inboxFolder: "AIChatClip/Inbox",
	autoSyncOnLoad: true,
	syncOnForeground: true,
	scanRoot: "",
	markerFilename: "README",
	autoScanFolders: true,
	timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	fileNameTemplate: "{yyyy}-{MM}-{dd}-{title}",
	tagRulePath: "TagRule",
	deviceId: "",
	syncedClipIds: [],
	pluginLanguage: "auto",
	cachedUserPlan: "free",
};
