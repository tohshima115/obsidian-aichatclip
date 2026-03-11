/** Internationalization — UI string translations for en, ja, zh, ko */
export type PluginLang = "en" | "ja" | "zh" | "ko";

const translations: Record<string, Record<PluginLang, string>> = {
	// Basic tab
	"tab.basic": { en: "Basic", ja: "基本", zh: "基本", ko: "기본" },
	"tab.pro": { en: "Pro", ja: "Pro", zh: "Pro", ko: "Pro" },
	"tab.guide": { en: "Guide", ja: "ガイド", zh: "指南", ko: "가이드" },

	// Authentication
	"auth.name": { en: "Authentication", ja: "認証", zh: "认证", ko: "인증" },
	"auth.connected": { en: "Connected", ja: "接続済み", zh: "已连接", ko: "연결됨" },
	"auth.notConnected": {
		en: "Not connected. Sign in to sync your clips.",
		ja: "未接続。サインインしてクリップを同期しましょう。",
		zh: "未连接。请登录以同步您的剪辑。",
		ko: "연결되지 않음. 로그인하여 클립을 동기화하세요.",
	},
	"auth.signIn": { en: "Sign in", ja: "サインイン", zh: "登录", ko: "로그인" },
	"auth.signOut": { en: "Sign out", ja: "サインアウト", zh: "退出", ko: "로그아웃" },

	// Real-time sync
	"ws.name": { en: "Real-time sync", ja: "リアルタイム同期", zh: "实时同步", ko: "실시간 동기화" },
	"ws.connected": { en: "Status: Connected", ja: "状態: 接続中", zh: "状态: 已连接", ko: "상태: 연결됨" },
	"ws.disconnected": { en: "Status: Disconnected", ja: "状態: 切断", zh: "状态: 已断开", ko: "상태: 연결 끊김" },

	// Device
	"device.name": { en: "Set as primary device", ja: "プライマリデバイスに設定", zh: "设为主设备", ko: "기본 기기로 설정" },
	"device.desc": {
		en: "The primary device has highest priority for real-time push notifications",
		ja: "プライマリデバイスはリアルタイムプッシュ通知の優先度が最も高くなります",
		zh: "主设备在实时推送通知中具有最高优先级",
		ko: "기본 기기는 실시간 푸시 알림에서 가장 높은 우선순위를 갖습니다",
	},
	"device.makePrimary": { en: "Make primary", ja: "プライマリに設定", zh: "设为主设备", ko: "기본으로 설정" },

	// Inbox folder
	"inbox.name": { en: "Inbox Folder", ja: "受信フォルダ", zh: "收件箱文件夹", ko: "받은 편지함 폴더" },
	"inbox.desc": {
		en: "Vault folder where clipped notes are saved",
		ja: "クリップしたノートの保存先フォルダ",
		zh: "保存剪辑笔记的库文件夹",
		ko: "클립된 노트가 저장되는 볼트 폴더",
	},

	// Auto-sync
	"autoSync.name": { en: "Auto-sync on load", ja: "起動時に自動同期", zh: "启动时自动同步", ko: "시작 시 자동 동기화" },
	"autoSync.desc": {
		en: "Automatically sync clips when Obsidian starts",
		ja: "Obsidian 起動時にクリップを自動同期",
		zh: "Obsidian 启动时自动同步剪辑",
		ko: "Obsidian 시작 시 자동으로 클립 동기화",
	},

	// Timezone
	"timezone.name": { en: "Timezone", ja: "タイムゾーン", zh: "时区", ko: "시간대" },
	"timezone.desc": {
		en: "Timezone for clipped_at in frontmatter (auto-detected)",
		ja: "frontmatter の clipped_at に使用するタイムゾーン（自動検出）",
		zh: "frontmatter 中 clipped_at 的时区（自动检测）",
		ko: "frontmatter의 clipped_at에 사용할 시간대 (자동 감지)",
	},

	// File name template
	"fileName.name": { en: "File name template", ja: "ファイル名テンプレート", zh: "文件名模板", ko: "파일명 템플릿" },
	"fileName.desc": {
		en: "Variables: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\nExample: {yyyy}-{MM}-{dd}-{title} → 2026-03-08-Understanding-Rust-Lifetimes",
		ja: "変数: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n例: {yyyy}-{MM}-{dd}-{title} → 2026-03-08-Rustのライフタイム解説",
		zh: "变量: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n示例: {yyyy}-{MM}-{dd}-{title} → 2026-03-08-理解Rust生命周期",
		ko: "변수: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n예시: {yyyy}-{MM}-{dd}-{title} → 2026-03-08-Rust-라이프타임-이해",
	},

	// Sync on foreground
	"syncOnForeground.name": { en: "Sync on foreground", ja: "フォアグラウンド復帰時に同期", zh: "前台恢复时同步", ko: "포그라운드 복귀 시 동기화" },
	"syncOnForeground.desc": {
		en: "Automatically sync clips when returning to the app",
		ja: "アプリに戻った時にクリップを自動同期",
		zh: "返回应用时自动同步剪辑",
		ko: "앱으로 돌아올 때 자동으로 클립 동기화",
	},

	// Language setting
	"lang.name": { en: "Plugin language", ja: "プラグイン言語", zh: "插件语言", ko: "플러그인 언어" },
	"lang.desc": {
		en: "Language for plugin UI",
		ja: "プラグインUIの表示言語",
		zh: "插件界面语言",
		ko: "플러그인 UI 언어",
	},
	"lang.auto": { en: "Auto", ja: "自動", zh: "自动", ko: "자동" },

	// Pro tab - comparison table
	"pro.feature.clipToObsidian": {
		en: "Clip AI responses to Obsidian",
		ja: "AI回答をObsidianにクリップ",
		zh: "将AI回答剪辑到Obsidian",
		ko: "AI 응답을 Obsidian에 클립",
	},
	"pro.feature.unlimitedClips": { en: "Unlimited clips", ja: "無制限クリップ", zh: "无限剪辑", ko: "무제한 클립" },
	"pro.feature.autoTags": {
		en: "Auto tags & title generation",
		ja: "タグ・タイトル自動生成",
		zh: "自动标签和标题生成",
		ko: "자동 태그 및 제목 생성",
	},
	"pro.feature.summary": {
		en: "Summary in frontmatter",
		ja: "frontmatterにサマリー",
		zh: "frontmatter中的摘要",
		ko: "frontmatter에 요약",
	},
	"pro.feature.smartFolder": {
		en: "Smart folder placement",
		ja: "スマートフォルダ振り分け",
		zh: "智能文件夹分配",
		ko: "스마트 폴더 배치",
	},
	"pro.feature.weeklyDigest": { en: "Weekly Digest", ja: "週間ダイジェスト", zh: "每周摘要", ko: "주간 다이제스트" },
	"pro.cta.upgrade": {
		en: "Upgrade to Pro →",
		ja: "Proプランにアップグレード →",
		zh: "升级到Pro →",
		ko: "Pro로 업그레이드 →",
	},

	// Pro tab - folder settings
	"pro.folderDesc": {
		en: "AIChatClip detects marker files in your folders and uses them for auto-classification. Only folders with a marker file are eligible — folders without one are never used. You can choose any filename (default: README), but it must be the same across your entire vault. The content is freeform — describing the folder's purpose improves accuracy.",
		ja: "マーカーファイルを検知して自動分類に使います。マーカーファイルがあるフォルダだけが振り分け先になり、ないフォルダには振り分けられません。ファイル名は自由に決められますが（デフォルト: README）、Vault全体で統一する必要があります。内容は自由ですが、フォルダの用途を書くと分類精度が上がります。",
		zh: "AIChatClip 检测文件夹中的标记文件并用于自动分类。只有包含标记文件的文件夹才会被使用——没有标记文件的文件夹不会被分配。文件名可以自由选择（默认: README），但必须在整个库中统一。内容可以是任意文本——描述文件夹用途可以提高准确度。",
		ko: "AIChatClip은 폴더의 마커 파일을 감지하여 자동 분류에 사용합니다. 마커 파일이 있는 폴더만 대상이 되며, 없는 폴더에는 배치되지 않습니다. 파일명은 자유롭게 정할 수 있지만(기본: README), 볼트 전체에서 통일해야 합니다. 내용은 자유롭지만, 폴더의 용도를 적으면 분류 정확도가 향상됩니다.",
	},
	"pro.folderDocsLink": {
		en: "Learn more about marker files →",
		ja: "マーカーファイルについて詳しく →",
		zh: "了解更多关于标记文件 →",
		ko: "마커 파일에 대해 자세히 →",
	},
	"pro.autoScan.name": {
		en: "Auto-scan folders on sync",
		ja: "同期時にフォルダを自動スキャン",
		zh: "同步时自动扫描文件夹",
		ko: "동기화 시 폴더 자동 스캔",
	},
	"pro.autoScan.desc": {
		en: "Automatically scan and upload folder structure when syncing clips",
		ja: "クリップ同期時にフォルダ構造を自動スキャン＆アップロード",
		zh: "同步剪辑时自动扫描并上传文件夹结构",
		ko: "클립 동기화 시 폴더 구조 자동 스캔 및 업로드",
	},
	"pro.scanRoot.name": { en: "Folder scan root", ja: "スキャンルート", zh: "扫描根目录", ko: "스캔 루트" },
	"pro.scanRoot.desc": {
		en: "Root folder to scan for marker files. Leave empty to scan the entire vault.",
		ja: "マーカーファイルをスキャンするルートフォルダ。空欄でVault全体をスキャン。",
		zh: "扫描标记文件的根文件夹。留空以扫描整个库。",
		ko: "마커 파일을 스캔할 루트 폴더. 비워두면 전체 볼트를 스캔합니다.",
	},
	"pro.scanRoot.placeholder": { en: "(entire vault)", ja: "（Vault全体）", zh: "（整个库）", ko: "(전체 볼트)" },
	"pro.marker.name": { en: "Marker filename", ja: "マーカーファイル名", zh: "标记文件名", ko: "마커 파일명" },
	"pro.marker.desc": {
		en: "Filename stem to detect as folder description (e.g. README → README.md)",
		ja: "フォルダ説明として検出するファイル名（例: README → README.md）",
		zh: "作为文件夹描述检测的文件名（如 README → README.md）",
		ko: "폴더 설명으로 감지할 파일명 (예: README → README.md)",
	},
	"pro.scanNow.name": { en: "Scan folders now", ja: "今すぐスキャン", zh: "立即扫描", ko: "지금 스캔" },
	"pro.scanNow.desc": {
		en: "Scan marker files and upload folder structure to the server",
		ja: "マーカーファイルをスキャンしてフォルダ構造をサーバーにアップロード",
		zh: "扫描标记文件并将文件夹结构上传到服务器",
		ko: "마커 파일을 스캔하고 폴더 구조를 서버에 업로드",
	},
	"pro.scanNow.button": { en: "Scan & Upload", ja: "スキャン＆アップロード", zh: "扫描并上传", ko: "스캔 및 업로드" },
	"pro.readme.name": { en: "Marker file template", ja: "マーカーファイルテンプレート", zh: "标记文件模板", ko: "마커 파일 템플릿" },
	"pro.readme.desc": {
		en: "Copy a starter template for folder marker files",
		ja: "フォルダマーカーファイルのテンプレートをコピー",
		zh: "复制文件夹标记文件的模板",
		ko: "폴더 마커 파일용 템플릿 복사",
	},
	"pro.readme.button": { en: "Copy to clipboard", ja: "クリップボードにコピー", zh: "复制到剪贴板", ko: "클립보드에 복사" },

	// AI Customization
	"pro.aiCustomization": { en: "AI Customization", ja: "AIカスタマイズ", zh: "AI自定义", ko: "AI 커스터마이징" },
	"pro.titleLang.name": { en: "Title language", ja: "タイトル言語", zh: "标题语言", ko: "제목 언어" },
	"pro.titleLang.desc": {
		en: "Language for AI-generated titles (saved to server)",
		ja: "AI生成タイトルの言語（サーバーに保存）",
		zh: "AI生成标题的语言（保存到服务器）",
		ko: "AI 생성 제목의 언어 (서버에 저장)",
	},
	"pro.tagRule.name": { en: "Tag rule file", ja: "タグルールファイル", zh: "标签规则文件", ko: "태그 규칙 파일" },
	"pro.tagRule.desc": {
		en: "Path to a markdown file with custom tag rules (without .md extension)",
		ja: "カスタムタグルールのMarkdownファイルパス（.md拡張子なし）",
		zh: "自定义标签规则的Markdown文件路径（不含.md扩展名）",
		ko: "커스텀 태그 규칙 Markdown 파일 경로 (.md 확장자 제외)",
	},

	// Notices
	"notice.connected": { en: "Connected successfully!", ja: "接続しました！", zh: "连接成功！", ko: "연결 성공!" },
	"notice.syncInProgress": { en: "Sync already in progress", ja: "同期中です", zh: "正在同步中", ko: "동기화 진행 중" },
	"notice.noToken": {
		en: "Please set your session token in settings",
		ja: "設定でセッショントークンを設定してください",
		zh: "请在设置中设置会话令牌",
		ko: "설정에서 세션 토큰을 설정하세요",
	},
	"notice.noNewClips": { en: "No new clips to sync", ja: "新しいクリップはありません", zh: "没有新的剪辑", ko: "새 클립 없음" },
	"notice.synced": { en: "Synced {count} clip(s)", ja: "{count}件のクリップを同期しました", zh: "已同步{count}个剪辑", ko: "{count}개 클립 동기화 완료" },
	"notice.syncPartial": {
		en: "Synced {synced}, failed {failed}. Check console for details.",
		ja: "同期 {synced}件、失敗 {failed}件。詳細はコンソールを確認してください。",
		zh: "已同步{synced}个，失败{failed}个。详情请查看控制台。",
		ko: "동기화 {synced}개, 실패 {failed}개. 자세한 내용은 콘솔을 확인하세요.",
	},
	"notice.syncFailed": { en: "Sync failed - {msg}", ja: "同期失敗 - {msg}", zh: "同步失败 - {msg}", ko: "동기화 실패 - {msg}" },
	"notice.newClipSynced": { en: "New clip synced", ja: "新しいクリップを同期しました", zh: "新剪辑已同步", ko: "새 클립 동기화됨" },
	"notice.primarySet": {
		en: "This device is now primary",
		ja: "このデバイスをプライマリに設定しました",
		zh: "此设备已设为主设备",
		ko: "이 기기가 기본 기기로 설정되었습니다",
	},
	"notice.primaryFailed": {
		en: "Failed to set primary device",
		ja: "プライマリデバイスの設定に失敗しました",
		zh: "设置主设备失败",
		ko: "기본 기기 설정 실패",
	},
	"notice.signInFirst": { en: "Please sign in first", ja: "先にサインインしてください", zh: "请先登录", ko: "먼저 로그인하세요" },
	"notice.foldersSynced": {
		en: "{count} folder(s) synced",
		ja: "{count}個のフォルダを同期しました",
		zh: "已同步{count}个文件夹",
		ko: "{count}개 폴더 동기화 완료",
	},
	"notice.folderScanFailed": {
		en: "Folder scan failed - {msg}",
		ja: "フォルダスキャン失敗 - {msg}",
		zh: "文件夹扫描失败 - {msg}",
		ko: "폴더 스캔 실패 - {msg}",
	},
	"notice.readmeCopied": {
		en: "README template copied to clipboard",
		ja: "READMEテンプレートをクリップボードにコピーしました",
		zh: "README模板已复制到剪贴板",
		ko: "README 템플릿이 클립보드에 복사됨",
	},
	"notice.prefFailed": {
		en: "Failed to save preference",
		ja: "設定の保存に失敗しました",
		zh: "保存设置失败",
		ko: "설정 저장 실패",
	},

	// Guide tab
	"guide.title": { en: "Getting Started", ja: "はじめに", zh: "入门指南", ko: "시작하기" },
	"guide.step1.title": { en: "Install browser extension", ja: "ブラウザ拡張をインストール", zh: "安装浏览器扩展", ko: "브라우저 확장 설치" },
	"guide.step1.desc": {
		en: "Install the AIChatClip extension for Chrome or Firefox.",
		ja: "ChromeまたはFirefox用のAIChatClip拡張機能をインストールします。",
		zh: "为Chrome或Firefox安装AIChatClip扩展。",
		ko: "Chrome 또는 Firefox용 AIChatClip 확장을 설치합니다.",
	},
	"guide.step2.title": { en: "Clip AI responses", ja: "AI回答をクリップ", zh: "剪辑AI回答", ko: "AI 응답 클립" },
	"guide.step2.desc": {
		en: "Click the clip button on any AI chat response to save it.",
		ja: "AIチャットの回答にあるクリップボタンをクリックして保存します。",
		zh: "点击AI聊天回答上的剪辑按钮进行保存。",
		ko: "AI 채팅 응답의 클립 버튼을 클릭하여 저장합니다.",
	},
	"guide.step3.title": { en: "Auto-sync to Obsidian", ja: "Obsidianに自動同期", zh: "自动同步到Obsidian", ko: "Obsidian에 자동 동기화" },
	"guide.step3.desc": {
		en: "Clipped notes sync automatically to your Obsidian vault.",
		ja: "クリップしたノートはObsidian Vaultに自動で同期されます。",
		zh: "剪辑的笔记会自动同步到你的Obsidian库。",
		ko: "클립된 노트는 Obsidian 볼트에 자동으로 동기화됩니다.",
	},
	"guide.docsLink": { en: "View full documentation →", ja: "ドキュメントを見る →", zh: "查看完整文档 →", ko: "전체 문서 보기 →" },

	// Title lang options
	"titleLang.auto": { en: "Auto (same as content)", ja: "自動（コンテンツと同じ）", zh: "自动（与内容相同）", ko: "자동 (콘텐츠와 동일)" },
};

export function t(key: string, lang: PluginLang): string {
	return translations[key]?.[lang] ?? translations[key]?.en ?? key;
}

export function tReplace(key: string, lang: PluginLang, replacements: Record<string, string | number>): string {
	let result = t(key, lang);
	for (const [k, v] of Object.entries(replacements)) {
		result = result.replace(`{${k}}`, String(v));
	}
	return result;
}

export function detectLang(): PluginLang {
	const locale =
		localStorage.getItem("language") ??
		(window as any).moment?.locale?.() ??
		navigator.language ??
		"en";
	const code = locale.split("-")[0].toLowerCase();
	if (["en", "ja", "zh", "ko"].includes(code)) return code as PluginLang;
	return "en";
}
