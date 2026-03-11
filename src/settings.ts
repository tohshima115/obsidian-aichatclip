/** Settings UI — renders the plugin settings panel with Basic / Pro / Guide tabs */
import { type App, Notice, Platform, PluginSettingTab, Setting } from "obsidian";
import { apiGet, apiPatch, apiPut } from "./api";
import { scanFolders, syncFoldersToApi } from "./folders";
import { type PluginLang, detectLang, t, tReplace } from "./i18n";
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

type TabName = "basic" | "pro" | "guide";

export class AIChatClipSettingTab extends PluginSettingTab {
	plugin: AIChatClipPlugin;

	constructor(app: App, plugin: AIChatClipPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private get lang(): PluginLang {
		return this.plugin.lang;
	}

	display(): void {
		const { containerEl } = this;
		const l = this.lang;
		containerEl.empty();

		// Site link (top)
		const linkEl = containerEl.createDiv({ cls: "aichatclip-header-link" });
		linkEl.createEl("a", { text: "aichatclip.com", href: WEB_URL });

		// Tab header
		const tabHeader = containerEl.createDiv({ cls: "aichatclip-tab-header" });

		const basicBtn = tabHeader.createEl("button", {
			text: t("tab.basic", l),
			cls: "aichatclip-tab-button is-active",
		});

		const proBtn = tabHeader.createEl("button", {
			cls: "aichatclip-tab-button",
		});
		proBtn.appendText(`${t("tab.pro", l)} `);
		proBtn.createSpan({ text: "Pro", cls: "aichatclip-pro-badge" });

		const guideBtn = tabHeader.createEl("button", {
			text: t("tab.guide", l),
			cls: "aichatclip-tab-button",
		});

		// Tab content containers
		const basicTab = containerEl.createDiv({ cls: "aichatclip-tab-content is-active" });
		const proTab = containerEl.createDiv({ cls: "aichatclip-tab-content" });
		const guideTab = containerEl.createDiv({ cls: "aichatclip-tab-content" });

		const tabs: Record<TabName, { btn: HTMLElement; content: HTMLElement }> = {
			basic: { btn: basicBtn, content: basicTab },
			pro: { btn: proBtn, content: proTab },
			guide: { btn: guideBtn, content: guideTab },
		};

		const switchTab = (active: TabName) => {
			for (const [name, { btn, content }] of Object.entries(tabs)) {
				const isActive = name === active;
				btn.toggleClass("is-active", isActive);
				content.toggleClass("is-active", isActive);
			}
		};

		basicBtn.addEventListener("click", () => switchTab("basic"));
		proBtn.addEventListener("click", () => switchTab("pro"));
		guideBtn.addEventListener("click", () => switchTab("guide"));

		// === Basic Tab ===
		this.renderBasicTab(basicTab);

		// === Pro Tab ===
		this.renderProTab(proTab);

		// === Guide Tab ===
		this.renderGuideTab(guideTab);

		// Footer
		const footer = containerEl.createDiv({ cls: "aichatclip-footer" });
		footer.createEl("a", { text: "aichatclip.com", href: WEB_URL });
	}

	private renderBasicTab(el: HTMLElement): void {
		const l = this.lang;

		// Language setting (top: so users can read other items in their language)
		new Setting(el)
			.setName(t("lang.name", l))
			.setDesc(t("lang.desc", l))
			.addDropdown((dropdown) => {
				dropdown.addOptions({
					auto: `${t("lang.auto", l)} (${detectLang()})`,
					en: "English",
					ja: "日本語",
					zh: "中文",
					ko: "한국어",
				});
				dropdown.setValue(this.plugin.settings.pluginLanguage);
				dropdown.onChange(async (value) => {
					this.plugin.settings.pluginLanguage = value as "auto" | "en" | "ja" | "zh" | "ko";
					await this.plugin.saveSettings();
					this.display();
				});
			});

		// Authentication
		const authSetting = new Setting(el).setName(t("auth.name", l));
		if (this.plugin.settings.token) {
			authSetting.setDesc(t("auth.connected", l));
			authSetting.addButton((button) =>
				button.setButtonText(t("auth.signOut", l)).onClick(async () => {
					this.plugin.syncWs?.disconnect();
					this.plugin.settings.token = "";
					await this.plugin.saveSettings();
					this.display();
				}),
			);
		} else {
			authSetting.setDesc(t("auth.notConnected", l));
			authSetting.addButton((button) =>
				button.setButtonText(t("auth.signIn", l)).setCta().onClick(() => {
					window.open(`${WEB_URL}/auth/obsidian`);
				}),
			);
		}

		// WebSocket status (desktop only)
		if (this.plugin.settings.token && Platform.isDesktop) {
			const wsKey = this.plugin.wsConnected ? "ws.connected" : "ws.disconnected";
			new Setting(el)
				.setName(t("ws.name", l))
				.setDesc(t(wsKey, l));
		}

		// Device settings
		if (this.plugin.settings.token) {
			new Setting(el)
				.setName(t("device.name", l))
				.setDesc(t("device.desc", l))
				.addButton((button) =>
					button.setButtonText(t("device.makePrimary", l)).onClick(async () => {
						try {
							await apiPatch(this.plugin.settings, `/api/devices/${this.plugin.settings.deviceId}/primary`);
							new Notice(`AIChatClip: ${t("notice.primarySet", l)}`);
							if (Platform.isDesktop) {
								this.plugin.connectWebSocket();
							}
						} catch {
							new Notice(`AIChatClip: ${t("notice.primaryFailed", l)}`);
						}
					}),
				);
		}

		new Setting(el)
			.setName(t("autoSync.name", l))
			.setDesc(t("autoSync.desc", l))
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.autoSyncOnLoad).onChange(async (value) => {
					this.plugin.settings.autoSyncOnLoad = value;
					await this.plugin.saveSettings();
				}),
			);

