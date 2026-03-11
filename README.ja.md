[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip for Obsidian

ChatGPT、Gemini、Claude、Grok の AI チャット回答を、[AIChatClip](https://aichatclip.com) ブラウザ拡張でワンクリックで Obsidian Vault に保存できます。

## 機能

- **ワンクリッククリップ** — ブラウザ拡張で AI チャットの回答をワンクリック保存
- **自動同期** — 起動時に自動同期、デスクトップではリアルタイム同期
- **YAML frontmatter** — ソース、URL、タグ、サマリーなどのメタデータ付き
- **カスタムファイル名** — 日付・ソース・タイトルなどの変数でテンプレート設定可能
- **スマートフォルダ** (Pro) — AI による自動フォルダ振り分け
- **自動タグ・タイトル** (Pro) — AI がタグ、タイトル、サマリーを自動生成

## インストール

### コミュニティプラグイン（推奨）

1. **設定 → コミュニティプラグイン → 閲覧** を開く
2. **AIChatClip** を検索
3. **インストール** → **有効化**

### 手動インストール

1. [最新リリース](https://github.com/aichatclip/obsidian-aichatclip/releases)から `main.js`、`manifest.json`、`styles.css` をダウンロード
2. `<vault>/.obsidian/plugins/aichatclip/` フォルダを作成し、ファイルをコピー
3. **設定 → コミュニティプラグイン** でプラグインを有効化

## セットアップ

1. **ブラウザ拡張をインストール** — [AIChatClip Chrome 拡張](https://aichatclip.com/docs/browser-extension)または Firefox 版を取得
2. **サインイン** — プラグイン設定を開き「サインイン」をクリックしてアカウントを接続
3. **クリップ＆同期** — AI チャットの回答のクリップボタンをクリック。Vault に自動同期されます

## 設定

| 設定 | 説明 | デフォルト |
|------|------|-----------|
| 受信フォルダ | クリップしたノートの保存先 | `AIChatClip/Inbox` |
| ファイル名テンプレート | 変数: `{yyyy}` `{MM}` `{dd}` `{hh}` `{mm}` `{ss}` `{source}` `{chat_title}` `{title}` (Pro) | `{yyyy}-{MM}-{dd}-{title}` |
| タイムゾーン | frontmatter の `clipped_at` に使用するタイムゾーン | 自動検出 |
| 起動時に自動同期 | Obsidian 起動時にクリップを同期 | オン |
| フォアグラウンド復帰時に同期 | アプリに戻った時に同期（モバイル） | オン |

### Pro 設定

| 設定 | 説明 |
|------|------|
| フォルダ自動スキャン | 同期時に Vault フォルダ構造をアップロード |
| スキャンルート | マーカーファイルをスキャンするルートフォルダ |
| マーカーファイル名 | フォルダ説明として検出するファイル名（例: `README`） |
| タイトル言語 | AI 生成タイトルの言語 |
| タグルールファイル | カスタムタグルールの Markdown ファイルパス |

## ソースアーキテクチャ

| ファイル | 役割 |
|----------|------|
| `src/main.ts` | プラグインエントリポイント — コマンド、リボンアイコン、ライフサイクル |
| `src/api.ts` | API クライアント — 全サーバー通信を集約 |
| `src/sync.ts` | クリップ同期 — 取得、Vault 書き込み、同期済みマーク |
| `src/settings.ts` | 設定 UI — Basic / Pro / Guide タブ |
| `src/folders.ts` | Vault フォルダスキャンとサーバー同期 |
| `src/formatter.ts` | Markdown フォーマット（YAML frontmatter 付き） |
| `src/i18n.ts` | 国際化（en, ja, zh, ko） |
| `src/websocket.ts` | WebSocket クライアント（リアルタイムプッシュ通知） |
| `src/types.ts` | 共有型、定数、デフォルト設定 |

## ライセンス

[MIT](./LICENSE)
