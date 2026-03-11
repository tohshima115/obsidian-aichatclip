[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip for Obsidian

Save AI chat responses from ChatGPT, Gemini, Claude, and Grok to your Obsidian vault with one click using the [AIChatClip](https://aichatclip.com) browser extension.

## Features

- **One-click clip** — Save any AI chat response via the browser extension
- **Auto-sync** — Clips sync to your vault automatically on startup and in real-time (desktop)
- **YAML frontmatter** — Each note includes source, URL, tags, and summary metadata
- **Custom file names** — Configurable templates with date, source, and title variables
- **Smart folders** (Pro) — AI-powered auto-classification into vault folders
- **Auto tags & titles** (Pro) — AI-generated tags, titles, and summaries

## Installation

### Community Plugins (recommended)

1. Open **Settings → Community plugins → Browse**
2. Search for **AIChatClip**
3. Click **Install**, then **Enable**

### Manual

1. Download `main.js`, `manifest.json`, and `styles.css` from the [latest release](https://github.com/aichatclip/obsidian-aichatclip/releases)
2. Create `<vault>/.obsidian/plugins/aichatclip/` and copy the files there
3. Enable the plugin in **Settings → Community plugins**

## Setup

1. **Install the browser extension** — Get [AIChatClip for Chrome](https://aichatclip.com/docs/browser-extension) or Firefox
2. **Sign in** — Open plugin settings and click "Sign in" to connect your account
3. **Clip & sync** — Click the clip button on any AI chat response; it syncs to your vault automatically

## Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| Inbox Folder | Where clipped notes are saved | `AIChatClip/Inbox` |
| File name template | Variables: `{yyyy}` `{MM}` `{dd}` `{hh}` `{mm}` `{ss}` `{source}` `{chat_title}` `{title}` (Pro) | `{yyyy}-{MM}-{dd}-{title}` |
| Timezone | Timezone for `clipped_at` frontmatter | Auto-detected |
| Auto-sync on load | Sync when Obsidian starts | On |
| Sync on foreground | Sync when app returns to foreground (mobile) | On |

### Pro Settings

| Setting | Description |
|---------|-------------|
| Auto-scan folders | Upload vault folder structure on sync |
| Folder scan root | Root folder to scan for marker files |
| Marker filename | Filename stem for folder descriptions (e.g. `README`) |
| Title language | Language for AI-generated titles |
| Tag rule file | Path to custom tag rule markdown file |

## Source Architecture

| File | Role |
|------|------|
| `src/main.ts` | Plugin entry point — commands, ribbon icon, lifecycle |
| `src/api.ts` | Centralized API client for all server communication |
| `src/sync.ts` | Clip synchronization — fetch, write to vault, mark synced |
| `src/settings.ts` | Settings UI with Basic / Pro / Guide tabs |
| `src/folders.ts` | Vault folder scanning and server sync |
| `src/formatter.ts` | Markdown formatting with YAML frontmatter |
| `src/i18n.ts` | Internationalization (en, ja, zh, ko) |
| `src/websocket.ts` | WebSocket client for real-time push notifications |
| `src/types.ts` | Shared types, constants, and default settings |

## License

[MIT](./LICENSE)
