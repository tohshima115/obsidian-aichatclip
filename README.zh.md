[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip for Obsidian

使用 [AIChatClip](https://aichatclip.com) 浏览器扩展，一键将 ChatGPT、Gemini、Claude、Grok 的 AI 聊天回答保存到 Obsidian 库中。

## 功能

- **一键剪辑** — 通过浏览器扩展一键保存任何 AI 聊天回答
- **自动同步** — 启动时自动同步，桌面端支持实时同步
- **YAML frontmatter** — 每条笔记包含来源、URL、标签和摘要等元数据
- **自定义文件名** — 支持日期、来源、标题等变量的模板配置
- **智能文件夹** (Pro) — AI 驱动的自动文件夹分类
- **自动标签和标题** (Pro) — AI 自动生成标签、标题和摘要

## 安装

### 社区插件（推荐）

1. 打开 **设置 → 社区插件 → 浏览**
2. 搜索 **AIChatClip**
3. 点击 **安装**，然后 **启用**

### 手动安装

1. 从[最新发布](https://github.com/aichatclip/obsidian-aichatclip/releases)下载 `main.js`、`manifest.json` 和 `styles.css`
2. 创建 `<vault>/.obsidian/plugins/aichatclip/` 文件夹并复制文件
3. 在 **设置 → 社区插件** 中启用插件

## 设置

1. **安装浏览器扩展** — 获取 [AIChatClip Chrome 扩展](https://aichatclip.com/docs/browser-extension)或 Firefox 版
2. **登录** — 打开插件设置，点击"登录"连接账户
3. **剪辑和同步** — 点击 AI 聊天回答上的剪辑按钮，自动同步到库中

## 配置

| 设置 | 描述 | 默认值 |
|------|------|--------|
| 收件箱文件夹 | 剪辑笔记的保存位置 | `AIChatClip/Inbox` |
| 文件名模板 | 变量: `{yyyy}` `{MM}` `{dd}` `{hh}` `{mm}` `{ss}` `{source}` `{chat_title}` `{title}` (Pro) | `{yyyy}-{MM}-{dd}-{title}` |
| 时区 | frontmatter 中 `clipped_at` 的时区 | 自动检测 |
| 启动时自动同步 | Obsidian 启动时同步剪辑 | 开启 |
| 前台恢复时同步 | 返回应用时同步（移动端） | 开启 |

### Pro 设置

| 设置 | 描述 |
|------|------|
| 自动扫描文件夹 | 同步时上传库文件夹结构 |
| 扫描根目录 | 扫描标记文件的根文件夹 |
| 标记文件名 | 作为文件夹描述的文件名（如 `README`） |
| 标题语言 | AI 生成标题的语言 |
| 标签规则文件 | 自定义标签规则的 Markdown 文件路径 |

## 源码架构

| 文件 | 职责 |
|------|------|
| `src/main.ts` | 插件入口 — 命令、功能区图标、生命周期 |
| `src/api.ts` | 集中式 API 客户端，所有服务器通信 |
| `src/sync.ts` | 剪辑同步 — 获取、写入库、标记已同步 |
| `src/settings.ts` | 设置界面 — Basic / Pro / Guide 标签页 |
| `src/folders.ts` | 库文件夹扫描和服务器同步 |
| `src/formatter.ts` | Markdown 格式化（含 YAML frontmatter） |
| `src/i18n.ts` | 国际化（en, ja, zh, ko） |
| `src/websocket.ts` | WebSocket 客户端（实时推送通知） |
| `src/types.ts` | 共享类型、常量和默认设置 |

## 许可证

[MIT](./LICENSE)