		// Show foreground sync toggle only on mobile (desktop uses WebSocket)
		if (Platform.isMobile) {
			new Setting(el)
				.setName(t("syncOnForeground.name", l))
				.setDesc(t("syncOnForeground.desc", l))
				.addToggle((toggle) =>
					toggle
						.setValue(this.plugin.settings.syncOnForeground)
						.onChange(async (value) => {
							this.plugin.settings.syncOnForeground = value;
							await this.plugin.saveSettings();
							this.plugin.setupForegroundSync();
						}),
				);
		}

		new Setting(el)
			.setName(t("inbox.name", l))
			.setDesc(t("inbox.desc", l))
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
			.setName(t("fileName.name", l))
			.setDesc(t("fileName.desc", l))
			.addText((text) =>
				text
					.setPlaceholder("{yyyy}-{MM}-{dd}-{title}")
					.setValue(this.plugin.settings.fileNameTemplate)
					.onChange(async (value) => {
						this.plugin.settings.fileNameTemplate = value || "{yyyy}-{MM}-{dd}-{title}";
						await this.plugin.saveSettings();
					}),
			);

		new Setting(el)
			.setName(t("timezone.name", l))
			.setDesc(t("timezone.desc", l))
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
	}

	private renderProTab(el: HTMLElement): void {
		const l = this.lang;
		const isPro = this.plugin.settings.cachedUserPlan === "pro";

		// Show comparison table and CTA only for free users
		if (!isPro) {
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
				[t("pro.feature.clipToObsidian", l), true, true],
				[t("pro.feature.unlimitedClips", l), true, true],
				[t("pro.feature.autoTags", l), false, true],
				[t("pro.feature.summary", l), false, true],
				[t("pro.feature.smartFolder", l), false, true],
				[t("pro.feature.weeklyDigest", l), false, true],
			];
			for (const [name, free, pro] of features) {
				const row = tbody.createEl("tr");
				row.createEl("td", { text: name });
				row.createEl("td", { text: free ? "\u2713" : "\u2014", cls: free ? "aichatclip-check" : "aichatclip-dash" });
				row.createEl("td", { text: pro ? "\u2713" : "\u2014", cls: pro ? "aichatclip-check" : "aichatclip-dash" });
			}

			const cta = planBox.createDiv({ cls: "aichatclip-plan-cta" });
			cta.createEl("a", {
				text: t("pro.cta.upgrade", l),
				href: `${WEB_URL}/pricing`,
				cls: "aichatclip-plan-link",
			});

			// Separator
			el.createEl("hr", { cls: "aichatclip-separator" });
		}

		// Hide Pro settings for free users — show only comparison table + CTA
		if (!isPro) return;

		el.createEl("p", {
			text: t("pro.folderDesc", l),
			cls: "setting-item-description",
		});

		const docsLinkEl = el.createEl("p", { cls: "setting-item-description" });
		docsLinkEl.createEl("a", {
			text: t("pro.folderDocsLink", l),
			href: `${WEB_URL}/docs/marker-files`,
		});

		new Setting(el)
			.setName(t("pro.autoScan.name", l))
			.setDesc(t("pro.autoScan.desc", l))
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.autoScanFolders).onChange(async (value) => {
					this.plugin.settings.autoScanFolders = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(el)
			.setName(t("pro.scanRoot.name", l))
			.setDesc(t("pro.scanRoot.desc", l))
			.addText((text) =>
				text
					.setPlaceholder(t("pro.scanRoot.placeholder", l))
					.setValue(this.plugin.settings.scanRoot)
					.onChange(async (value) => {
						this.plugin.settings.scanRoot = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(el)
			.setName(t("pro.marker.name", l))
			.setDesc(t("pro.marker.desc", l))
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
			.setName(t("pro.scanNow.name", l))
			.setDesc(t("pro.scanNow.desc", l))
			.addButton((button) =>
				button.setButtonText(t("pro.scanNow.button", l)).setCta().onClick(async () => {
					if (!this.plugin.settings.token) {
						new Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
						return;
					}
					try {
						const folders = await scanFolders(
							this.app,
							this.plugin.settings.scanRoot,
							this.plugin.settings.markerFilename,
						);
						await syncFoldersToApi(this.plugin.settings, folders);
						new Notice(`AIChatClip: ${tReplace("notice.foldersSynced", l, { count: folders.length })}`);
					} catch (e) {
						const msg = e instanceof Error ? e.message : String(e);
						new Notice(`AIChatClip: ${tReplace("notice.folderScanFailed", l, { msg })}`);
					}
				}),
			);

		new Setting(el)
			.setName(t("pro.readme.name", l))
			.setDesc(t("pro.readme.desc", l))
			.addButton((button) =>
				button.setButtonText(t("pro.readme.button", l)).onClick(async () => {
					await navigator.clipboard.writeText(README_TEMPLATE);
					new Notice(`AIChatClip: ${t("notice.readmeCopied", l)}`);
				}),
			);

		// Separator
		el.createEl("hr", { cls: "aichatclip-separator" });

		el.createEl("h3", { text: t("pro.aiCustomization", l) });

		new Setting(el)
			.setName(t("pro.titleLang.name", l))
			.setDesc(t("pro.titleLang.desc", l))
			.addDropdown((dropdown) => {
				dropdown.addOptions({
					auto: t("titleLang.auto", l),
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
			.setName(t("pro.tagRule.name", l))
			.setDesc(t("pro.tagRule.desc", l))
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

	private renderGuideTab(el: HTMLElement): void {
		const l = this.lang;

		el.createEl("h3", { text: t("guide.title", l), cls: "aichatclip-guide-title" });

		const steps = el.createDiv({ cls: "aichatclip-guide-steps" });

		for (const i of [1, 2, 3] as const) {
			const step = steps.createDiv({ cls: "aichatclip-guide-step" });
			const num = step.createDiv({ cls: "aichatclip-guide-step-num" });
			num.setText(String(i));
			const content = step.createDiv({ cls: "aichatclip-guide-step-content" });
			content.createEl("h4", { text: t(`guide.step${i}.title`, l) });
			content.createEl("p", { text: t(`guide.step${i}.desc`, l) });
		}

		const docsLink = el.createDiv({ cls: "aichatclip-guide-docs" });
		docsLink.createEl("a", {
			text: t("guide.docsLink", l),
			href: `${WEB_URL}/docs`,
			cls: "aichatclip-guide-docs-link",
		});
	}

	private async loadLanguageSetting(dropdown: import("obsidian").DropdownComponent): Promise<void> {
		if (!this.plugin.settings.token) return;
		try {
			const res = await apiGet(this.plugin.settings, "/api/preferences");
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
		const l = this.lang;
		if (!this.plugin.settings.token) {
			new Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
			return;
		}
		try {
			await apiPut(this.plugin.settings, "/api/preferences", body);
		} catch {
			new Notice(`AIChatClip: ${t("notice.prefFailed", l)}`);
		}
	}
}
