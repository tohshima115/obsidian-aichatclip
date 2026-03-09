import { type App, Notice, Platform, PluginSettingTab, Setting, requestUrl } from "obsidian";
import { scanFolders, syncFoldersToApi } from "./folders";
import type AIChatClipPlugin from "./main";
import { WEB_URL } from "./types";

const README_TEMPLATE = `# Folder Name

This folder contains notes about [topic].

## Purpose
Describe what kind of content belongs in this folder so AI can categorize clips automatically.

## Tags
- tag1
- tag2
`;

export class AIChatClipSettingTab extends PluginSettingTab {
	plugin: AIChatClipPlugin;

	constructor(app: App, plugin: AIChatClipPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// Site link (top)
		const linkEl = containerEl.createDiv({ cls: "aichatclip-header-link" });
		linkEl.createEl("a", { text: "aichatclip.com", href: WEB_URL });

		// Tab header
		const tabHeader = containerEl.createDiv({ cls: "aichatclip-tab-header" });

		const basicBtn = tabHeader.createEl("button", {
			text: "Basic",
			cls: "aichatclip-tab-button is-active",
		});

		const proBtn = tabHeader.createEl("button", {
			cls: "aichatclip-tab-button",
		});
		proBtn.appendText("Pro ");
		proBtn.createSpan({ text: "Pro", cls: "aichatclip-pro-badge" });

		// Tab content containers
		const basicTab = containerEl.createDiv({ cls: "aichatclip-tab-content is-active" });
		const proTab = containerEl.createDiv({ cls: "aichatclip-tab-content" });

		const switchTab = (active: "basic" | "pro") => {
			const isBasic = active === "basic";
			basicBtn.toggleClass("is-active", isBasic);
			proBtn.toggleClass("is-active", !isBasic);
			basicTab.toggleClass("is-active", isBasic);
			proTab.toggleClass("is-active", !isBasic);
		};

		basicBtn.addEventListener("click", () => switchTab("basic"));
		proBtn.addEventListener("click", () => switchTab("pro"));

		// === Basic Tab ===
		this.renderBasicTab(basicTab);

		// === Pro Tab ===
		this.renderProTab(proTab);

		// Footer
		const footer = containerEl.createDiv({ cls: "aichatclip-footer" });
		footer.createEl("a", { text: "aichatclip.com", href: WEB_URL });
	}

