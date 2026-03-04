export const API_BASE_URL = "https://api.aichatclip.com";

export const CLIP_SOURCES = ["chatgpt", "gemini", "claude"] as const;
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
	createdAt: string;
	syncedAt: string | null;
}

export interface AIChatClipSettings {
	apiBaseUrl: string;
	token: string;
	inboxFolder: string;
	autoSyncOnLoad: boolean;
	syncIntervalMinutes: number;
}

export const DEFAULT_SETTINGS: AIChatClipSettings = {
	apiBaseUrl: API_BASE_URL,
	token: "",
	inboxFolder: "AIChatClip/Inbox",
	autoSyncOnLoad: true,
	syncIntervalMinutes: 0,
};
