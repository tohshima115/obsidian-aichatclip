[English](./README.md) | [日本語](./README.ja.md) | [中文](./README.zh.md) | [한국어](./README.ko.md)

# AIChatClip for Obsidian

[AIChatClip](https://aichatclip.com) 브라우저 확장을 사용하여 ChatGPT, Gemini, Claude, Grok의 AI 채팅 응답을 원클릭으로 Obsidian 볼트에 저장하세요.

## 기능

- **원클릭 클립** — 브라우저 확장으로 AI 채팅 응답을 원클릭 저장
- **자동 동기화** — 시작 시 자동 동기화, 데스크톱에서는 실시간 동기화
- **YAML frontmatter** — 각 노트에 소스, URL, 태그, 요약 메타데이터 포함
- **커스텀 파일명** — 날짜, 소스, 제목 등의 변수로 템플릿 설정 가능
- **스마트 폴더** (Pro) — AI 기반 자동 폴더 분류
- **자동 태그 및 제목** (Pro) — AI가 태그, 제목, 요약을 자동 생성

## 설치

### 커뮤니티 플러그인 (권장)

1. **설정 → 커뮤니티 플러그인 → 찾아보기** 열기
2. **AIChatClip** 검색
3. **설치** 클릭 후 **활성화**

### 수동 설치

1. [최신 릴리스](https://github.com/aichatclip/obsidian-aichatclip/releases)에서 `main.js`, `manifest.json`, `styles.css` 다운로드
2. `<vault>/.obsidian/plugins/aichatclip/` 폴더를 만들고 파일 복사
3. **설정 → 커뮤니티 플러그인**에서 플러그인 활성화

## 설정

1. **브라우저 확장 설치** — [AIChatClip Chrome 확장](https://aichatclip.com/docs/browser-extension) 또는 Firefox 버전 설치
2. **로그인** — 플러그인 설정을 열고 "로그인"을 클릭하여 계정 연결
3. **클립 & 동기화** — AI 채팅 응답의 클립 버튼을 클릭하면 볼트에 자동 동기화

## 구성

| 설정 | 설명 | 기본값 |
|------|------|--------|
| 받은 편지함 폴더 | 클립된 노트가 저장되는 위치 | `AIChatClip/Inbox` |
| 파일명 템플릿 | 변수: `{yyyy}` `{MM}` `{dd}` `{hh}` `{mm}` `{ss}` `{source}` `{chat_title}` `{title}` (Pro) | `{yyyy}-{MM}-{dd}-{title}` |
| 시간대 | frontmatter의 `clipped_at`에 사용할 시간대 | 자동 감지 |
| 시작 시 자동 동기화 | Obsidian 시작 시 클립 동기화 | 켜짐 |
| 포그라운드 복귀 시 동기화 | 앱으로 돌아올 때 동기화 (모바일) | 켜짐 |

### Pro 설정

| 설정 | 설명 |
|------|------|
| 폴더 자동 스캔 | 동기화 시 볼트 폴더 구조 업로드 |
| 스캔 루트 | 마커 파일을 스캔할 루트 폴더 |
| 마커 파일명 | 폴더 설명으로 감지할 파일명 (예: `README`) |
| 제목 언어 | AI 생성 제목의 언어 |
| 태그 규칙 파일 | 커스텀 태그 규칙 Markdown 파일 경로 |

## 소스 아키텍처

| 파일 | 역할 |
|------|------|
| `src/main.ts` | 플러그인 진입점 — 커맨드, 리본 아이콘, 라이프사이클 |
| `src/api.ts` | 중앙화된 API 클라이언트, 모든 서버 통신 |
| `src/sync.ts` | 클립 동기화 — 가져오기, 볼트에 쓰기, 동기화 완료 표시 |
| `src/settings.ts` | 설정 UI — Basic / Pro / Guide 탭 |
| `src/folders.ts` | 볼트 폴더 스캔 및 서버 동기화 |
| `src/formatter.ts` | Markdown 포맷팅 (YAML frontmatter 포함) |
| `src/i18n.ts` | 국제화 (en, ja, zh, ko) |
| `src/websocket.ts` | WebSocket 클라이언트 (실시간 푸시 알림) |
| `src/types.ts` | 공유 타입, 상수, 기본 설정 |

## 라이선스

[MIT](./LICENSE)
