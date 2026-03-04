import { Notice, Plugin } from "obsidian";
import { AIChatClipSettingTab } from "./settings";
import { syncClips } from "./sync";
import { type AIChatClipSettings, DEFAULT_SETTINGS } from "./types";

export default class AIChatClipPlugin extends Plugin {
	settings: AIChatClipSettings = DEFAULT_SETTINGS;
	private isSyncing = false;
	private syncIntervalId: number | null = null;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addRibbonIcon("refresh-cw", "Sync AIChatClip", () => this.performSync());

		this.addCommand({
			id: "sync",
			name: "Sync clips",
			callback: () => this.performSync(),
		});

		this.addSettingTab(new AIChatClipSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			if (this.settings.autoSyncOnLoad && this.settings.token) {
				this.performSync();
			}
			this.startSyncInterval();
		});
	}

	onunload(): void {
		this.stopSyncInterval();
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	async performSync(): Promise<void> {
		if (this.isSyncing) {
			new Notice("AIChatClip: Sync already in progress");
			return;
		}

		if (!this.settings.token) {
			new Notice("AIChatClip: Please set your session token in settings");
			return;
		}

		this.isSyncing = true;
		try {
			const result = await syncClips(this.app, this.settings);

			if (result.synced === 0 && result.failed === 0) {
				new Notice("AIChatClip: No new clips to sync");
			} else if (result.failed === 0) {
				new Notice(`AIChatClip: Synced ${result.synced} clip(s)`);
			} else {
				new Notice(
					`AIChatClip: Synced ${result.synced}, failed ${result.failed}. Check console for details.`,
				);
				for (const err of result.errors) {
					console.error("AIChatClip sync error:", err);
				}
			}
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			new Notice(`AIChatClip: Sync failed - ${msg}`);
			console.error("AIChatClip sync error:", e);
		} finally {
			this.isSyncing = false;
		}
	}

	startSyncInterval(): void {
		this.stopSyncInterval();

		const minutes = this.settings.syncIntervalMinutes;
		if (minutes > 0 && this.settings.token) {
			this.syncIntervalId = window.setInterval(() => this.performSync(), minutes * 60 * 1000);
			this.registerInterval(this.syncIntervalId);
		}
	}

	stopSyncInterval(): void {
		if (this.syncIntervalId !== null) {
			window.clearInterval(this.syncIntervalId);
			this.syncIntervalId = null;
		}
	}

	restartSyncInterval(): void {
		this.startSyncInterval();
	}
}
