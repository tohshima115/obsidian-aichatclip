import type { Clip } from "./types";

function escapeYaml(value: string): string {
	if (/[:#\[\]{}&*!|>'"%@`,?]/.test(value) || value.trim() !== value) {
		return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
	}
	return value;
}

export function formatClipToMarkdown(clip: Clip): string {
	const lines: string[] = ["---"];

	lines.push(`clip_id: ${escapeYaml(clip.id)}`);
	lines.push(`source: ${clip.source}`);
	lines.push(`clipped_at: ${clip.createdAt}`);

	if (clip.title) {
		lines.push(`title: ${escapeYaml(clip.title)}`);
	}
	if (clip.summary) {
		lines.push(`summary: ${escapeYaml(clip.summary)}`);
	}
	if (clip.tags) {
		const tagList = clip.tags
			.split(",")
			.map((t) => t.trim())
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

export function extractDatePrefix(isoString: string): string {
	return isoString.slice(0, 10);
}
