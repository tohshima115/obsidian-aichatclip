import { type App, PluginSettingTab, Setting } from "obsidian";
import type AIChatClipPlugin from "./main";
import { WEB_URL } from "./types";

export class AIChatClipSettingTab extends PluginSettingTab {
	plugin: AIChatClipPlugin;

	constructor(app: App, plugin: AIChatClipPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("API Base URL")
			.setDesc("AIChatClip API server URL")
			.addText((text) =>
				text
					.setPlaceholder("https://api.aichatclip.com")
					.setValue(this.plugin.settings.apiBaseUrl)
					.onChange(async (value) => {
						this.plugin.settings.apiBaseUrl = value;
						await this.plugin.saveSettings();
					}),
			);

		const authSetting = new Setting(containerEl).setName("Authentication");
		if (this.plugin.settings.token) {
			authSetting.setDesc("Connected");
			authSetting.addButton((button) =>
				button.setButtonText("Sign out").onClick(async () => {
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

		new Setting(containerEl)
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

		new Setting(containerEl)
			.setName("Auto-sync on load")
			.setDesc("Automatically sync clips when Obsidian starts")
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.autoSyncOnLoad).onChange(async (value) => {
					this.plugin.settings.autoSyncOnLoad = value;
					await this.plugin.saveSettings();
				}),
			);

		new Setting(containerEl)
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