	private renderBasicTab(el: HTMLElement): void {
		// Authentication
		const authSetting = new Setting(el).setName("Authentication");
		if (this.plugin.settings.token) {
			authSetting.setDesc("Connected");
			authSetting.addButton((button) =>
				button.setButtonText("Sign out").onClick(async () => {
					this.plugin.syncWs?.disconnect();
					this.plugin.settings.token = "";
					await this.plugin.saveSettings();
					this.display();
				}),
			);
		} else {
			authSetting.setDesc("Not connected. Sign in to sync your clips.");
			authSetting.addButton((button) =>
				button.setButtonText("Sign in").setCta().onClick(() => {
					window.open(`${WEB_URL}/auth/obsidian`);
				}),
			);
		}

		// WebSocket status (desktop only)
		if (this.plugin.settings.token && Platform.isDesktop) {
			const wsStatus = this.plugin.wsConnected ? "Connected" : "Disconnected";
			new Setting(el)
				.setName("Real-time sync")
				.setDesc(`Status: ${wsStatus}`);
		}

		// Device settings
		if (this.plugin.settings.token) {
			new Setting(el)
				.setName("Set as primary device")
				.setDesc("The primary device has highest priority for real-time push notifications")
				.addButton((button) =>
					button.setButtonText("Make primary").onClick(async () => {
						try {
							await requestUrl({
								url: `${this.plugin.settings.apiBaseUrl}/api/devices/${this.plugin.settings.deviceId}/primary`,
								method: "PATCH",
								headers: {
									Authorization: `Bearer ${this.plugin.settings.token}`,
									"Content-Type": "application/json",
								},
							});
							new Notice("AIChatClip: This device is now primary");
							if (Platform.isDesktop) {
								this.plugin.connectWebSocket();
							}
						} catch {
							new Notice("AIChatClip: Failed to set primary device");
						}
					}),
				);
		}

		new Setting(el)
			.setName("Inbox Folder")
			.setDesc("Vault folder where clipped notes are saved")
			.addText((text) =>
				text
					.setPlaceholder("AIChatClip/Inbox")
					.setValue(this.plugin.settings.inboxFolder)
					.onChange(async (value) => {
						this.plugin.settings.inboxFolder = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(el)
			.setName("Auto-sync on load")
			.setDesc("Automatically sync clips when Obsidian starts")
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.autoSyncOnLoad).onChange(async (value) => {
					this.plugin.settings.autoSyncOnLoad = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(el)
			.setName("Timezone")
			.setDesc("Timezone for clipped_at in frontmatter (auto-detected)")
			.addText((text) =>
				text
					.setPlaceholder(Intl.DateTimeFormat().resolvedOptions().timeZone)
					.setValue(this.plugin.settings.timezone)
					.onChange(async (value) => {
						this.plugin.settings.timezone =
							value || Intl.DateTimeFormat().resolvedOptions().timeZone;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(el)
			.setName("File name template")
			.setDesc(
				"Variables: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n" +
				"Example: {yyyy}-{MM}-{dd}-{title} → 2026-03-08-Rustのライフタイム解説",
			)
			.addText((text) =>
				text
					.setPlaceholder("{yyyy}-{MM}-{dd}-{title}")
					.setValue(this.plugin.settings.fileNameTemplate)
					.onChange(async (value) => {
						this.plugin.settings.fileNameTemplate = value || "{yyyy}-{MM}-{dd}-{title}";
						await this.plugin.saveSettings();
					}),
			);

		// Show sync interval only on mobile (desktop uses WebSocket)
		if (Platform.isMobile) {
			new Setting(el)
				.setName("Sync interval (minutes)")
				.setDesc("Periodically sync clips (0 = disabled)")
				.addText((text) =>
					text
						.setPlaceholder("0")
						.setValue(String(this.plugin.settings.syncIntervalMinutes))
						.onChange(async (value) => {
							const num = Number.parseInt(value, 10);
							if (!Number.isNaN(num) && num >= 0) {
								this.plugin.settings.syncIntervalMinutes = num;
								await this.plugin.saveSettings();
								this.plugin.restartSyncInterval();
							}
						}),
				);
		}
	}

	private renderProTab(el: HTMLElement): void {
		// Plan comparison
		const planBox = el.createDiv({ cls: "aichatclip-plan-box" });

		const table = planBox.createEl("table", { cls: "aichatclip-plan-table" });
		const thead = table.createEl("thead");
		const headRow = thead.createEl("tr");
		headRow.createEl("th", { text: "" });
		headRow.createEl("th", { text: "Free" });
		const proTh = headRow.createEl("th", { text: "Pro " });
		proTh.createSpan({ text: "$3/mo", cls: "aichatclip-pro-badge" });

		const tbody = table.createEl("tbody");
		const features: [string, boolean, boolean][] = [
			["Clip AI responses to Obsidian", true, true],
			["Unlimited clips", true, true],
			["Auto tags & title generation", false, true],
			["Summary in frontmatter", false, true],
			["Smart folder placement", false, true],
			["Weekly Digest", false, true],
		];
		for (const [name, free, pro] of features) {
			const row = tbody.createEl("tr");
			row.createEl("td", { text: name });
			row.createEl("td", { text: free ? "\u2713" : "\u2014", cls: free ? "aichatclip-check" : "aichatclip-dash" });
			row.createEl("td", { text: pro ? "\u2713" : "\u2014", cls: pro ? "aichatclip-check" : "aichatclip-dash" });
		}

		const cta = planBox.createDiv({ cls: "aichatclip-plan-cta" });
		cta.createEl("a", {
			text: "Pro\u30D7\u30E9\u30F3\u306B\u52A0\u5165\u3059\u308B \u2192",
			href: `${WEB_URL}/pricing`,
			cls: "aichatclip-plan-link",
		});

		// Separator
		el.createEl("hr", { cls: "aichatclip-separator" });

		el.createEl("p", {
			text: "Place marker files (e.g. README.md) in folders to help AI categorize your clips.",
			cls: "setting-item-description",
		});

		new Setting(el)
			.setName("Auto-scan folders on sync")
			.setDesc("Automatically scan and upload folder structure when syncing clips")
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.autoScanFolders).onChange(async (value) => {
					this.plugin.settings.autoScanFolders = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(el)
			.setName("Folder scan root")
			.setDesc("Root folder to scan for marker files. Leave empty to scan the entire vault.")
			.addText((text) =>
				text
					.setPlaceholder("(entire vault)")
					.setValue(this.plugin.settings.scanRoot)
					.onChange(async (value) => {
						this.plugin.settings.scanRoot = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(el)
			.setName("Marker filename")
			.setDesc("Filename stem to detect as folder description (e.g. README → README.md)")
			.addText((text) =>
				text
					.setPlaceholder("README")
					.setValue(this.plugin.settings.markerFilename)
					.onChange(async (value) => {
						this.plugin.settings.markerFilename = value || "README";
						await this.plugin.saveSettings();
					}),
			);

		new Setting(el)
			.setName("Scan folders now")
			.setDesc("Scan marker files and upload folder structure to the server")
			.addButton((button) =>
				button.setButtonText("Scan & Upload").setCta().onClick(async () => {
					if (!this.plugin.settings.token) {
						new Notice("AIChatClip: Please sign in first");
						return;
					}
					try {
						const folders = await scanFolders(
							this.app,
							this.plugin.settings.scanRoot,
							this.plugin.settings.markerFilename,
						);
						await syncFoldersToApi(this.plugin.settings, folders);
						new Notice(`AIChatClip: ${folders.length} folder(s) synced`);
					} catch (e) {
						const msg = e instanceof Error ? e.message : String(e);
						new Notice(`AIChatClip: Folder scan failed - ${msg}`);
					}
				}),
			);

		new Setting(el)
			.setName("README template")
			.setDesc("Copy a starter template for folder marker files")
			.addButton((button) =>
				button.setButtonText("Copy to clipboard").onClick(async () => {
					await navigator.clipboard.writeText(README_TEMPLATE);
					new Notice("README template copied to clipboard");
				}),
			);

		// Separator
		el.createEl("hr", { cls: "aichatclip-separator" });

		el.createEl("h3", { text: "AI Customization" });

		new Setting(el)
			.setName("Title language")
			.setDesc("Language for AI-generated titles (saved to server)")
			.addDropdown((dropdown) => {
				dropdown.addOptions({
					auto: "Auto (same as content)",
					en: "English",
					ja: "日本語",
					zh: "中文",
					ko: "한국어",
					es: "Español",
					fr: "Français",
					de: "Deutsch",
				});
				// Load current value from API
				this.loadLanguageSetting(dropdown);
				dropdown.onChange(async (value) => {
					await this.savePreference({ fileNameLanguage: value });
				});
			});

		new Setting(el)
			.setName("Tag rule file")
			.setDesc("Path to a markdown file with custom tag rules (without .md extension)")
			.addText((text) =>
				text
					.setPlaceholder("TagRule")
					.setValue(this.plugin.settings.tagRulePath)
					.onChange(async (value) => {
						this.plugin.settings.tagRulePath = value || "TagRule";
						await this.plugin.saveSettings();
					}),
			);
	}

	private async loadLanguageSetting(dropdown: import("obsidian").DropdownComponent): Promise<void> {
		if (!this.plugin.settings.token) return;
		try {
			const res = await requestUrl({
				url: `${this.plugin.settings.apiBaseUrl}/api/preferences`,
				method: "GET",
				headers: { Authorization: `Bearer ${this.plugin.settings.token}` },
			});
			if (res.status === 200) {
				const data = res.json as { fileNameLanguage?: string };
				if (data.fileNameLanguage) {
					dropdown.setValue(data.fileNameLanguage);
				}
			}
		} catch {
			// ignore
		}
	}

	private async savePreference(body: Record<string, unknown>): Promise<void> {
		if (!this.plugin.settings.token) {
			new Notice("AIChatClip: Please sign in first");
			return;
		}
		try {
			await requestUrl({
				url: `${this.plugin.settings.apiBaseUrl}/api/preferences`,
				method: "PUT",
				headers: {
					Authorization: `Bearer ${this.plugin.settings.token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
		} catch {
			new Notice("AIChatClip: Failed to save preference");
		}
	}
}
