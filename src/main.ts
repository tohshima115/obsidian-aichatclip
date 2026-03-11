/** Plugin entry point — registers commands, ribbon icon, and lifecycle hooks */
import { addIcon, Notice, Platform, Plugin } from "obsidian";
import { registerDevice } from "./api";
import { type PluginLang, detectLang, t, tReplace } from "./i18n";
import { AIChatClipSettingTab } from "./settings";
import { syncClips, syncSingleClip } from "./sync";
import { type AIChatClipSettings, DEFAULT_SETTINGS } from "./types";
import { SyncWebSocket } from "./websocket";

const LOGO_ICON = `<g transform="scale(4.1667)" fill="currentColor">
  <circle cx="13" cy="10.27" r="2"/>
  <path d="M20.2,9.8l-3.5,6.06c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l3.5-6.06c1.11-1.91.45-4.36-1.46-5.46s-4.36-.45-5.46,1.46l-.5.87c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l.5-.87C11.46.94,15.13-.05,18,1.61s3.85,5.33,2.2,8.2Z"/>
  <path d="M14.7,19.33l-.5.87c-1.66,2.87-5.33,3.85-8.2,2.2s-3.85-5.33-2.2-8.2l3.5-6.06c.27-.48.89-.64,1.37-.37s.64.89.37,1.37l-3.5,6.06c-1.1,1.91-.45,4.36,1.46,5.46s4.36.45,5.46-1.46l.5-.87c.27-.48.89-.64,1.37-.37s.64.89.37,1.37Z"/>
</g>`;

export default class AIChatClipPlugin extends Plugin {
	settings: AIChatClipSettings = DEFAULT_SETTINGS;
	private isSyncing = false;
	private settingTab: AIChatClipSettingTab | null = null;
	syncWs: SyncWebSocket | null = null;
	wsConnected = false;

	get lang(): PluginLang {
		return this.settings.pluginLanguage === "auto"
			? detectLang()
			: this.settings.pluginLanguage;
	}

	async onload(): Promise<void> {
		await this.loadSettings();

		// Generate deviceId on first load
		if (!this.settings.deviceId) {
			this.settings.deviceId = crypto.randomUUID();
			await this.saveSettings();
		}

		addIcon("aichatclip-logo", LOGO_ICON);
		this.addRibbonIcon("aichatclip-logo", "Sync AIChatClip", () => { void this.performSync(); });

		this.addCommand({
			id: "sync",
			name: "Sync clips",
			callback: () => { void this.performSync(); },
		});

		this.settingTab = new AIChatClipSettingTab(this.app, this);
		this.addSettingTab(this.settingTab);

		this.registerObsidianProtocolHandler("aichatclip", (params) => {
			if (params.token) {
				this.handleAuthCallback(params.token);
			}
		});

		this.app.workspace.onLayoutReady(async () => {
			if (this.settings.token) {
				await registerDevice(this.settings);

				if (this.settings.autoSyncOnLoad) {
					void this.performSync();
				}

				if (Platform.isDesktop) {
					this.connectWebSocket();
				}
			}
			this.setupForegroundSync();
		});
	}

	onunload(): void {
		this.syncWs?.disconnect();
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}

	async performSync(): Promise<void> {
		const l = this.lang;
		if (this.isSyncing) {
			new Notice(`AIChatClip: ${t("notice.syncInProgress", l)}`);
			return;
		}

		if (!this.settings.token) {
			new Notice(`AIChatClip: ${t("notice.noToken", l)}`);
			return;
		}

		this.isSyncing = true;
		try {
			const result = await syncClips(this.app, this.settings);

			this.settings.cachedUserPlan = result.userPlan;
			await this.saveSettings();

			if (result.synced === 0 && result.failed === 0) {
				new Notice(`AIChatClip: ${t("notice.noNewClips", l)}`);
			} else if (result.failed === 0) {
				new Notice(`AIChatClip: ${tReplace("notice.synced", l, { count: result.synced })}`);
			} else {
				new Notice(
					`AIChatClip: ${tReplace("notice.syncPartial", l, { synced: result.synced, failed: result.failed })}`,
				);
				for (const err of result.errors) {
					console.error("AIChatClip sync error:", err);
				}
			}
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e);
			new Notice(`AIChatClip: ${tReplace("notice.syncFailed", l, { msg })}`);
			console.error("AIChatClip sync error:", e);
		} finally {
			this.isSyncing = false;
		}
	}

	private async handleAuthCallback(token: string): Promise<void> {
		this.settings.token = token;
		await this.saveSettings();
		// Delay to ensure Obsidian has regained focus before showing UI updates
		setTimeout(() => {
			void (async () => {
				await registerDevice(this.settings);
				this.settingTab?.display();
				new Notice(`AIChatClip: ${t("notice.connected", this.lang)}`);
				void this.performSync();

				if (Platform.isDesktop) {
					this.connectWebSocket();
				}
			})();
		}, 500);
	}

	connectWebSocket(): void {
		this.syncWs?.disconnect();

		if (!this.settings.token || !this.settings.deviceId) return;

		this.syncWs = new SyncWebSocket({
			apiBaseUrl: this.settings.apiBaseUrl,
			token: this.settings.token,
			deviceId: this.settings.deviceId,
			onNewClip: (clipId) => { void this.handlePushNotification(clipId); },
			onStatusChange: (connected) => {
				this.wsConnected = connected;
				this.settingTab?.display();
			},
		});
		this.syncWs.connect();
	}

	private async handlePushNotification(clipId: string): Promise<void> {
		if (this.settings.syncedClipIds.includes(clipId)) return;

		try {
			const synced = await syncSingleClip(
				this.app,
				this.settings,
				clipId,
				() => this.saveSettings(),
			);
			if (synced) {
				new Notice(`AIChatClip: ${t("notice.newClipSynced", this.lang)}`);
			}
		} catch (e) {
			console.error("AIChatClip: push sync failed", e);
		}
	}

	setupForegroundSync(): void {
		document.removeEventListener("visibilitychange", this.onVisibilityChange);

		if (!Platform.isMobile || !this.settings.syncOnForeground) return;

		document.addEventListener("visibilitychange", this.onVisibilityChange);
		this.register(() =>
			document.removeEventListener("visibilitychange", this.onVisibilityChange),
		);
	}

	private onVisibilityChange = (): void => {
		if (document.visibilityState === "visible" && this.settings.syncOnForeground) {
			void this.performSync();
		}
	};
}
