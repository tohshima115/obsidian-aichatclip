/** Markdown formatting — converts Clip data into Obsidian-ready markdown with YAML frontmatter */
import type { AIChatClipSettings, Clip } from "./types";

function escapeYaml(value: string): string {
	if (/[:#[{}&*!|>'"%@`,?\]]/.test(value) || value.trim() !== value) {
		return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
	}
	return value;
}

export function formatLocalDate(isoString: string, timezone: string): string {
	const d = new Date(isoString);
	const fmt = new Intl.DateTimeFormat("en-CA", {
		timeZone: timezone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	});
	const parts = Object.fromEntries(
		fmt.formatToParts(d).map((p) => [p.type, p.value]),
	);
	return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
}

export function formatClipToMarkdown(clip: Clip, settings: AIChatClipSettings): string {
	const lines: string[] = ["---"];

	lines.push(`source: ${clip.source}`);
	if (clip.url) {
		lines.push(`url: ${escapeYaml(clip.url)}`);
	}
	if (clip.chatTitle) {
		lines.push(`chat_title: ${escapeYaml(clip.chatTitle)}`);
	}
	lines.push(`clipped_at: ${formatLocalDate(clip.createdAt, settings.timezone)}`);

	if (clip.summary) {
		lines.push(`summary: ${escapeYaml(clip.summary)}`);
	}
	if (clip.tags) {
		const tagList = clip.tags
			.split(",")
			.map((t) => t.trim().replace(/^#/, ""))
			.filter(Boolean);
		if (tagList.length > 0) {
			lines.push(`tags: [${tagList.map((t) => escapeYaml(t)).join(", ")}]`);
		}
	}

	lines.push("---");
	lines.push("");

	if (clip.prompt) {
		lines.push("## Prompt");
		lines.push("");
		lines.push(clip.prompt);
		lines.push("");
	}

	lines.push("## Response");
	lines.push("");
	lines.push(clip.content);
	lines.push("");

	return lines.join("\n");
}
