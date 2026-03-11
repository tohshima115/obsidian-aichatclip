/** Centralized API client — all server communication goes through here */
import { Platform, requestUrl } from "obsidian";
import type { AIChatClipSettings } from "./types";

export async function apiGet(settings: AIChatClipSettings, path: string) {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}${path}`,
		method: "GET",
		headers: { Authorization: `Bearer ${settings.token}` },
	});
	return res;
}

export async function apiPost(settings: AIChatClipSettings, path: string, body?: unknown) {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}${path}`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${settings.token}`,
			"Content-Type": "application/json",
		},
		body: body != null ? JSON.stringify(body) : undefined,
	});
	return res;
}

export async function apiPut(settings: AIChatClipSettings, path: string, body: unknown) {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}${path}`,
		method: "PUT",
		headers: {
			Authorization: `Bearer ${settings.token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	return res;
}

export async function apiPatch(settings: AIChatClipSettings, path: string, body?: unknown) {
	const res = await requestUrl({
		url: `${settings.apiBaseUrl}${path}`,
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${settings.token}`,
			"Content-Type": "application/json",
		},
		body: body != null ? JSON.stringify(body) : undefined,
	});
	return res;
}

export async function registerDevice(settings: AIChatClipSettings): Promise<void> {
	if (!settings.token || !settings.deviceId) return;
	try {
		await apiPost(settings, "/api/devices", {
			deviceId: settings.deviceId,
			deviceName: Platform.isDesktop ? "Obsidian Desktop" : "Obsidian Mobile",
		});
	} catch (e) {
		console.warn("AIChatClip: device registration failed", e);
	}
}
