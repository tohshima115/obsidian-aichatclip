"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => AIChatClipPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian4 = require("obsidian");

// src/api.ts
var import_obsidian = require("obsidian");
async function apiGet(settings, path) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "GET",
    headers: { Authorization: `Bearer ${settings.token}` }
  });
  return res;
}
async function apiPost(settings, path, body) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      "Content-Type": "application/json"
    },
    body: body != null ? JSON.stringify(body) : void 0
  });
  return res;
}
async function apiPut(settings, path, body) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  return res;
}
async function apiPatch(settings, path, body) {
  const res = await (0, import_obsidian.requestUrl)({
    url: `${settings.apiBaseUrl}${path}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${settings.token}`,
      "Content-Type": "application/json"
    },
    body: body != null ? JSON.stringify(body) : void 0
  });
  return res;
}
async function registerDevice(settings) {
  if (!settings.token || !settings.deviceId) return;
  try {
    await apiPost(settings, "/api/devices", {
      deviceId: settings.deviceId,
      deviceName: import_obsidian.Platform.isDesktop ? "Obsidian Desktop" : "Obsidian Mobile"
    });
  } catch (e) {
    console.warn("AIChatClip: device registration failed", e);
  }
}

// src/i18n.ts
var translations = {
  // Basic tab
  "tab.basic": { en: "Basic", ja: "\u57FA\u672C", zh: "\u57FA\u672C", ko: "\uAE30\uBCF8" },
  "tab.pro": { en: "Pro", ja: "Pro", zh: "Pro", ko: "Pro" },
  "tab.guide": { en: "Guide", ja: "\u30AC\u30A4\u30C9", zh: "\u6307\u5357", ko: "\uAC00\uC774\uB4DC" },
  // Authentication
  "auth.name": { en: "Authentication", ja: "\u8A8D\u8A3C", zh: "\u8BA4\u8BC1", ko: "\uC778\uC99D" },
  "auth.connected": { en: "Connected", ja: "\u63A5\u7D9A\u6E08\u307F", zh: "\u5DF2\u8FDE\u63A5", ko: "\uC5F0\uACB0\uB428" },
  "auth.notConnected": {
    en: "Not connected. Sign in to sync your clips.",
    ja: "\u672A\u63A5\u7D9A\u3002\u30B5\u30A4\u30F3\u30A4\u30F3\u3057\u3066\u30AF\u30EA\u30C3\u30D7\u3092\u540C\u671F\u3057\u307E\u3057\u3087\u3046\u3002",
    zh: "\u672A\u8FDE\u63A5\u3002\u8BF7\u767B\u5F55\u4EE5\u540C\u6B65\u60A8\u7684\u526A\u8F91\u3002",
    ko: "\uC5F0\uACB0\uB418\uC9C0 \uC54A\uC74C. \uB85C\uADF8\uC778\uD558\uC5EC \uD074\uB9BD\uC744 \uB3D9\uAE30\uD654\uD558\uC138\uC694."
  },
  "auth.signIn": { en: "Sign in", ja: "\u30B5\u30A4\u30F3\u30A4\u30F3", zh: "\u767B\u5F55", ko: "\uB85C\uADF8\uC778" },
  "auth.signOut": { en: "Sign out", ja: "\u30B5\u30A4\u30F3\u30A2\u30A6\u30C8", zh: "\u9000\u51FA", ko: "\uB85C\uADF8\uC544\uC6C3" },
  // Real-time sync
  "ws.name": { en: "Real-time sync", ja: "\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u540C\u671F", zh: "\u5B9E\u65F6\u540C\u6B65", ko: "\uC2E4\uC2DC\uAC04 \uB3D9\uAE30\uD654" },
  "ws.connected": { en: "Status: Connected", ja: "\u72B6\u614B: \u63A5\u7D9A\u4E2D", zh: "\u72B6\u6001: \u5DF2\u8FDE\u63A5", ko: "\uC0C1\uD0DC: \uC5F0\uACB0\uB428" },
  "ws.disconnected": { en: "Status: Disconnected", ja: "\u72B6\u614B: \u5207\u65AD", zh: "\u72B6\u6001: \u5DF2\u65AD\u5F00", ko: "\uC0C1\uD0DC: \uC5F0\uACB0 \uB04A\uAE40" },
  // Device
  "device.name": { en: "Set as primary device", ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u30C7\u30D0\u30A4\u30B9\u306B\u8A2D\u5B9A", zh: "\u8BBE\u4E3A\u4E3B\u8BBE\u5907", ko: "\uAE30\uBCF8 \uAE30\uAE30\uB85C \uC124\uC815" },
  "device.desc": {
    en: "The primary device has highest priority for real-time push notifications",
    ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u30C7\u30D0\u30A4\u30B9\u306F\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u30D7\u30C3\u30B7\u30E5\u901A\u77E5\u306E\u512A\u5148\u5EA6\u304C\u6700\u3082\u9AD8\u304F\u306A\u308A\u307E\u3059",
    zh: "\u4E3B\u8BBE\u5907\u5728\u5B9E\u65F6\u63A8\u9001\u901A\u77E5\u4E2D\u5177\u6709\u6700\u9AD8\u4F18\u5148\u7EA7",
    ko: "\uAE30\uBCF8 \uAE30\uAE30\uB294 \uC2E4\uC2DC\uAC04 \uD478\uC2DC \uC54C\uB9BC\uC5D0\uC11C \uAC00\uC7A5 \uB192\uC740 \uC6B0\uC120\uC21C\uC704\uB97C \uAC16\uC2B5\uB2C8\uB2E4"
  },
  "device.makePrimary": { en: "Make primary", ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u306B\u8A2D\u5B9A", zh: "\u8BBE\u4E3A\u4E3B\u8BBE\u5907", ko: "\uAE30\uBCF8\uC73C\uB85C \uC124\uC815" },
  // Inbox folder
  "inbox.name": { en: "Inbox folder", ja: "\u53D7\u4FE1\u30D5\u30A9\u30EB\u30C0", zh: "\u6536\u4EF6\u7BB1\u6587\u4EF6\u5939", ko: "\uBC1B\uC740 \uD3B8\uC9C0\uD568 \uD3F4\uB354" },
  "inbox.desc": {
    en: "Vault folder where clipped notes are saved",
    ja: "\u30AF\u30EA\u30C3\u30D7\u3057\u305F\u30CE\u30FC\u30C8\u306E\u4FDD\u5B58\u5148\u30D5\u30A9\u30EB\u30C0",
    zh: "\u4FDD\u5B58\u526A\u8F91\u7B14\u8BB0\u7684\u5E93\u6587\u4EF6\u5939",
    ko: "\uD074\uB9BD\uB41C \uB178\uD2B8\uAC00 \uC800\uC7A5\uB418\uB294 \uBCFC\uD2B8 \uD3F4\uB354"
  },
  // Auto-sync
  "autoSync.name": { en: "Auto-sync on load", ja: "\u8D77\u52D5\u6642\u306B\u81EA\u52D5\u540C\u671F", zh: "\u542F\u52A8\u65F6\u81EA\u52A8\u540C\u6B65", ko: "\uC2DC\uC791 \uC2DC \uC790\uB3D9 \uB3D9\uAE30\uD654" },
  "autoSync.desc": {
    en: "Automatically sync clips when Obsidian starts",
    ja: "Obsidian \u8D77\u52D5\u6642\u306B\u30AF\u30EA\u30C3\u30D7\u3092\u81EA\u52D5\u540C\u671F",
    zh: "Obsidian \u542F\u52A8\u65F6\u81EA\u52A8\u540C\u6B65\u526A\u8F91",
    ko: "Obsidian \uC2DC\uC791 \uC2DC \uC790\uB3D9\uC73C\uB85C \uD074\uB9BD \uB3D9\uAE30\uD654"
  },
  // Timezone
  "timezone.name": { en: "Timezone", ja: "\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3", zh: "\u65F6\u533A", ko: "\uC2DC\uAC04\uB300" },
  "timezone.desc": {
    en: "Timezone for clipped_at in frontmatter (auto-detected)",
    ja: "frontmatter \u306E clipped_at \u306B\u4F7F\u7528\u3059\u308B\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3\uFF08\u81EA\u52D5\u691C\u51FA\uFF09",
    zh: "frontmatter \u4E2D clipped_at \u7684\u65F6\u533A\uFF08\u81EA\u52A8\u68C0\u6D4B\uFF09",
    ko: "frontmatter\uC758 clipped_at\uC5D0 \uC0AC\uC6A9\uD560 \uC2DC\uAC04\uB300 (\uC790\uB3D9 \uAC10\uC9C0)"
  },
  // File name template
  "fileName.name": { en: "File name template", ja: "\u30D5\u30A1\u30A4\u30EB\u540D\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", zh: "\u6587\u4EF6\u540D\u6A21\u677F", ko: "\uD30C\uC77C\uBA85 \uD15C\uD50C\uB9BF" },
  "fileName.desc": {
    en: "Variables: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\nExample: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-Understanding-Rust-Lifetimes",
    ja: "\u5909\u6570: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n\u4F8B: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-Rust\u306E\u30E9\u30A4\u30D5\u30BF\u30A4\u30E0\u89E3\u8AAC",
    zh: "\u53D8\u91CF: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n\u793A\u4F8B: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-\u7406\u89E3Rust\u751F\u547D\u5468\u671F",
    ko: "\uBCC0\uC218: {yyyy} {MM} {dd} {hh} {mm} {ss} {source} {chat_title} {title} (Pro)\n\uC608\uC2DC: {yyyy}-{MM}-{dd}-{title} \u2192 2026-03-08-Rust-\uB77C\uC774\uD504\uD0C0\uC784-\uC774\uD574"
  },
  // Sync on foreground
  "syncOnForeground.name": { en: "Sync on foreground", ja: "\u30D5\u30A9\u30A2\u30B0\u30E9\u30A6\u30F3\u30C9\u5FA9\u5E30\u6642\u306B\u540C\u671F", zh: "\u524D\u53F0\u6062\u590D\u65F6\u540C\u6B65", ko: "\uD3EC\uADF8\uB77C\uC6B4\uB4DC \uBCF5\uADC0 \uC2DC \uB3D9\uAE30\uD654" },
  "syncOnForeground.desc": {
    en: "Automatically sync clips when returning to the app",
    ja: "\u30A2\u30D7\u30EA\u306B\u623B\u3063\u305F\u6642\u306B\u30AF\u30EA\u30C3\u30D7\u3092\u81EA\u52D5\u540C\u671F",
    zh: "\u8FD4\u56DE\u5E94\u7528\u65F6\u81EA\u52A8\u540C\u6B65\u526A\u8F91",
    ko: "\uC571\uC73C\uB85C \uB3CC\uC544\uC62C \uB54C \uC790\uB3D9\uC73C\uB85C \uD074\uB9BD \uB3D9\uAE30\uD654"
  },
  // Language setting
  "lang.name": { en: "Plugin language", ja: "\u30D7\u30E9\u30B0\u30A4\u30F3\u8A00\u8A9E", zh: "\u63D2\u4EF6\u8BED\u8A00", ko: "\uD50C\uB7EC\uADF8\uC778 \uC5B8\uC5B4" },
  "lang.desc": {
    en: "Language for plugin UI",
    ja: "\u30D7\u30E9\u30B0\u30A4\u30F3UI\u306E\u8868\u793A\u8A00\u8A9E",
    zh: "\u63D2\u4EF6\u754C\u9762\u8BED\u8A00",
    ko: "\uD50C\uB7EC\uADF8\uC778 UI \uC5B8\uC5B4"
  },
  "lang.auto": { en: "Auto", ja: "\u81EA\u52D5", zh: "\u81EA\u52A8", ko: "\uC790\uB3D9" },
  // Pro tab - comparison table
  "pro.feature.clipToObsidian": {
    en: "Clip AI responses to Obsidian",
    ja: "AI\u56DE\u7B54\u3092Obsidian\u306B\u30AF\u30EA\u30C3\u30D7",
    zh: "\u5C06AI\u56DE\u7B54\u526A\u8F91\u5230Obsidian",
    ko: "AI \uC751\uB2F5\uC744 Obsidian\uC5D0 \uD074\uB9BD"
  },
  "pro.feature.unlimitedClips": { en: "Unlimited clips", ja: "\u7121\u5236\u9650\u30AF\u30EA\u30C3\u30D7", zh: "\u65E0\u9650\u526A\u8F91", ko: "\uBB34\uC81C\uD55C \uD074\uB9BD" },
  "pro.feature.autoTags": {
    en: "Auto tags & title generation",
    ja: "\u30BF\u30B0\u30FB\u30BF\u30A4\u30C8\u30EB\u81EA\u52D5\u751F\u6210",
    zh: "\u81EA\u52A8\u6807\u7B7E\u548C\u6807\u9898\u751F\u6210",
    ko: "\uC790\uB3D9 \uD0DC\uADF8 \uBC0F \uC81C\uBAA9 \uC0DD\uC131"
  },
  "pro.feature.summary": {
    en: "Summary in frontmatter",
    ja: "frontmatter\u306B\u30B5\u30DE\u30EA\u30FC",
    zh: "frontmatter\u4E2D\u7684\u6458\u8981",
    ko: "frontmatter\uC5D0 \uC694\uC57D"
  },
  "pro.feature.smartFolder": {
    en: "Smart folder placement",
    ja: "\u30B9\u30DE\u30FC\u30C8\u30D5\u30A9\u30EB\u30C0\u632F\u308A\u5206\u3051",
    zh: "\u667A\u80FD\u6587\u4EF6\u5939\u5206\u914D",
    ko: "\uC2A4\uB9C8\uD2B8 \uD3F4\uB354 \uBC30\uCE58"
  },
  "pro.feature.weeklyDigest": { en: "Weekly digest", ja: "\u9031\u9593\u30C0\u30A4\u30B8\u30A7\u30B9\u30C8", zh: "\u6BCF\u5468\u6458\u8981", ko: "\uC8FC\uAC04 \uB2E4\uC774\uC81C\uC2A4\uD2B8" },
  "pro.cta.upgrade": {
    en: "Upgrade to Pro \u2192",
    ja: "Pro\u30D7\u30E9\u30F3\u306B\u30A2\u30C3\u30D7\u30B0\u30EC\u30FC\u30C9 \u2192",
    zh: "\u5347\u7EA7\u5230Pro \u2192",
    ko: "Pro\uB85C \uC5C5\uADF8\uB808\uC774\uB4DC \u2192"
  },
  // Pro tab - folder settings
  "pro.folderDesc": {
    en: "AIChatClip detects marker files in your folders and uses them for auto-classification. Only folders with a marker file are eligible \u2014 folders without one are never used. You can choose any filename (default: README), but it must be the same across your entire vault. The content is freeform \u2014 describing the folder's purpose improves accuracy.",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u691C\u77E5\u3057\u3066\u81EA\u52D5\u5206\u985E\u306B\u4F7F\u3044\u307E\u3059\u3002\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u304C\u3042\u308B\u30D5\u30A9\u30EB\u30C0\u3060\u3051\u304C\u632F\u308A\u5206\u3051\u5148\u306B\u306A\u308A\u3001\u306A\u3044\u30D5\u30A9\u30EB\u30C0\u306B\u306F\u632F\u308A\u5206\u3051\u3089\u308C\u307E\u305B\u3093\u3002\u30D5\u30A1\u30A4\u30EB\u540D\u306F\u81EA\u7531\u306B\u6C7A\u3081\u3089\u308C\u307E\u3059\u304C\uFF08\u30C7\u30D5\u30A9\u30EB\u30C8: README\uFF09\u3001Vault\u5168\u4F53\u3067\u7D71\u4E00\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059\u3002\u5185\u5BB9\u306F\u81EA\u7531\u3067\u3059\u304C\u3001\u30D5\u30A9\u30EB\u30C0\u306E\u7528\u9014\u3092\u66F8\u304F\u3068\u5206\u985E\u7CBE\u5EA6\u304C\u4E0A\u304C\u308A\u307E\u3059\u3002",
    zh: "AIChatClip \u68C0\u6D4B\u6587\u4EF6\u5939\u4E2D\u7684\u6807\u8BB0\u6587\u4EF6\u5E76\u7528\u4E8E\u81EA\u52A8\u5206\u7C7B\u3002\u53EA\u6709\u5305\u542B\u6807\u8BB0\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u624D\u4F1A\u88AB\u4F7F\u7528\u2014\u2014\u6CA1\u6709\u6807\u8BB0\u6587\u4EF6\u7684\u6587\u4EF6\u5939\u4E0D\u4F1A\u88AB\u5206\u914D\u3002\u6587\u4EF6\u540D\u53EF\u4EE5\u81EA\u7531\u9009\u62E9\uFF08\u9ED8\u8BA4: README\uFF09\uFF0C\u4F46\u5FC5\u987B\u5728\u6574\u4E2A\u5E93\u4E2D\u7EDF\u4E00\u3002\u5185\u5BB9\u53EF\u4EE5\u662F\u4EFB\u610F\u6587\u672C\u2014\u2014\u63CF\u8FF0\u6587\u4EF6\u5939\u7528\u9014\u53EF\u4EE5\u63D0\u9AD8\u51C6\u786E\u5EA6\u3002",
    ko: "AIChatClip\uC740 \uD3F4\uB354\uC758 \uB9C8\uCEE4 \uD30C\uC77C\uC744 \uAC10\uC9C0\uD558\uC5EC \uC790\uB3D9 \uBD84\uB958\uC5D0 \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uB9C8\uCEE4 \uD30C\uC77C\uC774 \uC788\uB294 \uD3F4\uB354\uB9CC \uB300\uC0C1\uC774 \uB418\uBA70, \uC5C6\uB294 \uD3F4\uB354\uC5D0\uB294 \uBC30\uCE58\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uD30C\uC77C\uBA85\uC740 \uC790\uC720\uB86D\uAC8C \uC815\uD560 \uC218 \uC788\uC9C0\uB9CC(\uAE30\uBCF8: README), \uBCFC\uD2B8 \uC804\uCCB4\uC5D0\uC11C \uD1B5\uC77C\uD574\uC57C \uD569\uB2C8\uB2E4. \uB0B4\uC6A9\uC740 \uC790\uC720\uB86D\uC9C0\uB9CC, \uD3F4\uB354\uC758 \uC6A9\uB3C4\uB97C \uC801\uC73C\uBA74 \uBD84\uB958 \uC815\uD655\uB3C4\uAC00 \uD5A5\uC0C1\uB429\uB2C8\uB2E4."
  },
  "pro.folderDocsLink": {
    en: "Learn more about marker files \u2192",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u306B\u3064\u3044\u3066\u8A73\u3057\u304F \u2192",
    zh: "\u4E86\u89E3\u66F4\u591A\u5173\u4E8E\u6807\u8BB0\u6587\u4EF6 \u2192",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC5D0 \uB300\uD574 \uC790\uC138\uD788 \u2192"
  },
  "pro.autoScan.name": {
    en: "Auto-scan folders on sync",
    ja: "\u540C\u671F\u6642\u306B\u30D5\u30A9\u30EB\u30C0\u3092\u81EA\u52D5\u30B9\u30AD\u30E3\u30F3",
    zh: "\u540C\u6B65\u65F6\u81EA\u52A8\u626B\u63CF\u6587\u4EF6\u5939",
    ko: "\uB3D9\uAE30\uD654 \uC2DC \uD3F4\uB354 \uC790\uB3D9 \uC2A4\uCE94"
  },
  "pro.autoScan.desc": {
    en: "Automatically scan and upload folder structure when syncing clips",
    ja: "\u30AF\u30EA\u30C3\u30D7\u540C\u671F\u6642\u306B\u30D5\u30A9\u30EB\u30C0\u69CB\u9020\u3092\u81EA\u52D5\u30B9\u30AD\u30E3\u30F3\uFF06\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
    zh: "\u540C\u6B65\u526A\u8F91\u65F6\u81EA\u52A8\u626B\u63CF\u5E76\u4E0A\u4F20\u6587\u4EF6\u5939\u7ED3\u6784",
    ko: "\uD074\uB9BD \uB3D9\uAE30\uD654 \uC2DC \uD3F4\uB354 \uAD6C\uC870 \uC790\uB3D9 \uC2A4\uCE94 \uBC0F \uC5C5\uB85C\uB4DC"
  },
  "pro.scanRoot.name": { en: "Folder scan root", ja: "\u30B9\u30AD\u30E3\u30F3\u30EB\u30FC\u30C8", zh: "\u626B\u63CF\u6839\u76EE\u5F55", ko: "\uC2A4\uCE94 \uB8E8\uD2B8" },
  "pro.scanRoot.desc": {
    en: "Root folder to scan for marker files. Leave empty to scan the entire vault.",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u30B9\u30AD\u30E3\u30F3\u3059\u308B\u30EB\u30FC\u30C8\u30D5\u30A9\u30EB\u30C0\u3002\u7A7A\u6B04\u3067Vault\u5168\u4F53\u3092\u30B9\u30AD\u30E3\u30F3\u3002",
    zh: "\u626B\u63CF\u6807\u8BB0\u6587\u4EF6\u7684\u6839\u6587\u4EF6\u5939\u3002\u7559\u7A7A\u4EE5\u626B\u63CF\u6574\u4E2A\u5E93\u3002",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC744 \uC2A4\uCE94\uD560 \uB8E8\uD2B8 \uD3F4\uB354. \uBE44\uC6CC\uB450\uBA74 \uC804\uCCB4 \uBCFC\uD2B8\uB97C \uC2A4\uCE94\uD569\uB2C8\uB2E4."
  },
  "pro.scanRoot.placeholder": { en: "(entire vault)", ja: "\uFF08Vault\u5168\u4F53\uFF09", zh: "\uFF08\u6574\u4E2A\u5E93\uFF09", ko: "(\uC804\uCCB4 \uBCFC\uD2B8)" },
  "pro.marker.name": { en: "Marker filename", ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u540D", zh: "\u6807\u8BB0\u6587\u4EF6\u540D", ko: "\uB9C8\uCEE4 \uD30C\uC77C\uBA85" },
  "pro.marker.desc": {
    en: "Filename stem to detect as folder description (e.g. README \u2192 README.md)",
    ja: "\u30D5\u30A9\u30EB\u30C0\u8AAC\u660E\u3068\u3057\u3066\u691C\u51FA\u3059\u308B\u30D5\u30A1\u30A4\u30EB\u540D\uFF08\u4F8B: README \u2192 README.md\uFF09",
    zh: "\u4F5C\u4E3A\u6587\u4EF6\u5939\u63CF\u8FF0\u68C0\u6D4B\u7684\u6587\u4EF6\u540D\uFF08\u5982 README \u2192 README.md\uFF09",
    ko: "\uD3F4\uB354 \uC124\uBA85\uC73C\uB85C \uAC10\uC9C0\uD560 \uD30C\uC77C\uBA85 (\uC608: README \u2192 README.md)"
  },
  "pro.scanNow.name": { en: "Scan folders now", ja: "\u4ECA\u3059\u3050\u30B9\u30AD\u30E3\u30F3", zh: "\u7ACB\u5373\u626B\u63CF", ko: "\uC9C0\uAE08 \uC2A4\uCE94" },
  "pro.scanNow.desc": {
    en: "Scan marker files and upload folder structure to the server",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u30B9\u30AD\u30E3\u30F3\u3057\u3066\u30D5\u30A9\u30EB\u30C0\u69CB\u9020\u3092\u30B5\u30FC\u30D0\u30FC\u306B\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
    zh: "\u626B\u63CF\u6807\u8BB0\u6587\u4EF6\u5E76\u5C06\u6587\u4EF6\u5939\u7ED3\u6784\u4E0A\u4F20\u5230\u670D\u52A1\u5668",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC744 \uC2A4\uCE94\uD558\uACE0 \uD3F4\uB354 \uAD6C\uC870\uB97C \uC11C\uBC84\uC5D0 \uC5C5\uB85C\uB4DC"
  },
  "pro.scanNow.button": { en: "Scan & upload", ja: "\u30B9\u30AD\u30E3\u30F3\uFF06\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9", zh: "\u626B\u63CF\u5E76\u4E0A\u4F20", ko: "\uC2A4\uCE94 \uBC0F \uC5C5\uB85C\uB4DC" },
  "pro.readme.name": { en: "Marker file template", ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", zh: "\u6807\u8BB0\u6587\u4EF6\u6A21\u677F", ko: "\uB9C8\uCEE4 \uD30C\uC77C \uD15C\uD50C\uB9BF" },
  "pro.readme.desc": {
    en: "Copy a starter template for folder marker files",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30B3\u30D4\u30FC",
    zh: "\u590D\u5236\u6587\u4EF6\u5939\u6807\u8BB0\u6587\u4EF6\u7684\u6A21\u677F",
    ko: "\uD3F4\uB354 \uB9C8\uCEE4 \uD30C\uC77C\uC6A9 \uD15C\uD50C\uB9BF \uBCF5\uC0AC"
  },
  "pro.readme.button": { en: "Copy to clipboard", ja: "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC", zh: "\u590D\u5236\u5230\u526A\u8D34\u677F", ko: "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC" },
  // AI Customization
  "pro.aiCustomization": { en: "AI customization", ja: "AI\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA", zh: "AI\u81EA\u5B9A\u4E49", ko: "AI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5" },
  "pro.titleLang.name": { en: "Title language", ja: "\u30BF\u30A4\u30C8\u30EB\u8A00\u8A9E", zh: "\u6807\u9898\u8BED\u8A00", ko: "\uC81C\uBAA9 \uC5B8\uC5B4" },
  "pro.titleLang.desc": {
    en: "Language for AI-generated titles (saved to server)",
    ja: "AI\u751F\u6210\u30BF\u30A4\u30C8\u30EB\u306E\u8A00\u8A9E\uFF08\u30B5\u30FC\u30D0\u30FC\u306B\u4FDD\u5B58\uFF09",
    zh: "AI\u751F\u6210\u6807\u9898\u7684\u8BED\u8A00\uFF08\u4FDD\u5B58\u5230\u670D\u52A1\u5668\uFF09",
    ko: "AI \uC0DD\uC131 \uC81C\uBAA9\uC758 \uC5B8\uC5B4 (\uC11C\uBC84\uC5D0 \uC800\uC7A5)"
  },
  "pro.tagRule.name": { en: "Tag rule file", ja: "\u30BF\u30B0\u30EB\u30FC\u30EB\u30D5\u30A1\u30A4\u30EB", zh: "\u6807\u7B7E\u89C4\u5219\u6587\u4EF6", ko: "\uD0DC\uADF8 \uADDC\uCE59 \uD30C\uC77C" },
  "pro.tagRule.desc": {
    en: "Path to a markdown file with custom tag rules (without .md extension)",
    ja: "\u30AB\u30B9\u30BF\u30E0\u30BF\u30B0\u30EB\u30FC\u30EB\u306EMarkdown\u30D5\u30A1\u30A4\u30EB\u30D1\u30B9\uFF08.md\u62E1\u5F35\u5B50\u306A\u3057\uFF09",
    zh: "\u81EA\u5B9A\u4E49\u6807\u7B7E\u89C4\u5219\u7684Markdown\u6587\u4EF6\u8DEF\u5F84\uFF08\u4E0D\u542B.md\u6269\u5C55\u540D\uFF09",
    ko: "\uCEE4\uC2A4\uD140 \uD0DC\uADF8 \uADDC\uCE59 Markdown \uD30C\uC77C \uACBD\uB85C (.md \uD655\uC7A5\uC790 \uC81C\uC678)"
  },
  "pro.tagRule.create": { en: "Create template", ja: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u4F5C\u6210", zh: "\u521B\u5EFA\u6A21\u677F", ko: "\uD15C\uD50C\uB9BF \uC0DD\uC131" },
  "pro.tagRule.created": { en: "Tag rule file created", ja: "\u30BF\u30B0\u30EB\u30FC\u30EB\u30D5\u30A1\u30A4\u30EB\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F", zh: "\u6807\u7B7E\u89C4\u5219\u6587\u4EF6\u5DF2\u521B\u5EFA", ko: "\uD0DC\uADF8 \uADDC\uCE59 \uD30C\uC77C\uC774 \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4" },
  // Notices
  "notice.connected": { en: "Connected successfully!", ja: "\u63A5\u7D9A\u3057\u307E\u3057\u305F\uFF01", zh: "\u8FDE\u63A5\u6210\u529F\uFF01", ko: "\uC5F0\uACB0 \uC131\uACF5!" },
  "notice.syncInProgress": { en: "Sync already in progress", ja: "\u540C\u671F\u4E2D\u3067\u3059", zh: "\u6B63\u5728\u540C\u6B65\u4E2D", ko: "\uB3D9\uAE30\uD654 \uC9C4\uD589 \uC911" },
  "notice.noToken": {
    en: "Please set your session token in settings",
    ja: "\u8A2D\u5B9A\u3067\u30BB\u30C3\u30B7\u30E7\u30F3\u30C8\u30FC\u30AF\u30F3\u3092\u8A2D\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044",
    zh: "\u8BF7\u5728\u8BBE\u7F6E\u4E2D\u8BBE\u7F6E\u4F1A\u8BDD\u4EE4\u724C",
    ko: "\uC124\uC815\uC5D0\uC11C \uC138\uC158 \uD1A0\uD070\uC744 \uC124\uC815\uD558\uC138\uC694"
  },
  "notice.noNewClips": { en: "No new clips to sync", ja: "\u65B0\u3057\u3044\u30AF\u30EA\u30C3\u30D7\u306F\u3042\u308A\u307E\u305B\u3093", zh: "\u6CA1\u6709\u65B0\u7684\u526A\u8F91", ko: "\uC0C8 \uD074\uB9BD \uC5C6\uC74C" },
  "notice.synced": { en: "Synced {count} clip(s)", ja: "{count}\u4EF6\u306E\u30AF\u30EA\u30C3\u30D7\u3092\u540C\u671F\u3057\u307E\u3057\u305F", zh: "\u5DF2\u540C\u6B65{count}\u4E2A\u526A\u8F91", ko: "{count}\uAC1C \uD074\uB9BD \uB3D9\uAE30\uD654 \uC644\uB8CC" },
  "notice.syncPartial": {
    en: "Synced {synced}, failed {failed}. Check console for details.",
    ja: "\u540C\u671F {synced}\u4EF6\u3001\u5931\u6557 {failed}\u4EF6\u3002\u8A73\u7D30\u306F\u30B3\u30F3\u30BD\u30FC\u30EB\u3092\u78BA\u8A8D\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
    zh: "\u5DF2\u540C\u6B65{synced}\u4E2A\uFF0C\u5931\u8D25{failed}\u4E2A\u3002\u8BE6\u60C5\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002",
    ko: "\uB3D9\uAE30\uD654 {synced}\uAC1C, \uC2E4\uD328 {failed}\uAC1C. \uC790\uC138\uD55C \uB0B4\uC6A9\uC740 \uCF58\uC194\uC744 \uD655\uC778\uD558\uC138\uC694."
  },
  "notice.syncFailed": { en: "Sync failed - {msg}", ja: "\u540C\u671F\u5931\u6557 - {msg}", zh: "\u540C\u6B65\u5931\u8D25 - {msg}", ko: "\uB3D9\uAE30\uD654 \uC2E4\uD328 - {msg}" },
  "notice.newClipSynced": { en: "New clip synced", ja: "\u65B0\u3057\u3044\u30AF\u30EA\u30C3\u30D7\u3092\u540C\u671F\u3057\u307E\u3057\u305F", zh: "\u65B0\u526A\u8F91\u5DF2\u540C\u6B65", ko: "\uC0C8 \uD074\uB9BD \uB3D9\uAE30\uD654\uB428" },
  "notice.primarySet": {
    en: "This device is now primary",
    ja: "\u3053\u306E\u30C7\u30D0\u30A4\u30B9\u3092\u30D7\u30E9\u30A4\u30DE\u30EA\u306B\u8A2D\u5B9A\u3057\u307E\u3057\u305F",
    zh: "\u6B64\u8BBE\u5907\u5DF2\u8BBE\u4E3A\u4E3B\u8BBE\u5907",
    ko: "\uC774 \uAE30\uAE30\uAC00 \uAE30\uBCF8 \uAE30\uAE30\uB85C \uC124\uC815\uB418\uC5C8\uC2B5\uB2C8\uB2E4"
  },
  "notice.primaryFailed": {
    en: "Failed to set primary device",
    ja: "\u30D7\u30E9\u30A4\u30DE\u30EA\u30C7\u30D0\u30A4\u30B9\u306E\u8A2D\u5B9A\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u8BBE\u7F6E\u4E3B\u8BBE\u5907\u5931\u8D25",
    ko: "\uAE30\uBCF8 \uAE30\uAE30 \uC124\uC815 \uC2E4\uD328"
  },
  "notice.signInFirst": { en: "Please sign in first", ja: "\u5148\u306B\u30B5\u30A4\u30F3\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044", zh: "\u8BF7\u5148\u767B\u5F55", ko: "\uBA3C\uC800 \uB85C\uADF8\uC778\uD558\uC138\uC694" },
  "notice.foldersSynced": {
    en: "{count} folder(s) synced",
    ja: "{count}\u500B\u306E\u30D5\u30A9\u30EB\u30C0\u3092\u540C\u671F\u3057\u307E\u3057\u305F",
    zh: "\u5DF2\u540C\u6B65{count}\u4E2A\u6587\u4EF6\u5939",
    ko: "{count}\uAC1C \uD3F4\uB354 \uB3D9\uAE30\uD654 \uC644\uB8CC"
  },
  "notice.folderScanFailed": {
    en: "Folder scan failed - {msg}",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30B9\u30AD\u30E3\u30F3\u5931\u6557 - {msg}",
    zh: "\u6587\u4EF6\u5939\u626B\u63CF\u5931\u8D25 - {msg}",
    ko: "\uD3F4\uB354 \uC2A4\uCE94 \uC2E4\uD328 - {msg}"
  },
  "notice.readmeCopied": {
    en: "README template copied to clipboard",
    ja: "README\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F",
    zh: "README\u6A21\u677F\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
    ko: "README \uD15C\uD50C\uB9BF\uC774 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC\uB428"
  },
  "notice.prefFailed": {
    en: "Failed to save preference",
    ja: "\u8A2D\u5B9A\u306E\u4FDD\u5B58\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25",
    ko: "\uC124\uC815 \uC800\uC7A5 \uC2E4\uD328"
  },
  // Guide tab
  "guide.title": { en: "Getting started", ja: "\u306F\u3058\u3081\u306B", zh: "\u5165\u95E8\u6307\u5357", ko: "\uC2DC\uC791\uD558\uAE30" },
  "guide.step1.title": { en: "Install browser extension", ja: "\u30D6\u30E9\u30A6\u30B6\u62E1\u5F35\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB", zh: "\u5B89\u88C5\u6D4F\u89C8\u5668\u6269\u5C55", ko: "\uBE0C\uB77C\uC6B0\uC800 \uD655\uC7A5 \uC124\uCE58" },
  "guide.step1.desc": {
    en: "Install the AIChatClip extension for Chrome or Firefox.",
    ja: "Chrome\u307E\u305F\u306FFirefox\u7528\u306EAIChatClip\u62E1\u5F35\u6A5F\u80FD\u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u307E\u3059\u3002",
    zh: "\u4E3AChrome\u6216Firefox\u5B89\u88C5AIChatClip\u6269\u5C55\u3002",
    ko: "Chrome \uB610\uB294 Firefox\uC6A9 AIChatClip \uD655\uC7A5\uC744 \uC124\uCE58\uD569\uB2C8\uB2E4."
  },
  "guide.step2.title": { en: "Clip AI responses", ja: "AI\u56DE\u7B54\u3092\u30AF\u30EA\u30C3\u30D7", zh: "\u526A\u8F91AI\u56DE\u7B54", ko: "AI \uC751\uB2F5 \uD074\uB9BD" },
  "guide.step2.desc": {
    en: "Click the clip button on any AI chat response to save it.",
    ja: "AI\u30C1\u30E3\u30C3\u30C8\u306E\u56DE\u7B54\u306B\u3042\u308B\u30AF\u30EA\u30C3\u30D7\u30DC\u30BF\u30F3\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u4FDD\u5B58\u3057\u307E\u3059\u3002",
    zh: "\u70B9\u51FBAI\u804A\u5929\u56DE\u7B54\u4E0A\u7684\u526A\u8F91\u6309\u94AE\u8FDB\u884C\u4FDD\u5B58\u3002",
    ko: "AI \uCC44\uD305 \uC751\uB2F5\uC758 \uD074\uB9BD \uBC84\uD2BC\uC744 \uD074\uB9AD\uD558\uC5EC \uC800\uC7A5\uD569\uB2C8\uB2E4."
  },
  "guide.step3.title": { en: "Auto-sync to Obsidian", ja: "Obsidian\u306B\u81EA\u52D5\u540C\u671F", zh: "\u81EA\u52A8\u540C\u6B65\u5230Obsidian", ko: "Obsidian\uC5D0 \uC790\uB3D9 \uB3D9\uAE30\uD654" },
  "guide.step3.desc": {
    en: "Clipped notes sync automatically to your Obsidian vault.",
    ja: "\u30AF\u30EA\u30C3\u30D7\u3057\u305F\u30CE\u30FC\u30C8\u306FObsidian Vault\u306B\u81EA\u52D5\u3067\u540C\u671F\u3055\u308C\u307E\u3059\u3002",
    zh: "\u526A\u8F91\u7684\u7B14\u8BB0\u4F1A\u81EA\u52A8\u540C\u6B65\u5230\u4F60\u7684Obsidian\u5E93\u3002",
    ko: "\uD074\uB9BD\uB41C \uB178\uD2B8\uB294 Obsidian \uBCFC\uD2B8\uC5D0 \uC790\uB3D9\uC73C\uB85C \uB3D9\uAE30\uD654\uB429\uB2C8\uB2E4."
  },
  "guide.docsLink": { en: "View full documentation \u2192", ja: "\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u898B\u308B \u2192", zh: "\u67E5\u770B\u5B8C\u6574\u6587\u6863 \u2192", ko: "\uC804\uCCB4 \uBB38\uC11C \uBCF4\uAE30 \u2192" },
  // Title lang options
  "titleLang.auto": { en: "Auto (same as content)", ja: "\u81EA\u52D5\uFF08\u30B3\u30F3\u30C6\u30F3\u30C4\u3068\u540C\u3058\uFF09", zh: "\u81EA\u52A8\uFF08\u4E0E\u5185\u5BB9\u76F8\u540C\uFF09", ko: "\uC790\uB3D9 (\uCF58\uD150\uCE20\uC640 \uB3D9\uC77C)" },
  // Folder Manager (settings button)
  "pro.folderManager.name": {
    en: "Folder manager",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC",
    zh: "\u6587\u4EF6\u5939\u7BA1\u7406\u5668",
    ko: "\uD3F4\uB354 \uAD00\uB9AC\uC790"
  },
  "pro.folderManager.desc": {
    en: "Create or delete marker files in bulk with AI-generated descriptions",
    ja: "AI\u306B\u3088\u308B\u8AAC\u660E\u6587\u751F\u6210\u3067\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u3092\u4E00\u62EC\u4F5C\u6210\u30FB\u524A\u9664",
    zh: "\u4F7F\u7528AI\u751F\u6210\u63CF\u8FF0\u6279\u91CF\u521B\u5EFA\u6216\u5220\u9664\u6807\u8BB0\u6587\u4EF6",
    ko: "AI \uC0DD\uC131 \uC124\uBA85\uC73C\uB85C \uB9C8\uCEE4 \uD30C\uC77C \uC77C\uAD04 \uC0DD\uC131/\uC0AD\uC81C"
  },
  "pro.folderManager.button": {
    en: "Open folder manager",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC\u3092\u958B\u304F",
    zh: "\u6253\u5F00\u6587\u4EF6\u5939\u7BA1\u7406\u5668",
    ko: "\uD3F4\uB354 \uAD00\uB9AC\uC790 \uC5F4\uAE30"
  },
  // Modal
  "modal.title": { en: "Folder Manager", ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30CD\u30FC\u30B8\u30E3\u30FC", zh: "\u6587\u4EF6\u5939\u7BA1\u7406\u5668", ko: "\uD3F4\uB354 \uAD00\uB9AC\uC790" },
  "modal.tabCreate": { en: "Create", ja: "\u4F5C\u6210", zh: "\u521B\u5EFA", ko: "\uC0DD\uC131" },
  "modal.tabDelete": { en: "Delete", ja: "\u524A\u9664", zh: "\u5220\u9664", ko: "\uC0AD\uC81C" },
  "modal.selectAll": { en: "Select all", ja: "\u5168\u9078\u629E", zh: "\u5168\u9009", ko: "\uC804\uCCB4 \uC120\uD0DD" },
  "modal.deselectAll": { en: "Deselect all", ja: "\u5168\u89E3\u9664", zh: "\u53D6\u6D88\u5168\u9009", ko: "\uC804\uCCB4 \uD574\uC81C" },
  "modal.descLanguage": { en: "Description language: ", ja: "\u8AAC\u660E\u6587\u306E\u8A00\u8A9E: ", zh: "\u63CF\u8FF0\u8BED\u8A00: ", ko: "\uC124\uBA85 \uC5B8\uC5B4: " },
  "modal.descPlaceholder": {
    en: "Describe what kind of notes belong in this folder...",
    ja: "\u3053\u306E\u30D5\u30A9\u30EB\u30C0\u306B\u3069\u3093\u306A\u30CE\u30FC\u30C8\u304C\u5165\u308B\u304B\u8AAC\u660E...",
    zh: "\u63CF\u8FF0\u6B64\u6587\u4EF6\u5939\u4E2D\u5C5E\u4E8E\u54EA\u79CD\u7B14\u8BB0...",
    ko: "\uC774 \uD3F4\uB354\uC5D0 \uC5B4\uB5A4 \uB178\uD2B8\uAC00 \uB4E4\uC5B4\uAC00\uB294\uC9C0 \uC124\uBA85..."
  },
  "modal.createAndSync": { en: "Create markers & sync", ja: "\u30DE\u30FC\u30AB\u30FC\u4F5C\u6210 & \u540C\u671F", zh: "\u521B\u5EFA\u6807\u8BB0\u5E76\u540C\u6B65", ko: "\uB9C8\uCEE4 \uC0DD\uC131 \uBC0F \uB3D9\uAE30\uD654" },
  "modal.deleteAndSync": { en: "Delete selected & sync", ja: "\u9078\u629E\u3057\u305F\u30DE\u30FC\u30AB\u30FC\u3092\u524A\u9664 & \u540C\u671F", zh: "\u5220\u9664\u9009\u4E2D\u7684\u5E76\u540C\u6B65", ko: "\uC120\uD0DD \uD56D\uBAA9 \uC0AD\uC81C \uBC0F \uB3D9\uAE30\uD654" },
  "modal.generate": { en: "AI Generate", ja: "AI\u751F\u6210", zh: "AI\u751F\u6210", ko: "AI \uC0DD\uC131" },
  "modal.generating": { en: "Generating...", ja: "\u751F\u6210\u4E2D...", zh: "\u751F\u6210\u4E2D...", ko: "\uC0DD\uC131 \uC911..." },
  "modal.refine": { en: "Refine with AI", ja: "AI\u3067\u6821\u6B63", zh: "AI\u6821\u6B63", ko: "AI \uAD50\uC815" },
  "modal.refining": { en: "Refining...", ja: "\u6821\u6B63\u4E2D...", zh: "\u6821\u6B63\u4E2D...", ko: "\uAD50\uC815 \uC911..." },
  "modal.existingMarker": { en: " (existing)", ja: "\uFF08\u65E2\u5B58\uFF09", zh: "\uFF08\u5DF2\u6709\uFF09", ko: " (\uAE30\uC874)" },
  "modal.noFolders": {
    en: "No folders found in vault",
    ja: "Vault\u5185\u306B\u30D5\u30A9\u30EB\u30C0\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093",
    zh: "\u5E93\u4E2D\u672A\u627E\u5230\u6587\u4EF6\u5939",
    ko: "\uBCFC\uD2B8\uC5D0\uC11C \uD3F4\uB354\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"
  },
  "modal.noMarkers": {
    en: "No marker files found",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u306F\u3042\u308A\u307E\u305B\u3093",
    zh: "\u672A\u627E\u5230\u6807\u8BB0\u6587\u4EF6",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"
  },
  "modal.markersFound": {
    en: "Folders with marker files:",
    ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u304C\u3042\u308B\u30D5\u30A9\u30EB\u30C0:",
    zh: "\u5305\u542B\u6807\u8BB0\u6587\u4EF6\u7684\u6587\u4EF6\u5939:",
    ko: "\uB9C8\uCEE4 \uD30C\uC77C\uC774 \uC788\uB294 \uD3F4\uB354:"
  },
  "modal.confirmOverwrite": {
    en: "{count} marker(s) will be overwritten. Continue?",
    ja: "{count}\u500B\u306E\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u304C\u4E0A\u66F8\u304D\u3055\u308C\u307E\u3059\u3002\u7D9A\u884C\u3057\u307E\u3059\u304B\uFF1F",
    zh: "{count}\u4E2A\u6807\u8BB0\u6587\u4EF6\u5C06\u88AB\u8986\u76D6\u3002\u7EE7\u7EED\u5417\uFF1F",
    ko: "{count}\uAC1C\uC758 \uB9C8\uCEE4 \uD30C\uC77C\uC774 \uB36E\uC5B4\uC4F0\uC5EC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"
  },
  // Notices (folder manager)
  "notice.markersCreated": {
    en: "{count} marker(s) created",
    ja: "{count}\u500B\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u4F5C\u6210\u3057\u307E\u3057\u305F",
    zh: "\u5DF2\u521B\u5EFA{count}\u4E2A\u6807\u8BB0",
    ko: "{count}\uAC1C \uB9C8\uCEE4 \uC0DD\uC131 \uC644\uB8CC"
  },
  "notice.markersDeleted": {
    en: "{count} marker(s) deleted",
    ja: "{count}\u500B\u306E\u30DE\u30FC\u30AB\u30FC\u3092\u524A\u9664\u3057\u307E\u3057\u305F",
    zh: "\u5DF2\u5220\u9664{count}\u4E2A\u6807\u8BB0",
    ko: "{count}\uAC1C \uB9C8\uCEE4 \uC0AD\uC81C \uC644\uB8CC"
  },
  "notice.generateFailed": {
    en: "Failed to generate description",
    ja: "\u8AAC\u660E\u6587\u306E\u751F\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u751F\u6210\u63CF\u8FF0\u5931\u8D25",
    ko: "\uC124\uBA85 \uC0DD\uC131 \uC2E4\uD328"
  },
  "notice.quotaExceeded": {
    en: "AI quota exceeded for this billing period",
    ja: "\u4ECA\u6708\u306EAI\u4F7F\u7528\u91CF\u4E0A\u9650\u306B\u9054\u3057\u307E\u3057\u305F",
    zh: "\u672C\u6708AI\u4F7F\u7528\u91CF\u5DF2\u8FBE\u4E0A\u9650",
    ko: "\uC774\uBC88 \uCCAD\uAD6C \uAE30\uAC04\uC758 AI \uD560\uB2F9\uB7C9 \uCD08\uACFC"
  },
  "notice.syncAfterCreateFailed": {
    en: "Markers created but sync failed",
    ja: "\u30DE\u30FC\u30AB\u30FC\u4F5C\u6210\u5F8C\u306E\u540C\u671F\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u6807\u8BB0\u5DF2\u521B\u5EFA\u4F46\u540C\u6B65\u5931\u8D25",
    ko: "\uB9C8\uCEE4 \uC0DD\uC131 \uD6C4 \uB3D9\uAE30\uD654 \uC2E4\uD328"
  },
  "notice.syncAfterDeleteFailed": {
    en: "Markers deleted but sync failed",
    ja: "\u30DE\u30FC\u30AB\u30FC\u524A\u9664\u5F8C\u306E\u540C\u671F\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
    zh: "\u6807\u8BB0\u5DF2\u5220\u9664\u4F46\u540C\u6B65\u5931\u8D25",
    ko: "\uB9C8\uCEE4 \uC0AD\uC81C \uD6C4 \uB3D9\uAE30\uD654 \uC2E4\uD328"
  }
};
function t(key, lang) {
  var _a, _b, _c, _d;
  return (_d = (_c = (_a = translations[key]) == null ? void 0 : _a[lang]) != null ? _c : (_b = translations[key]) == null ? void 0 : _b.en) != null ? _d : key;
}
function tReplace(key, lang, replacements) {
  let result = t(key, lang);
  for (const [k, v] of Object.entries(replacements)) {
    result = result.replace(`{${k}}`, String(v));
  }
  return result;
}
function detectLang() {
  var _a, _b, _c;
  const locale = (_c = (_b = (_a = moment == null ? void 0 : moment.locale) == null ? void 0 : _a.call(moment)) != null ? _b : navigator.language) != null ? _c : "en";
  const code = locale.split("-")[0].toLowerCase();
  if (["en", "ja", "zh", "ko"].includes(code)) return code;
  return "en";
}

// src/settings.ts
var import_obsidian3 = require("obsidian");

// src/folders.ts
var EXCLUDED_FOLDER_PREFIXES = [".obsidian", "node_modules"];
function isExcludedFolder(path) {
  const first = path.split("/")[0];
  return first.startsWith(".") || EXCLUDED_FOLDER_PREFIXES.includes(first);
}
function getVaultFolders(app, scanRoot) {
  const root = scanRoot ? app.vault.getFolderByPath(scanRoot) : app.vault.getRoot();
  if (!root) return [];
  const result = [];
  const collect = (folder) => {
    for (const child of folder.children) {
      if (!("children" in child)) continue;
      const f = child;
      if (!isExcludedFolder(f.path)) {
        result.push(f);
        collect(f);
      }
    }
  };
  collect(root);
  return result;
}
async function getExistingMarkerContent(app, folderPath, markerFilename) {
  const stem = markerFilename || "README";
  const ext = stem.includes(".") ? "" : ".md";
  const filePath = `${folderPath}/${stem}${ext}`;
  const file = app.vault.getFileByPath(filePath);
  if (!file) return null;
  return app.vault.read(file);
}
async function getFoldersWithMarker(app, scanRoot, markerFilename) {
  const marker = markerFilename || "README";
  const markerFiles = app.vault.getFiles().filter((f) => {
    if (f.basename !== marker) return false;
    if (scanRoot === "") return true;
    return f.path.startsWith(`${scanRoot}/`);
  });
  return markerFiles.filter((f) => f.parent).map((f) => ({ folderPath: f.parent.path, markerPath: f.path }));
}
var lastFoldersMtime = 0;
async function scanFolders(app, scanRoot, markerFilename) {
  var _a;
  const marker = markerFilename || "README";
  const markerFiles = app.vault.getFiles().filter((f) => {
    if (f.basename !== marker) return false;
    if (scanRoot === "") return true;
    return f.path.startsWith(`${scanRoot}/`);
  });
  const maxMtime = markerFiles.reduce((max, f) => Math.max(max, f.stat.mtime), 0);
  if (maxMtime > 0 && maxMtime === lastFoldersMtime) return null;
  const entries = [];
  for (const file of markerFiles) {
    const content = await app.vault.read(file);
    const dir = (_a = file.parent) == null ? void 0 : _a.path;
    if (!dir) continue;
    const relativePath = scanRoot === "" ? dir : dir.startsWith(`${scanRoot}/`) ? dir.slice(scanRoot.length + 1) : dir;
    if (relativePath) {
      entries.push({ path: relativePath, description: content.slice(0, 3e3) });
    }
  }
  lastFoldersMtime = maxMtime;
  return entries;
}
async function syncFoldersToApi(settings, folders) {
  const res = await apiPut(settings, "/api/folders", { folders });
  if (res.status !== 200) {
    throw new Error(`Failed to sync folders: ${res.status}`);
  }
}

// src/modal.ts
var import_obsidian2 = require("obsidian");
var FolderManagerModal = class extends import_obsidian2.Modal {
  constructor(app, settings, lang, onComplete) {
    super(app);
    this.mode = "create";
    this.folderStates = /* @__PURE__ */ new Map();
    this.deleteItems = [];
    this.descriptionLanguage = "auto";
    this.settings = settings;
    this.lang = lang;
    this.onComplete = onComplete;
  }
  async onOpen() {
    this.modalEl.addClass("aichatclip-folder-modal");
    await this.render();
  }
  onClose() {
    this.contentEl.empty();
  }
  async render() {
    const { contentEl } = this;
    const l = this.lang;
    contentEl.empty();
    contentEl.createEl("h2", { text: t("modal.title", l) });
    const tabBar = contentEl.createDiv({ cls: "aichatclip-modal-tabs" });
    const createTab = tabBar.createEl("button", {
      text: t("modal.tabCreate", l),
      cls: `aichatclip-modal-tab${this.mode === "create" ? " is-active" : ""}`
    });
    const deleteTab = tabBar.createEl("button", {
      text: t("modal.tabDelete", l),
      cls: `aichatclip-modal-tab${this.mode === "delete" ? " is-active" : ""}`
    });
    createTab.addEventListener("click", () => {
      this.mode = "create";
      this.render();
    });
    deleteTab.addEventListener("click", () => {
      this.mode = "delete";
      this.render();
    });
    if (this.mode === "create") {
      await this.renderCreateMode(contentEl);
    } else {
      await this.renderDeleteMode(contentEl);
    }
  }
  async renderCreateMode(container) {
    var _a;
    const l = this.lang;
    const { scanRoot, markerFilename } = this.settings;
    const marker = markerFilename || "README";
    const langRow = container.createDiv({ cls: "aichatclip-modal-actions" });
    const langLabel = langRow.createEl("label", { text: t("modal.descLanguage", l) });
    const langSelect = langLabel.createEl("select");
    for (const [val, label] of [
      ["auto", t("lang.auto", l)],
      ["en", "English"],
      ["ja", "\u65E5\u672C\u8A9E"],
      ["zh", "\u4E2D\u6587"],
      ["ko", "\uD55C\uAD6D\uC5B4"],
      ["es", "Espa\xF1ol"],
      ["fr", "Fran\xE7ais"],
      ["de", "Deutsch"]
    ]) {
      const opt = langSelect.createEl("option", { text: label, value: val });
      if (val === this.descriptionLanguage) opt.selected = true;
    }
    langSelect.addEventListener("change", () => {
      this.descriptionLanguage = langSelect.value;
    });
    const toolbar = container.createDiv({ cls: "aichatclip-modal-actions" });
    const selectAllBtn = toolbar.createEl("button", { text: t("modal.selectAll", l) });
    const deselectAllBtn = toolbar.createEl("button", { text: t("modal.deselectAll", l) });
    const folders = getVaultFolders(this.app, scanRoot);
    if (folders.length === 0) {
      container.createEl("p", {
        text: t("modal.noFolders", l),
        cls: "aichatclip-modal-empty"
      });
      return;
    }
    for (const folder of folders) {
      if (!this.folderStates.has(folder.path)) {
        const existing = await getExistingMarkerContent(this.app, folder.path, marker);
        const folderTitle = (_a = folder.path.split("/").pop()) != null ? _a : folder.path;
        const defaultDesc = `# ${folderTitle}

`;
        this.folderStates.set(folder.path, {
          selected: existing !== null,
          description: existing != null ? existing : defaultDesc,
          hasExisting: existing !== null
        });
      }
    }
    const listEl = container.createDiv({ cls: "aichatclip-folder-list" });
    for (const folder of folders) {
      const state = this.folderStates.get(folder.path);
      const item = listEl.createDiv({ cls: "aichatclip-folder-item" });
      const header = item.createDiv({ cls: "aichatclip-folder-item-header" });
      const checkbox = header.createEl("input", { type: "checkbox" });
      checkbox.checked = state.selected;
      checkbox.addEventListener("change", () => {
        state.selected = checkbox.checked;
      });
      const label = header.createEl("span", { text: folder.path, cls: "aichatclip-folder-name" });
      if (state.hasExisting) {
        label.createEl("span", {
          text: t("modal.existingMarker", l),
          cls: "aichatclip-existing-badge"
        });
      }
      const textarea = item.createEl("textarea", {
        cls: "aichatclip-folder-desc",
        placeholder: t("modal.descPlaceholder", l)
      });
      textarea.value = state.description;
      textarea.rows = 5;
      textarea.addEventListener("input", () => {
        state.description = textarea.value;
        updateRefineBtn();
      });
      const btnRow = item.createDiv({ cls: "aichatclip-folder-btn-row" });
      const genBtn = btnRow.createEl("button", {
        text: t("modal.generate", l),
        cls: "aichatclip-generate-btn"
      });
      const refineBtn = btnRow.createEl("button", {
        text: t("modal.refine", l),
        cls: "aichatclip-refine-btn"
      });
      const getDescriptionBody = () => {
        const text = textarea.value.trim();
        const match = text.match(/^#[^\n]+\n*([\s\S]*)$/);
        return match ? match[1].trim() : text;
      };
      const updateRefineBtn = () => {
        refineBtn.disabled = getDescriptionBody().length === 0;
      };
      updateRefineBtn();
      genBtn.addEventListener("click", async () => {
        var _a2;
        genBtn.disabled = true;
        genBtn.textContent = t("modal.generating", l);
        try {
          const excerpts = await this.getNoteExcerpts(folder.path, marker);
          const res = await apiPost(this.settings, "/api/folders/generate-description", {
            folderName: folder.path,
            noteExcerpts: excerpts.length > 0 ? excerpts : void 0,
            language: this.descriptionLanguage !== "auto" ? this.descriptionLanguage : void 0
          });
          if (res.status === 429) {
            new import_obsidian2.Notice(`AIChatClip: ${t("notice.quotaExceeded", l)}`);
          } else if (res.status === 200) {
            const data = res.json;
            const folderTitle = (_a2 = folder.path.split("/").pop()) != null ? _a2 : folder.path;
            const content = `# ${folderTitle}

${data.description}`;
            textarea.value = content;
            state.description = content;
            state.selected = true;
            checkbox.checked = true;
            updateRefineBtn();
          } else {
            new import_obsidian2.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
          }
        } catch (e) {
          new import_obsidian2.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
        } finally {
          genBtn.disabled = false;
          genBtn.textContent = t("modal.generate", l);
        }
      });
      refineBtn.addEventListener("click", async () => {
        var _a2;
        const body = getDescriptionBody();
        if (body.length === 0) return;
        refineBtn.disabled = true;
        refineBtn.textContent = t("modal.refining", l);
        try {
          const res = await apiPost(this.settings, "/api/folders/generate-description", {
            folderName: folder.path,
            draftText: body,
            language: this.descriptionLanguage !== "auto" ? this.descriptionLanguage : void 0
          });
          if (res.status === 429) {
            new import_obsidian2.Notice(`AIChatClip: ${t("notice.quotaExceeded", l)}`);
          } else if (res.status === 200) {
            const data = res.json;
            const folderTitle = (_a2 = folder.path.split("/").pop()) != null ? _a2 : folder.path;
            const content = `# ${folderTitle}

${data.description}`;
            textarea.value = content;
            state.description = content;
            state.selected = true;
            checkbox.checked = true;
            updateRefineBtn();
          } else {
            new import_obsidian2.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
          }
        } catch (e) {
          new import_obsidian2.Notice(`AIChatClip: ${t("notice.generateFailed", l)}`);
        } finally {
          refineBtn.disabled = false;
          refineBtn.textContent = t("modal.refine", l);
          updateRefineBtn();
        }
      });
    }
    selectAllBtn.addEventListener("click", () => {
      for (const state of this.folderStates.values()) state.selected = true;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = true;
      });
    });
    deselectAllBtn.addEventListener("click", () => {
      for (const state of this.folderStates.values()) state.selected = false;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = false;
      });
    });
    const footer = container.createDiv({ cls: "aichatclip-modal-footer" });
    const createBtn = footer.createEl("button", {
      text: t("modal.createAndSync", l),
      cls: "mod-cta"
    });
    createBtn.addEventListener("click", async () => {
      await this.handleCreate(marker);
    });
  }
  async handleCreate(marker) {
    const l = this.lang;
    const selected = [...this.folderStates.entries()].filter(
      ([, s]) => s.selected && s.description.trim() !== ""
    );
    if (selected.length === 0) return;
    const overwrites = selected.filter(([, s]) => s.hasExisting);
    if (overwrites.length > 0) {
      const confirmed = confirm(
        tReplace("modal.confirmOverwrite", l, { count: overwrites.length })
      );
      if (!confirmed) return;
    }
    const ext = marker.includes(".") ? "" : ".md";
    for (const [folderPath, state] of selected) {
      const filePath = `${folderPath}/${marker}${ext}`;
      const existing = this.app.vault.getFileByPath(filePath);
      if (existing) {
        await this.app.vault.modify(existing, state.description);
      } else {
        const folder = this.app.vault.getFolderByPath(folderPath);
        if (!folder) {
          await this.app.vault.createFolder(folderPath);
        }
        await this.app.vault.create(filePath, state.description);
      }
    }
    try {
      const folders = await scanFolders(
        this.app,
        this.settings.scanRoot,
        this.settings.markerFilename
      );
      if (folders) {
        await syncFoldersToApi(this.settings, folders);
      }
      new import_obsidian2.Notice(
        `AIChatClip: ${tReplace("notice.markersCreated", l, { count: selected.length })}`
      );
    } catch (e) {
      new import_obsidian2.Notice(`AIChatClip: ${t("notice.syncAfterCreateFailed", l)}`);
    }
    await this.onComplete();
    this.close();
  }
  async renderDeleteMode(container) {
    const l = this.lang;
    const { scanRoot, markerFilename } = this.settings;
    const markers = await getFoldersWithMarker(this.app, scanRoot, markerFilename);
    if (markers.length === 0) {
      container.createEl("p", {
        text: t("modal.noMarkers", l),
        cls: "aichatclip-modal-empty"
      });
      return;
    }
    const toolbar = container.createDiv({ cls: "aichatclip-modal-actions" });
    toolbar.createEl("p", { text: t("modal.markersFound", l) });
    const selectAllBtn = toolbar.createEl("button", { text: t("modal.selectAll", l) });
    const deselectAllBtn = toolbar.createEl("button", { text: t("modal.deselectAll", l) });
    this.deleteItems = markers.map((m) => ({ ...m, selected: true }));
    const listEl = container.createDiv({ cls: "aichatclip-folder-list" });
    for (const item of this.deleteItems) {
      const row = listEl.createDiv({ cls: "aichatclip-delete-item" });
      const checkbox = row.createEl("input", { type: "checkbox" });
      checkbox.checked = item.selected;
      checkbox.addEventListener("change", () => {
        item.selected = checkbox.checked;
      });
      row.createEl("span", { text: item.markerPath });
    }
    selectAllBtn.addEventListener("click", () => {
      for (const item of this.deleteItems) item.selected = true;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = true;
      });
    });
    deselectAllBtn.addEventListener("click", () => {
      for (const item of this.deleteItems) item.selected = false;
      listEl.querySelectorAll("input[type=checkbox]").forEach((cb) => {
        cb.checked = false;
      });
    });
    const footer = container.createDiv({ cls: "aichatclip-modal-footer" });
    const deleteBtn = footer.createEl("button", {
      text: t("modal.deleteAndSync", l),
      cls: "mod-warning"
    });
    deleteBtn.addEventListener("click", async () => {
      await this.handleDelete();
    });
  }
  async handleDelete() {
    const l = this.lang;
    const toDelete = this.deleteItems.filter((i) => i.selected);
    if (toDelete.length === 0) return;
    for (const item of toDelete) {
      const file = this.app.vault.getFileByPath(item.markerPath);
      if (file) {
        await this.app.vault.delete(file);
      }
    }
    try {
      const folders = await scanFolders(
        this.app,
        this.settings.scanRoot,
        this.settings.markerFilename
      );
      if (folders) {
        await syncFoldersToApi(this.settings, folders);
      }
      new import_obsidian2.Notice(
        `AIChatClip: ${tReplace("notice.markersDeleted", l, { count: toDelete.length })}`
      );
    } catch (e) {
      new import_obsidian2.Notice(`AIChatClip: ${t("notice.syncAfterDeleteFailed", l)}`);
    }
    await this.onComplete();
    this.close();
  }
  async getNoteExcerpts(folderPath, markerBasename) {
    const files = this.app.vault.getFiles().filter(
      (f) => {
        var _a;
        return ((_a = f.parent) == null ? void 0 : _a.path) === folderPath && f.extension === "md" && f.basename !== markerBasename;
      }
    ).slice(0, 5);
    const excerpts = [];
    for (const file of files) {
      const content = await this.app.vault.read(file);
      excerpts.push(content.slice(0, 500));
    }
    return excerpts;
  }
};

// src/types.ts
var API_BASE_URL = "https://api.aichatclip.com";
var WEB_URL = "https://aichatclip.com";
var SYNCED_CLIP_IDS_MAX = 1e3;
var DEFAULT_SETTINGS = {
  apiBaseUrl: API_BASE_URL,
  token: "",
  inboxFolder: "AIChatClip/Inbox",
  autoSyncOnLoad: true,
  syncOnForeground: true,
  scanRoot: "",
  markerFilename: "README",
  autoScanFolders: true,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  fileNameTemplate: "{yyyy}-{MM}-{dd}-{title}",
  tagRulePath: "TagRule",
  deviceId: "",
  syncedClipIds: [],
  pluginLanguage: "auto",
  cachedUserPlan: "free"
};

// src/settings.ts
var DEFAULT_TAG_RULE_TEMPLATE = `Tag Design and Naming Rules:

1. Consistent naming
- All lowercase: Tag names must be entirely lowercase. Example: #meeting, #project-alpha
- No spaces: Use hyphens (-) or underscores (_) to separate words. Example: #to-do, #research_notes

2. Content tags only
- ALLOWED: Content tags representing the subject or topic. Example: #python, #data-analysis
- FORBIDDEN: Status tags (#unorganized, #needs-review, #done), time tags (#2023, #Q1), location tags (#tokyo, #office)

3. Use singular form
- Always use singular. Example: #note (not #notes), #task (not #tasks)

4. Allowed characters
- Only hyphens (-), underscores (_), and slashes (/) are permitted. No spaces, special symbols, or emoji.

5. Be specific and concise
- Tag names should accurately and concisely represent the content.
- Example: #marketing-strategy (good), #strategy (too vague)
- Abbreviations: Only use widely recognized abbreviations. Example: ai, ui

6. Proper nouns
- Use the official/formal name for people, organizations, and places.

7. Maximum 5 tags per note

8. Forbidden tags
- Do not use tags related to: TODO, ROUTINE (e.g. daily-routine), JOURNAL, STUDY, EXERCISE
`;
var README_TEMPLATE = `# Folder Name

This folder contains notes about [topic].

## Purpose
Describe what kind of content belongs in this folder so AI can categorize clips automatically.

## Tags
- tag1
- tag2
`;
var AIChatClipSettingTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  get lang() {
    return this.plugin.lang;
  }
  display() {
    const { containerEl } = this;
    const l = this.lang;
    containerEl.empty();
    const linkEl = containerEl.createDiv({ cls: "aichatclip-header-link" });
    linkEl.createEl("a", { text: "aichatclip.com", href: WEB_URL });
    const tabHeader = containerEl.createDiv({ cls: "aichatclip-tab-header" });
    const basicBtn = tabHeader.createEl("button", {
      text: t("tab.basic", l),
      cls: "aichatclip-tab-button is-active"
    });
    const proBtn = tabHeader.createEl("button", {
      cls: "aichatclip-tab-button"
    });
    proBtn.appendText(`${t("tab.pro", l)} `);
    proBtn.createSpan({ text: "Pro", cls: "aichatclip-pro-badge" });
    const guideBtn = tabHeader.createEl("button", {
      text: t("tab.guide", l),
      cls: "aichatclip-tab-button"
    });
    const basicTab = containerEl.createDiv({ cls: "aichatclip-tab-content is-active" });
    const proTab = containerEl.createDiv({ cls: "aichatclip-tab-content" });
    const guideTab = containerEl.createDiv({ cls: "aichatclip-tab-content" });
    const tabs = {
      basic: { btn: basicBtn, content: basicTab },
      pro: { btn: proBtn, content: proTab },
      guide: { btn: guideBtn, content: guideTab }
    };
    const switchTab = (active) => {
      for (const [name, { btn, content }] of Object.entries(tabs)) {
        const isActive = name === active;
        btn.toggleClass("is-active", isActive);
        content.toggleClass("is-active", isActive);
      }
    };
    basicBtn.addEventListener("click", () => switchTab("basic"));
    proBtn.addEventListener("click", () => switchTab("pro"));
    guideBtn.addEventListener("click", () => switchTab("guide"));
    this.renderBasicTab(basicTab);
    this.renderProTab(proTab);
    this.renderGuideTab(guideTab);
    const footer = containerEl.createDiv({ cls: "aichatclip-footer" });
    footer.createEl("a", { text: "aichatclip.com", href: WEB_URL });
  }
  renderBasicTab(el) {
    const l = this.lang;
    new import_obsidian3.Setting(el).setName(t("lang.name", l)).setDesc(t("lang.desc", l)).addDropdown((dropdown) => {
      dropdown.addOptions({
        auto: `${t("lang.auto", l)} (${detectLang()})`,
        en: "English",
        ja: "\u65E5\u672C\u8A9E",
        zh: "\u4E2D\u6587",
        ko: "\uD55C\uAD6D\uC5B4"
      });
      dropdown.setValue(this.plugin.settings.pluginLanguage);
      dropdown.onChange(async (value) => {
        this.plugin.settings.pluginLanguage = value;
        await this.plugin.saveSettings();
        this.display();
      });
    });
    const authSetting = new import_obsidian3.Setting(el).setName(t("auth.name", l));
    if (this.plugin.settings.token) {
      authSetting.setDesc(t("auth.connected", l));
      authSetting.addButton(
        (button) => button.setButtonText(t("auth.signOut", l)).onClick(async () => {
          var _a;
          (_a = this.plugin.syncWs) == null ? void 0 : _a.disconnect();
          this.plugin.settings.token = "";
          await this.plugin.saveSettings();
          this.display();
        })
      );
    } else {
      authSetting.setDesc(t("auth.notConnected", l));
      authSetting.addButton(
        (button) => button.setButtonText(t("auth.signIn", l)).setCta().onClick(() => {
          window.open(`${WEB_URL}/auth/obsidian`);
        })
      );
    }
    if (this.plugin.settings.token && import_obsidian3.Platform.isDesktop) {
      const wsKey = this.plugin.wsConnected ? "ws.connected" : "ws.disconnected";
      new import_obsidian3.Setting(el).setName(t("ws.name", l)).setDesc(t(wsKey, l));
    }
    if (this.plugin.settings.token) {
      new import_obsidian3.Setting(el).setName(t("device.name", l)).setDesc(t("device.desc", l)).addButton(
        (button) => button.setButtonText(t("device.makePrimary", l)).onClick(async () => {
          try {
            await apiPatch(this.plugin.settings, `/api/devices/${this.plugin.settings.deviceId}/primary`);
            new import_obsidian3.Notice(`AIChatClip: ${t("notice.primarySet", l)}`);
            if (import_obsidian3.Platform.isDesktop) {
              this.plugin.connectWebSocket();
            }
          } catch (e) {
            new import_obsidian3.Notice(`AIChatClip: ${t("notice.primaryFailed", l)}`);
          }
        })
      );
    }
    new import_obsidian3.Setting(el).setName(t("autoSync.name", l)).setDesc(t("autoSync.desc", l)).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoSyncOnLoad).onChange(async (value) => {
        this.plugin.settings.autoSyncOnLoad = value;
        await this.plugin.saveSettings();
      })
    );
    if (import_obsidian3.Platform.isMobile) {
      new import_obsidian3.Setting(el).setName(t("syncOnForeground.name", l)).setDesc(t("syncOnForeground.desc", l)).addToggle(
        (toggle) => toggle.setValue(this.plugin.settings.syncOnForeground).onChange(async (value) => {
          this.plugin.settings.syncOnForeground = value;
          await this.plugin.saveSettings();
          this.plugin.setupForegroundSync();
        })
      );
    }
    new import_obsidian3.Setting(el).setName(t("inbox.name", l)).setDesc(t("inbox.desc", l)).addText(
      (text) => text.setPlaceholder("AIChatClip/inbox").setValue(this.plugin.settings.inboxFolder).onChange(async (value) => {
        this.plugin.settings.inboxFolder = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian3.Setting(el).setName(t("fileName.name", l)).setDesc(t("fileName.desc", l)).addText(
      (text) => text.setPlaceholder("{yyyy}-{MM}-{dd}-{title}").setValue(this.plugin.settings.fileNameTemplate).onChange(async (value) => {
        this.plugin.settings.fileNameTemplate = value || "{yyyy}-{MM}-{dd}-{title}";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian3.Setting(el).setName(t("timezone.name", l)).setDesc(t("timezone.desc", l)).addText(
      (text) => text.setPlaceholder(Intl.DateTimeFormat().resolvedOptions().timeZone).setValue(this.plugin.settings.timezone).onChange(async (value) => {
        this.plugin.settings.timezone = value || Intl.DateTimeFormat().resolvedOptions().timeZone;
        await this.plugin.saveSettings();
      })
    );
  }
  renderProTab(el) {
    const l = this.lang;
    const isPro = this.plugin.settings.cachedUserPlan === "pro";
    if (!isPro) {
      const planBox = el.createDiv({ cls: "aichatclip-plan-box" });
      const table = planBox.createEl("table", { cls: "aichatclip-plan-table" });
      const thead = table.createEl("thead");
      const headRow = thead.createEl("tr");
      headRow.createEl("th", { text: "" });
      headRow.createEl("th", { text: "Free" });
      headRow.createEl("th", { text: "Pro" });
      const tbody = table.createEl("tbody");
      const features = [
        [t("pro.feature.clipToObsidian", l), true, true],
        [t("pro.feature.unlimitedClips", l), true, true],
        [t("pro.feature.autoTags", l), false, true],
        [t("pro.feature.summary", l), false, true],
        [t("pro.feature.smartFolder", l), false, true],
        [t("pro.feature.weeklyDigest", l), false, true]
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
        cls: "aichatclip-plan-link"
      });
      el.createEl("hr", { cls: "aichatclip-separator" });
    }
    if (!isPro) return;
    el.createEl("p", {
      text: t("pro.folderDesc", l),
      cls: "setting-item-description"
    });
    const docsLinkEl = el.createEl("p", { cls: "setting-item-description" });
    docsLinkEl.createEl("a", {
      text: t("pro.folderDocsLink", l),
      href: `${WEB_URL}/docs/marker-files`
    });
    new import_obsidian3.Setting(el).setName(t("pro.autoScan.name", l)).setDesc(t("pro.autoScan.desc", l)).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoScanFolders).onChange(async (value) => {
        this.plugin.settings.autoScanFolders = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian3.Setting(el).setName(t("pro.scanRoot.name", l)).setDesc(t("pro.scanRoot.desc", l)).addText(
      (text) => text.setPlaceholder(t("pro.scanRoot.placeholder", l)).setValue(this.plugin.settings.scanRoot).onChange(async (value) => {
        this.plugin.settings.scanRoot = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian3.Setting(el).setName(t("pro.marker.name", l)).setDesc(t("pro.marker.desc", l)).addText(
      (text) => text.setPlaceholder("README").setValue(this.plugin.settings.markerFilename).onChange(async (value) => {
        this.plugin.settings.markerFilename = value || "README";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian3.Setting(el).setName(t("pro.scanNow.name", l)).setDesc(t("pro.scanNow.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.scanNow.button", l)).setCta().onClick(async () => {
        if (!this.plugin.settings.token) {
          new import_obsidian3.Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
          return;
        }
        try {
          const folders = await scanFolders(
            this.app,
            this.plugin.settings.scanRoot,
            this.plugin.settings.markerFilename
          );
          if (folders) {
            await syncFoldersToApi(this.plugin.settings, folders);
            new import_obsidian3.Notice(`AIChatClip: ${tReplace("notice.foldersSynced", l, { count: folders.length })}`);
          } else {
            new import_obsidian3.Notice(`AIChatClip: ${t("notice.foldersSynced", l)}`);
          }
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          new import_obsidian3.Notice(`AIChatClip: ${tReplace("notice.folderScanFailed", l, { msg })}`);
        }
      })
    );
    new import_obsidian3.Setting(el).setName(t("pro.readme.name", l)).setDesc(t("pro.readme.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.readme.button", l)).onClick(async () => {
        await navigator.clipboard.writeText(README_TEMPLATE);
        new import_obsidian3.Notice(`AIChatClip: ${t("notice.readmeCopied", l)}`);
      })
    );
    new import_obsidian3.Setting(el).setName(t("pro.folderManager.name", l)).setDesc(t("pro.folderManager.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.folderManager.button", l)).setCta().onClick(() => {
        new FolderManagerModal(this.app, this.plugin.settings, l, async () => {
        }).open();
      })
    );
    el.createEl("hr", { cls: "aichatclip-separator" });
    new import_obsidian3.Setting(el).setName(t("pro.aiCustomization", l)).setHeading();
    new import_obsidian3.Setting(el).setName(t("pro.titleLang.name", l)).setDesc(t("pro.titleLang.desc", l)).addDropdown((dropdown) => {
      dropdown.addOptions({
        auto: t("titleLang.auto", l),
        en: "English",
        ja: "\u65E5\u672C\u8A9E",
        zh: "\u4E2D\u6587",
        ko: "\uD55C\uAD6D\uC5B4",
        es: "Espa\xF1ol",
        fr: "Fran\xE7ais",
        de: "Deutsch"
      });
      void this.loadLanguageSetting(dropdown);
      dropdown.onChange(async (value) => {
        await this.savePreference({ fileNameLanguage: value });
      });
    });
    let updateCreateBtn;
    new import_obsidian3.Setting(el).setName(t("pro.tagRule.name", l)).setDesc(t("pro.tagRule.desc", l)).addText(
      (text) => text.setPlaceholder("Tag rule").setValue(this.plugin.settings.tagRulePath).onChange(async (value) => {
        this.plugin.settings.tagRulePath = value || "TagRule";
        await this.plugin.saveSettings();
        updateCreateBtn();
      })
    ).addButton((btn) => {
      updateCreateBtn = async () => {
        const path = `${this.plugin.settings.tagRulePath}.md`;
        const exists = !!this.app.vault.getFileByPath(path);
        btn.setDisabled(exists);
      };
      btn.setButtonText(t("pro.tagRule.create", l)).onClick(async () => {
        const path = `${this.plugin.settings.tagRulePath}.md`;
        if (this.app.vault.getFileByPath(path)) return;
        await this.app.vault.create(path, DEFAULT_TAG_RULE_TEMPLATE);
        new import_obsidian3.Notice(t("pro.tagRule.created", l));
        btn.setDisabled(true);
      });
      updateCreateBtn();
    });
  }
  renderGuideTab(el) {
    const l = this.lang;
    new import_obsidian3.Setting(el).setName(t("guide.title", l)).setHeading();
    const steps = el.createDiv({ cls: "aichatclip-guide-steps" });
    for (const i of [1, 2, 3]) {
      const step = steps.createDiv({ cls: "aichatclip-guide-step" });
      const num = step.createDiv({ cls: "aichatclip-guide-step-num" });
      num.setText(String(i));
      const content = step.createDiv({ cls: "aichatclip-guide-step-content" });
      new import_obsidian3.Setting(content).setName(t(`guide.step${i}.title`, l)).setHeading();
      content.createEl("p", { text: t(`guide.step${i}.desc`, l) });
    }
    const docsLink = el.createDiv({ cls: "aichatclip-guide-docs" });
    docsLink.createEl("a", {
      text: t("guide.docsLink", l),
      href: `${WEB_URL}/docs`,
      cls: "aichatclip-guide-docs-link"
    });
  }
  async loadLanguageSetting(dropdown) {
    if (!this.plugin.settings.token) return;
    try {
      const res = await apiGet(this.plugin.settings, "/api/preferences");
      if (res.status === 200) {
        const data = res.json;
        if (data.fileNameLanguage) {
          dropdown.setValue(data.fileNameLanguage);
        }
      }
    } catch (e) {
    }
  }
  async savePreference(body) {
    const l = this.lang;
    if (!this.plugin.settings.token) {
      new import_obsidian3.Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
      return;
    }
    try {
      await apiPut(this.plugin.settings, "/api/preferences", body);
    } catch (e) {
      new import_obsidian3.Notice(`AIChatClip: ${t("notice.prefFailed", l)}`);
    }
  }
};

// src/formatter.ts
function escapeYaml(value) {
  if (/[:#[{}&*!|>'"%@`,?\]]/.test(value) || value.trim() !== value) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}
function formatLocalDate(isoString, timezone) {
  const d = new Date(isoString);
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(d).map((p) => [p.type, p.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
}
function formatClipToMarkdown(clip, settings) {
  const lines = ["---"];
  lines.push(`source: ${clip.source}`);
  if (clip.url) {
    lines.push(`url: ${escapeYaml(clip.url)}`);
  }
  if (clip.chatTitle) {
    lines.push(`chat_title: ${escapeYaml(clip.chatTitle)}`);
  }
  lines.push(`clipped_at: ${formatLocalDate(clip.createdAt, settings.timezone)}`);
  if (clip.summary) {
    lines.push(`summary: ${escapeYaml(clip.summary)}`);
  }
  if (clip.tags) {
    const tagList = clip.tags.split(",").map((t2) => t2.trim().replace(/^#/, "")).filter(Boolean);
    if (tagList.length > 0) {
      lines.push(`tags: [${tagList.map((t2) => escapeYaml(t2)).join(", ")}]`);
    }
  }
  lines.push("---");
  lines.push("");
  if (clip.prompt) {
    lines.push("## Prompt");
    lines.push("");
    lines.push(clip.prompt);
    lines.push("");
  }
  lines.push("## Response");
  lines.push("");
  lines.push(clip.content);
  lines.push("");
  return lines.join("\n");
}

// src/sync.ts
async function fetchPendingClips(settings) {
  const res = await apiGet(settings, "/api/clips/pending");
  if (res.status !== 200) {
    throw new Error(`Failed to fetch pending clips: ${res.status}`);
  }
  return res.json;
}
async function fetchUserPlan(settings) {
  var _a;
  try {
    const res = await apiGet(settings, "/api/me");
    if (res.status === 200) {
      const data = res.json;
      return ((_a = data.user) == null ? void 0 : _a.plan) === "pro" ? "pro" : "free";
    }
  } catch (e) {
  }
  return "free";
}
async function markClipSynced(settings, clipId) {
  const res = await apiPatch(settings, `/api/clips/${clipId}/sync`, {
    syncedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  if (res.status !== 200) {
    throw new Error(`Failed to mark clip ${clipId} as synced: ${res.status}`);
  }
}
async function ensureFolder(app, folderPath) {
  const parts = folderPath.split("/");
  let current = "";
  for (const part of parts) {
    current = current ? `${current}/${part}` : part;
    if (!app.vault.getAbstractFileByPath(current)) {
      await app.vault.createFolder(current);
    }
  }
}
function getExistingSyncedClipIds(app, folderPath) {
  var _a;
  const ids = /* @__PURE__ */ new Set();
  const folder = app.vault.getAbstractFileByPath(folderPath);
  if (!folder) return ids;
  const files = app.vault.getMarkdownFiles().filter((f) => f.path.startsWith(`${folderPath}/`));
  for (const file of files) {
    const cache = app.metadataCache.getFileCache(file);
    const clipId = (_a = cache == null ? void 0 : cache.frontmatter) == null ? void 0 : _a.clip_id;
    if (typeof clipId === "string") {
      ids.add(clipId);
    }
  }
  return ids;
}
function sanitizeFileName(name) {
  return name.replace(/[/\\:*?"<>|]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").trim();
}
function applyFileNameTemplate(template, clip, timezone, userPlan) {
  const localDate = formatLocalDate(clip.createdAt, timezone);
  const [datePart, timePart] = localDate.split("T");
  const [yyyy, MM, dd] = datePart.split("-");
  const [hh, mm, ss] = timePart.split(":");
  let result = template.replace(/\{yyyy\}/g, yyyy).replace(/\{MM\}/g, MM).replace(/\{dd\}/g, dd).replace(/\{hh\}/g, hh).replace(/\{mm\}/g, mm).replace(/\{ss\}/g, ss).replace(/\{source\}/g, clip.source).replace(/\{chat_title\}/g, sanitizeFileName(clip.chatTitle || "Untitled"));
  if (userPlan === "pro") {
    result = result.replace(/\{title\}/g, sanitizeFileName(clip.title || "Untitled"));
  } else {
    result = result.replace(/\{title\}/g, "title-only-pro-plan");
  }
  return result;
}
function resolveFilePath(app, targetFolder, baseName) {
  let candidate = `${targetFolder}/${baseName}.md`;
  let counter = 2;
  while (app.vault.getAbstractFileByPath(candidate)) {
    candidate = `${targetFolder}/${baseName}-${counter}.md`;
    counter++;
  }
  return candidate;
}
async function writeClipToVault(app, settings, clip, userPlan) {
  const targetFolder = userPlan === "pro" && clip.folderPath ? clip.folderPath : settings.inboxFolder;
  await ensureFolder(app, targetFolder);
  const markdown = formatClipToMarkdown(clip, settings);
  const baseName = applyFileNameTemplate(settings.fileNameTemplate, clip, settings.timezone, userPlan);
  const filePath = resolveFilePath(app, targetFolder, baseName);
  await app.vault.create(filePath, markdown);
}
var lastTagRuleMtime = 0;
async function syncTagRule(app, settings) {
  if (!settings.tagRulePath || !settings.token) return;
  try {
    const filePath = `${settings.tagRulePath}.md`;
    const mdFile = app.vault.getMarkdownFiles().find((f) => f.path === filePath);
    if (!mdFile) return;
    const mtime = mdFile.stat.mtime;
    if (mtime === lastTagRuleMtime) return;
    const content = await app.vault.read(mdFile);
    await apiPut(settings, "/api/preferences", { tagRule: content });
    lastTagRuleMtime = mtime;
  } catch (e) {
    console.warn("AIChatClip: TagRule sync failed");
  }
}
async function syncClips(app, settings) {
  const result = { synced: 0, failed: 0, errors: [], userPlan: "free" };
  const [clips, userPlan] = await Promise.all([
    fetchPendingClips(settings),
    fetchUserPlan(settings)
  ]);
  result.userPlan = userPlan;
  if (userPlan === "pro") {
    if (settings.autoScanFolders) {
      try {
        const folders = await scanFolders(app, settings.scanRoot, settings.markerFilename);
        if (folders) {
          await syncFoldersToApi(settings, folders);
        }
      } catch (e) {
        console.warn("AIChatClip: folder sync failed, continuing with clip sync", e);
      }
    }
    await syncTagRule(app, settings);
  }
  if (clips.length === 0) return result;
  await ensureFolder(app, settings.inboxFolder);
  const existingIds = getExistingSyncedClipIds(app, settings.inboxFolder);
  const syncedSet = new Set(settings.syncedClipIds);
  for (const clip of clips) {
    try {
      if (existingIds.has(clip.id) || syncedSet.has(clip.id)) {
        await markClipSynced(settings, clip.id);
        result.synced++;
        continue;
      }
      await writeClipToVault(app, settings, clip, userPlan);
      await markClipSynced(settings, clip.id);
      result.synced++;
    } catch (e) {
      result.failed++;
      result.errors.push(`Clip ${clip.id}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  return result;
}
async function fetchClipById(settings, clipId) {
  const res = await apiGet(settings, `/api/clips/${clipId}`);
  if (res.status !== 200) {
    throw new Error(`Failed to fetch clip ${clipId}: ${res.status}`);
  }
  return res.json;
}
function addSyncedClipId(settings, clipId) {
  if (settings.syncedClipIds.includes(clipId)) return;
  settings.syncedClipIds.push(clipId);
  if (settings.syncedClipIds.length > SYNCED_CLIP_IDS_MAX) {
    settings.syncedClipIds = settings.syncedClipIds.slice(-SYNCED_CLIP_IDS_MAX);
  }
}
async function syncSingleClip(app, settings, clipId, saveSettings) {
  if (settings.syncedClipIds.includes(clipId)) return false;
  const existingIds = getExistingSyncedClipIds(app, settings.inboxFolder);
  if (existingIds.has(clipId)) {
    addSyncedClipId(settings, clipId);
    await saveSettings();
    return false;
  }
  const clip = await fetchClipById(settings, clipId);
  const userPlan = await fetchUserPlan(settings);
  settings.cachedUserPlan = userPlan;
  await ensureFolder(app, settings.inboxFolder);
  await writeClipToVault(app, settings, clip, userPlan);
  await markClipSynced(settings, clip.id);
  addSyncedClipId(settings, clipId);
  await saveSettings();
  return true;
}

// src/websocket.ts
var SyncWebSocket = class {
  constructor(opts) {
    this.ws = null;
    this.reconnectAttempt = 0;
    this.reconnectTimer = null;
    this.pingTimer = null;
    this.shouldReconnect = true;
    this.opts = opts;
  }
  connect() {
    this.shouldReconnect = true;
    this.doConnect();
  }
  doConnect() {
    try {
      const wsUrl = this.opts.apiBaseUrl.replace(/^https:\/\//, "wss://").replace(/^http:\/\//, "ws://");
      const url = `${wsUrl}/api/ws?token=${encodeURIComponent(this.opts.token)}&deviceId=${encodeURIComponent(this.opts.deviceId)}`;
      this.ws = new WebSocket(url);
      this.ws.onopen = () => {
        var _a, _b;
        this.reconnectAttempt = 0;
        this.startPing();
        (_b = (_a = this.opts).onStatusChange) == null ? void 0 : _b.call(_a, true);
      };
      this.ws.onmessage = (event) => {
        if (event.data === "pong") return;
        try {
          const msg = JSON.parse(event.data);
          if (msg.type === "new_clip" && msg.clipId) {
            this.opts.onNewClip(msg.clipId);
          }
        } catch (e) {
        }
      };
      this.ws.onclose = () => {
        var _a, _b;
        this.stopPing();
        (_b = (_a = this.opts).onStatusChange) == null ? void 0 : _b.call(_a, false);
        this.scheduleReconnect();
      };
      this.ws.onerror = () => {
        var _a;
        (_a = this.ws) == null ? void 0 : _a.close();
      };
    } catch (e) {
      this.scheduleReconnect();
    }
  }
  scheduleReconnect() {
    if (!this.shouldReconnect) return;
    const delay = Math.min(1e3 * 2 ** this.reconnectAttempt, 6e4);
    this.reconnectAttempt++;
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.doConnect();
    }, delay);
  }
  startPing() {
    this.stopPing();
    this.pingTimer = setInterval(() => {
      var _a;
      if (((_a = this.ws) == null ? void 0 : _a.readyState) === WebSocket.OPEN) {
        this.ws.send("ping");
      }
    }, 3e4);
  }
  stopPing() {
    if (this.pingTimer !== null) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }
  disconnect() {
    var _a, _b;
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
    (_b = (_a = this.opts).onStatusChange) == null ? void 0 : _b.call(_a, false);
  }
  get isConnected() {
    var _a;
    return ((_a = this.ws) == null ? void 0 : _a.readyState) === WebSocket.OPEN;
  }
  updateOpts(opts) {
    Object.assign(this.opts, opts);
  }
};

// src/main.ts
var LOGO_ICON = `<g transform="scale(4.1667)" fill="currentColor">
  <circle cx="13" cy="10.27" r="2"/>
  <path d="M20.2,9.8l-3.5,6.06c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l3.5-6.06c1.11-1.91.45-4.36-1.46-5.46s-4.36-.45-5.46,1.46l-.5.87c-.27.48-.89.64-1.37.37s-.64-.89-.37-1.37l.5-.87C11.46.94,15.13-.05,18,1.61s3.85,5.33,2.2,8.2Z"/>
  <path d="M14.7,19.33l-.5.87c-1.66,2.87-5.33,3.85-8.2,2.2s-3.85-5.33-2.2-8.2l3.5-6.06c.27-.48.89-.64,1.37-.37s.64.89.37,1.37l-3.5,6.06c-1.1,1.91-.45,4.36,1.46,5.46s4.36.45,5.46-1.46l.5-.87c.27-.48.89-.64,1.37-.37s.64.89.37,1.37Z"/>
</g>`;
var AIChatClipPlugin = class extends import_obsidian4.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.isSyncing = false;
    this.settingTab = null;
    this.syncWs = null;
    this.wsConnected = false;
    this.onVisibilityChange = () => {
      if (document.visibilityState === "visible" && this.settings.syncOnForeground) {
        void this.performSync();
      }
    };
  }
  get lang() {
    return this.settings.pluginLanguage === "auto" ? detectLang() : this.settings.pluginLanguage;
  }
  async onload() {
    await this.loadSettings();
    if (!this.settings.deviceId) {
      this.settings.deviceId = crypto.randomUUID();
      await this.saveSettings();
    }
    (0, import_obsidian4.addIcon)("aichatclip-logo", LOGO_ICON);
    this.addRibbonIcon("aichatclip-logo", "Sync aichatclip", () => {
      void this.performSync();
    });
    this.addCommand({
      id: "sync",
      name: "Sync clips",
      callback: () => {
        void this.performSync();
      }
    });
    this.settingTab = new AIChatClipSettingTab(this.app, this);
    this.addSettingTab(this.settingTab);
    this.registerObsidianProtocolHandler("aichatclip", (params) => {
      if (params.token) {
        void this.handleAuthCallback(params.token);
      }
    });
    this.app.workspace.onLayoutReady(async () => {
      if (this.settings.token) {
        await registerDevice(this.settings);
        if (this.settings.autoSyncOnLoad) {
          void this.performSync();
        }
        if (import_obsidian4.Platform.isDesktop) {
          this.connectWebSocket();
        }
      }
      this.setupForegroundSync();
    });
  }
  onunload() {
    var _a;
    (_a = this.syncWs) == null ? void 0 : _a.disconnect();
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async performSync() {
    const l = this.lang;
    if (this.isSyncing) {
      new import_obsidian4.Notice(`AIChatClip: ${t("notice.syncInProgress", l)}`);
      return;
    }
    if (!this.settings.token) {
      new import_obsidian4.Notice(`AIChatClip: ${t("notice.noToken", l)}`);
      return;
    }
    this.isSyncing = true;
    try {
      const result = await syncClips(this.app, this.settings);
      this.settings.cachedUserPlan = result.userPlan;
      await this.saveSettings();
      if (result.synced === 0 && result.failed === 0) {
        new import_obsidian4.Notice(`AIChatClip: ${t("notice.noNewClips", l)}`);
      } else if (result.failed === 0) {
        new import_obsidian4.Notice(`AIChatClip: ${tReplace("notice.synced", l, { count: result.synced })}`);
      } else {
        new import_obsidian4.Notice(
          `AIChatClip: ${tReplace("notice.syncPartial", l, { synced: result.synced, failed: result.failed })}`
        );
        for (const err of result.errors) {
          console.error("AIChatClip sync error:", err);
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      new import_obsidian4.Notice(`AIChatClip: ${tReplace("notice.syncFailed", l, { msg })}`);
      console.error("AIChatClip sync error:", e);
    } finally {
      this.isSyncing = false;
    }
  }
  async handleAuthCallback(token) {
    this.settings.token = token;
    await this.saveSettings();
    setTimeout(() => {
      void (async () => {
        var _a;
        await registerDevice(this.settings);
        (_a = this.settingTab) == null ? void 0 : _a.display();
        new import_obsidian4.Notice(`AIChatClip: ${t("notice.connected", this.lang)}`);
        void this.performSync();
        if (import_obsidian4.Platform.isDesktop) {
          this.connectWebSocket();
        }
      })();
    }, 500);
  }
  connectWebSocket() {
    var _a;
    (_a = this.syncWs) == null ? void 0 : _a.disconnect();
    if (!this.settings.token || !this.settings.deviceId) return;
    this.syncWs = new SyncWebSocket({
      apiBaseUrl: this.settings.apiBaseUrl,
      token: this.settings.token,
      deviceId: this.settings.deviceId,
      onNewClip: (clipId) => {
        void this.handlePushNotification(clipId);
      },
      onStatusChange: (connected) => {
        var _a2;
        this.wsConnected = connected;
        (_a2 = this.settingTab) == null ? void 0 : _a2.display();
      }
    });
    this.syncWs.connect();
  }
  async handlePushNotification(clipId) {
    if (this.settings.syncedClipIds.includes(clipId)) return;
    try {
      const synced = await syncSingleClip(
        this.app,
        this.settings,
        clipId,
        () => this.saveSettings()
      );
      if (synced) {
        new import_obsidian4.Notice(`AIChatClip: ${t("notice.newClipSynced", this.lang)}`);
      }
    } catch (e) {
      console.error("AIChatClip: push sync failed", e);
    }
  }
  setupForegroundSync() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    if (!import_obsidian4.Platform.isMobile || !this.settings.syncOnForeground) return;
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.register(
      () => document.removeEventListener("visibilitychange", this.onVisibilityChange)
    );
  }
};
