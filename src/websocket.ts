/** WebSocket client for real-time clip push notifications (desktop only) */
export interface SyncWebSocketOptions {
	apiBaseUrl: string;
	token: string;
	deviceId: string;
	onNewClip: (clipId: string) => void;
	onStatusChange?: (connected: boolean) => void;
}

export class SyncWebSocket {
	private ws: WebSocket | null = null;
	private reconnectAttempt = 0;
	private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
	private pingTimer: ReturnType<typeof setInterval> | null = null;
	private shouldReconnect = true;
	private opts: SyncWebSocketOptions;

	constructor(opts: SyncWebSocketOptions) {
		this.opts = opts;
	}

	connect(): void {
		this.shouldReconnect = true;
		this.doConnect();
	}

	private doConnect(): void {
		try {
			// Convert http(s):// to ws(s)://
			const wsUrl = this.opts.apiBaseUrl
				.replace(/^https:\/\//, "wss://")
				.replace(/^http:\/\//, "ws://");
			const url = `${wsUrl}/api/ws?token=${encodeURIComponent(this.opts.token)}&deviceId=${encodeURIComponent(this.opts.deviceId)}`;

			this.ws = new WebSocket(url);

			this.ws.onopen = () => {
				this.reconnectAttempt = 0;
				this.startPing();
				this.opts.onStatusChange?.(true);
			};

			this.ws.onmessage = (event) => {
				if (event.data === "pong") return;
				try {
					const msg = JSON.parse(event.data as string) as { type: string; clipId?: string };
					if (msg.type === "new_clip" && msg.clipId) {
						this.opts.onNewClip(msg.clipId);
					}
				} catch {
					// ignore unparseable messages
				}
			};

			this.ws.onclose = () => {
				this.stopPing();
				this.opts.onStatusChange?.(false);
				this.scheduleReconnect();
			};

			this.ws.onerror = () => {
				this.ws?.close();
			};
		} catch {
			this.scheduleReconnect();
		}
	}

	private scheduleReconnect(): void {
		if (!this.shouldReconnect) return;

		const delay = Math.min(1000 * 2 ** this.reconnectAttempt, 60000);
		this.reconnectAttempt++;

		this.reconnectTimer = setTimeout(() => {
			this.reconnectTimer = null;
			this.doConnect();
		}, delay);
	}

	private startPing(): void {
		this.stopPing();
		this.pingTimer = setInterval(() => {
			if (this.ws?.readyState === WebSocket.OPEN) {
				this.ws.send("ping");
			}
		}, 30000);
	}

	private stopPing(): void {
		if (this.pingTimer !== null) {
			clearInterval(this.pingTimer);
			this.pingTimer = null;
		}
	}

	disconnect(): void {
		this.shouldReconnect = false;
		this.stopPing();
		if (this.reconnectTimer !== null) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}
		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}
		this.opts.onStatusChange?.(false);
	}

	get isConnected(): boolean {
		return this.ws?.readyState === WebSocket.OPEN;
	}

	updateOpts(opts: Partial<SyncWebSocketOptions>): void {
		Object.assign(this.opts, opts);
	}
}
