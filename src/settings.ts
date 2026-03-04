import { type App, PluginSettingTab, Setting } from "obsidian";
import type AIChatClipPlugin from "./main";

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

		new Setting(containerEl)
			.setName("Session Token")
			.setDesc("Bearer token for API authentication")
			.addText((text) =>
				text
					.setPlaceholder("Enter your session token")
					.setValue(this.plugin.settings.token)
					.onChange(async (value) => {
						this.plugin.settings.token = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Sign in with Google")
			.setDesc("Open browser to sign in and get your session token")
			.addButton((button) =>
				button.setButtonText("Sign in").onClick(() => {
					window.open(`${this.plugin.settings.apiBaseUrl}/api/auth/signin/google`);
				}),
			);

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
