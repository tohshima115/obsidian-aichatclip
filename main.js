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
var import_obsidian3 = require("obsidian");

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
  "inbox.name": { en: "Inbox Folder", ja: "\u53D7\u4FE1\u30D5\u30A9\u30EB\u30C0", zh: "\u6536\u4EF6\u7BB1\u6587\u4EF6\u5939", ko: "\uBC1B\uC740 \uD3B8\uC9C0\uD568 \uD3F4\uB354" },
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
  "pro.feature.weeklyDigest": { en: "Weekly Digest", ja: "\u9031\u9593\u30C0\u30A4\u30B8\u30A7\u30B9\u30C8", zh: "\u6BCF\u5468\u6458\u8981", ko: "\uC8FC\uAC04 \uB2E4\uC774\uC81C\uC2A4\uD2B8" },
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
  "pro.scanNow.button": { en: "Scan & Upload", ja: "\u30B9\u30AD\u30E3\u30F3\uFF06\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9", zh: "\u626B\u63CF\u5E76\u4E0A\u4F20", ko: "\uC2A4\uCE94 \uBC0F \uC5C5\uB85C\uB4DC" },
  "pro.readme.name": { en: "Marker file template", ja: "\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", zh: "\u6807\u8BB0\u6587\u4EF6\u6A21\u677F", ko: "\uB9C8\uCEE4 \uD30C\uC77C \uD15C\uD50C\uB9BF" },
  "pro.readme.desc": {
    en: "Copy a starter template for folder marker files",
    ja: "\u30D5\u30A9\u30EB\u30C0\u30DE\u30FC\u30AB\u30FC\u30D5\u30A1\u30A4\u30EB\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3092\u30B3\u30D4\u30FC",
    zh: "\u590D\u5236\u6587\u4EF6\u5939\u6807\u8BB0\u6587\u4EF6\u7684\u6A21\u677F",
    ko: "\uD3F4\uB354 \uB9C8\uCEE4 \uD30C\uC77C\uC6A9 \uD15C\uD50C\uB9BF \uBCF5\uC0AC"
  },
  "pro.readme.button": { en: "Copy to clipboard", ja: "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30B3\u30D4\u30FC", zh: "\u590D\u5236\u5230\u526A\u8D34\u677F", ko: "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uBCF5\uC0AC" },
  // AI Customization
  "pro.aiCustomization": { en: "AI Customization", ja: "AI\u30AB\u30B9\u30BF\u30DE\u30A4\u30BA", zh: "AI\u81EA\u5B9A\u4E49", ko: "AI \uCEE4\uC2A4\uD130\uB9C8\uC774\uC9D5" },
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
  "guide.title": { en: "Getting Started", ja: "\u306F\u3058\u3081\u306B", zh: "\u5165\u95E8\u6307\u5357", ko: "\uC2DC\uC791\uD558\uAE30" },
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
  "titleLang.auto": { en: "Auto (same as content)", ja: "\u81EA\u52D5\uFF08\u30B3\u30F3\u30C6\u30F3\u30C4\u3068\u540C\u3058\uFF09", zh: "\u81EA\u52A8\uFF08\u4E0E\u5185\u5BB9\u76F8\u540C\uFF09", ko: "\uC790\uB3D9 (\uCF58\uD150\uCE20\uC640 \uB3D9\uC77C)" }
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
  var _a, _b, _c, _d, _e;
  const locale = (_e = (_d = (_c = localStorage.getItem("language")) != null ? _c : (_b = (_a = window.moment) == null ? void 0 : _a.locale) == null ? void 0 : _b.call(_a)) != null ? _d : navigator.language) != null ? _e : "en";
  const code = locale.split("-")[0].toLowerCase();
  if (["en", "ja", "zh", "ko"].includes(code)) return code;
  return "en";
}

// src/settings.ts
var import_obsidian2 = require("obsidian");

// src/folders.ts
async function scanFolders(app, scanRoot, markerFilename) {
  var _a;
  const entries = [];
  const marker = markerFilename || "README";
  const markerFiles = app.vault.getFiles().filter((f) => {
    if (f.basename !== marker) return false;
    if (scanRoot === "") return true;
    return f.path.startsWith(`${scanRoot}/`);
  });
  for (const file of markerFiles) {
    const content = await app.vault.read(file);
    const dir = (_a = file.parent) == null ? void 0 : _a.path;
    if (!dir) continue;
    const relativePath = scanRoot === "" ? dir : dir.startsWith(`${scanRoot}/`) ? dir.slice(scanRoot.length + 1) : dir;
    if (relativePath) {
      entries.push({ path: relativePath, description: content.slice(0, 3e3) });
    }
  }
  return entries;
}
async function syncFoldersToApi(settings, folders) {
  const res = await apiPut(settings, "/api/folders", { folders });
  if (res.status !== 200) {
    throw new Error(`Failed to sync folders: ${res.status}`);
  }
}

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
var README_TEMPLATE = `# Folder Name

This folder contains notes about [topic].

## Purpose
Describe what kind of content belongs in this folder so AI can categorize clips automatically.

## Tags
- tag1
- tag2
`;
var AIChatClipSettingTab = class extends import_obsidian2.PluginSettingTab {
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
    new import_obsidian2.Setting(el).setName(t("lang.name", l)).setDesc(t("lang.desc", l)).addDropdown((dropdown) => {
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
    const authSetting = new import_obsidian2.Setting(el).setName(t("auth.name", l));
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
    if (this.plugin.settings.token && import_obsidian2.Platform.isDesktop) {
      const wsKey = this.plugin.wsConnected ? "ws.connected" : "ws.disconnected";
      new import_obsidian2.Setting(el).setName(t("ws.name", l)).setDesc(t(wsKey, l));
    }
    if (this.plugin.settings.token) {
      new import_obsidian2.Setting(el).setName(t("device.name", l)).setDesc(t("device.desc", l)).addButton(
        (button) => button.setButtonText(t("device.makePrimary", l)).onClick(async () => {
          try {
            await apiPatch(this.plugin.settings, `/api/devices/${this.plugin.settings.deviceId}/primary`);
            new import_obsidian2.Notice(`AIChatClip: ${t("notice.primarySet", l)}`);
            if (import_obsidian2.Platform.isDesktop) {
              this.plugin.connectWebSocket();
            }
          } catch (e) {
            new import_obsidian2.Notice(`AIChatClip: ${t("notice.primaryFailed", l)}`);
          }
        })
      );
    }
    new import_obsidian2.Setting(el).setName(t("autoSync.name", l)).setDesc(t("autoSync.desc", l)).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoSyncOnLoad).onChange(async (value) => {
        this.plugin.settings.autoSyncOnLoad = value;
        await this.plugin.saveSettings();
      })
    );
    if (import_obsidian2.Platform.isMobile) {
      new import_obsidian2.Setting(el).setName(t("syncOnForeground.name", l)).setDesc(t("syncOnForeground.desc", l)).addToggle(
        (toggle) => toggle.setValue(this.plugin.settings.syncOnForeground).onChange(async (value) => {
          this.plugin.settings.syncOnForeground = value;
          await this.plugin.saveSettings();
          this.plugin.setupForegroundSync();
        })
      );
    }
    new import_obsidian2.Setting(el).setName(t("inbox.name", l)).setDesc(t("inbox.desc", l)).addText(
      (text) => text.setPlaceholder("AIChatClip/Inbox").setValue(this.plugin.settings.inboxFolder).onChange(async (value) => {
        this.plugin.settings.inboxFolder = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(el).setName(t("fileName.name", l)).setDesc(t("fileName.desc", l)).addText(
      (text) => text.setPlaceholder("{yyyy}-{MM}-{dd}-{title}").setValue(this.plugin.settings.fileNameTemplate).onChange(async (value) => {
        this.plugin.settings.fileNameTemplate = value || "{yyyy}-{MM}-{dd}-{title}";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(el).setName(t("timezone.name", l)).setDesc(t("timezone.desc", l)).addText(
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
      const proTh = headRow.createEl("th", { text: "Pro " });
      proTh.createSpan({ text: "$3/mo", cls: "aichatclip-pro-badge" });
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
    new import_obsidian2.Setting(el).setName(t("pro.autoScan.name", l)).setDesc(t("pro.autoScan.desc", l)).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoScanFolders).onChange(async (value) => {
        this.plugin.settings.autoScanFolders = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(el).setName(t("pro.scanRoot.name", l)).setDesc(t("pro.scanRoot.desc", l)).addText(
      (text) => text.setPlaceholder(t("pro.scanRoot.placeholder", l)).setValue(this.plugin.settings.scanRoot).onChange(async (value) => {
        this.plugin.settings.scanRoot = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(el).setName(t("pro.marker.name", l)).setDesc(t("pro.marker.desc", l)).addText(
      (text) => text.setPlaceholder("README").setValue(this.plugin.settings.markerFilename).onChange(async (value) => {
        this.plugin.settings.markerFilename = value || "README";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian2.Setting(el).setName(t("pro.scanNow.name", l)).setDesc(t("pro.scanNow.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.scanNow.button", l)).setCta().onClick(async () => {
        if (!this.plugin.settings.token) {
          new import_obsidian2.Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
          return;
        }
        try {
          const folders = await scanFolders(
            this.app,
            this.plugin.settings.scanRoot,
            this.plugin.settings.markerFilename
          );
          await syncFoldersToApi(this.plugin.settings, folders);
          new import_obsidian2.Notice(`AIChatClip: ${tReplace("notice.foldersSynced", l, { count: folders.length })}`);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          new import_obsidian2.Notice(`AIChatClip: ${tReplace("notice.folderScanFailed", l, { msg })}`);
        }
      })
    );
    new import_obsidian2.Setting(el).setName(t("pro.readme.name", l)).setDesc(t("pro.readme.desc", l)).addButton(
      (button) => button.setButtonText(t("pro.readme.button", l)).onClick(async () => {
        await navigator.clipboard.writeText(README_TEMPLATE);
        new import_obsidian2.Notice(`AIChatClip: ${t("notice.readmeCopied", l)}`);
      })
    );
    el.createEl("hr", { cls: "aichatclip-separator" });
    new import_obsidian2.Setting(el).setName(t("pro.aiCustomization", l)).setHeading();
    new import_obsidian2.Setting(el).setName(t("pro.titleLang.name", l)).setDesc(t("pro.titleLang.desc", l)).addDropdown((dropdown) => {
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
      this.loadLanguageSetting(dropdown);
      dropdown.onChange(async (value) => {
        await this.savePreference({ fileNameLanguage: value });
      });
    });
    new import_obsidian2.Setting(el).setName(t("pro.tagRule.name", l)).setDesc(t("pro.tagRule.desc", l)).addText(
      (text) => text.setPlaceholder("TagRule").setValue(this.plugin.settings.tagRulePath).onChange(async (value) => {
        this.plugin.settings.tagRulePath = value || "TagRule";
        await this.plugin.saveSettings();
      })
    );
  }
  renderGuideTab(el) {
    const l = this.lang;
    new import_obsidian2.Setting(el).setName(t("guide.title", l)).setHeading();
    const steps = el.createDiv({ cls: "aichatclip-guide-steps" });
    for (const i of [1, 2, 3]) {
      const step = steps.createDiv({ cls: "aichatclip-guide-step" });
      const num = step.createDiv({ cls: "aichatclip-guide-step-num" });
      num.setText(String(i));
      const content = step.createDiv({ cls: "aichatclip-guide-step-content" });
      content.createEl("h4", { text: t(`guide.step${i}.title`, l) });
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
      new import_obsidian2.Notice(`AIChatClip: ${t("notice.signInFirst", l)}`);
      return;
    }
    try {
      await apiPut(this.plugin.settings, "/api/preferences", body);
    } catch (e) {
      new import_obsidian2.Notice(`AIChatClip: ${t("notice.prefFailed", l)}`);
    }
  }
};

// src/formatter.ts
function escapeYaml(value) {
  if (/[:#\[\]{}&*!|>'"%@`,?]/.test(value) || value.trim() !== value) {
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
async function getExistingSyncedClipIds(app, folderPath) {
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
async function resolveFilePath(app, targetFolder, baseName) {
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
  const filePath = await resolveFilePath(app, targetFolder, baseName);
  await app.vault.create(filePath, markdown);
}
async function syncTagRule(app, settings) {
  if (!settings.tagRulePath || !settings.token) return;
  try {
    const filePath = `${settings.tagRulePath}.md`;
    const file = app.vault.getAbstractFileByPath(filePath);
    if (!file) return;
    const mdFile = app.vault.getMarkdownFiles().find((f) => f.path === filePath);
    if (!mdFile) return;
    const content = await app.vault.read(mdFile);
    await apiPut(settings, "/api/preferences", { tagRule: content });
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
        await syncFoldersToApi(settings, folders);
      } catch (e) {
        console.warn("AIChatClip: folder sync failed, continuing with clip sync", e);
      }
    }
    await syncTagRule(app, settings);
  }
  if (clips.length === 0) return result;
  await ensureFolder(app, settings.inboxFolder);
  const existingIds = await getExistingSyncedClipIds(app, settings.inboxFolder);
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
  const existingIds = await getExistingSyncedClipIds(app, settings.inboxFolder);
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
var AIChatClipPlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.isSyncing = false;
    this.settingTab = null;
    this.syncWs = null;
    this.wsConnected = false;
    this.onVisibilityChange = () => {
      if (document.visibilityState === "visible" && this.settings.syncOnForeground) {
        this.performSync();
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
    (0, import_obsidian3.addIcon)("aichatclip-logo", LOGO_ICON);
    this.addRibbonIcon("aichatclip-logo", "Sync AIChatClip", () => this.performSync());
    this.addCommand({
      id: "sync",
      name: "Sync clips",
      callback: () => this.performSync()
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
          this.performSync();
        }
        if (import_obsidian3.Platform.isDesktop) {
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
      new import_obsidian3.Notice(`AIChatClip: ${t("notice.syncInProgress", l)}`);
      return;
    }
    if (!this.settings.token) {
      new import_obsidian3.Notice(`AIChatClip: ${t("notice.noToken", l)}`);
      return;
    }
    this.isSyncing = true;
    try {
      const result = await syncClips(this.app, this.settings);
      this.settings.cachedUserPlan = result.userPlan;
      await this.saveSettings();
      if (result.synced === 0 && result.failed === 0) {
        new import_obsidian3.Notice(`AIChatClip: ${t("notice.noNewClips", l)}`);
      } else if (result.failed === 0) {
        new import_obsidian3.Notice(`AIChatClip: ${tReplace("notice.synced", l, { count: result.synced })}`);
      } else {
        new import_obsidian3.Notice(
          `AIChatClip: ${tReplace("notice.syncPartial", l, { synced: result.synced, failed: result.failed })}`
        );
        for (const err of result.errors) {
          console.error("AIChatClip sync error:", err);
        }
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      new import_obsidian3.Notice(`AIChatClip: ${tReplace("notice.syncFailed", l, { msg })}`);
      console.error("AIChatClip sync error:", e);
    } finally {
      this.isSyncing = false;
    }
  }
  async handleAuthCallback(token) {
    this.settings.token = token;
    await this.saveSettings();
    setTimeout(async () => {
      var _a;
      await registerDevice(this.settings);
      (_a = this.settingTab) == null ? void 0 : _a.display();
      new import_obsidian3.Notice(`AIChatClip: ${t("notice.connected", this.lang)}`);
      this.performSync();
      if (import_obsidian3.Platform.isDesktop) {
        this.connectWebSocket();
      }
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
      onNewClip: (clipId) => this.handlePushNotification(clipId),
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
        new import_obsidian3.Notice(`AIChatClip: ${t("notice.newClipSynced", this.lang)}`);
      }
    } catch (e) {
      console.error("AIChatClip: push sync failed", e);
    }
  }
  setupForegroundSync() {
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    if (!import_obsidian3.Platform.isMobile || !this.settings.syncOnForeground) return;
    document.addEventListener("visibilitychange", this.onVisibilityChange);
    this.register(
      () => document.removeEventListener("visibilitychange", this.onVisibilityChange)
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL2FwaS50cyIsICJzcmMvaTE4bi50cyIsICJzcmMvc2V0dGluZ3MudHMiLCAic3JjL2ZvbGRlcnMudHMiLCAic3JjL3R5cGVzLnRzIiwgInNyYy9mb3JtYXR0ZXIudHMiLCAic3JjL3N5bmMudHMiLCAic3JjL3dlYnNvY2tldC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqIFBsdWdpbiBlbnRyeSBwb2ludCBcdTIwMTQgcmVnaXN0ZXJzIGNvbW1hbmRzLCByaWJib24gaWNvbiwgYW5kIGxpZmVjeWNsZSBob29rcyAqL1xuaW1wb3J0IHsgYWRkSWNvbiwgTm90aWNlLCBQbGF0Zm9ybSwgUGx1Z2luIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyByZWdpc3RlckRldmljZSB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHsgdHlwZSBQbHVnaW5MYW5nLCBkZXRlY3RMYW5nLCB0LCB0UmVwbGFjZSB9IGZyb20gXCIuL2kxOG5cIjtcbmltcG9ydCB7IEFJQ2hhdENsaXBTZXR0aW5nVGFiIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IHN5bmNDbGlwcywgc3luY1NpbmdsZUNsaXAgfSBmcm9tIFwiLi9zeW5jXCI7XG5pbXBvcnQgeyB0eXBlIEFJQ2hhdENsaXBTZXR0aW5ncywgREVGQVVMVF9TRVRUSU5HUyB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBTeW5jV2ViU29ja2V0IH0gZnJvbSBcIi4vd2Vic29ja2V0XCI7XG5cbmNvbnN0IExPR09fSUNPTiA9IGA8ZyB0cmFuc2Zvcm09XCJzY2FsZSg0LjE2NjcpXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxuICA8Y2lyY2xlIGN4PVwiMTNcIiBjeT1cIjEwLjI3XCIgcj1cIjJcIi8+XG4gIDxwYXRoIGQ9XCJNMjAuMiw5LjhsLTMuNSw2LjA2Yy0uMjcuNDgtLjg5LjY0LTEuMzcuMzdzLS42NC0uODktLjM3LTEuMzdsMy41LTYuMDZjMS4xMS0xLjkxLjQ1LTQuMzYtMS40Ni01LjQ2cy00LjM2LS40NS01LjQ2LDEuNDZsLS41Ljg3Yy0uMjcuNDgtLjg5LjY0LTEuMzcuMzdzLS42NC0uODktLjM3LTEuMzdsLjUtLjg3QzExLjQ2Ljk0LDE1LjEzLS4wNSwxOCwxLjYxczMuODUsNS4zMywyLjIsOC4yWlwiLz5cbiAgPHBhdGggZD1cIk0xNC43LDE5LjMzbC0uNS44N2MtMS42NiwyLjg3LTUuMzMsMy44NS04LjIsMi4ycy0zLjg1LTUuMzMtMi4yLTguMmwzLjUtNi4wNmMuMjctLjQ4Ljg5LS42NCwxLjM3LS4zN3MuNjQuODkuMzcsMS4zN2wtMy41LDYuMDZjLTEuMSwxLjkxLS40NSw0LjM2LDEuNDYsNS40NnM0LjM2LjQ1LDUuNDYtMS40NmwuNS0uODdjLjI3LS40OC44OS0uNjQsMS4zNy0uMzdzLjY0Ljg5LjM3LDEuMzdaXCIvPlxuPC9nPmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFJQ2hhdENsaXBQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXHRzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzID0gREVGQVVMVF9TRVRUSU5HUztcblx0cHJpdmF0ZSBpc1N5bmNpbmcgPSBmYWxzZTtcblx0cHJpdmF0ZSBzZXR0aW5nVGFiOiBBSUNoYXRDbGlwU2V0dGluZ1RhYiB8IG51bGwgPSBudWxsO1xuXHRzeW5jV3M6IFN5bmNXZWJTb2NrZXQgfCBudWxsID0gbnVsbDtcblx0d3NDb25uZWN0ZWQgPSBmYWxzZTtcblxuXHRnZXQgbGFuZygpOiBQbHVnaW5MYW5nIHtcblx0XHRyZXR1cm4gdGhpcy5zZXR0aW5ncy5wbHVnaW5MYW5ndWFnZSA9PT0gXCJhdXRvXCJcblx0XHRcdD8gZGV0ZWN0TGFuZygpXG5cdFx0XHQ6IHRoaXMuc2V0dGluZ3MucGx1Z2luTGFuZ3VhZ2U7XG5cdH1cblxuXHRhc3luYyBvbmxvYWQoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0YXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuXHRcdC8vIEdlbmVyYXRlIGRldmljZUlkIG9uIGZpcnN0IGxvYWRcblx0XHRpZiAoIXRoaXMuc2V0dGluZ3MuZGV2aWNlSWQpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MuZGV2aWNlSWQgPSBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuXHRcdFx0YXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcblx0XHR9XG5cblx0XHRhZGRJY29uKFwiYWljaGF0Y2xpcC1sb2dvXCIsIExPR09fSUNPTik7XG5cdFx0dGhpcy5hZGRSaWJib25JY29uKFwiYWljaGF0Y2xpcC1sb2dvXCIsIFwiU3luYyBBSUNoYXRDbGlwXCIsICgpID0+IHRoaXMucGVyZm9ybVN5bmMoKSk7XG5cblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6IFwic3luY1wiLFxuXHRcdFx0bmFtZTogXCJTeW5jIGNsaXBzXCIsXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5wZXJmb3JtU3luYygpLFxuXHRcdH0pO1xuXG5cdFx0dGhpcy5zZXR0aW5nVGFiID0gbmV3IEFJQ2hhdENsaXBTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKTtcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIodGhpcy5zZXR0aW5nVGFiKTtcblxuXHRcdHRoaXMucmVnaXN0ZXJPYnNpZGlhblByb3RvY29sSGFuZGxlcihcImFpY2hhdGNsaXBcIiwgKHBhcmFtcykgPT4ge1xuXHRcdFx0aWYgKHBhcmFtcy50b2tlbikge1xuXHRcdFx0XHR0aGlzLmhhbmRsZUF1dGhDYWxsYmFjayhwYXJhbXMudG9rZW4pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5hcHAud29ya3NwYWNlLm9uTGF5b3V0UmVhZHkoYXN5bmMgKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MudG9rZW4pIHtcblx0XHRcdFx0YXdhaXQgcmVnaXN0ZXJEZXZpY2UodGhpcy5zZXR0aW5ncyk7XG5cblx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuYXV0b1N5bmNPbkxvYWQpIHtcblx0XHRcdFx0XHR0aGlzLnBlcmZvcm1TeW5jKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoUGxhdGZvcm0uaXNEZXNrdG9wKSB7XG5cdFx0XHRcdFx0dGhpcy5jb25uZWN0V2ViU29ja2V0KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0dXBGb3JlZ3JvdW5kU3luYygpO1xuXHRcdH0pO1xuXHR9XG5cblx0b251bmxvYWQoKTogdm9pZCB7XG5cdFx0dGhpcy5zeW5jV3M/LmRpc2Nvbm5lY3QoKTtcblx0fVxuXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcblx0fVxuXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHR9XG5cblx0YXN5bmMgcGVyZm9ybVN5bmMoKTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgbCA9IHRoaXMubGFuZztcblx0XHRpZiAodGhpcy5pc1N5bmNpbmcpIHtcblx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5zeW5jSW5Qcm9ncmVzc1wiLCBsKX1gKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuc2V0dGluZ3MudG9rZW4pIHtcblx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5ub1Rva2VuXCIsIGwpfWApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuaXNTeW5jaW5nID0gdHJ1ZTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgc3luY0NsaXBzKHRoaXMuYXBwLCB0aGlzLnNldHRpbmdzKTtcblxuXHRcdFx0dGhpcy5zZXR0aW5ncy5jYWNoZWRVc2VyUGxhbiA9IHJlc3VsdC51c2VyUGxhbjtcblx0XHRcdGF3YWl0IHRoaXMuc2F2ZVNldHRpbmdzKCk7XG5cblx0XHRcdGlmIChyZXN1bHQuc3luY2VkID09PSAwICYmIHJlc3VsdC5mYWlsZWQgPT09IDApIHtcblx0XHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0KFwibm90aWNlLm5vTmV3Q2xpcHNcIiwgbCl9YCk7XG5cdFx0XHR9IGVsc2UgaWYgKHJlc3VsdC5mYWlsZWQgPT09IDApIHtcblx0XHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0UmVwbGFjZShcIm5vdGljZS5zeW5jZWRcIiwgbCwgeyBjb3VudDogcmVzdWx0LnN5bmNlZCB9KX1gKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG5ldyBOb3RpY2UoXG5cdFx0XHRcdFx0YEFJQ2hhdENsaXA6ICR7dFJlcGxhY2UoXCJub3RpY2Uuc3luY1BhcnRpYWxcIiwgbCwgeyBzeW5jZWQ6IHJlc3VsdC5zeW5jZWQsIGZhaWxlZDogcmVzdWx0LmZhaWxlZCB9KX1gLFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRmb3IgKGNvbnN0IGVyciBvZiByZXN1bHQuZXJyb3JzKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcihcIkFJQ2hhdENsaXAgc3luYyBlcnJvcjpcIiwgZXJyKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdGNvbnN0IG1zZyA9IGUgaW5zdGFuY2VvZiBFcnJvciA/IGUubWVzc2FnZSA6IFN0cmluZyhlKTtcblx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dFJlcGxhY2UoXCJub3RpY2Uuc3luY0ZhaWxlZFwiLCBsLCB7IG1zZyB9KX1gKTtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJBSUNoYXRDbGlwIHN5bmMgZXJyb3I6XCIsIGUpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHR0aGlzLmlzU3luY2luZyA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgYXN5bmMgaGFuZGxlQXV0aENhbGxiYWNrKHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHR0aGlzLnNldHRpbmdzLnRva2VuID0gdG9rZW47XG5cdFx0YXdhaXQgdGhpcy5zYXZlU2V0dGluZ3MoKTtcblx0XHQvLyBEZWxheSB0byBlbnN1cmUgT2JzaWRpYW4gaGFzIHJlZ2FpbmVkIGZvY3VzIGJlZm9yZSBzaG93aW5nIFVJIHVwZGF0ZXNcblx0XHRzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcblx0XHRcdGF3YWl0IHJlZ2lzdGVyRGV2aWNlKHRoaXMuc2V0dGluZ3MpO1xuXHRcdFx0dGhpcy5zZXR0aW5nVGFiPy5kaXNwbGF5KCk7XG5cdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2UuY29ubmVjdGVkXCIsIHRoaXMubGFuZyl9YCk7XG5cdFx0XHR0aGlzLnBlcmZvcm1TeW5jKCk7XG5cblx0XHRcdGlmIChQbGF0Zm9ybS5pc0Rlc2t0b3ApIHtcblx0XHRcdFx0dGhpcy5jb25uZWN0V2ViU29ja2V0KCk7XG5cdFx0XHR9XG5cdFx0fSwgNTAwKTtcblx0fVxuXG5cdGNvbm5lY3RXZWJTb2NrZXQoKTogdm9pZCB7XG5cdFx0dGhpcy5zeW5jV3M/LmRpc2Nvbm5lY3QoKTtcblxuXHRcdGlmICghdGhpcy5zZXR0aW5ncy50b2tlbiB8fCAhdGhpcy5zZXR0aW5ncy5kZXZpY2VJZCkgcmV0dXJuO1xuXG5cdFx0dGhpcy5zeW5jV3MgPSBuZXcgU3luY1dlYlNvY2tldCh7XG5cdFx0XHRhcGlCYXNlVXJsOiB0aGlzLnNldHRpbmdzLmFwaUJhc2VVcmwsXG5cdFx0XHR0b2tlbjogdGhpcy5zZXR0aW5ncy50b2tlbixcblx0XHRcdGRldmljZUlkOiB0aGlzLnNldHRpbmdzLmRldmljZUlkLFxuXHRcdFx0b25OZXdDbGlwOiAoY2xpcElkKSA9PiB0aGlzLmhhbmRsZVB1c2hOb3RpZmljYXRpb24oY2xpcElkKSxcblx0XHRcdG9uU3RhdHVzQ2hhbmdlOiAoY29ubmVjdGVkKSA9PiB7XG5cdFx0XHRcdHRoaXMud3NDb25uZWN0ZWQgPSBjb25uZWN0ZWQ7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ1RhYj8uZGlzcGxheSgpO1xuXHRcdFx0fSxcblx0XHR9KTtcblx0XHR0aGlzLnN5bmNXcy5jb25uZWN0KCk7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGhhbmRsZVB1c2hOb3RpZmljYXRpb24oY2xpcElkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5zeW5jZWRDbGlwSWRzLmluY2x1ZGVzKGNsaXBJZCkpIHJldHVybjtcblxuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBzeW5jZWQgPSBhd2FpdCBzeW5jU2luZ2xlQ2xpcChcblx0XHRcdFx0dGhpcy5hcHAsXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MsXG5cdFx0XHRcdGNsaXBJZCxcblx0XHRcdFx0KCkgPT4gdGhpcy5zYXZlU2V0dGluZ3MoKSxcblx0XHRcdCk7XG5cdFx0XHRpZiAoc3luY2VkKSB7XG5cdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5uZXdDbGlwU3luY2VkXCIsIHRoaXMubGFuZyl9YCk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkFJQ2hhdENsaXA6IHB1c2ggc3luYyBmYWlsZWRcIiwgZSk7XG5cdFx0fVxuXHR9XG5cblx0c2V0dXBGb3JlZ3JvdW5kU3luYygpOiB2b2lkIHtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSk7XG5cblx0XHRpZiAoIVBsYXRmb3JtLmlzTW9iaWxlIHx8ICF0aGlzLnNldHRpbmdzLnN5bmNPbkZvcmVncm91bmQpIHJldHVybjtcblxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCgpID0+XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidmlzaWJpbGl0eWNoYW5nZVwiLCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSksXG5cdFx0KTtcblx0fVxuXG5cdHByaXZhdGUgb25WaXNpYmlsaXR5Q2hhbmdlID0gKCk6IHZvaWQgPT4ge1xuXHRcdGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09IFwidmlzaWJsZVwiICYmIHRoaXMuc2V0dGluZ3Muc3luY09uRm9yZWdyb3VuZCkge1xuXHRcdFx0dGhpcy5wZXJmb3JtU3luYygpO1xuXHRcdH1cblx0fTtcbn1cbiIsICIvKiogQ2VudHJhbGl6ZWQgQVBJIGNsaWVudCBcdTIwMTQgYWxsIHNlcnZlciBjb21tdW5pY2F0aW9uIGdvZXMgdGhyb3VnaCBoZXJlICovXG5pbXBvcnQgeyBQbGF0Zm9ybSwgcmVxdWVzdFVybCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHR5cGUgeyBBSUNoYXRDbGlwU2V0dGluZ3MgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBpR2V0KHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsIHBhdGg6IHN0cmluZykge1xuXHRjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0VXJsKHtcblx0XHR1cmw6IGAke3NldHRpbmdzLmFwaUJhc2VVcmx9JHtwYXRofWAsXG5cdFx0bWV0aG9kOiBcIkdFVFwiLFxuXHRcdGhlYWRlcnM6IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3NldHRpbmdzLnRva2VufWAgfSxcblx0fSk7XG5cdHJldHVybiByZXM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhcGlQb3N0KHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsIHBhdGg6IHN0cmluZywgYm9keT86IHVua25vd24pIHtcblx0Y29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdFVybCh7XG5cdFx0dXJsOiBgJHtzZXR0aW5ncy5hcGlCYXNlVXJsfSR7cGF0aH1gLFxuXHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0QXV0aG9yaXphdGlvbjogYEJlYXJlciAke3NldHRpbmdzLnRva2VufWAsXG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHR9LFxuXHRcdGJvZHk6IGJvZHkgIT0gbnVsbCA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuXHR9KTtcblx0cmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFwaVB1dChzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzLCBwYXRoOiBzdHJpbmcsIGJvZHk6IHVua25vd24pIHtcblx0Y29uc3QgcmVzID0gYXdhaXQgcmVxdWVzdFVybCh7XG5cdFx0dXJsOiBgJHtzZXR0aW5ncy5hcGlCYXNlVXJsfSR7cGF0aH1gLFxuXHRcdG1ldGhvZDogXCJQVVRcIixcblx0XHRoZWFkZXJzOiB7XG5cdFx0XHRBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7c2V0dGluZ3MudG9rZW59YCxcblx0XHRcdFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuXHRcdH0sXG5cdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkoYm9keSksXG5cdH0pO1xuXHRyZXR1cm4gcmVzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBpUGF0Y2goc2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncywgcGF0aDogc3RyaW5nLCBib2R5PzogdW5rbm93bikge1xuXHRjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0VXJsKHtcblx0XHR1cmw6IGAke3NldHRpbmdzLmFwaUJhc2VVcmx9JHtwYXRofWAsXG5cdFx0bWV0aG9kOiBcIlBBVENIXCIsXG5cdFx0aGVhZGVyczoge1xuXHRcdFx0QXV0aG9yaXphdGlvbjogYEJlYXJlciAke3NldHRpbmdzLnRva2VufWAsXG5cdFx0XHRcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcblx0XHR9LFxuXHRcdGJvZHk6IGJvZHkgIT0gbnVsbCA/IEpTT04uc3RyaW5naWZ5KGJvZHkpIDogdW5kZWZpbmVkLFxuXHR9KTtcblx0cmV0dXJuIHJlcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyRGV2aWNlKHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MpOiBQcm9taXNlPHZvaWQ+IHtcblx0aWYgKCFzZXR0aW5ncy50b2tlbiB8fCAhc2V0dGluZ3MuZGV2aWNlSWQpIHJldHVybjtcblx0dHJ5IHtcblx0XHRhd2FpdCBhcGlQb3N0KHNldHRpbmdzLCBcIi9hcGkvZGV2aWNlc1wiLCB7XG5cdFx0XHRkZXZpY2VJZDogc2V0dGluZ3MuZGV2aWNlSWQsXG5cdFx0XHRkZXZpY2VOYW1lOiBQbGF0Zm9ybS5pc0Rlc2t0b3AgPyBcIk9ic2lkaWFuIERlc2t0b3BcIiA6IFwiT2JzaWRpYW4gTW9iaWxlXCIsXG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRjb25zb2xlLndhcm4oXCJBSUNoYXRDbGlwOiBkZXZpY2UgcmVnaXN0cmF0aW9uIGZhaWxlZFwiLCBlKTtcblx0fVxufVxuIiwgIi8qKiBJbnRlcm5hdGlvbmFsaXphdGlvbiBcdTIwMTQgVUkgc3RyaW5nIHRyYW5zbGF0aW9ucyBmb3IgZW4sIGphLCB6aCwga28gKi9cbmV4cG9ydCB0eXBlIFBsdWdpbkxhbmcgPSBcImVuXCIgfCBcImphXCIgfCBcInpoXCIgfCBcImtvXCI7XG5cbmNvbnN0IHRyYW5zbGF0aW9uczogUmVjb3JkPHN0cmluZywgUmVjb3JkPFBsdWdpbkxhbmcsIHN0cmluZz4+ID0ge1xuXHQvLyBCYXNpYyB0YWJcblx0XCJ0YWIuYmFzaWNcIjogeyBlbjogXCJCYXNpY1wiLCBqYTogXCJcdTU3RkFcdTY3MkNcIiwgemg6IFwiXHU1N0ZBXHU2NzJDXCIsIGtvOiBcIlx1QUUzMFx1QkNGOFwiIH0sXG5cdFwidGFiLnByb1wiOiB7IGVuOiBcIlByb1wiLCBqYTogXCJQcm9cIiwgemg6IFwiUHJvXCIsIGtvOiBcIlByb1wiIH0sXG5cdFwidGFiLmd1aWRlXCI6IHsgZW46IFwiR3VpZGVcIiwgamE6IFwiXHUzMEFDXHUzMEE0XHUzMEM5XCIsIHpoOiBcIlx1NjMwN1x1NTM1N1wiLCBrbzogXCJcdUFDMDBcdUM3NzRcdUI0RENcIiB9LFxuXG5cdC8vIEF1dGhlbnRpY2F0aW9uXG5cdFwiYXV0aC5uYW1lXCI6IHsgZW46IFwiQXV0aGVudGljYXRpb25cIiwgamE6IFwiXHU4QThEXHU4QTNDXCIsIHpoOiBcIlx1OEJBNFx1OEJDMVwiLCBrbzogXCJcdUM3NzhcdUM5OURcIiB9LFxuXHRcImF1dGguY29ubmVjdGVkXCI6IHsgZW46IFwiQ29ubmVjdGVkXCIsIGphOiBcIlx1NjNBNVx1N0Q5QVx1NkUwOFx1MzA3RlwiLCB6aDogXCJcdTVERjJcdThGREVcdTYzQTVcIiwga286IFwiXHVDNUYwXHVBQ0IwXHVCNDI4XCIgfSxcblx0XCJhdXRoLm5vdENvbm5lY3RlZFwiOiB7XG5cdFx0ZW46IFwiTm90IGNvbm5lY3RlZC4gU2lnbiBpbiB0byBzeW5jIHlvdXIgY2xpcHMuXCIsXG5cdFx0amE6IFwiXHU2NzJBXHU2M0E1XHU3RDlBXHUzMDAyXHUzMEI1XHUzMEE0XHUzMEYzXHUzMEE0XHUzMEYzXHUzMDU3XHUzMDY2XHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDkyXHU1NDBDXHU2NzFGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDg3XHUzMDQ2XHUzMDAyXCIsXG5cdFx0emg6IFwiXHU2NzJBXHU4RkRFXHU2M0E1XHUzMDAyXHU4QkY3XHU3NjdCXHU1RjU1XHU0RUU1XHU1NDBDXHU2QjY1XHU2MEE4XHU3Njg0XHU1MjZBXHU4RjkxXHUzMDAyXCIsXG5cdFx0a286IFwiXHVDNUYwXHVBQ0IwXHVCNDE4XHVDOUMwIFx1QzU0QVx1Qzc0Qy4gXHVCODVDXHVBREY4XHVDNzc4XHVENTU4XHVDNUVDIFx1RDA3NFx1QjlCRFx1Qzc0NCBcdUIzRDlcdUFFMzBcdUQ2NTRcdUQ1NThcdUMxMzhcdUM2OTQuXCIsXG5cdH0sXG5cdFwiYXV0aC5zaWduSW5cIjogeyBlbjogXCJTaWduIGluXCIsIGphOiBcIlx1MzBCNVx1MzBBNFx1MzBGM1x1MzBBNFx1MzBGM1wiLCB6aDogXCJcdTc2N0JcdTVGNTVcIiwga286IFwiXHVCODVDXHVBREY4XHVDNzc4XCIgfSxcblx0XCJhdXRoLnNpZ25PdXRcIjogeyBlbjogXCJTaWduIG91dFwiLCBqYTogXCJcdTMwQjVcdTMwQTRcdTMwRjNcdTMwQTJcdTMwQTZcdTMwQzhcIiwgemg6IFwiXHU5MDAwXHU1MUZBXCIsIGtvOiBcIlx1Qjg1Q1x1QURGOFx1QzU0NFx1QzZDM1wiIH0sXG5cblx0Ly8gUmVhbC10aW1lIHN5bmNcblx0XCJ3cy5uYW1lXCI6IHsgZW46IFwiUmVhbC10aW1lIHN5bmNcIiwgamE6IFwiXHUzMEVBXHUzMEEyXHUzMEVCXHUzMEJGXHUzMEE0XHUzMEUwXHU1NDBDXHU2NzFGXCIsIHpoOiBcIlx1NUI5RVx1NjVGNlx1NTQwQ1x1NkI2NVwiLCBrbzogXCJcdUMyRTRcdUMyRENcdUFDMDQgXHVCM0Q5XHVBRTMwXHVENjU0XCIgfSxcblx0XCJ3cy5jb25uZWN0ZWRcIjogeyBlbjogXCJTdGF0dXM6IENvbm5lY3RlZFwiLCBqYTogXCJcdTcyQjZcdTYxNEI6IFx1NjNBNVx1N0Q5QVx1NEUyRFwiLCB6aDogXCJcdTcyQjZcdTYwMDE6IFx1NURGMlx1OEZERVx1NjNBNVwiLCBrbzogXCJcdUMwQzFcdUQwREM6IFx1QzVGMFx1QUNCMFx1QjQyOFwiIH0sXG5cdFwid3MuZGlzY29ubmVjdGVkXCI6IHsgZW46IFwiU3RhdHVzOiBEaXNjb25uZWN0ZWRcIiwgamE6IFwiXHU3MkI2XHU2MTRCOiBcdTUyMDdcdTY1QURcIiwgemg6IFwiXHU3MkI2XHU2MDAxOiBcdTVERjJcdTY1QURcdTVGMDBcIiwga286IFwiXHVDMEMxXHVEMERDOiBcdUM1RjBcdUFDQjAgXHVCMDRBXHVBRTQwXCIgfSxcblxuXHQvLyBEZXZpY2Vcblx0XCJkZXZpY2UubmFtZVwiOiB7IGVuOiBcIlNldCBhcyBwcmltYXJ5IGRldmljZVwiLCBqYTogXCJcdTMwRDdcdTMwRTlcdTMwQTRcdTMwREVcdTMwRUFcdTMwQzdcdTMwRDBcdTMwQTRcdTMwQjlcdTMwNkJcdThBMkRcdTVCOUFcIiwgemg6IFwiXHU4QkJFXHU0RTNBXHU0RTNCXHU4QkJFXHU1OTA3XCIsIGtvOiBcIlx1QUUzMFx1QkNGOCBcdUFFMzBcdUFFMzBcdUI4NUMgXHVDMTI0XHVDODE1XCIgfSxcblx0XCJkZXZpY2UuZGVzY1wiOiB7XG5cdFx0ZW46IFwiVGhlIHByaW1hcnkgZGV2aWNlIGhhcyBoaWdoZXN0IHByaW9yaXR5IGZvciByZWFsLXRpbWUgcHVzaCBub3RpZmljYXRpb25zXCIsXG5cdFx0amE6IFwiXHUzMEQ3XHUzMEU5XHUzMEE0XHUzMERFXHUzMEVBXHUzMEM3XHUzMEQwXHUzMEE0XHUzMEI5XHUzMDZGXHUzMEVBXHUzMEEyXHUzMEVCXHUzMEJGXHUzMEE0XHUzMEUwXHUzMEQ3XHUzMEMzXHUzMEI3XHUzMEU1XHU5MDFBXHU3N0U1XHUzMDZFXHU1MTJBXHU1MTQ4XHU1RUE2XHUzMDRDXHU2NzAwXHUzMDgyXHU5QUQ4XHUzMDRGXHUzMDZBXHUzMDhBXHUzMDdFXHUzMDU5XCIsXG5cdFx0emg6IFwiXHU0RTNCXHU4QkJFXHU1OTA3XHU1NzI4XHU1QjlFXHU2NUY2XHU2M0E4XHU5MDAxXHU5MDFBXHU3N0U1XHU0RTJEXHU1MTc3XHU2NzA5XHU2NzAwXHU5QUQ4XHU0RjE4XHU1MTQ4XHU3RUE3XCIsXG5cdFx0a286IFwiXHVBRTMwXHVCQ0Y4IFx1QUUzMFx1QUUzMFx1QjI5NCBcdUMyRTRcdUMyRENcdUFDMDQgXHVENDc4XHVDMkRDIFx1QzU0Q1x1QjlCQ1x1QzVEMFx1QzExQyBcdUFDMDBcdUM3QTUgXHVCMTkyXHVDNzQwIFx1QzZCMFx1QzEyMFx1QzIxQ1x1QzcwNFx1Qjk3QyBcdUFDMTZcdUMyQjVcdUIyQzhcdUIyRTRcIixcblx0fSxcblx0XCJkZXZpY2UubWFrZVByaW1hcnlcIjogeyBlbjogXCJNYWtlIHByaW1hcnlcIiwgamE6IFwiXHUzMEQ3XHUzMEU5XHUzMEE0XHUzMERFXHUzMEVBXHUzMDZCXHU4QTJEXHU1QjlBXCIsIHpoOiBcIlx1OEJCRVx1NEUzQVx1NEUzQlx1OEJCRVx1NTkwN1wiLCBrbzogXCJcdUFFMzBcdUJDRjhcdUM3M0NcdUI4NUMgXHVDMTI0XHVDODE1XCIgfSxcblxuXHQvLyBJbmJveCBmb2xkZXJcblx0XCJpbmJveC5uYW1lXCI6IHsgZW46IFwiSW5ib3ggRm9sZGVyXCIsIGphOiBcIlx1NTNEN1x1NEZFMVx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFwiLCB6aDogXCJcdTY1MzZcdTRFRjZcdTdCQjFcdTY1ODdcdTRFRjZcdTU5MzlcIiwga286IFwiXHVCQzFCXHVDNzQwIFx1RDNCOFx1QzlDMFx1RDU2OCBcdUQzRjRcdUIzNTRcIiB9LFxuXHRcImluYm94LmRlc2NcIjoge1xuXHRcdGVuOiBcIlZhdWx0IGZvbGRlciB3aGVyZSBjbGlwcGVkIG5vdGVzIGFyZSBzYXZlZFwiLFxuXHRcdGphOiBcIlx1MzBBRlx1MzBFQVx1MzBDM1x1MzBEN1x1MzA1N1x1MzA1Rlx1MzBDRVx1MzBGQ1x1MzBDOFx1MzA2RVx1NEZERFx1NUI1OFx1NTE0OFx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFwiLFxuXHRcdHpoOiBcIlx1NEZERFx1NUI1OFx1NTI2QVx1OEY5MVx1N0IxNFx1OEJCMFx1NzY4NFx1NUU5M1x1NjU4N1x1NEVGNlx1NTkzOVwiLFxuXHRcdGtvOiBcIlx1RDA3NFx1QjlCRFx1QjQxQyBcdUIxNzhcdUQyQjhcdUFDMDAgXHVDODAwXHVDN0E1XHVCNDE4XHVCMjk0IFx1QkNGQ1x1RDJCOCBcdUQzRjRcdUIzNTRcIixcblx0fSxcblxuXHQvLyBBdXRvLXN5bmNcblx0XCJhdXRvU3luYy5uYW1lXCI6IHsgZW46IFwiQXV0by1zeW5jIG9uIGxvYWRcIiwgamE6IFwiXHU4RDc3XHU1MkQ1XHU2NjQyXHUzMDZCXHU4MUVBXHU1MkQ1XHU1NDBDXHU2NzFGXCIsIHpoOiBcIlx1NTQyRlx1NTJBOFx1NjVGNlx1ODFFQVx1NTJBOFx1NTQwQ1x1NkI2NVwiLCBrbzogXCJcdUMyRENcdUM3OTEgXHVDMkRDIFx1Qzc5MFx1QjNEOSBcdUIzRDlcdUFFMzBcdUQ2NTRcIiB9LFxuXHRcImF1dG9TeW5jLmRlc2NcIjoge1xuXHRcdGVuOiBcIkF1dG9tYXRpY2FsbHkgc3luYyBjbGlwcyB3aGVuIE9ic2lkaWFuIHN0YXJ0c1wiLFxuXHRcdGphOiBcIk9ic2lkaWFuIFx1OEQ3N1x1NTJENVx1NjY0Mlx1MzA2Qlx1MzBBRlx1MzBFQVx1MzBDM1x1MzBEN1x1MzA5Mlx1ODFFQVx1NTJENVx1NTQwQ1x1NjcxRlwiLFxuXHRcdHpoOiBcIk9ic2lkaWFuIFx1NTQyRlx1NTJBOFx1NjVGNlx1ODFFQVx1NTJBOFx1NTQwQ1x1NkI2NVx1NTI2QVx1OEY5MVwiLFxuXHRcdGtvOiBcIk9ic2lkaWFuIFx1QzJEQ1x1Qzc5MSBcdUMyREMgXHVDNzkwXHVCM0Q5XHVDNzNDXHVCODVDIFx1RDA3NFx1QjlCRCBcdUIzRDlcdUFFMzBcdUQ2NTRcIixcblx0fSxcblxuXHQvLyBUaW1lem9uZVxuXHRcInRpbWV6b25lLm5hbWVcIjogeyBlbjogXCJUaW1lem9uZVwiLCBqYTogXCJcdTMwQkZcdTMwQTRcdTMwRTBcdTMwQkVcdTMwRkNcdTMwRjNcIiwgemg6IFwiXHU2NUY2XHU1MzNBXCIsIGtvOiBcIlx1QzJEQ1x1QUMwNFx1QjMwMFwiIH0sXG5cdFwidGltZXpvbmUuZGVzY1wiOiB7XG5cdFx0ZW46IFwiVGltZXpvbmUgZm9yIGNsaXBwZWRfYXQgaW4gZnJvbnRtYXR0ZXIgKGF1dG8tZGV0ZWN0ZWQpXCIsXG5cdFx0amE6IFwiZnJvbnRtYXR0ZXIgXHUzMDZFIGNsaXBwZWRfYXQgXHUzMDZCXHU0RjdGXHU3NTI4XHUzMDU5XHUzMDhCXHUzMEJGXHUzMEE0XHUzMEUwXHUzMEJFXHUzMEZDXHUzMEYzXHVGRjA4XHU4MUVBXHU1MkQ1XHU2OTFDXHU1MUZBXHVGRjA5XCIsXG5cdFx0emg6IFwiZnJvbnRtYXR0ZXIgXHU0RTJEIGNsaXBwZWRfYXQgXHU3Njg0XHU2NUY2XHU1MzNBXHVGRjA4XHU4MUVBXHU1MkE4XHU2OEMwXHU2RDRCXHVGRjA5XCIsXG5cdFx0a286IFwiZnJvbnRtYXR0ZXJcdUM3NTggY2xpcHBlZF9hdFx1QzVEMCBcdUMwQUNcdUM2QTlcdUQ1NjAgXHVDMkRDXHVBQzA0XHVCMzAwIChcdUM3OTBcdUIzRDkgXHVBQzEwXHVDOUMwKVwiLFxuXHR9LFxuXG5cdC8vIEZpbGUgbmFtZSB0ZW1wbGF0ZVxuXHRcImZpbGVOYW1lLm5hbWVcIjogeyBlbjogXCJGaWxlIG5hbWUgdGVtcGxhdGVcIiwgamE6IFwiXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHU1NDBEXHUzMEM2XHUzMEYzXHUzMEQ3XHUzMEVDXHUzMEZDXHUzMEM4XCIsIHpoOiBcIlx1NjU4N1x1NEVGNlx1NTQwRFx1NkEyMVx1Njc3RlwiLCBrbzogXCJcdUQzMENcdUM3N0NcdUJBODUgXHVEMTVDXHVENTBDXHVCOUJGXCIgfSxcblx0XCJmaWxlTmFtZS5kZXNjXCI6IHtcblx0XHRlbjogXCJWYXJpYWJsZXM6IHt5eXl5fSB7TU19IHtkZH0ge2hofSB7bW19IHtzc30ge3NvdXJjZX0ge2NoYXRfdGl0bGV9IHt0aXRsZX0gKFBybylcXG5FeGFtcGxlOiB7eXl5eX0te01NfS17ZGR9LXt0aXRsZX0gXHUyMTkyIDIwMjYtMDMtMDgtVW5kZXJzdGFuZGluZy1SdXN0LUxpZmV0aW1lc1wiLFxuXHRcdGphOiBcIlx1NTkwOVx1NjU3MDoge3l5eXl9IHtNTX0ge2RkfSB7aGh9IHttbX0ge3NzfSB7c291cmNlfSB7Y2hhdF90aXRsZX0ge3RpdGxlfSAoUHJvKVxcblx1NEY4Qjoge3l5eXl9LXtNTX0te2RkfS17dGl0bGV9IFx1MjE5MiAyMDI2LTAzLTA4LVJ1c3RcdTMwNkVcdTMwRTlcdTMwQTRcdTMwRDVcdTMwQkZcdTMwQTRcdTMwRTBcdTg5RTNcdThBQUNcIixcblx0XHR6aDogXCJcdTUzRDhcdTkxQ0Y6IHt5eXl5fSB7TU19IHtkZH0ge2hofSB7bW19IHtzc30ge3NvdXJjZX0ge2NoYXRfdGl0bGV9IHt0aXRsZX0gKFBybylcXG5cdTc5M0FcdTRGOEI6IHt5eXl5fS17TU19LXtkZH0te3RpdGxlfSBcdTIxOTIgMjAyNi0wMy0wOC1cdTc0MDZcdTg5RTNSdXN0XHU3NTFGXHU1NDdEXHU1NDY4XHU2NzFGXCIsXG5cdFx0a286IFwiXHVCQ0MwXHVDMjE4OiB7eXl5eX0ge01NfSB7ZGR9IHtoaH0ge21tfSB7c3N9IHtzb3VyY2V9IHtjaGF0X3RpdGxlfSB7dGl0bGV9IChQcm8pXFxuXHVDNjA4XHVDMkRDOiB7eXl5eX0te01NfS17ZGR9LXt0aXRsZX0gXHUyMTkyIDIwMjYtMDMtMDgtUnVzdC1cdUI3N0NcdUM3NzRcdUQ1MDRcdUQwQzBcdUM3ODQtXHVDNzc0XHVENTc0XCIsXG5cdH0sXG5cblx0Ly8gU3luYyBvbiBmb3JlZ3JvdW5kXG5cdFwic3luY09uRm9yZWdyb3VuZC5uYW1lXCI6IHsgZW46IFwiU3luYyBvbiBmb3JlZ3JvdW5kXCIsIGphOiBcIlx1MzBENVx1MzBBOVx1MzBBMlx1MzBCMFx1MzBFOVx1MzBBNlx1MzBGM1x1MzBDOVx1NUZBOVx1NUUzMFx1NjY0Mlx1MzA2Qlx1NTQwQ1x1NjcxRlwiLCB6aDogXCJcdTUyNERcdTUzRjBcdTYwNjJcdTU5MERcdTY1RjZcdTU0MENcdTZCNjVcIiwga286IFwiXHVEM0VDXHVBREY4XHVCNzdDXHVDNkI0XHVCNERDIFx1QkNGNVx1QURDMCBcdUMyREMgXHVCM0Q5XHVBRTMwXHVENjU0XCIgfSxcblx0XCJzeW5jT25Gb3JlZ3JvdW5kLmRlc2NcIjoge1xuXHRcdGVuOiBcIkF1dG9tYXRpY2FsbHkgc3luYyBjbGlwcyB3aGVuIHJldHVybmluZyB0byB0aGUgYXBwXCIsXG5cdFx0amE6IFwiXHUzMEEyXHUzMEQ3XHUzMEVBXHUzMDZCXHU2MjNCXHUzMDYzXHUzMDVGXHU2NjQyXHUzMDZCXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDkyXHU4MUVBXHU1MkQ1XHU1NDBDXHU2NzFGXCIsXG5cdFx0emg6IFwiXHU4RkQ0XHU1NkRFXHU1RTk0XHU3NTI4XHU2NUY2XHU4MUVBXHU1MkE4XHU1NDBDXHU2QjY1XHU1MjZBXHU4RjkxXCIsXG5cdFx0a286IFwiXHVDNTcxXHVDNzNDXHVCODVDIFx1QjNDQ1x1QzU0NFx1QzYyQyBcdUI1NEMgXHVDNzkwXHVCM0Q5XHVDNzNDXHVCODVDIFx1RDA3NFx1QjlCRCBcdUIzRDlcdUFFMzBcdUQ2NTRcIixcblx0fSxcblxuXHQvLyBMYW5ndWFnZSBzZXR0aW5nXG5cdFwibGFuZy5uYW1lXCI6IHsgZW46IFwiUGx1Z2luIGxhbmd1YWdlXCIsIGphOiBcIlx1MzBEN1x1MzBFOVx1MzBCMFx1MzBBNFx1MzBGM1x1OEEwMFx1OEE5RVwiLCB6aDogXCJcdTYzRDJcdTRFRjZcdThCRURcdThBMDBcIiwga286IFwiXHVENTBDXHVCN0VDXHVBREY4XHVDNzc4IFx1QzVCOFx1QzVCNFwiIH0sXG5cdFwibGFuZy5kZXNjXCI6IHtcblx0XHRlbjogXCJMYW5ndWFnZSBmb3IgcGx1Z2luIFVJXCIsXG5cdFx0amE6IFwiXHUzMEQ3XHUzMEU5XHUzMEIwXHUzMEE0XHUzMEYzVUlcdTMwNkVcdTg4NjhcdTc5M0FcdThBMDBcdThBOUVcIixcblx0XHR6aDogXCJcdTYzRDJcdTRFRjZcdTc1NENcdTk3NjJcdThCRURcdThBMDBcIixcblx0XHRrbzogXCJcdUQ1MENcdUI3RUNcdUFERjhcdUM3NzggVUkgXHVDNUI4XHVDNUI0XCIsXG5cdH0sXG5cdFwibGFuZy5hdXRvXCI6IHsgZW46IFwiQXV0b1wiLCBqYTogXCJcdTgxRUFcdTUyRDVcIiwgemg6IFwiXHU4MUVBXHU1MkE4XCIsIGtvOiBcIlx1Qzc5MFx1QjNEOVwiIH0sXG5cblx0Ly8gUHJvIHRhYiAtIGNvbXBhcmlzb24gdGFibGVcblx0XCJwcm8uZmVhdHVyZS5jbGlwVG9PYnNpZGlhblwiOiB7XG5cdFx0ZW46IFwiQ2xpcCBBSSByZXNwb25zZXMgdG8gT2JzaWRpYW5cIixcblx0XHRqYTogXCJBSVx1NTZERVx1N0I1NFx1MzA5Mk9ic2lkaWFuXHUzMDZCXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XCIsXG5cdFx0emg6IFwiXHU1QzA2QUlcdTU2REVcdTdCNTRcdTUyNkFcdThGOTFcdTUyMzBPYnNpZGlhblwiLFxuXHRcdGtvOiBcIkFJIFx1Qzc1MVx1QjJGNVx1Qzc0NCBPYnNpZGlhblx1QzVEMCBcdUQwNzRcdUI5QkRcIixcblx0fSxcblx0XCJwcm8uZmVhdHVyZS51bmxpbWl0ZWRDbGlwc1wiOiB7IGVuOiBcIlVubGltaXRlZCBjbGlwc1wiLCBqYTogXCJcdTcxMjFcdTUyMzZcdTk2NTBcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcIiwgemg6IFwiXHU2NUUwXHU5NjUwXHU1MjZBXHU4RjkxXCIsIGtvOiBcIlx1QkIzNFx1QzgxQ1x1RDU1QyBcdUQwNzRcdUI5QkRcIiB9LFxuXHRcInByby5mZWF0dXJlLmF1dG9UYWdzXCI6IHtcblx0XHRlbjogXCJBdXRvIHRhZ3MgJiB0aXRsZSBnZW5lcmF0aW9uXCIsXG5cdFx0amE6IFwiXHUzMEJGXHUzMEIwXHUzMEZCXHUzMEJGXHUzMEE0XHUzMEM4XHUzMEVCXHU4MUVBXHU1MkQ1XHU3NTFGXHU2MjEwXCIsXG5cdFx0emg6IFwiXHU4MUVBXHU1MkE4XHU2ODA3XHU3QjdFXHU1NDhDXHU2ODA3XHU5ODk4XHU3NTFGXHU2MjEwXCIsXG5cdFx0a286IFwiXHVDNzkwXHVCM0Q5IFx1RDBEQ1x1QURGOCBcdUJDMEYgXHVDODFDXHVCQUE5IFx1QzBERFx1QzEzMVwiLFxuXHR9LFxuXHRcInByby5mZWF0dXJlLnN1bW1hcnlcIjoge1xuXHRcdGVuOiBcIlN1bW1hcnkgaW4gZnJvbnRtYXR0ZXJcIixcblx0XHRqYTogXCJmcm9udG1hdHRlclx1MzA2Qlx1MzBCNVx1MzBERVx1MzBFQVx1MzBGQ1wiLFxuXHRcdHpoOiBcImZyb250bWF0dGVyXHU0RTJEXHU3Njg0XHU2NDU4XHU4OTgxXCIsXG5cdFx0a286IFwiZnJvbnRtYXR0ZXJcdUM1RDAgXHVDNjk0XHVDNTdEXCIsXG5cdH0sXG5cdFwicHJvLmZlYXR1cmUuc21hcnRGb2xkZXJcIjoge1xuXHRcdGVuOiBcIlNtYXJ0IGZvbGRlciBwbGFjZW1lbnRcIixcblx0XHRqYTogXCJcdTMwQjlcdTMwREVcdTMwRkNcdTMwQzhcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTYzMkZcdTMwOEFcdTUyMDZcdTMwNTFcIixcblx0XHR6aDogXCJcdTY2N0FcdTgwRkRcdTY1ODdcdTRFRjZcdTU5MzlcdTUyMDZcdTkxNERcIixcblx0XHRrbzogXCJcdUMyQTRcdUI5QzhcdUQyQjggXHVEM0Y0XHVCMzU0IFx1QkMzMFx1Q0U1OFwiLFxuXHR9LFxuXHRcInByby5mZWF0dXJlLndlZWtseURpZ2VzdFwiOiB7IGVuOiBcIldlZWtseSBEaWdlc3RcIiwgamE6IFwiXHU5MDMxXHU5NTkzXHUzMEMwXHUzMEE0XHUzMEI4XHUzMEE3XHUzMEI5XHUzMEM4XCIsIHpoOiBcIlx1NkJDRlx1NTQ2OFx1NjQ1OFx1ODk4MVwiLCBrbzogXCJcdUM4RkNcdUFDMDQgXHVCMkU0XHVDNzc0XHVDODFDXHVDMkE0XHVEMkI4XCIgfSxcblx0XCJwcm8uY3RhLnVwZ3JhZGVcIjoge1xuXHRcdGVuOiBcIlVwZ3JhZGUgdG8gUHJvIFx1MjE5MlwiLFxuXHRcdGphOiBcIlByb1x1MzBEN1x1MzBFOVx1MzBGM1x1MzA2Qlx1MzBBMlx1MzBDM1x1MzBEN1x1MzBCMFx1MzBFQ1x1MzBGQ1x1MzBDOSBcdTIxOTJcIixcblx0XHR6aDogXCJcdTUzNDdcdTdFQTdcdTUyMzBQcm8gXHUyMTkyXCIsXG5cdFx0a286IFwiUHJvXHVCODVDIFx1QzVDNVx1QURGOFx1QjgwOFx1Qzc3NFx1QjREQyBcdTIxOTJcIixcblx0fSxcblxuXHQvLyBQcm8gdGFiIC0gZm9sZGVyIHNldHRpbmdzXG5cdFwicHJvLmZvbGRlckRlc2NcIjoge1xuXHRcdGVuOiBcIkFJQ2hhdENsaXAgZGV0ZWN0cyBtYXJrZXIgZmlsZXMgaW4geW91ciBmb2xkZXJzIGFuZCB1c2VzIHRoZW0gZm9yIGF1dG8tY2xhc3NpZmljYXRpb24uIE9ubHkgZm9sZGVycyB3aXRoIGEgbWFya2VyIGZpbGUgYXJlIGVsaWdpYmxlIFx1MjAxNCBmb2xkZXJzIHdpdGhvdXQgb25lIGFyZSBuZXZlciB1c2VkLiBZb3UgY2FuIGNob29zZSBhbnkgZmlsZW5hbWUgKGRlZmF1bHQ6IFJFQURNRSksIGJ1dCBpdCBtdXN0IGJlIHRoZSBzYW1lIGFjcm9zcyB5b3VyIGVudGlyZSB2YXVsdC4gVGhlIGNvbnRlbnQgaXMgZnJlZWZvcm0gXHUyMDE0IGRlc2NyaWJpbmcgdGhlIGZvbGRlcidzIHB1cnBvc2UgaW1wcm92ZXMgYWNjdXJhY3kuXCIsXG5cdFx0amE6IFwiXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDkyXHU2OTFDXHU3N0U1XHUzMDU3XHUzMDY2XHU4MUVBXHU1MkQ1XHU1MjA2XHU5ODVFXHUzMDZCXHU0RjdGXHUzMDQ0XHUzMDdFXHUzMDU5XHUzMDAyXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHUzMDRDXHUzMDQyXHUzMDhCXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDYwXHUzMDUxXHUzMDRDXHU2MzJGXHUzMDhBXHU1MjA2XHUzMDUxXHU1MTQ4XHUzMDZCXHUzMDZBXHUzMDhBXHUzMDAxXHUzMDZBXHUzMDQ0XHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDZCXHUzMDZGXHU2MzJGXHUzMDhBXHU1MjA2XHUzMDUxXHUzMDg5XHUzMDhDXHUzMDdFXHUzMDVCXHUzMDkzXHUzMDAyXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHU1NDBEXHUzMDZGXHU4MUVBXHU3NTMxXHUzMDZCXHU2QzdBXHUzMDgxXHUzMDg5XHUzMDhDXHUzMDdFXHUzMDU5XHUzMDRDXHVGRjA4XHUzMEM3XHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEM4OiBSRUFETUVcdUZGMDlcdTMwMDFWYXVsdFx1NTE2OFx1NEY1M1x1MzA2N1x1N0Q3MVx1NEUwMFx1MzA1OVx1MzA4Qlx1NUZDNVx1ODk4MVx1MzA0Q1x1MzA0Mlx1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMlx1NTE4NVx1NUJCOVx1MzA2Rlx1ODFFQVx1NzUzMVx1MzA2N1x1MzA1OVx1MzA0Q1x1MzAwMVx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzA2RVx1NzUyOFx1OTAxNFx1MzA5Mlx1NjZGOFx1MzA0Rlx1MzA2OFx1NTIwNlx1OTg1RVx1N0NCRVx1NUVBNlx1MzA0Q1x1NEUwQVx1MzA0Q1x1MzA4QVx1MzA3RVx1MzA1OVx1MzAwMlwiLFxuXHRcdHpoOiBcIkFJQ2hhdENsaXAgXHU2OEMwXHU2RDRCXHU2NTg3XHU0RUY2XHU1OTM5XHU0RTJEXHU3Njg0XHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2XHU1RTc2XHU3NTI4XHU0RThFXHU4MUVBXHU1MkE4XHU1MjA2XHU3QzdCXHUzMDAyXHU1M0VBXHU2NzA5XHU1MzA1XHU1NDJCXHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU2MjREXHU0RjFBXHU4OEFCXHU0RjdGXHU3NTI4XHUyMDE0XHUyMDE0XHU2Q0ExXHU2NzA5XHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2XHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XHU0RTBEXHU0RjFBXHU4OEFCXHU1MjA2XHU5MTREXHUzMDAyXHU2NTg3XHU0RUY2XHU1NDBEXHU1M0VGXHU0RUU1XHU4MUVBXHU3NTMxXHU5MDA5XHU2MkU5XHVGRjA4XHU5RUQ4XHU4QkE0OiBSRUFETUVcdUZGMDlcdUZGMENcdTRGNDZcdTVGQzVcdTk4N0JcdTU3MjhcdTY1NzRcdTRFMkFcdTVFOTNcdTRFMkRcdTdFREZcdTRFMDBcdTMwMDJcdTUxODVcdTVCQjlcdTUzRUZcdTRFRTVcdTY2MkZcdTRFRkJcdTYxMEZcdTY1ODdcdTY3MkNcdTIwMTRcdTIwMTRcdTYzQ0ZcdThGRjBcdTY1ODdcdTRFRjZcdTU5MzlcdTc1MjhcdTkwMTRcdTUzRUZcdTRFRTVcdTYzRDBcdTlBRDhcdTUxQzZcdTc4NkVcdTVFQTZcdTMwMDJcIixcblx0XHRrbzogXCJBSUNoYXRDbGlwXHVDNzQwIFx1RDNGNFx1QjM1NFx1Qzc1OCBcdUI5QzhcdUNFRTQgXHVEMzBDXHVDNzdDXHVDNzQ0IFx1QUMxMFx1QzlDMFx1RDU1OFx1QzVFQyBcdUM3OTBcdUIzRDkgXHVCRDg0XHVCOTU4XHVDNUQwIFx1QzBBQ1x1QzZBOVx1RDU2OVx1QjJDOFx1QjJFNC4gXHVCOUM4XHVDRUU0IFx1RDMwQ1x1Qzc3Q1x1Qzc3NCBcdUM3ODhcdUIyOTQgXHVEM0Y0XHVCMzU0XHVCOUNDIFx1QjMwMFx1QzBDMVx1Qzc3NCBcdUI0MThcdUJBNzAsIFx1QzVDNlx1QjI5NCBcdUQzRjRcdUIzNTRcdUM1RDBcdUIyOTQgXHVCQzMwXHVDRTU4XHVCNDE4XHVDOUMwIFx1QzU0QVx1QzJCNVx1QjJDOFx1QjJFNC4gXHVEMzBDXHVDNzdDXHVCQTg1XHVDNzQwIFx1Qzc5MFx1QzcyMFx1Qjg2RFx1QUM4QyBcdUM4MTVcdUQ1NjAgXHVDMjE4IFx1Qzc4OFx1QzlDMFx1QjlDQyhcdUFFMzBcdUJDRjg6IFJFQURNRSksIFx1QkNGQ1x1RDJCOCBcdUM4MDRcdUNDQjRcdUM1RDBcdUMxMUMgXHVEMUI1XHVDNzdDXHVENTc0XHVDNTdDIFx1RDU2OVx1QjJDOFx1QjJFNC4gXHVCMEI0XHVDNkE5XHVDNzQwIFx1Qzc5MFx1QzcyMFx1Qjg2RFx1QzlDMFx1QjlDQywgXHVEM0Y0XHVCMzU0XHVDNzU4IFx1QzZBOVx1QjNDNFx1Qjk3QyBcdUM4MDFcdUM3M0NcdUJBNzQgXHVCRDg0XHVCOTU4IFx1QzgxNVx1RDY1NVx1QjNDNFx1QUMwMCBcdUQ1QTVcdUMwQzFcdUI0MjlcdUIyQzhcdUIyRTQuXCIsXG5cdH0sXG5cdFwicHJvLmZvbGRlckRvY3NMaW5rXCI6IHtcblx0XHRlbjogXCJMZWFybiBtb3JlIGFib3V0IG1hcmtlciBmaWxlcyBcdTIxOTJcIixcblx0XHRqYTogXCJcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNkJcdTMwNjRcdTMwNDRcdTMwNjZcdThBNzNcdTMwNTdcdTMwNEYgXHUyMTkyXCIsXG5cdFx0emg6IFwiXHU0RTg2XHU4OUUzXHU2NkY0XHU1OTFBXHU1MTczXHU0RThFXHU2ODA3XHU4QkIwXHU2NTg3XHU0RUY2IFx1MjE5MlwiLFxuXHRcdGtvOiBcIlx1QjlDOFx1Q0VFNCBcdUQzMENcdUM3N0NcdUM1RDAgXHVCMzAwXHVENTc0IFx1Qzc5MFx1QzEzOFx1RDc4OCBcdTIxOTJcIixcblx0fSxcblx0XCJwcm8uYXV0b1NjYW4ubmFtZVwiOiB7XG5cdFx0ZW46IFwiQXV0by1zY2FuIGZvbGRlcnMgb24gc3luY1wiLFxuXHRcdGphOiBcIlx1NTQwQ1x1NjcxRlx1NjY0Mlx1MzA2Qlx1MzBENVx1MzBBOVx1MzBFQlx1MzBDMFx1MzA5Mlx1ODFFQVx1NTJENVx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1wiLFxuXHRcdHpoOiBcIlx1NTQwQ1x1NkI2NVx1NjVGNlx1ODFFQVx1NTJBOFx1NjI2Qlx1NjNDRlx1NjU4N1x1NEVGNlx1NTkzOVwiLFxuXHRcdGtvOiBcIlx1QjNEOVx1QUUzMFx1RDY1NCBcdUMyREMgXHVEM0Y0XHVCMzU0IFx1Qzc5MFx1QjNEOSBcdUMyQTRcdUNFOTRcIixcblx0fSxcblx0XCJwcm8uYXV0b1NjYW4uZGVzY1wiOiB7XG5cdFx0ZW46IFwiQXV0b21hdGljYWxseSBzY2FuIGFuZCB1cGxvYWQgZm9sZGVyIHN0cnVjdHVyZSB3aGVuIHN5bmNpbmcgY2xpcHNcIixcblx0XHRqYTogXCJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTU0MENcdTY3MUZcdTY2NDJcdTMwNkJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTY5Q0JcdTkwMjBcdTMwOTJcdTgxRUFcdTUyRDVcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdUZGMDZcdTMwQTJcdTMwQzNcdTMwRDdcdTMwRURcdTMwRkNcdTMwQzlcIixcblx0XHR6aDogXCJcdTU0MENcdTZCNjVcdTUyNkFcdThGOTFcdTY1RjZcdTgxRUFcdTUyQThcdTYyNkJcdTYzQ0ZcdTVFNzZcdTRFMEFcdTRGMjBcdTY1ODdcdTRFRjZcdTU5MzlcdTdFRDNcdTY3ODRcIixcblx0XHRrbzogXCJcdUQwNzRcdUI5QkQgXHVCM0Q5XHVBRTMwXHVENjU0IFx1QzJEQyBcdUQzRjRcdUIzNTQgXHVBRDZDXHVDODcwIFx1Qzc5MFx1QjNEOSBcdUMyQTRcdUNFOTQgXHVCQzBGIFx1QzVDNVx1Qjg1Q1x1QjREQ1wiLFxuXHR9LFxuXHRcInByby5zY2FuUm9vdC5uYW1lXCI6IHsgZW46IFwiRm9sZGVyIHNjYW4gcm9vdFwiLCBqYTogXCJcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTMwRUJcdTMwRkNcdTMwQzhcIiwgemg6IFwiXHU2MjZCXHU2M0NGXHU2ODM5XHU3NkVFXHU1RjU1XCIsIGtvOiBcIlx1QzJBNFx1Q0U5NCBcdUI4RThcdUQyQjhcIiB9LFxuXHRcInByby5zY2FuUm9vdC5kZXNjXCI6IHtcblx0XHRlbjogXCJSb290IGZvbGRlciB0byBzY2FuIGZvciBtYXJrZXIgZmlsZXMuIExlYXZlIGVtcHR5IHRvIHNjYW4gdGhlIGVudGlyZSB2YXVsdC5cIixcblx0XHRqYTogXCJcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwOTJcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTMwNTlcdTMwOEJcdTMwRUJcdTMwRkNcdTMwQzhcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwMDJcdTdBN0FcdTZCMDRcdTMwNjdWYXVsdFx1NTE2OFx1NEY1M1x1MzA5Mlx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1x1MzAwMlwiLFxuXHRcdHpoOiBcIlx1NjI2Qlx1NjNDRlx1NjgwN1x1OEJCMFx1NjU4N1x1NEVGNlx1NzY4NFx1NjgzOVx1NjU4N1x1NEVGNlx1NTkzOVx1MzAwMlx1NzU1OVx1N0E3QVx1NEVFNVx1NjI2Qlx1NjNDRlx1NjU3NFx1NEUyQVx1NUU5M1x1MzAwMlwiLFxuXHRcdGtvOiBcIlx1QjlDOFx1Q0VFNCBcdUQzMENcdUM3N0NcdUM3NDQgXHVDMkE0XHVDRTk0XHVENTYwIFx1QjhFOFx1RDJCOCBcdUQzRjRcdUIzNTQuIFx1QkU0NFx1QzZDQ1x1QjQ1MFx1QkE3NCBcdUM4MDRcdUNDQjQgXHVCQ0ZDXHVEMkI4XHVCOTdDIFx1QzJBNFx1Q0U5NFx1RDU2OVx1QjJDOFx1QjJFNC5cIixcblx0fSxcblx0XCJwcm8uc2NhblJvb3QucGxhY2Vob2xkZXJcIjogeyBlbjogXCIoZW50aXJlIHZhdWx0KVwiLCBqYTogXCJcdUZGMDhWYXVsdFx1NTE2OFx1NEY1M1x1RkYwOVwiLCB6aDogXCJcdUZGMDhcdTY1NzRcdTRFMkFcdTVFOTNcdUZGMDlcIiwga286IFwiKFx1QzgwNFx1Q0NCNCBcdUJDRkNcdUQyQjgpXCIgfSxcblx0XCJwcm8ubWFya2VyLm5hbWVcIjogeyBlbjogXCJNYXJrZXIgZmlsZW5hbWVcIiwgamE6IFwiXHUzMERFXHUzMEZDXHUzMEFCXHUzMEZDXHUzMEQ1XHUzMEExXHUzMEE0XHUzMEVCXHU1NDBEXCIsIHpoOiBcIlx1NjgwN1x1OEJCMFx1NjU4N1x1NEVGNlx1NTQwRFwiLCBrbzogXCJcdUI5QzhcdUNFRTQgXHVEMzBDXHVDNzdDXHVCQTg1XCIgfSxcblx0XCJwcm8ubWFya2VyLmRlc2NcIjoge1xuXHRcdGVuOiBcIkZpbGVuYW1lIHN0ZW0gdG8gZGV0ZWN0IGFzIGZvbGRlciBkZXNjcmlwdGlvbiAoZS5nLiBSRUFETUUgXHUyMTkyIFJFQURNRS5tZClcIixcblx0XHRqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdThBQUNcdTY2MEVcdTMwNjhcdTMwNTdcdTMwNjZcdTY5MUNcdTUxRkFcdTMwNTlcdTMwOEJcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTU0MERcdUZGMDhcdTRGOEI6IFJFQURNRSBcdTIxOTIgUkVBRE1FLm1kXHVGRjA5XCIsXG5cdFx0emg6IFwiXHU0RjVDXHU0RTNBXHU2NTg3XHU0RUY2XHU1OTM5XHU2M0NGXHU4RkYwXHU2OEMwXHU2RDRCXHU3Njg0XHU2NTg3XHU0RUY2XHU1NDBEXHVGRjA4XHU1OTgyIFJFQURNRSBcdTIxOTIgUkVBRE1FLm1kXHVGRjA5XCIsXG5cdFx0a286IFwiXHVEM0Y0XHVCMzU0IFx1QzEyNFx1QkE4NVx1QzczQ1x1Qjg1QyBcdUFDMTBcdUM5QzBcdUQ1NjAgXHVEMzBDXHVDNzdDXHVCQTg1IChcdUM2MDg6IFJFQURNRSBcdTIxOTIgUkVBRE1FLm1kKVwiLFxuXHR9LFxuXHRcInByby5zY2FuTm93Lm5hbWVcIjogeyBlbjogXCJTY2FuIGZvbGRlcnMgbm93XCIsIGphOiBcIlx1NEVDQVx1MzA1OVx1MzA1MFx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1wiLCB6aDogXCJcdTdBQ0JcdTUzNzNcdTYyNkJcdTYzQ0ZcIiwga286IFwiXHVDOUMwXHVBRTA4IFx1QzJBNFx1Q0U5NFwiIH0sXG5cdFwicHJvLnNjYW5Ob3cuZGVzY1wiOiB7XG5cdFx0ZW46IFwiU2NhbiBtYXJrZXIgZmlsZXMgYW5kIHVwbG9hZCBmb2xkZXIgc3RydWN0dXJlIHRvIHRoZSBzZXJ2ZXJcIixcblx0XHRqYTogXCJcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwOTJcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTMwNTdcdTMwNjZcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTY5Q0JcdTkwMjBcdTMwOTJcdTMwQjVcdTMwRkNcdTMwRDBcdTMwRkNcdTMwNkJcdTMwQTJcdTMwQzNcdTMwRDdcdTMwRURcdTMwRkNcdTMwQzlcIixcblx0XHR6aDogXCJcdTYyNkJcdTYzQ0ZcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcdTVFNzZcdTVDMDZcdTY1ODdcdTRFRjZcdTU5MzlcdTdFRDNcdTY3ODRcdTRFMEFcdTRGMjBcdTUyMzBcdTY3MERcdTUyQTFcdTU2NjhcIixcblx0XHRrbzogXCJcdUI5QzhcdUNFRTQgXHVEMzBDXHVDNzdDXHVDNzQ0IFx1QzJBNFx1Q0U5NFx1RDU1OFx1QUNFMCBcdUQzRjRcdUIzNTQgXHVBRDZDXHVDODcwXHVCOTdDIFx1QzExQ1x1QkM4NFx1QzVEMCBcdUM1QzVcdUI4NUNcdUI0RENcIixcblx0fSxcblx0XCJwcm8uc2Nhbk5vdy5idXR0b25cIjogeyBlbjogXCJTY2FuICYgVXBsb2FkXCIsIGphOiBcIlx1MzBCOVx1MzBBRFx1MzBFM1x1MzBGM1x1RkYwNlx1MzBBMlx1MzBDM1x1MzBEN1x1MzBFRFx1MzBGQ1x1MzBDOVwiLCB6aDogXCJcdTYyNkJcdTYzQ0ZcdTVFNzZcdTRFMEFcdTRGMjBcIiwga286IFwiXHVDMkE0XHVDRTk0IFx1QkMwRiBcdUM1QzVcdUI4NUNcdUI0RENcIiB9LFxuXHRcInByby5yZWFkbWUubmFtZVwiOiB7IGVuOiBcIk1hcmtlciBmaWxlIHRlbXBsYXRlXCIsIGphOiBcIlx1MzBERVx1MzBGQ1x1MzBBQlx1MzBGQ1x1MzBENVx1MzBBMVx1MzBBNFx1MzBFQlx1MzBDNlx1MzBGM1x1MzBEN1x1MzBFQ1x1MzBGQ1x1MzBDOFwiLCB6aDogXCJcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcdTZBMjFcdTY3N0ZcIiwga286IFwiXHVCOUM4XHVDRUU0IFx1RDMwQ1x1Qzc3QyBcdUQxNUNcdUQ1MENcdUI5QkZcIiB9LFxuXHRcInByby5yZWFkbWUuZGVzY1wiOiB7XG5cdFx0ZW46IFwiQ29weSBhIHN0YXJ0ZXIgdGVtcGxhdGUgZm9yIGZvbGRlciBtYXJrZXIgZmlsZXNcIixcblx0XHRqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwREVcdTMwRkNcdTMwQUJcdTMwRkNcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcdTMwNkVcdTMwQzZcdTMwRjNcdTMwRDdcdTMwRUNcdTMwRkNcdTMwQzhcdTMwOTJcdTMwQjNcdTMwRDRcdTMwRkNcIixcblx0XHR6aDogXCJcdTU5MERcdTUyMzZcdTY1ODdcdTRFRjZcdTU5MzlcdTY4MDdcdThCQjBcdTY1ODdcdTRFRjZcdTc2ODRcdTZBMjFcdTY3N0ZcIixcblx0XHRrbzogXCJcdUQzRjRcdUIzNTQgXHVCOUM4XHVDRUU0IFx1RDMwQ1x1Qzc3Q1x1QzZBOSBcdUQxNUNcdUQ1MENcdUI5QkYgXHVCQ0Y1XHVDMEFDXCIsXG5cdH0sXG5cdFwicHJvLnJlYWRtZS5idXR0b25cIjogeyBlbjogXCJDb3B5IHRvIGNsaXBib2FyZFwiLCBqYTogXCJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwRENcdTMwRkNcdTMwQzlcdTMwNkJcdTMwQjNcdTMwRDRcdTMwRkNcIiwgemg6IFwiXHU1OTBEXHU1MjM2XHU1MjMwXHU1MjZBXHU4RDM0XHU2NzdGXCIsIGtvOiBcIlx1RDA3NFx1QjlCRFx1QkNGNFx1QjREQ1x1QzVEMCBcdUJDRjVcdUMwQUNcIiB9LFxuXG5cdC8vIEFJIEN1c3RvbWl6YXRpb25cblx0XCJwcm8uYWlDdXN0b21pemF0aW9uXCI6IHsgZW46IFwiQUkgQ3VzdG9taXphdGlvblwiLCBqYTogXCJBSVx1MzBBQlx1MzBCOVx1MzBCRlx1MzBERVx1MzBBNFx1MzBCQVwiLCB6aDogXCJBSVx1ODFFQVx1NUI5QVx1NEU0OVwiLCBrbzogXCJBSSBcdUNFRTRcdUMyQTRcdUQxMzBcdUI5QzhcdUM3NzRcdUM5RDVcIiB9LFxuXHRcInByby50aXRsZUxhbmcubmFtZVwiOiB7IGVuOiBcIlRpdGxlIGxhbmd1YWdlXCIsIGphOiBcIlx1MzBCRlx1MzBBNFx1MzBDOFx1MzBFQlx1OEEwMFx1OEE5RVwiLCB6aDogXCJcdTY4MDdcdTk4OThcdThCRURcdThBMDBcIiwga286IFwiXHVDODFDXHVCQUE5IFx1QzVCOFx1QzVCNFwiIH0sXG5cdFwicHJvLnRpdGxlTGFuZy5kZXNjXCI6IHtcblx0XHRlbjogXCJMYW5ndWFnZSBmb3IgQUktZ2VuZXJhdGVkIHRpdGxlcyAoc2F2ZWQgdG8gc2VydmVyKVwiLFxuXHRcdGphOiBcIkFJXHU3NTFGXHU2MjEwXHUzMEJGXHUzMEE0XHUzMEM4XHUzMEVCXHUzMDZFXHU4QTAwXHU4QTlFXHVGRjA4XHUzMEI1XHUzMEZDXHUzMEQwXHUzMEZDXHUzMDZCXHU0RkREXHU1QjU4XHVGRjA5XCIsXG5cdFx0emg6IFwiQUlcdTc1MUZcdTYyMTBcdTY4MDdcdTk4OThcdTc2ODRcdThCRURcdThBMDBcdUZGMDhcdTRGRERcdTVCNThcdTUyMzBcdTY3MERcdTUyQTFcdTU2NjhcdUZGMDlcIixcblx0XHRrbzogXCJBSSBcdUMwRERcdUMxMzEgXHVDODFDXHVCQUE5XHVDNzU4IFx1QzVCOFx1QzVCNCAoXHVDMTFDXHVCQzg0XHVDNUQwIFx1QzgwMFx1QzdBNSlcIixcblx0fSxcblx0XCJwcm8udGFnUnVsZS5uYW1lXCI6IHsgZW46IFwiVGFnIHJ1bGUgZmlsZVwiLCBqYTogXCJcdTMwQkZcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRUJcdTMwRDVcdTMwQTFcdTMwQTRcdTMwRUJcIiwgemg6IFwiXHU2ODA3XHU3QjdFXHU4OUM0XHU1MjE5XHU2NTg3XHU0RUY2XCIsIGtvOiBcIlx1RDBEQ1x1QURGOCBcdUFERENcdUNFNTkgXHVEMzBDXHVDNzdDXCIgfSxcblx0XCJwcm8udGFnUnVsZS5kZXNjXCI6IHtcblx0XHRlbjogXCJQYXRoIHRvIGEgbWFya2Rvd24gZmlsZSB3aXRoIGN1c3RvbSB0YWcgcnVsZXMgKHdpdGhvdXQgLm1kIGV4dGVuc2lvbilcIixcblx0XHRqYTogXCJcdTMwQUJcdTMwQjlcdTMwQkZcdTMwRTBcdTMwQkZcdTMwQjBcdTMwRUJcdTMwRkNcdTMwRUJcdTMwNkVNYXJrZG93blx1MzBENVx1MzBBMVx1MzBBNFx1MzBFQlx1MzBEMVx1MzBCOVx1RkYwOC5tZFx1NjJFMVx1NUYzNVx1NUI1MFx1MzA2QVx1MzA1N1x1RkYwOVwiLFxuXHRcdHpoOiBcIlx1ODFFQVx1NUI5QVx1NEU0OVx1NjgwN1x1N0I3RVx1ODlDNFx1NTIxOVx1NzY4NE1hcmtkb3duXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU0RTBEXHU1NDJCLm1kXHU2MjY5XHU1QzU1XHU1NDBEXHVGRjA5XCIsXG5cdFx0a286IFwiXHVDRUU0XHVDMkE0XHVEMTQwIFx1RDBEQ1x1QURGOCBcdUFERENcdUNFNTkgTWFya2Rvd24gXHVEMzBDXHVDNzdDIFx1QUNCRFx1Qjg1QyAoLm1kIFx1RDY1NVx1QzdBNVx1Qzc5MCBcdUM4MUNcdUM2NzgpXCIsXG5cdH0sXG5cblx0Ly8gTm90aWNlc1xuXHRcIm5vdGljZS5jb25uZWN0ZWRcIjogeyBlbjogXCJDb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5IVwiLCBqYTogXCJcdTYzQTVcdTdEOUFcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcdUZGMDFcIiwgemg6IFwiXHU4RkRFXHU2M0E1XHU2MjEwXHU1MjlGXHVGRjAxXCIsIGtvOiBcIlx1QzVGMFx1QUNCMCBcdUMxMzFcdUFDRjUhXCIgfSxcblx0XCJub3RpY2Uuc3luY0luUHJvZ3Jlc3NcIjogeyBlbjogXCJTeW5jIGFscmVhZHkgaW4gcHJvZ3Jlc3NcIiwgamE6IFwiXHU1NDBDXHU2NzFGXHU0RTJEXHUzMDY3XHUzMDU5XCIsIHpoOiBcIlx1NkI2M1x1NTcyOFx1NTQwQ1x1NkI2NVx1NEUyRFwiLCBrbzogXCJcdUIzRDlcdUFFMzBcdUQ2NTQgXHVDOUM0XHVENTg5IFx1QzkxMVwiIH0sXG5cdFwibm90aWNlLm5vVG9rZW5cIjoge1xuXHRcdGVuOiBcIlBsZWFzZSBzZXQgeW91ciBzZXNzaW9uIHRva2VuIGluIHNldHRpbmdzXCIsXG5cdFx0amE6IFwiXHU4QTJEXHU1QjlBXHUzMDY3XHUzMEJCXHUzMEMzXHUzMEI3XHUzMEU3XHUzMEYzXHUzMEM4XHUzMEZDXHUzMEFGXHUzMEYzXHUzMDkyXHU4QTJEXHU1QjlBXHUzMDU3XHUzMDY2XHUzMDRGXHUzMDYwXHUzMDU1XHUzMDQ0XCIsXG5cdFx0emg6IFwiXHU4QkY3XHU1NzI4XHU4QkJFXHU3RjZFXHU0RTJEXHU4QkJFXHU3RjZFXHU0RjFBXHU4QkREXHU0RUU0XHU3MjRDXCIsXG5cdFx0a286IFwiXHVDMTI0XHVDODE1XHVDNUQwXHVDMTFDIFx1QzEzOFx1QzE1OCBcdUQxQTBcdUQwNzBcdUM3NDQgXHVDMTI0XHVDODE1XHVENTU4XHVDMTM4XHVDNjk0XCIsXG5cdH0sXG5cdFwibm90aWNlLm5vTmV3Q2xpcHNcIjogeyBlbjogXCJObyBuZXcgY2xpcHMgdG8gc3luY1wiLCBqYTogXCJcdTY1QjBcdTMwNTdcdTMwNDRcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwNkZcdTMwNDJcdTMwOEFcdTMwN0VcdTMwNUJcdTMwOTNcIiwgemg6IFwiXHU2Q0ExXHU2NzA5XHU2NUIwXHU3Njg0XHU1MjZBXHU4RjkxXCIsIGtvOiBcIlx1QzBDOCBcdUQwNzRcdUI5QkQgXHVDNUM2XHVDNzRDXCIgfSxcblx0XCJub3RpY2Uuc3luY2VkXCI6IHsgZW46IFwiU3luY2VkIHtjb3VudH0gY2xpcChzKVwiLCBqYTogXCJ7Y291bnR9XHU0RUY2XHUzMDZFXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDkyXHU1NDBDXHU2NzFGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsIHpoOiBcIlx1NURGMlx1NTQwQ1x1NkI2NXtjb3VudH1cdTRFMkFcdTUyNkFcdThGOTFcIiwga286IFwie2NvdW50fVx1QUMxQyBcdUQwNzRcdUI5QkQgXHVCM0Q5XHVBRTMwXHVENjU0IFx1QzY0NFx1QjhDQ1wiIH0sXG5cdFwibm90aWNlLnN5bmNQYXJ0aWFsXCI6IHtcblx0XHRlbjogXCJTeW5jZWQge3N5bmNlZH0sIGZhaWxlZCB7ZmFpbGVkfS4gQ2hlY2sgY29uc29sZSBmb3IgZGV0YWlscy5cIixcblx0XHRqYTogXCJcdTU0MENcdTY3MUYge3N5bmNlZH1cdTRFRjZcdTMwMDFcdTU5MzFcdTY1NTcge2ZhaWxlZH1cdTRFRjZcdTMwMDJcdThBNzNcdTdEMzBcdTMwNkZcdTMwQjNcdTMwRjNcdTMwQkRcdTMwRkNcdTMwRUJcdTMwOTJcdTc4QkFcdThBOERcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcdTMwMDJcIixcblx0XHR6aDogXCJcdTVERjJcdTU0MENcdTZCNjV7c3luY2VkfVx1NEUyQVx1RkYwQ1x1NTkzMVx1OEQyNXtmYWlsZWR9XHU0RTJBXHUzMDAyXHU4QkU2XHU2MEM1XHU4QkY3XHU2N0U1XHU3NzBCXHU2M0E3XHU1MjM2XHU1M0YwXHUzMDAyXCIsXG5cdFx0a286IFwiXHVCM0Q5XHVBRTMwXHVENjU0IHtzeW5jZWR9XHVBQzFDLCBcdUMyRTRcdUQzMjgge2ZhaWxlZH1cdUFDMUMuIFx1Qzc5MFx1QzEzOFx1RDU1QyBcdUIwQjRcdUM2QTlcdUM3NDAgXHVDRjU4XHVDMTk0XHVDNzQ0IFx1RDY1NVx1Qzc3OFx1RDU1OFx1QzEzOFx1QzY5NC5cIixcblx0fSxcblx0XCJub3RpY2Uuc3luY0ZhaWxlZFwiOiB7IGVuOiBcIlN5bmMgZmFpbGVkIC0ge21zZ31cIiwgamE6IFwiXHU1NDBDXHU2NzFGXHU1OTMxXHU2NTU3IC0ge21zZ31cIiwgemg6IFwiXHU1NDBDXHU2QjY1XHU1OTMxXHU4RDI1IC0ge21zZ31cIiwga286IFwiXHVCM0Q5XHVBRTMwXHVENjU0IFx1QzJFNFx1RDMyOCAtIHttc2d9XCIgfSxcblx0XCJub3RpY2UubmV3Q2xpcFN5bmNlZFwiOiB7IGVuOiBcIk5ldyBjbGlwIHN5bmNlZFwiLCBqYTogXCJcdTY1QjBcdTMwNTdcdTMwNDRcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwOTJcdTU0MENcdTY3MUZcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIiwgemg6IFwiXHU2NUIwXHU1MjZBXHU4RjkxXHU1REYyXHU1NDBDXHU2QjY1XCIsIGtvOiBcIlx1QzBDOCBcdUQwNzRcdUI5QkQgXHVCM0Q5XHVBRTMwXHVENjU0XHVCNDI4XCIgfSxcblx0XCJub3RpY2UucHJpbWFyeVNldFwiOiB7XG5cdFx0ZW46IFwiVGhpcyBkZXZpY2UgaXMgbm93IHByaW1hcnlcIixcblx0XHRqYTogXCJcdTMwNTNcdTMwNkVcdTMwQzdcdTMwRDBcdTMwQTRcdTMwQjlcdTMwOTJcdTMwRDdcdTMwRTlcdTMwQTRcdTMwREVcdTMwRUFcdTMwNkJcdThBMkRcdTVCOUFcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIixcblx0XHR6aDogXCJcdTZCNjRcdThCQkVcdTU5MDdcdTVERjJcdThCQkVcdTRFM0FcdTRFM0JcdThCQkVcdTU5MDdcIixcblx0XHRrbzogXCJcdUM3NzQgXHVBRTMwXHVBRTMwXHVBQzAwIFx1QUUzMFx1QkNGOCBcdUFFMzBcdUFFMzBcdUI4NUMgXHVDMTI0XHVDODE1XHVCNDE4XHVDNUM4XHVDMkI1XHVCMkM4XHVCMkU0XCIsXG5cdH0sXG5cdFwibm90aWNlLnByaW1hcnlGYWlsZWRcIjoge1xuXHRcdGVuOiBcIkZhaWxlZCB0byBzZXQgcHJpbWFyeSBkZXZpY2VcIixcblx0XHRqYTogXCJcdTMwRDdcdTMwRTlcdTMwQTRcdTMwREVcdTMwRUFcdTMwQzdcdTMwRDBcdTMwQTRcdTMwQjlcdTMwNkVcdThBMkRcdTVCOUFcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIixcblx0XHR6aDogXCJcdThCQkVcdTdGNkVcdTRFM0JcdThCQkVcdTU5MDdcdTU5MzFcdThEMjVcIixcblx0XHRrbzogXCJcdUFFMzBcdUJDRjggXHVBRTMwXHVBRTMwIFx1QzEyNFx1QzgxNSBcdUMyRTRcdUQzMjhcIixcblx0fSxcblx0XCJub3RpY2Uuc2lnbkluRmlyc3RcIjogeyBlbjogXCJQbGVhc2Ugc2lnbiBpbiBmaXJzdFwiLCBqYTogXCJcdTUxNDhcdTMwNkJcdTMwQjVcdTMwQTRcdTMwRjNcdTMwQTRcdTMwRjNcdTMwNTdcdTMwNjZcdTMwNEZcdTMwNjBcdTMwNTVcdTMwNDRcIiwgemg6IFwiXHU4QkY3XHU1MTQ4XHU3NjdCXHU1RjU1XCIsIGtvOiBcIlx1QkEzQ1x1QzgwMCBcdUI4NUNcdUFERjhcdUM3NzhcdUQ1NThcdUMxMzhcdUM2OTRcIiB9LFxuXHRcIm5vdGljZS5mb2xkZXJzU3luY2VkXCI6IHtcblx0XHRlbjogXCJ7Y291bnR9IGZvbGRlcihzKSBzeW5jZWRcIixcblx0XHRqYTogXCJ7Y291bnR9XHU1MDBCXHUzMDZFXHUzMEQ1XHUzMEE5XHUzMEVCXHUzMEMwXHUzMDkyXHU1NDBDXHU2NzFGXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsXG5cdFx0emg6IFwiXHU1REYyXHU1NDBDXHU2QjY1e2NvdW50fVx1NEUyQVx1NjU4N1x1NEVGNlx1NTkzOVwiLFxuXHRcdGtvOiBcIntjb3VudH1cdUFDMUMgXHVEM0Y0XHVCMzU0IFx1QjNEOVx1QUUzMFx1RDY1NCBcdUM2NDRcdUI4Q0NcIixcblx0fSxcblx0XCJub3RpY2UuZm9sZGVyU2NhbkZhaWxlZFwiOiB7XG5cdFx0ZW46IFwiRm9sZGVyIHNjYW4gZmFpbGVkIC0ge21zZ31cIixcblx0XHRqYTogXCJcdTMwRDVcdTMwQTlcdTMwRUJcdTMwQzBcdTMwQjlcdTMwQURcdTMwRTNcdTMwRjNcdTU5MzFcdTY1NTcgLSB7bXNnfVwiLFxuXHRcdHpoOiBcIlx1NjU4N1x1NEVGNlx1NTkzOVx1NjI2Qlx1NjNDRlx1NTkzMVx1OEQyNSAtIHttc2d9XCIsXG5cdFx0a286IFwiXHVEM0Y0XHVCMzU0IFx1QzJBNFx1Q0U5NCBcdUMyRTRcdUQzMjggLSB7bXNnfVwiLFxuXHR9LFxuXHRcIm5vdGljZS5yZWFkbWVDb3BpZWRcIjoge1xuXHRcdGVuOiBcIlJFQURNRSB0ZW1wbGF0ZSBjb3BpZWQgdG8gY2xpcGJvYXJkXCIsXG5cdFx0amE6IFwiUkVBRE1FXHUzMEM2XHUzMEYzXHUzMEQ3XHUzMEVDXHUzMEZDXHUzMEM4XHUzMDkyXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMERDXHUzMEZDXHUzMEM5XHUzMDZCXHUzMEIzXHUzMEQ0XHUzMEZDXHUzMDU3XHUzMDdFXHUzMDU3XHUzMDVGXCIsXG5cdFx0emg6IFwiUkVBRE1FXHU2QTIxXHU2NzdGXHU1REYyXHU1OTBEXHU1MjM2XHU1MjMwXHU1MjZBXHU4RDM0XHU2NzdGXCIsXG5cdFx0a286IFwiUkVBRE1FIFx1RDE1Q1x1RDUwQ1x1QjlCRlx1Qzc3NCBcdUQwNzRcdUI5QkRcdUJDRjRcdUI0RENcdUM1RDAgXHVCQ0Y1XHVDMEFDXHVCNDI4XCIsXG5cdH0sXG5cdFwibm90aWNlLnByZWZGYWlsZWRcIjoge1xuXHRcdGVuOiBcIkZhaWxlZCB0byBzYXZlIHByZWZlcmVuY2VcIixcblx0XHRqYTogXCJcdThBMkRcdTVCOUFcdTMwNkVcdTRGRERcdTVCNThcdTMwNkJcdTU5MzFcdTY1NTdcdTMwNTdcdTMwN0VcdTMwNTdcdTMwNUZcIixcblx0XHR6aDogXCJcdTRGRERcdTVCNThcdThCQkVcdTdGNkVcdTU5MzFcdThEMjVcIixcblx0XHRrbzogXCJcdUMxMjRcdUM4MTUgXHVDODAwXHVDN0E1IFx1QzJFNFx1RDMyOFwiLFxuXHR9LFxuXG5cdC8vIEd1aWRlIHRhYlxuXHRcImd1aWRlLnRpdGxlXCI6IHsgZW46IFwiR2V0dGluZyBTdGFydGVkXCIsIGphOiBcIlx1MzA2Rlx1MzA1OFx1MzA4MVx1MzA2QlwiLCB6aDogXCJcdTUxNjVcdTk1RThcdTYzMDdcdTUzNTdcIiwga286IFwiXHVDMkRDXHVDNzkxXHVENTU4XHVBRTMwXCIgfSxcblx0XCJndWlkZS5zdGVwMS50aXRsZVwiOiB7IGVuOiBcIkluc3RhbGwgYnJvd3NlciBleHRlbnNpb25cIiwgamE6IFwiXHUzMEQ2XHUzMEU5XHUzMEE2XHUzMEI2XHU2MkUxXHU1RjM1XHUzMDkyXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCXCIsIHpoOiBcIlx1NUI4OVx1ODhDNVx1NkQ0Rlx1ODlDOFx1NTY2OFx1NjI2OVx1NUM1NVwiLCBrbzogXCJcdUJFMENcdUI3N0NcdUM2QjBcdUM4MDAgXHVENjU1XHVDN0E1IFx1QzEyNFx1Q0U1OFwiIH0sXG5cdFwiZ3VpZGUuc3RlcDEuZGVzY1wiOiB7XG5cdFx0ZW46IFwiSW5zdGFsbCB0aGUgQUlDaGF0Q2xpcCBleHRlbnNpb24gZm9yIENocm9tZSBvciBGaXJlZm94LlwiLFxuXHRcdGphOiBcIkNocm9tZVx1MzA3RVx1MzA1Rlx1MzA2RkZpcmVmb3hcdTc1MjhcdTMwNkVBSUNoYXRDbGlwXHU2MkUxXHU1RjM1XHU2QTVGXHU4MEZEXHUzMDkyXHUzMEE0XHUzMEYzXHUzMEI5XHUzMEM4XHUzMEZDXHUzMEVCXHUzMDU3XHUzMDdFXHUzMDU5XHUzMDAyXCIsXG5cdFx0emg6IFwiXHU0RTNBQ2hyb21lXHU2MjE2RmlyZWZveFx1NUI4OVx1ODhDNUFJQ2hhdENsaXBcdTYyNjlcdTVDNTVcdTMwMDJcIixcblx0XHRrbzogXCJDaHJvbWUgXHVCNjEwXHVCMjk0IEZpcmVmb3hcdUM2QTkgQUlDaGF0Q2xpcCBcdUQ2NTVcdUM3QTVcdUM3NDQgXHVDMTI0XHVDRTU4XHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuXHR9LFxuXHRcImd1aWRlLnN0ZXAyLnRpdGxlXCI6IHsgZW46IFwiQ2xpcCBBSSByZXNwb25zZXNcIiwgamE6IFwiQUlcdTU2REVcdTdCNTRcdTMwOTJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcIiwgemg6IFwiXHU1MjZBXHU4RjkxQUlcdTU2REVcdTdCNTRcIiwga286IFwiQUkgXHVDNzUxXHVCMkY1IFx1RDA3NFx1QjlCRFwiIH0sXG5cdFwiZ3VpZGUuc3RlcDIuZGVzY1wiOiB7XG5cdFx0ZW46IFwiQ2xpY2sgdGhlIGNsaXAgYnV0dG9uIG9uIGFueSBBSSBjaGF0IHJlc3BvbnNlIHRvIHNhdmUgaXQuXCIsXG5cdFx0amE6IFwiQUlcdTMwQzFcdTMwRTNcdTMwQzNcdTMwQzhcdTMwNkVcdTU2REVcdTdCNTRcdTMwNkJcdTMwNDJcdTMwOEJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwRDdcdTMwRENcdTMwQkZcdTMwRjNcdTMwOTJcdTMwQUZcdTMwRUFcdTMwQzNcdTMwQUZcdTMwNTdcdTMwNjZcdTRGRERcdTVCNThcdTMwNTdcdTMwN0VcdTMwNTlcdTMwMDJcIixcblx0XHR6aDogXCJcdTcwQjlcdTUxRkJBSVx1ODA0QVx1NTkyOVx1NTZERVx1N0I1NFx1NEUwQVx1NzY4NFx1NTI2QVx1OEY5MVx1NjMwOVx1OTRBRVx1OEZEQlx1ODg0Q1x1NEZERFx1NUI1OFx1MzAwMlwiLFxuXHRcdGtvOiBcIkFJIFx1Q0M0NFx1RDMwNSBcdUM3NTFcdUIyRjVcdUM3NTggXHVEMDc0XHVCOUJEIFx1QkM4NFx1RDJCQ1x1Qzc0NCBcdUQwNzRcdUI5QURcdUQ1NThcdUM1RUMgXHVDODAwXHVDN0E1XHVENTY5XHVCMkM4XHVCMkU0LlwiLFxuXHR9LFxuXHRcImd1aWRlLnN0ZXAzLnRpdGxlXCI6IHsgZW46IFwiQXV0by1zeW5jIHRvIE9ic2lkaWFuXCIsIGphOiBcIk9ic2lkaWFuXHUzMDZCXHU4MUVBXHU1MkQ1XHU1NDBDXHU2NzFGXCIsIHpoOiBcIlx1ODFFQVx1NTJBOFx1NTQwQ1x1NkI2NVx1NTIzME9ic2lkaWFuXCIsIGtvOiBcIk9ic2lkaWFuXHVDNUQwIFx1Qzc5MFx1QjNEOSBcdUIzRDlcdUFFMzBcdUQ2NTRcIiB9LFxuXHRcImd1aWRlLnN0ZXAzLmRlc2NcIjoge1xuXHRcdGVuOiBcIkNsaXBwZWQgbm90ZXMgc3luYyBhdXRvbWF0aWNhbGx5IHRvIHlvdXIgT2JzaWRpYW4gdmF1bHQuXCIsXG5cdFx0amE6IFwiXHUzMEFGXHUzMEVBXHUzMEMzXHUzMEQ3XHUzMDU3XHUzMDVGXHUzMENFXHUzMEZDXHUzMEM4XHUzMDZGT2JzaWRpYW4gVmF1bHRcdTMwNkJcdTgxRUFcdTUyRDVcdTMwNjdcdTU0MENcdTY3MUZcdTMwNTVcdTMwOENcdTMwN0VcdTMwNTlcdTMwMDJcIixcblx0XHR6aDogXCJcdTUyNkFcdThGOTFcdTc2ODRcdTdCMTRcdThCQjBcdTRGMUFcdTgxRUFcdTUyQThcdTU0MENcdTZCNjVcdTUyMzBcdTRGNjBcdTc2ODRPYnNpZGlhblx1NUU5M1x1MzAwMlwiLFxuXHRcdGtvOiBcIlx1RDA3NFx1QjlCRFx1QjQxQyBcdUIxNzhcdUQyQjhcdUIyOTQgT2JzaWRpYW4gXHVCQ0ZDXHVEMkI4XHVDNUQwIFx1Qzc5MFx1QjNEOVx1QzczQ1x1Qjg1QyBcdUIzRDlcdUFFMzBcdUQ2NTRcdUI0MjlcdUIyQzhcdUIyRTQuXCIsXG5cdH0sXG5cdFwiZ3VpZGUuZG9jc0xpbmtcIjogeyBlbjogXCJWaWV3IGZ1bGwgZG9jdW1lbnRhdGlvbiBcdTIxOTJcIiwgamE6IFwiXHUzMEM5XHUzMEFEXHUzMEU1XHUzMEUxXHUzMEYzXHUzMEM4XHUzMDkyXHU4OThCXHUzMDhCIFx1MjE5MlwiLCB6aDogXCJcdTY3RTVcdTc3MEJcdTVCOENcdTY1NzRcdTY1ODdcdTY4NjMgXHUyMTkyXCIsIGtvOiBcIlx1QzgwNFx1Q0NCNCBcdUJCMzhcdUMxMUMgXHVCQ0Y0XHVBRTMwIFx1MjE5MlwiIH0sXG5cblx0Ly8gVGl0bGUgbGFuZyBvcHRpb25zXG5cdFwidGl0bGVMYW5nLmF1dG9cIjogeyBlbjogXCJBdXRvIChzYW1lIGFzIGNvbnRlbnQpXCIsIGphOiBcIlx1ODFFQVx1NTJENVx1RkYwOFx1MzBCM1x1MzBGM1x1MzBDNlx1MzBGM1x1MzBDNFx1MzA2OFx1NTQwQ1x1MzA1OFx1RkYwOVwiLCB6aDogXCJcdTgxRUFcdTUyQThcdUZGMDhcdTRFMEVcdTUxODVcdTVCQjlcdTc2RjhcdTU0MENcdUZGMDlcIiwga286IFwiXHVDNzkwXHVCM0Q5IChcdUNGNThcdUQxNTBcdUNFMjBcdUM2NDAgXHVCM0Q5XHVDNzdDKVwiIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdChrZXk6IHN0cmluZywgbGFuZzogUGx1Z2luTGFuZyk6IHN0cmluZyB7XG5cdHJldHVybiB0cmFuc2xhdGlvbnNba2V5XT8uW2xhbmddID8/IHRyYW5zbGF0aW9uc1trZXldPy5lbiA/PyBrZXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0UmVwbGFjZShrZXk6IHN0cmluZywgbGFuZzogUGx1Z2luTGFuZywgcmVwbGFjZW1lbnRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBudW1iZXI+KTogc3RyaW5nIHtcblx0bGV0IHJlc3VsdCA9IHQoa2V5LCBsYW5nKTtcblx0Zm9yIChjb25zdCBbaywgdl0gb2YgT2JqZWN0LmVudHJpZXMocmVwbGFjZW1lbnRzKSkge1xuXHRcdHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKGB7JHtrfX1gLCBTdHJpbmcodikpO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RMYW5nKCk6IFBsdWdpbkxhbmcge1xuXHRjb25zdCBsb2NhbGUgPVxuXHRcdGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFuZ3VhZ2VcIikgPz9cblx0XHQod2luZG93IGFzIGFueSkubW9tZW50Py5sb2NhbGU/LigpID8/XG5cdFx0bmF2aWdhdG9yLmxhbmd1YWdlID8/XG5cdFx0XCJlblwiO1xuXHRjb25zdCBjb2RlID0gbG9jYWxlLnNwbGl0KFwiLVwiKVswXS50b0xvd2VyQ2FzZSgpO1xuXHRpZiAoW1wiZW5cIiwgXCJqYVwiLCBcInpoXCIsIFwia29cIl0uaW5jbHVkZXMoY29kZSkpIHJldHVybiBjb2RlIGFzIFBsdWdpbkxhbmc7XG5cdHJldHVybiBcImVuXCI7XG59XG4iLCAiLyoqIFNldHRpbmdzIFVJIFx1MjAxNCByZW5kZXJzIHRoZSBwbHVnaW4gc2V0dGluZ3MgcGFuZWwgd2l0aCBCYXNpYyAvIFBybyAvIEd1aWRlIHRhYnMgKi9cbmltcG9ydCB7IHR5cGUgQXBwLCBOb3RpY2UsIFBsYXRmb3JtLCBQbHVnaW5TZXR0aW5nVGFiLCBTZXR0aW5nIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBhcGlHZXQsIGFwaVBhdGNoLCBhcGlQdXQgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IHNjYW5Gb2xkZXJzLCBzeW5jRm9sZGVyc1RvQXBpIH0gZnJvbSBcIi4vZm9sZGVyc1wiO1xuaW1wb3J0IHsgdHlwZSBQbHVnaW5MYW5nLCBkZXRlY3RMYW5nLCB0LCB0UmVwbGFjZSB9IGZyb20gXCIuL2kxOG5cIjtcbmltcG9ydCB0eXBlIEFJQ2hhdENsaXBQbHVnaW4gZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgV0VCX1VSTCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IFJFQURNRV9URU1QTEFURSA9IGAjIEZvbGRlciBOYW1lXG5cblRoaXMgZm9sZGVyIGNvbnRhaW5zIG5vdGVzIGFib3V0IFt0b3BpY10uXG5cbiMjIFB1cnBvc2VcbkRlc2NyaWJlIHdoYXQga2luZCBvZiBjb250ZW50IGJlbG9uZ3MgaW4gdGhpcyBmb2xkZXIgc28gQUkgY2FuIGNhdGVnb3JpemUgY2xpcHMgYXV0b21hdGljYWxseS5cblxuIyMgVGFnc1xuLSB0YWcxXG4tIHRhZzJcbmA7XG5cbnR5cGUgVGFiTmFtZSA9IFwiYmFzaWNcIiB8IFwicHJvXCIgfCBcImd1aWRlXCI7XG5cbmV4cG9ydCBjbGFzcyBBSUNoYXRDbGlwU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXHRwbHVnaW46IEFJQ2hhdENsaXBQbHVnaW47XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogQUlDaGF0Q2xpcFBsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdHByaXZhdGUgZ2V0IGxhbmcoKTogUGx1Z2luTGFuZyB7XG5cdFx0cmV0dXJuIHRoaXMucGx1Z2luLmxhbmc7XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG5cdFx0Y29uc3QgbCA9IHRoaXMubGFuZztcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0Ly8gU2l0ZSBsaW5rICh0b3ApXG5cdFx0Y29uc3QgbGlua0VsID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtaGVhZGVyLWxpbmtcIiB9KTtcblx0XHRsaW5rRWwuY3JlYXRlRWwoXCJhXCIsIHsgdGV4dDogXCJhaWNoYXRjbGlwLmNvbVwiLCBocmVmOiBXRUJfVVJMIH0pO1xuXG5cdFx0Ly8gVGFiIGhlYWRlclxuXHRcdGNvbnN0IHRhYkhlYWRlciA9IGNvbnRhaW5lckVsLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLXRhYi1oZWFkZXJcIiB9KTtcblxuXHRcdGNvbnN0IGJhc2ljQnRuID0gdGFiSGVhZGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcblx0XHRcdHRleHQ6IHQoXCJ0YWIuYmFzaWNcIiwgbCksXG5cdFx0XHRjbHM6IFwiYWljaGF0Y2xpcC10YWItYnV0dG9uIGlzLWFjdGl2ZVwiLFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgcHJvQnRuID0gdGFiSGVhZGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcblx0XHRcdGNsczogXCJhaWNoYXRjbGlwLXRhYi1idXR0b25cIixcblx0XHR9KTtcblx0XHRwcm9CdG4uYXBwZW5kVGV4dChgJHt0KFwidGFiLnByb1wiLCBsKX0gYCk7XG5cdFx0cHJvQnRuLmNyZWF0ZVNwYW4oeyB0ZXh0OiBcIlByb1wiLCBjbHM6IFwiYWljaGF0Y2xpcC1wcm8tYmFkZ2VcIiB9KTtcblxuXHRcdGNvbnN0IGd1aWRlQnRuID0gdGFiSGVhZGVyLmNyZWF0ZUVsKFwiYnV0dG9uXCIsIHtcblx0XHRcdHRleHQ6IHQoXCJ0YWIuZ3VpZGVcIiwgbCksXG5cdFx0XHRjbHM6IFwiYWljaGF0Y2xpcC10YWItYnV0dG9uXCIsXG5cdFx0fSk7XG5cblx0XHQvLyBUYWIgY29udGVudCBjb250YWluZXJzXG5cdFx0Y29uc3QgYmFzaWNUYWIgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC10YWItY29udGVudCBpcy1hY3RpdmVcIiB9KTtcblx0XHRjb25zdCBwcm9UYWIgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC10YWItY29udGVudFwiIH0pO1xuXHRcdGNvbnN0IGd1aWRlVGFiID0gY29udGFpbmVyRWwuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtdGFiLWNvbnRlbnRcIiB9KTtcblxuXHRcdGNvbnN0IHRhYnM6IFJlY29yZDxUYWJOYW1lLCB7IGJ0bjogSFRNTEVsZW1lbnQ7IGNvbnRlbnQ6IEhUTUxFbGVtZW50IH0+ID0ge1xuXHRcdFx0YmFzaWM6IHsgYnRuOiBiYXNpY0J0biwgY29udGVudDogYmFzaWNUYWIgfSxcblx0XHRcdHBybzogeyBidG46IHByb0J0biwgY29udGVudDogcHJvVGFiIH0sXG5cdFx0XHRndWlkZTogeyBidG46IGd1aWRlQnRuLCBjb250ZW50OiBndWlkZVRhYiB9LFxuXHRcdH07XG5cblx0XHRjb25zdCBzd2l0Y2hUYWIgPSAoYWN0aXZlOiBUYWJOYW1lKSA9PiB7XG5cdFx0XHRmb3IgKGNvbnN0IFtuYW1lLCB7IGJ0biwgY29udGVudCB9XSBvZiBPYmplY3QuZW50cmllcyh0YWJzKSkge1xuXHRcdFx0XHRjb25zdCBpc0FjdGl2ZSA9IG5hbWUgPT09IGFjdGl2ZTtcblx0XHRcdFx0YnRuLnRvZ2dsZUNsYXNzKFwiaXMtYWN0aXZlXCIsIGlzQWN0aXZlKTtcblx0XHRcdFx0Y29udGVudC50b2dnbGVDbGFzcyhcImlzLWFjdGl2ZVwiLCBpc0FjdGl2ZSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGJhc2ljQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzd2l0Y2hUYWIoXCJiYXNpY1wiKSk7XG5cdFx0cHJvQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzd2l0Y2hUYWIoXCJwcm9cIikpO1xuXHRcdGd1aWRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBzd2l0Y2hUYWIoXCJndWlkZVwiKSk7XG5cblx0XHQvLyA9PT0gQmFzaWMgVGFiID09PVxuXHRcdHRoaXMucmVuZGVyQmFzaWNUYWIoYmFzaWNUYWIpO1xuXG5cdFx0Ly8gPT09IFBybyBUYWIgPT09XG5cdFx0dGhpcy5yZW5kZXJQcm9UYWIocHJvVGFiKTtcblxuXHRcdC8vID09PSBHdWlkZSBUYWIgPT09XG5cdFx0dGhpcy5yZW5kZXJHdWlkZVRhYihndWlkZVRhYik7XG5cblx0XHQvLyBGb290ZXJcblx0XHRjb25zdCBmb290ZXIgPSBjb250YWluZXJFbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1mb290ZXJcIiB9KTtcblx0XHRmb290ZXIuY3JlYXRlRWwoXCJhXCIsIHsgdGV4dDogXCJhaWNoYXRjbGlwLmNvbVwiLCBocmVmOiBXRUJfVVJMIH0pO1xuXHR9XG5cblx0cHJpdmF0ZSByZW5kZXJCYXNpY1RhYihlbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblx0XHRjb25zdCBsID0gdGhpcy5sYW5nO1xuXG5cdFx0Ly8gTGFuZ3VhZ2Ugc2V0dGluZyAodG9wOiBzbyB1c2VycyBjYW4gcmVhZCBvdGhlciBpdGVtcyBpbiB0aGVpciBsYW5ndWFnZSlcblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJsYW5nLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwibGFuZy5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuXHRcdFx0XHRkcm9wZG93bi5hZGRPcHRpb25zKHtcblx0XHRcdFx0XHRhdXRvOiBgJHt0KFwibGFuZy5hdXRvXCIsIGwpfSAoJHtkZXRlY3RMYW5nKCl9KWAsXG5cdFx0XHRcdFx0ZW46IFwiRW5nbGlzaFwiLFxuXHRcdFx0XHRcdGphOiBcIlx1NjVFNVx1NjcyQ1x1OEE5RVwiLFxuXHRcdFx0XHRcdHpoOiBcIlx1NEUyRFx1NjU4N1wiLFxuXHRcdFx0XHRcdGtvOiBcIlx1RDU1Q1x1QUQ2RFx1QzVCNFwiLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZHJvcGRvd24uc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucGx1Z2luTGFuZ3VhZ2UpO1xuXHRcdFx0XHRkcm9wZG93bi5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5wbHVnaW5MYW5ndWFnZSA9IHZhbHVlIGFzIFwiYXV0b1wiIHwgXCJlblwiIHwgXCJqYVwiIHwgXCJ6aFwiIHwgXCJrb1wiO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdHRoaXMuZGlzcGxheSgpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0Ly8gQXV0aGVudGljYXRpb25cblx0XHRjb25zdCBhdXRoU2V0dGluZyA9IG5ldyBTZXR0aW5nKGVsKS5zZXROYW1lKHQoXCJhdXRoLm5hbWVcIiwgbCkpO1xuXHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy50b2tlbikge1xuXHRcdFx0YXV0aFNldHRpbmcuc2V0RGVzYyh0KFwiYXV0aC5jb25uZWN0ZWRcIiwgbCkpO1xuXHRcdFx0YXV0aFNldHRpbmcuYWRkQnV0dG9uKChidXR0b24pID0+XG5cdFx0XHRcdGJ1dHRvbi5zZXRCdXR0b25UZXh0KHQoXCJhdXRoLnNpZ25PdXRcIiwgbCkpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnN5bmNXcz8uZGlzY29ubmVjdCgpO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRva2VuID0gXCJcIjtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhdXRoU2V0dGluZy5zZXREZXNjKHQoXCJhdXRoLm5vdENvbm5lY3RlZFwiLCBsKSk7XG5cdFx0XHRhdXRoU2V0dGluZy5hZGRCdXR0b24oKGJ1dHRvbikgPT5cblx0XHRcdFx0YnV0dG9uLnNldEJ1dHRvblRleHQodChcImF1dGguc2lnbkluXCIsIGwpKS5zZXRDdGEoKS5vbkNsaWNrKCgpID0+IHtcblx0XHRcdFx0XHR3aW5kb3cub3BlbihgJHtXRUJfVVJMfS9hdXRoL29ic2lkaWFuYCk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyBXZWJTb2NrZXQgc3RhdHVzIChkZXNrdG9wIG9ubHkpXG5cdFx0aWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnRva2VuICYmIFBsYXRmb3JtLmlzRGVza3RvcCkge1xuXHRcdFx0Y29uc3Qgd3NLZXkgPSB0aGlzLnBsdWdpbi53c0Nvbm5lY3RlZCA/IFwid3MuY29ubmVjdGVkXCIgOiBcIndzLmRpc2Nvbm5lY3RlZFwiO1xuXHRcdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHRcdC5zZXROYW1lKHQoXCJ3cy5uYW1lXCIsIGwpKVxuXHRcdFx0XHQuc2V0RGVzYyh0KHdzS2V5LCBsKSk7XG5cdFx0fVxuXG5cdFx0Ly8gRGV2aWNlIHNldHRpbmdzXG5cdFx0aWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLnRva2VuKSB7XG5cdFx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdFx0LnNldE5hbWUodChcImRldmljZS5uYW1lXCIsIGwpKVxuXHRcdFx0XHQuc2V0RGVzYyh0KFwiZGV2aWNlLmRlc2NcIiwgbCkpXG5cdFx0XHRcdC5hZGRCdXR0b24oKGJ1dHRvbikgPT5cblx0XHRcdFx0XHRidXR0b24uc2V0QnV0dG9uVGV4dCh0KFwiZGV2aWNlLm1ha2VQcmltYXJ5XCIsIGwpKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IGFwaVBhdGNoKHRoaXMucGx1Z2luLnNldHRpbmdzLCBgL2FwaS9kZXZpY2VzLyR7dGhpcy5wbHVnaW4uc2V0dGluZ3MuZGV2aWNlSWR9L3ByaW1hcnlgKTtcblx0XHRcdFx0XHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0KFwibm90aWNlLnByaW1hcnlTZXRcIiwgbCl9YCk7XG5cdFx0XHRcdFx0XHRcdGlmIChQbGF0Zm9ybS5pc0Rlc2t0b3ApIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5jb25uZWN0V2ViU29ja2V0KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2gge1xuXHRcdFx0XHRcdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2UucHJpbWFyeUZhaWxlZFwiLCBsKX1gKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0KTtcblx0XHR9XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJhdXRvU3luYy5uYW1lXCIsIGwpKVxuXHRcdFx0LnNldERlc2ModChcImF1dG9TeW5jLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvU3luY09uTG9hZCkub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuYXV0b1N5bmNPbkxvYWQgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0Ly8gU2hvdyBmb3JlZ3JvdW5kIHN5bmMgdG9nZ2xlIG9ubHkgb24gbW9iaWxlIChkZXNrdG9wIHVzZXMgV2ViU29ja2V0KVxuXHRcdGlmIChQbGF0Zm9ybS5pc01vYmlsZSkge1xuXHRcdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHRcdC5zZXROYW1lKHQoXCJzeW5jT25Gb3JlZ3JvdW5kLm5hbWVcIiwgbCkpXG5cdFx0XHRcdC5zZXREZXNjKHQoXCJzeW5jT25Gb3JlZ3JvdW5kLmRlc2NcIiwgbCkpXG5cdFx0XHRcdC5hZGRUb2dnbGUoKHRvZ2dsZSkgPT5cblx0XHRcdFx0XHR0b2dnbGVcblx0XHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5zeW5jT25Gb3JlZ3JvdW5kKVxuXHRcdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zeW5jT25Gb3JlZ3JvdW5kID0gdmFsdWU7XG5cdFx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR1cEZvcmVncm91bmRTeW5jKCk7XG5cdFx0XHRcdFx0XHR9KSxcblx0XHRcdFx0KTtcblx0XHR9XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJpbmJveC5uYW1lXCIsIGwpKVxuXHRcdFx0LnNldERlc2ModChcImluYm94LmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkVGV4dCgodGV4dCkgPT5cblx0XHRcdFx0dGV4dFxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcihcIkFJQ2hhdENsaXAvSW5ib3hcIilcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaW5ib3hGb2xkZXIpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuaW5ib3hGb2xkZXIgPSB2YWx1ZTtcblx0XHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdG5ldyBTZXR0aW5nKGVsKVxuXHRcdFx0LnNldE5hbWUodChcImZpbGVOYW1lLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwiZmlsZU5hbWUuZGVzY1wiLCBsKSlcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKFwie3l5eXl9LXtNTX0te2RkfS17dGl0bGV9XCIpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVOYW1lVGVtcGxhdGUpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZU5hbWVUZW1wbGF0ZSA9IHZhbHVlIHx8IFwie3l5eXl9LXtNTX0te2RkfS17dGl0bGV9XCI7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJ0aW1lem9uZS5uYW1lXCIsIGwpKVxuXHRcdFx0LnNldERlc2ModChcInRpbWV6b25lLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkVGV4dCgodGV4dCkgPT5cblx0XHRcdFx0dGV4dFxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcihJbnRsLkRhdGVUaW1lRm9ybWF0KCkucmVzb2x2ZWRPcHRpb25zKCkudGltZVpvbmUpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRpbWV6b25lKVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRpbWV6b25lID1cblx0XHRcdFx0XHRcdFx0dmFsdWUgfHwgSW50bC5EYXRlVGltZUZvcm1hdCgpLnJlc29sdmVkT3B0aW9ucygpLnRpbWVab25lO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSByZW5kZXJQcm9UYWIoZWw6IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cdFx0Y29uc3QgbCA9IHRoaXMubGFuZztcblx0XHRjb25zdCBpc1BybyA9IHRoaXMucGx1Z2luLnNldHRpbmdzLmNhY2hlZFVzZXJQbGFuID09PSBcInByb1wiO1xuXG5cdFx0Ly8gU2hvdyBjb21wYXJpc29uIHRhYmxlIGFuZCBDVEEgb25seSBmb3IgZnJlZSB1c2Vyc1xuXHRcdGlmICghaXNQcm8pIHtcblx0XHRcdGNvbnN0IHBsYW5Cb3ggPSBlbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1wbGFuLWJveFwiIH0pO1xuXG5cdFx0XHRjb25zdCB0YWJsZSA9IHBsYW5Cb3guY3JlYXRlRWwoXCJ0YWJsZVwiLCB7IGNsczogXCJhaWNoYXRjbGlwLXBsYW4tdGFibGVcIiB9KTtcblx0XHRcdGNvbnN0IHRoZWFkID0gdGFibGUuY3JlYXRlRWwoXCJ0aGVhZFwiKTtcblx0XHRcdGNvbnN0IGhlYWRSb3cgPSB0aGVhZC5jcmVhdGVFbChcInRyXCIpO1xuXHRcdFx0aGVhZFJvdy5jcmVhdGVFbChcInRoXCIsIHsgdGV4dDogXCJcIiB9KTtcblx0XHRcdGhlYWRSb3cuY3JlYXRlRWwoXCJ0aFwiLCB7IHRleHQ6IFwiRnJlZVwiIH0pO1xuXHRcdFx0Y29uc3QgcHJvVGggPSBoZWFkUm93LmNyZWF0ZUVsKFwidGhcIiwgeyB0ZXh0OiBcIlBybyBcIiB9KTtcblx0XHRcdHByb1RoLmNyZWF0ZVNwYW4oeyB0ZXh0OiBcIiQzL21vXCIsIGNsczogXCJhaWNoYXRjbGlwLXByby1iYWRnZVwiIH0pO1xuXG5cdFx0XHRjb25zdCB0Ym9keSA9IHRhYmxlLmNyZWF0ZUVsKFwidGJvZHlcIik7XG5cdFx0XHRjb25zdCBmZWF0dXJlczogW3N0cmluZywgYm9vbGVhbiwgYm9vbGVhbl1bXSA9IFtcblx0XHRcdFx0W3QoXCJwcm8uZmVhdHVyZS5jbGlwVG9PYnNpZGlhblwiLCBsKSwgdHJ1ZSwgdHJ1ZV0sXG5cdFx0XHRcdFt0KFwicHJvLmZlYXR1cmUudW5saW1pdGVkQ2xpcHNcIiwgbCksIHRydWUsIHRydWVdLFxuXHRcdFx0XHRbdChcInByby5mZWF0dXJlLmF1dG9UYWdzXCIsIGwpLCBmYWxzZSwgdHJ1ZV0sXG5cdFx0XHRcdFt0KFwicHJvLmZlYXR1cmUuc3VtbWFyeVwiLCBsKSwgZmFsc2UsIHRydWVdLFxuXHRcdFx0XHRbdChcInByby5mZWF0dXJlLnNtYXJ0Rm9sZGVyXCIsIGwpLCBmYWxzZSwgdHJ1ZV0sXG5cdFx0XHRcdFt0KFwicHJvLmZlYXR1cmUud2Vla2x5RGlnZXN0XCIsIGwpLCBmYWxzZSwgdHJ1ZV0sXG5cdFx0XHRdO1xuXHRcdFx0Zm9yIChjb25zdCBbbmFtZSwgZnJlZSwgcHJvXSBvZiBmZWF0dXJlcykge1xuXHRcdFx0XHRjb25zdCByb3cgPSB0Ym9keS5jcmVhdGVFbChcInRyXCIpO1xuXHRcdFx0XHRyb3cuY3JlYXRlRWwoXCJ0ZFwiLCB7IHRleHQ6IG5hbWUgfSk7XG5cdFx0XHRcdHJvdy5jcmVhdGVFbChcInRkXCIsIHsgdGV4dDogZnJlZSA/IFwiXFx1MjcxM1wiIDogXCJcXHUyMDE0XCIsIGNsczogZnJlZSA/IFwiYWljaGF0Y2xpcC1jaGVja1wiIDogXCJhaWNoYXRjbGlwLWRhc2hcIiB9KTtcblx0XHRcdFx0cm93LmNyZWF0ZUVsKFwidGRcIiwgeyB0ZXh0OiBwcm8gPyBcIlxcdTI3MTNcIiA6IFwiXFx1MjAxNFwiLCBjbHM6IHBybyA/IFwiYWljaGF0Y2xpcC1jaGVja1wiIDogXCJhaWNoYXRjbGlwLWRhc2hcIiB9KTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgY3RhID0gcGxhbkJveC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1wbGFuLWN0YVwiIH0pO1xuXHRcdFx0Y3RhLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHRcdHRleHQ6IHQoXCJwcm8uY3RhLnVwZ3JhZGVcIiwgbCksXG5cdFx0XHRcdGhyZWY6IGAke1dFQl9VUkx9L3ByaWNpbmdgLFxuXHRcdFx0XHRjbHM6IFwiYWljaGF0Y2xpcC1wbGFuLWxpbmtcIixcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBTZXBhcmF0b3Jcblx0XHRcdGVsLmNyZWF0ZUVsKFwiaHJcIiwgeyBjbHM6IFwiYWljaGF0Y2xpcC1zZXBhcmF0b3JcIiB9KTtcblx0XHR9XG5cblx0XHQvLyBIaWRlIFBybyBzZXR0aW5ncyBmb3IgZnJlZSB1c2VycyBcdTIwMTQgc2hvdyBvbmx5IGNvbXBhcmlzb24gdGFibGUgKyBDVEFcblx0XHRpZiAoIWlzUHJvKSByZXR1cm47XG5cblx0XHRlbC5jcmVhdGVFbChcInBcIiwge1xuXHRcdFx0dGV4dDogdChcInByby5mb2xkZXJEZXNjXCIsIGwpLFxuXHRcdFx0Y2xzOiBcInNldHRpbmctaXRlbS1kZXNjcmlwdGlvblwiLFxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgZG9jc0xpbmtFbCA9IGVsLmNyZWF0ZUVsKFwicFwiLCB7IGNsczogXCJzZXR0aW5nLWl0ZW0tZGVzY3JpcHRpb25cIiB9KTtcblx0XHRkb2NzTGlua0VsLmNyZWF0ZUVsKFwiYVwiLCB7XG5cdFx0XHR0ZXh0OiB0KFwicHJvLmZvbGRlckRvY3NMaW5rXCIsIGwpLFxuXHRcdFx0aHJlZjogYCR7V0VCX1VSTH0vZG9jcy9tYXJrZXItZmlsZXNgLFxuXHRcdH0pO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwicHJvLmF1dG9TY2FuLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwicHJvLmF1dG9TY2FuLmRlc2NcIiwgbCkpXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+XG5cdFx0XHRcdHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hdXRvU2NhbkZvbGRlcnMpLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmF1dG9TY2FuRm9sZGVycyA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJwcm8uc2NhblJvb3QubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJwcm8uc2NhblJvb3QuZGVzY1wiLCBsKSlcblx0XHRcdC5hZGRUZXh0KCh0ZXh0KSA9PlxuXHRcdFx0XHR0ZXh0XG5cdFx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKHQoXCJwcm8uc2NhblJvb3QucGxhY2Vob2xkZXJcIiwgbCkpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNjYW5Sb290KVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNjYW5Sb290ID0gdmFsdWU7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJwcm8ubWFya2VyLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwicHJvLm1hcmtlci5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoXCJSRUFETUVcIilcblx0XHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubWFya2VyRmlsZW5hbWUpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFya2VyRmlsZW5hbWUgPSB2YWx1ZSB8fCBcIlJFQURNRVwiO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwicHJvLnNjYW5Ob3cubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJwcm8uc2Nhbk5vdy5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZEJ1dHRvbigoYnV0dG9uKSA9PlxuXHRcdFx0XHRidXR0b24uc2V0QnV0dG9uVGV4dCh0KFwicHJvLnNjYW5Ob3cuYnV0dG9uXCIsIGwpKS5zZXRDdGEoKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRpZiAoIXRoaXMucGx1Z2luLnNldHRpbmdzLnRva2VuKSB7XG5cdFx0XHRcdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2Uuc2lnbkluRmlyc3RcIiwgbCl9YCk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRjb25zdCBmb2xkZXJzID0gYXdhaXQgc2NhbkZvbGRlcnMoXG5cdFx0XHRcdFx0XHRcdHRoaXMuYXBwLFxuXHRcdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zY2FuUm9vdCxcblx0XHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubWFya2VyRmlsZW5hbWUsXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0YXdhaXQgc3luY0ZvbGRlcnNUb0FwaSh0aGlzLnBsdWdpbi5zZXR0aW5ncywgZm9sZGVycyk7XG5cdFx0XHRcdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3RSZXBsYWNlKFwibm90aWNlLmZvbGRlcnNTeW5jZWRcIiwgbCwgeyBjb3VudDogZm9sZGVycy5sZW5ndGggfSl9YCk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgbXNnID0gZSBpbnN0YW5jZW9mIEVycm9yID8gZS5tZXNzYWdlIDogU3RyaW5nKGUpO1xuXHRcdFx0XHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0UmVwbGFjZShcIm5vdGljZS5mb2xkZXJTY2FuRmFpbGVkXCIsIGwsIHsgbXNnIH0pfWApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSksXG5cdFx0XHQpO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwicHJvLnJlYWRtZS5uYW1lXCIsIGwpKVxuXHRcdFx0LnNldERlc2ModChcInByby5yZWFkbWUuZGVzY1wiLCBsKSlcblx0XHRcdC5hZGRCdXR0b24oKGJ1dHRvbikgPT5cblx0XHRcdFx0YnV0dG9uLnNldEJ1dHRvblRleHQodChcInByby5yZWFkbWUuYnV0dG9uXCIsIGwpKS5vbkNsaWNrKGFzeW5jICgpID0+IHtcblx0XHRcdFx0XHRhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChSRUFETUVfVEVNUExBVEUpO1xuXHRcdFx0XHRcdG5ldyBOb3RpY2UoYEFJQ2hhdENsaXA6ICR7dChcIm5vdGljZS5yZWFkbWVDb3BpZWRcIiwgbCl9YCk7XG5cdFx0XHRcdH0pLFxuXHRcdFx0KTtcblxuXHRcdC8vIFNlcGFyYXRvclxuXHRcdGVsLmNyZWF0ZUVsKFwiaHJcIiwgeyBjbHM6IFwiYWljaGF0Y2xpcC1zZXBhcmF0b3JcIiB9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGVsKS5zZXROYW1lKHQoXCJwcm8uYWlDdXN0b21pemF0aW9uXCIsIGwpKS5zZXRIZWFkaW5nKCk7XG5cblx0XHRuZXcgU2V0dGluZyhlbClcblx0XHRcdC5zZXROYW1lKHQoXCJwcm8udGl0bGVMYW5nLm5hbWVcIiwgbCkpXG5cdFx0XHQuc2V0RGVzYyh0KFwicHJvLnRpdGxlTGFuZy5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZERyb3Bkb3duKChkcm9wZG93bikgPT4ge1xuXHRcdFx0XHRkcm9wZG93bi5hZGRPcHRpb25zKHtcblx0XHRcdFx0XHRhdXRvOiB0KFwidGl0bGVMYW5nLmF1dG9cIiwgbCksXG5cdFx0XHRcdFx0ZW46IFwiRW5nbGlzaFwiLFxuXHRcdFx0XHRcdGphOiBcIlx1NjVFNVx1NjcyQ1x1OEE5RVwiLFxuXHRcdFx0XHRcdHpoOiBcIlx1NEUyRFx1NjU4N1wiLFxuXHRcdFx0XHRcdGtvOiBcIlx1RDU1Q1x1QUQ2RFx1QzVCNFwiLFxuXHRcdFx0XHRcdGVzOiBcIkVzcGFcdTAwRjFvbFwiLFxuXHRcdFx0XHRcdGZyOiBcIkZyYW5cdTAwRTdhaXNcIixcblx0XHRcdFx0XHRkZTogXCJEZXV0c2NoXCIsXG5cdFx0XHRcdH0pO1xuXHRcdFx0XHQvLyBMb2FkIGN1cnJlbnQgdmFsdWUgZnJvbSBBUElcblx0XHRcdFx0dGhpcy5sb2FkTGFuZ3VhZ2VTZXR0aW5nKGRyb3Bkb3duKTtcblx0XHRcdFx0ZHJvcGRvd24ub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5zYXZlUHJlZmVyZW5jZSh7IGZpbGVOYW1lTGFuZ3VhZ2U6IHZhbHVlIH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0bmV3IFNldHRpbmcoZWwpXG5cdFx0XHQuc2V0TmFtZSh0KFwicHJvLnRhZ1J1bGUubmFtZVwiLCBsKSlcblx0XHRcdC5zZXREZXNjKHQoXCJwcm8udGFnUnVsZS5kZXNjXCIsIGwpKVxuXHRcdFx0LmFkZFRleHQoKHRleHQpID0+XG5cdFx0XHRcdHRleHRcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoXCJUYWdSdWxlXCIpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRhZ1J1bGVQYXRoKVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnRhZ1J1bGVQYXRoID0gdmFsdWUgfHwgXCJUYWdSdWxlXCI7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KSxcblx0XHRcdCk7XG5cdH1cblxuXHRwcml2YXRlIHJlbmRlckd1aWRlVGFiKGVsOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuXHRcdGNvbnN0IGwgPSB0aGlzLmxhbmc7XG5cblx0XHRuZXcgU2V0dGluZyhlbCkuc2V0TmFtZSh0KFwiZ3VpZGUudGl0bGVcIiwgbCkpLnNldEhlYWRpbmcoKTtcblxuXHRcdGNvbnN0IHN0ZXBzID0gZWwuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtZ3VpZGUtc3RlcHNcIiB9KTtcblxuXHRcdGZvciAoY29uc3QgaSBvZiBbMSwgMiwgM10gYXMgY29uc3QpIHtcblx0XHRcdGNvbnN0IHN0ZXAgPSBzdGVwcy5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1ndWlkZS1zdGVwXCIgfSk7XG5cdFx0XHRjb25zdCBudW0gPSBzdGVwLmNyZWF0ZURpdih7IGNsczogXCJhaWNoYXRjbGlwLWd1aWRlLXN0ZXAtbnVtXCIgfSk7XG5cdFx0XHRudW0uc2V0VGV4dChTdHJpbmcoaSkpO1xuXHRcdFx0Y29uc3QgY29udGVudCA9IHN0ZXAuY3JlYXRlRGl2KHsgY2xzOiBcImFpY2hhdGNsaXAtZ3VpZGUtc3RlcC1jb250ZW50XCIgfSk7XG5cdFx0XHRjb250ZW50LmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiB0KGBndWlkZS5zdGVwJHtpfS50aXRsZWAsIGwpIH0pO1xuXHRcdFx0Y29udGVudC5jcmVhdGVFbChcInBcIiwgeyB0ZXh0OiB0KGBndWlkZS5zdGVwJHtpfS5kZXNjYCwgbCkgfSk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZG9jc0xpbmsgPSBlbC5jcmVhdGVEaXYoeyBjbHM6IFwiYWljaGF0Y2xpcC1ndWlkZS1kb2NzXCIgfSk7XG5cdFx0ZG9jc0xpbmsuY3JlYXRlRWwoXCJhXCIsIHtcblx0XHRcdHRleHQ6IHQoXCJndWlkZS5kb2NzTGlua1wiLCBsKSxcblx0XHRcdGhyZWY6IGAke1dFQl9VUkx9L2RvY3NgLFxuXHRcdFx0Y2xzOiBcImFpY2hhdGNsaXAtZ3VpZGUtZG9jcy1saW5rXCIsXG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIGFzeW5jIGxvYWRMYW5ndWFnZVNldHRpbmcoZHJvcGRvd246IGltcG9ydChcIm9ic2lkaWFuXCIpLkRyb3Bkb3duQ29tcG9uZW50KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKCF0aGlzLnBsdWdpbi5zZXR0aW5ncy50b2tlbikgcmV0dXJuO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCByZXMgPSBhd2FpdCBhcGlHZXQodGhpcy5wbHVnaW4uc2V0dGluZ3MsIFwiL2FwaS9wcmVmZXJlbmNlc1wiKTtcblx0XHRcdGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcblx0XHRcdFx0Y29uc3QgZGF0YSA9IHJlcy5qc29uIGFzIHsgZmlsZU5hbWVMYW5ndWFnZT86IHN0cmluZyB9O1xuXHRcdFx0XHRpZiAoZGF0YS5maWxlTmFtZUxhbmd1YWdlKSB7XG5cdFx0XHRcdFx0ZHJvcGRvd24uc2V0VmFsdWUoZGF0YS5maWxlTmFtZUxhbmd1YWdlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gY2F0Y2gge1xuXHRcdFx0Ly8gaWdub3JlXG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBhc3luYyBzYXZlUHJlZmVyZW5jZShib2R5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IFByb21pc2U8dm9pZD4ge1xuXHRcdGNvbnN0IGwgPSB0aGlzLmxhbmc7XG5cdFx0aWYgKCF0aGlzLnBsdWdpbi5zZXR0aW5ncy50b2tlbikge1xuXHRcdFx0bmV3IE5vdGljZShgQUlDaGF0Q2xpcDogJHt0KFwibm90aWNlLnNpZ25JbkZpcnN0XCIsIGwpfWApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0YXdhaXQgYXBpUHV0KHRoaXMucGx1Z2luLnNldHRpbmdzLCBcIi9hcGkvcHJlZmVyZW5jZXNcIiwgYm9keSk7XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHRuZXcgTm90aWNlKGBBSUNoYXRDbGlwOiAke3QoXCJub3RpY2UucHJlZkZhaWxlZFwiLCBsKX1gKTtcblx0XHR9XG5cdH1cbn1cbiIsICIvKiogVmF1bHQgZm9sZGVyIHNjYW5uaW5nIGFuZCBzZXJ2ZXIgc3luY2hyb25pemF0aW9uIGZvciBzbWFydCBmb2xkZXIgcGxhY2VtZW50ICovXG5pbXBvcnQgdHlwZSB7IEFwcCB9IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgYXBpUHV0IH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQgdHlwZSB7IEFJQ2hhdENsaXBTZXR0aW5ncyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmludGVyZmFjZSBGb2xkZXJFbnRyeSB7XG5cdHBhdGg6IHN0cmluZztcblx0ZGVzY3JpcHRpb246IHN0cmluZztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNjYW5Gb2xkZXJzKFxuXHRhcHA6IEFwcCxcblx0c2NhblJvb3Q6IHN0cmluZyxcblx0bWFya2VyRmlsZW5hbWU6IHN0cmluZyxcbik6IFByb21pc2U8Rm9sZGVyRW50cnlbXT4ge1xuXHRjb25zdCBlbnRyaWVzOiBGb2xkZXJFbnRyeVtdID0gW107XG5cdGNvbnN0IG1hcmtlciA9IG1hcmtlckZpbGVuYW1lIHx8IFwiUkVBRE1FXCI7XG5cblx0Y29uc3QgbWFya2VyRmlsZXMgPSBhcHAudmF1bHRcblx0XHQuZ2V0RmlsZXMoKVxuXHRcdC5maWx0ZXIoKGYpID0+IHtcblx0XHRcdGlmIChmLmJhc2VuYW1lICE9PSBtYXJrZXIpIHJldHVybiBmYWxzZTtcblx0XHRcdGlmIChzY2FuUm9vdCA9PT0gXCJcIikgcmV0dXJuIHRydWU7XG5cdFx0XHRyZXR1cm4gZi5wYXRoLnN0YXJ0c1dpdGgoYCR7c2NhblJvb3R9L2ApO1xuXHRcdH0pO1xuXG5cdGZvciAoY29uc3QgZmlsZSBvZiBtYXJrZXJGaWxlcykge1xuXHRcdGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChmaWxlKTtcblx0XHRjb25zdCBkaXIgPSBmaWxlLnBhcmVudD8ucGF0aDtcblx0XHRpZiAoIWRpcikgY29udGludWU7XG5cblx0XHRjb25zdCByZWxhdGl2ZVBhdGggPVxuXHRcdFx0c2NhblJvb3QgPT09IFwiXCJcblx0XHRcdFx0PyBkaXJcblx0XHRcdFx0OiBkaXIuc3RhcnRzV2l0aChgJHtzY2FuUm9vdH0vYClcblx0XHRcdFx0XHQ/IGRpci5zbGljZShzY2FuUm9vdC5sZW5ndGggKyAxKVxuXHRcdFx0XHRcdDogZGlyO1xuXG5cdFx0aWYgKHJlbGF0aXZlUGF0aCkge1xuXHRcdFx0ZW50cmllcy5wdXNoKHsgcGF0aDogcmVsYXRpdmVQYXRoLCBkZXNjcmlwdGlvbjogY29udGVudC5zbGljZSgwLCAzMDAwKSB9KTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZW50cmllcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNGb2xkZXJzVG9BcGkoXG5cdHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsXG5cdGZvbGRlcnM6IEZvbGRlckVudHJ5W10sXG4pOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3QgcmVzID0gYXdhaXQgYXBpUHV0KHNldHRpbmdzLCBcIi9hcGkvZm9sZGVyc1wiLCB7IGZvbGRlcnMgfSk7XG5cdGlmIChyZXMuc3RhdHVzICE9PSAyMDApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzeW5jIGZvbGRlcnM6ICR7cmVzLnN0YXR1c31gKTtcblx0fVxufVxuIiwgIi8qKiBTaGFyZWQgdHlwZXMsIGNvbnN0YW50cywgYW5kIGRlZmF1bHQgc2V0dGluZ3MgKi9cblxuZXhwb3J0IGNvbnN0IEFQSV9CQVNFX1VSTCA9IFwiaHR0cHM6Ly9hcGkuYWljaGF0Y2xpcC5jb21cIjtcbmV4cG9ydCBjb25zdCBXRUJfVVJMID0gXCJodHRwczovL2FpY2hhdGNsaXAuY29tXCI7XG5cbmV4cG9ydCBjb25zdCBDTElQX1NPVVJDRVMgPSBbXCJjaGF0Z3B0XCIsIFwiZ2VtaW5pXCIsIFwiY2xhdWRlXCIsIFwiZ3Jva1wiXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIENsaXBTb3VyY2UgPSAodHlwZW9mIENMSVBfU09VUkNFUylbbnVtYmVyXTtcblxuZXhwb3J0IGludGVyZmFjZSBDbGlwIHtcblx0aWQ6IHN0cmluZztcblx0dXNlcklkOiBzdHJpbmc7XG5cdHNvdXJjZTogQ2xpcFNvdXJjZTtcblx0cHJvbXB0OiBzdHJpbmcgfCBudWxsO1xuXHRjb250ZW50OiBzdHJpbmc7XG5cdHRpdGxlOiBzdHJpbmcgfCBudWxsO1xuXHRzdW1tYXJ5OiBzdHJpbmcgfCBudWxsO1xuXHR0YWdzOiBzdHJpbmcgfCBudWxsO1xuXHRmb2xkZXJQYXRoOiBzdHJpbmcgfCBudWxsO1xuXHRmaWxlTmFtZTogc3RyaW5nIHwgbnVsbDtcblx0dXJsOiBzdHJpbmcgfCBudWxsO1xuXHRjaGF0VGl0bGU6IHN0cmluZyB8IG51bGw7XG5cdGNyZWF0ZWRBdDogc3RyaW5nO1xuXHRzeW5jZWRBdDogc3RyaW5nIHwgbnVsbDtcbn1cblxuZXhwb3J0IHR5cGUgVXNlclBsYW4gPSBcImZyZWVcIiB8IFwicHJvXCI7XG5cbmV4cG9ydCBjb25zdCBTWU5DRURfQ0xJUF9JRFNfTUFYID0gMTAwMDtcblxuZXhwb3J0IGludGVyZmFjZSBBSUNoYXRDbGlwU2V0dGluZ3Mge1xuXHRhcGlCYXNlVXJsOiBzdHJpbmc7XG5cdHRva2VuOiBzdHJpbmc7XG5cdGluYm94Rm9sZGVyOiBzdHJpbmc7XG5cdGF1dG9TeW5jT25Mb2FkOiBib29sZWFuO1xuXHRzeW5jT25Gb3JlZ3JvdW5kOiBib29sZWFuO1xuXHRzY2FuUm9vdDogc3RyaW5nO1xuXHRtYXJrZXJGaWxlbmFtZTogc3RyaW5nO1xuXHRhdXRvU2NhbkZvbGRlcnM6IGJvb2xlYW47XG5cdHRpbWV6b25lOiBzdHJpbmc7XG5cdGZpbGVOYW1lVGVtcGxhdGU6IHN0cmluZztcblx0dGFnUnVsZVBhdGg6IHN0cmluZztcblx0ZGV2aWNlSWQ6IHN0cmluZztcblx0c3luY2VkQ2xpcElkczogc3RyaW5nW107XG5cdHBsdWdpbkxhbmd1YWdlOiBcImF1dG9cIiB8IFwiZW5cIiB8IFwiamFcIiB8IFwiemhcIiB8IFwia29cIjtcblx0Y2FjaGVkVXNlclBsYW46IFVzZXJQbGFuO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TRVRUSU5HUzogQUlDaGF0Q2xpcFNldHRpbmdzID0ge1xuXHRhcGlCYXNlVXJsOiBBUElfQkFTRV9VUkwsXG5cdHRva2VuOiBcIlwiLFxuXHRpbmJveEZvbGRlcjogXCJBSUNoYXRDbGlwL0luYm94XCIsXG5cdGF1dG9TeW5jT25Mb2FkOiB0cnVlLFxuXHRzeW5jT25Gb3JlZ3JvdW5kOiB0cnVlLFxuXHRzY2FuUm9vdDogXCJcIixcblx0bWFya2VyRmlsZW5hbWU6IFwiUkVBRE1FXCIsXG5cdGF1dG9TY2FuRm9sZGVyczogdHJ1ZSxcblx0dGltZXpvbmU6IEludGwuRGF0ZVRpbWVGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS50aW1lWm9uZSxcblx0ZmlsZU5hbWVUZW1wbGF0ZTogXCJ7eXl5eX0te01NfS17ZGR9LXt0aXRsZX1cIixcblx0dGFnUnVsZVBhdGg6IFwiVGFnUnVsZVwiLFxuXHRkZXZpY2VJZDogXCJcIixcblx0c3luY2VkQ2xpcElkczogW10sXG5cdHBsdWdpbkxhbmd1YWdlOiBcImF1dG9cIixcblx0Y2FjaGVkVXNlclBsYW46IFwiZnJlZVwiLFxufTtcbiIsICIvKiogTWFya2Rvd24gZm9ybWF0dGluZyBcdTIwMTQgY29udmVydHMgQ2xpcCBkYXRhIGludG8gT2JzaWRpYW4tcmVhZHkgbWFya2Rvd24gd2l0aCBZQU1MIGZyb250bWF0dGVyICovXG5pbXBvcnQgdHlwZSB7IEFJQ2hhdENsaXBTZXR0aW5ncywgQ2xpcCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmZ1bmN0aW9uIGVzY2FwZVlhbWwodmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdGlmICgvWzojXFxbXFxde30mKiF8PidcIiVAYCw/XS8udGVzdCh2YWx1ZSkgfHwgdmFsdWUudHJpbSgpICE9PSB2YWx1ZSkge1xuXHRcdHJldHVybiBgXCIke3ZhbHVlLnJlcGxhY2UoL1xcXFwvZywgXCJcXFxcXFxcXFwiKS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJyl9XCJgO1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdExvY2FsRGF0ZShpc29TdHJpbmc6IHN0cmluZywgdGltZXpvbmU6IHN0cmluZyk6IHN0cmluZyB7XG5cdGNvbnN0IGQgPSBuZXcgRGF0ZShpc29TdHJpbmcpO1xuXHRjb25zdCBmbXQgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChcImVuLUNBXCIsIHtcblx0XHR0aW1lWm9uZTogdGltZXpvbmUsXG5cdFx0eWVhcjogXCJudW1lcmljXCIsXG5cdFx0bW9udGg6IFwiMi1kaWdpdFwiLFxuXHRcdGRheTogXCIyLWRpZ2l0XCIsXG5cdFx0aG91cjogXCIyLWRpZ2l0XCIsXG5cdFx0bWludXRlOiBcIjItZGlnaXRcIixcblx0XHRzZWNvbmQ6IFwiMi1kaWdpdFwiLFxuXHRcdGhvdXIxMjogZmFsc2UsXG5cdH0pO1xuXHRjb25zdCBwYXJ0cyA9IE9iamVjdC5mcm9tRW50cmllcyhcblx0XHRmbXQuZm9ybWF0VG9QYXJ0cyhkKS5tYXAoKHApID0+IFtwLnR5cGUsIHAudmFsdWVdKSxcblx0KTtcblx0cmV0dXJuIGAke3BhcnRzLnllYXJ9LSR7cGFydHMubW9udGh9LSR7cGFydHMuZGF5fVQke3BhcnRzLmhvdXJ9OiR7cGFydHMubWludXRlfToke3BhcnRzLnNlY29uZH1gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0Q2xpcFRvTWFya2Rvd24oY2xpcDogQ2xpcCwgc2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncyk6IHN0cmluZyB7XG5cdGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtcIi0tLVwiXTtcblxuXHRsaW5lcy5wdXNoKGBzb3VyY2U6ICR7Y2xpcC5zb3VyY2V9YCk7XG5cdGlmIChjbGlwLnVybCkge1xuXHRcdGxpbmVzLnB1c2goYHVybDogJHtlc2NhcGVZYW1sKGNsaXAudXJsKX1gKTtcblx0fVxuXHRpZiAoY2xpcC5jaGF0VGl0bGUpIHtcblx0XHRsaW5lcy5wdXNoKGBjaGF0X3RpdGxlOiAke2VzY2FwZVlhbWwoY2xpcC5jaGF0VGl0bGUpfWApO1xuXHR9XG5cdGxpbmVzLnB1c2goYGNsaXBwZWRfYXQ6ICR7Zm9ybWF0TG9jYWxEYXRlKGNsaXAuY3JlYXRlZEF0LCBzZXR0aW5ncy50aW1lem9uZSl9YCk7XG5cblx0aWYgKGNsaXAuc3VtbWFyeSkge1xuXHRcdGxpbmVzLnB1c2goYHN1bW1hcnk6ICR7ZXNjYXBlWWFtbChjbGlwLnN1bW1hcnkpfWApO1xuXHR9XG5cdGlmIChjbGlwLnRhZ3MpIHtcblx0XHRjb25zdCB0YWdMaXN0ID0gY2xpcC50YWdzXG5cdFx0XHQuc3BsaXQoXCIsXCIpXG5cdFx0XHQubWFwKCh0KSA9PiB0LnRyaW0oKS5yZXBsYWNlKC9eIy8sIFwiXCIpKVxuXHRcdFx0LmZpbHRlcihCb29sZWFuKTtcblx0XHRpZiAodGFnTGlzdC5sZW5ndGggPiAwKSB7XG5cdFx0XHRsaW5lcy5wdXNoKGB0YWdzOiBbJHt0YWdMaXN0Lm1hcCgodCkgPT4gZXNjYXBlWWFtbCh0KSkuam9pbihcIiwgXCIpfV1gKTtcblx0XHR9XG5cdH1cblxuXHRsaW5lcy5wdXNoKFwiLS0tXCIpO1xuXHRsaW5lcy5wdXNoKFwiXCIpO1xuXG5cdGlmIChjbGlwLnByb21wdCkge1xuXHRcdGxpbmVzLnB1c2goXCIjIyBQcm9tcHRcIik7XG5cdFx0bGluZXMucHVzaChcIlwiKTtcblx0XHRsaW5lcy5wdXNoKGNsaXAucHJvbXB0KTtcblx0XHRsaW5lcy5wdXNoKFwiXCIpO1xuXHR9XG5cblx0bGluZXMucHVzaChcIiMjIFJlc3BvbnNlXCIpO1xuXHRsaW5lcy5wdXNoKFwiXCIpO1xuXHRsaW5lcy5wdXNoKGNsaXAuY29udGVudCk7XG5cdGxpbmVzLnB1c2goXCJcIik7XG5cblx0cmV0dXJuIGxpbmVzLmpvaW4oXCJcXG5cIik7XG59XG4iLCAiLyoqIENsaXAgc3luY2hyb25pemF0aW9uIFx1MjAxNCBmZXRjaGVzIHBlbmRpbmcgY2xpcHMgZnJvbSB0aGUgQVBJIGFuZCB3cml0ZXMgdGhlbSB0byB0aGUgdmF1bHQgKi9cbmltcG9ydCB0eXBlIHsgQXBwIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBhcGlHZXQsIGFwaVBhdGNoLCBhcGlQdXQgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7IHNjYW5Gb2xkZXJzLCBzeW5jRm9sZGVyc1RvQXBpIH0gZnJvbSBcIi4vZm9sZGVyc1wiO1xuaW1wb3J0IHsgZm9ybWF0Q2xpcFRvTWFya2Rvd24sIGZvcm1hdExvY2FsRGF0ZSB9IGZyb20gXCIuL2Zvcm1hdHRlclwiO1xuaW1wb3J0IHR5cGUgeyBBSUNoYXRDbGlwU2V0dGluZ3MsIENsaXAsIFVzZXJQbGFuIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IFNZTkNFRF9DTElQX0lEU19NQVggfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFN5bmNSZXN1bHQge1xuXHRzeW5jZWQ6IG51bWJlcjtcblx0ZmFpbGVkOiBudW1iZXI7XG5cdGVycm9yczogc3RyaW5nW107XG5cdHVzZXJQbGFuOiBcImZyZWVcIiB8IFwicHJvXCI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoUGVuZGluZ0NsaXBzKHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MpOiBQcm9taXNlPENsaXBbXT4ge1xuXHRjb25zdCByZXMgPSBhd2FpdCBhcGlHZXQoc2V0dGluZ3MsIFwiL2FwaS9jbGlwcy9wZW5kaW5nXCIpO1xuXHRpZiAocmVzLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggcGVuZGluZyBjbGlwczogJHtyZXMuc3RhdHVzfWApO1xuXHR9XG5cdHJldHVybiByZXMuanNvbiBhcyBDbGlwW107XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoVXNlclBsYW4oc2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncyk6IFByb21pc2U8VXNlclBsYW4+IHtcblx0dHJ5IHtcblx0XHRjb25zdCByZXMgPSBhd2FpdCBhcGlHZXQoc2V0dGluZ3MsIFwiL2FwaS9tZVwiKTtcblx0XHRpZiAocmVzLnN0YXR1cyA9PT0gMjAwKSB7XG5cdFx0XHRjb25zdCBkYXRhID0gcmVzLmpzb24gYXMgeyB1c2VyPzogeyBwbGFuPzogc3RyaW5nIH0gfTtcblx0XHRcdHJldHVybiAoZGF0YS51c2VyPy5wbGFuID09PSBcInByb1wiID8gXCJwcm9cIiA6IFwiZnJlZVwiKSBhcyBVc2VyUGxhbjtcblx0XHR9XG5cdH0gY2F0Y2gge1xuXHRcdC8vIGZhbGwgdGhyb3VnaFxuXHR9XG5cdHJldHVybiBcImZyZWVcIjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFya0NsaXBTeW5jZWQoc2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncywgY2xpcElkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3QgcmVzID0gYXdhaXQgYXBpUGF0Y2goc2V0dGluZ3MsIGAvYXBpL2NsaXBzLyR7Y2xpcElkfS9zeW5jYCwge1xuXHRcdHN5bmNlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG5cdH0pO1xuXHRpZiAocmVzLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbWFyayBjbGlwICR7Y2xpcElkfSBhcyBzeW5jZWQ6ICR7cmVzLnN0YXR1c31gKTtcblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVGb2xkZXIoYXBwOiBBcHAsIGZvbGRlclBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCBwYXJ0cyA9IGZvbGRlclBhdGguc3BsaXQoXCIvXCIpO1xuXHRsZXQgY3VycmVudCA9IFwiXCI7XG5cblx0Zm9yIChjb25zdCBwYXJ0IG9mIHBhcnRzKSB7XG5cdFx0Y3VycmVudCA9IGN1cnJlbnQgPyBgJHtjdXJyZW50fS8ke3BhcnR9YCA6IHBhcnQ7XG5cdFx0aWYgKCFhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGN1cnJlbnQpKSB7XG5cdFx0XHRhd2FpdCBhcHAudmF1bHQuY3JlYXRlRm9sZGVyKGN1cnJlbnQpO1xuXHRcdH1cblx0fVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRFeGlzdGluZ1N5bmNlZENsaXBJZHMoYXBwOiBBcHAsIGZvbGRlclBhdGg6IHN0cmluZyk6IFByb21pc2U8U2V0PHN0cmluZz4+IHtcblx0Y29uc3QgaWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cdGNvbnN0IGZvbGRlciA9IGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZm9sZGVyUGF0aCk7XG5cdGlmICghZm9sZGVyKSByZXR1cm4gaWRzO1xuXG5cdGNvbnN0IGZpbGVzID0gYXBwLnZhdWx0LmdldE1hcmtkb3duRmlsZXMoKS5maWx0ZXIoKGYpID0+IGYucGF0aC5zdGFydHNXaXRoKGAke2ZvbGRlclBhdGh9L2ApKTtcblxuXHRmb3IgKGNvbnN0IGZpbGUgb2YgZmlsZXMpIHtcblx0XHRjb25zdCBjYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmaWxlKTtcblx0XHRjb25zdCBjbGlwSWQgPSBjYWNoZT8uZnJvbnRtYXR0ZXI/LmNsaXBfaWQ7XG5cdFx0aWYgKHR5cGVvZiBjbGlwSWQgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdGlkcy5hZGQoY2xpcElkKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaWRzO1xufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZUZpbGVOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG5cdHJldHVybiBuYW1lXG5cdFx0LnJlcGxhY2UoL1svXFxcXDoqP1wiPD58XS9nLCBcIi1cIilcblx0XHQucmVwbGFjZSgvLSsvZywgXCItXCIpXG5cdFx0LnJlcGxhY2UoL14tfC0kL2csIFwiXCIpXG5cdFx0LnRyaW0oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5RmlsZU5hbWVUZW1wbGF0ZShcblx0dGVtcGxhdGU6IHN0cmluZyxcblx0Y2xpcDogQ2xpcCxcblx0dGltZXpvbmU6IHN0cmluZyxcblx0dXNlclBsYW46IFVzZXJQbGFuLFxuKTogc3RyaW5nIHtcblx0Y29uc3QgbG9jYWxEYXRlID0gZm9ybWF0TG9jYWxEYXRlKGNsaXAuY3JlYXRlZEF0LCB0aW1lem9uZSk7XG5cdC8vIFBhcnNlOiAyMDI2LTAzLTA4VDE0OjA4OjA2XG5cdGNvbnN0IFtkYXRlUGFydCwgdGltZVBhcnRdID0gbG9jYWxEYXRlLnNwbGl0KFwiVFwiKTtcblx0Y29uc3QgW3l5eXksIE1NLCBkZF0gPSBkYXRlUGFydC5zcGxpdChcIi1cIik7XG5cdGNvbnN0IFtoaCwgbW0sIHNzXSA9IHRpbWVQYXJ0LnNwbGl0KFwiOlwiKTtcblxuXHRsZXQgcmVzdWx0ID0gdGVtcGxhdGVcblx0XHQucmVwbGFjZSgvXFx7eXl5eVxcfS9nLCB5eXl5KVxuXHRcdC5yZXBsYWNlKC9cXHtNTVxcfS9nLCBNTSlcblx0XHQucmVwbGFjZSgvXFx7ZGRcXH0vZywgZGQpXG5cdFx0LnJlcGxhY2UoL1xce2hoXFx9L2csIGhoKVxuXHRcdC5yZXBsYWNlKC9cXHttbVxcfS9nLCBtbSlcblx0XHQucmVwbGFjZSgvXFx7c3NcXH0vZywgc3MpXG5cdFx0LnJlcGxhY2UoL1xce3NvdXJjZVxcfS9nLCBjbGlwLnNvdXJjZSlcblx0XHQucmVwbGFjZSgvXFx7Y2hhdF90aXRsZVxcfS9nLCBzYW5pdGl6ZUZpbGVOYW1lKGNsaXAuY2hhdFRpdGxlIHx8IFwiVW50aXRsZWRcIikpO1xuXG5cdGlmICh1c2VyUGxhbiA9PT0gXCJwcm9cIikge1xuXHRcdHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC9cXHt0aXRsZVxcfS9nLCBzYW5pdGl6ZUZpbGVOYW1lKGNsaXAudGl0bGUgfHwgXCJVbnRpdGxlZFwiKSk7XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoL1xce3RpdGxlXFx9L2csIFwidGl0bGUtb25seS1wcm8tcGxhblwiKTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlc29sdmVGaWxlUGF0aChcblx0YXBwOiBBcHAsXG5cdHRhcmdldEZvbGRlcjogc3RyaW5nLFxuXHRiYXNlTmFtZTogc3RyaW5nLFxuKTogUHJvbWlzZTxzdHJpbmc+IHtcblx0bGV0IGNhbmRpZGF0ZSA9IGAke3RhcmdldEZvbGRlcn0vJHtiYXNlTmFtZX0ubWRgO1xuXHRsZXQgY291bnRlciA9IDI7XG5cblx0d2hpbGUgKGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoY2FuZGlkYXRlKSkge1xuXHRcdGNhbmRpZGF0ZSA9IGAke3RhcmdldEZvbGRlcn0vJHtiYXNlTmFtZX0tJHtjb3VudGVyfS5tZGA7XG5cdFx0Y291bnRlcisrO1xuXHR9XG5cblx0cmV0dXJuIGNhbmRpZGF0ZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gd3JpdGVDbGlwVG9WYXVsdChcblx0YXBwOiBBcHAsXG5cdHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsXG5cdGNsaXA6IENsaXAsXG5cdHVzZXJQbGFuOiBVc2VyUGxhbixcbik6IFByb21pc2U8dm9pZD4ge1xuXHRjb25zdCB0YXJnZXRGb2xkZXIgPSB1c2VyUGxhbiA9PT0gXCJwcm9cIiAmJiBjbGlwLmZvbGRlclBhdGhcblx0XHQ/IGNsaXAuZm9sZGVyUGF0aFxuXHRcdDogc2V0dGluZ3MuaW5ib3hGb2xkZXI7XG5cdGF3YWl0IGVuc3VyZUZvbGRlcihhcHAsIHRhcmdldEZvbGRlcik7XG5cdGNvbnN0IG1hcmtkb3duID0gZm9ybWF0Q2xpcFRvTWFya2Rvd24oY2xpcCwgc2V0dGluZ3MpO1xuXHRjb25zdCBiYXNlTmFtZSA9IGFwcGx5RmlsZU5hbWVUZW1wbGF0ZShzZXR0aW5ncy5maWxlTmFtZVRlbXBsYXRlLCBjbGlwLCBzZXR0aW5ncy50aW1lem9uZSwgdXNlclBsYW4pO1xuXHRjb25zdCBmaWxlUGF0aCA9IGF3YWl0IHJlc29sdmVGaWxlUGF0aChhcHAsIHRhcmdldEZvbGRlciwgYmFzZU5hbWUpO1xuXHRhd2FpdCBhcHAudmF1bHQuY3JlYXRlKGZpbGVQYXRoLCBtYXJrZG93bik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN5bmNUYWdSdWxlKGFwcDogQXBwLCBzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmICghc2V0dGluZ3MudGFnUnVsZVBhdGggfHwgIXNldHRpbmdzLnRva2VuKSByZXR1cm47XG5cdHRyeSB7XG5cdFx0Y29uc3QgZmlsZVBhdGggPSBgJHtzZXR0aW5ncy50YWdSdWxlUGF0aH0ubWRgO1xuXHRcdGNvbnN0IGZpbGUgPSBhcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKGZpbGVQYXRoKTtcblx0XHRpZiAoIWZpbGUpIHJldHVybjtcblxuXHRcdGNvbnN0IG1kRmlsZSA9IGFwcC52YXVsdC5nZXRNYXJrZG93bkZpbGVzKCkuZmluZCgoZikgPT4gZi5wYXRoID09PSBmaWxlUGF0aCk7XG5cdFx0aWYgKCFtZEZpbGUpIHJldHVybjtcblxuXHRcdGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBhcHAudmF1bHQucmVhZChtZEZpbGUpO1xuXHRcdGF3YWl0IGFwaVB1dChzZXR0aW5ncywgXCIvYXBpL3ByZWZlcmVuY2VzXCIsIHsgdGFnUnVsZTogY29udGVudCB9KTtcblx0fSBjYXRjaCB7XG5cdFx0Y29uc29sZS53YXJuKFwiQUlDaGF0Q2xpcDogVGFnUnVsZSBzeW5jIGZhaWxlZFwiKTtcblx0fVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3luY0NsaXBzKGFwcDogQXBwLCBzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzKTogUHJvbWlzZTxTeW5jUmVzdWx0PiB7XG5cdGNvbnN0IHJlc3VsdDogU3luY1Jlc3VsdCA9IHsgc3luY2VkOiAwLCBmYWlsZWQ6IDAsIGVycm9yczogW10sIHVzZXJQbGFuOiBcImZyZWVcIiB9O1xuXG5cdGNvbnN0IFtjbGlwcywgdXNlclBsYW5dID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuXHRcdGZldGNoUGVuZGluZ0NsaXBzKHNldHRpbmdzKSxcblx0XHRmZXRjaFVzZXJQbGFuKHNldHRpbmdzKSxcblx0XSk7XG5cdHJlc3VsdC51c2VyUGxhbiA9IHVzZXJQbGFuO1xuXG5cdC8vIFByby1vbmx5OiBzeW5jIHZhdWx0IGZvbGRlciBzdHJ1Y3R1cmUgYW5kIHRhZyBydWxlcyB0byBBUElcblx0aWYgKHVzZXJQbGFuID09PSBcInByb1wiKSB7XG5cdFx0aWYgKHNldHRpbmdzLmF1dG9TY2FuRm9sZGVycykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZm9sZGVycyA9IGF3YWl0IHNjYW5Gb2xkZXJzKGFwcCwgc2V0dGluZ3Muc2NhblJvb3QsIHNldHRpbmdzLm1hcmtlckZpbGVuYW1lKTtcblx0XHRcdFx0YXdhaXQgc3luY0ZvbGRlcnNUb0FwaShzZXR0aW5ncywgZm9sZGVycyk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybihcIkFJQ2hhdENsaXA6IGZvbGRlciBzeW5jIGZhaWxlZCwgY29udGludWluZyB3aXRoIGNsaXAgc3luY1wiLCBlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0YXdhaXQgc3luY1RhZ1J1bGUoYXBwLCBzZXR0aW5ncyk7XG5cdH1cblx0aWYgKGNsaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc3VsdDtcblxuXHRhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cblx0Y29uc3QgZXhpc3RpbmdJZHMgPSBhd2FpdCBnZXRFeGlzdGluZ1N5bmNlZENsaXBJZHMoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cblx0Y29uc3Qgc3luY2VkU2V0ID0gbmV3IFNldChzZXR0aW5ncy5zeW5jZWRDbGlwSWRzKTtcblxuXHRmb3IgKGNvbnN0IGNsaXAgb2YgY2xpcHMpIHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKGV4aXN0aW5nSWRzLmhhcyhjbGlwLmlkKSB8fCBzeW5jZWRTZXQuaGFzKGNsaXAuaWQpKSB7XG5cdFx0XHRcdGF3YWl0IG1hcmtDbGlwU3luY2VkKHNldHRpbmdzLCBjbGlwLmlkKTtcblx0XHRcdFx0cmVzdWx0LnN5bmNlZCsrO1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0YXdhaXQgd3JpdGVDbGlwVG9WYXVsdChhcHAsIHNldHRpbmdzLCBjbGlwLCB1c2VyUGxhbik7XG5cblx0XHRcdGF3YWl0IG1hcmtDbGlwU3luY2VkKHNldHRpbmdzLCBjbGlwLmlkKTtcblx0XHRcdHJlc3VsdC5zeW5jZWQrKztcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXN1bHQuZmFpbGVkKys7XG5cdFx0XHRyZXN1bHQuZXJyb3JzLnB1c2goYENsaXAgJHtjbGlwLmlkfTogJHtlIGluc3RhbmNlb2YgRXJyb3IgPyBlLm1lc3NhZ2UgOiBTdHJpbmcoZSl9YCk7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hDbGlwQnlJZChzZXR0aW5nczogQUlDaGF0Q2xpcFNldHRpbmdzLCBjbGlwSWQ6IHN0cmluZyk6IFByb21pc2U8Q2xpcD4ge1xuXHRjb25zdCByZXMgPSBhd2FpdCBhcGlHZXQoc2V0dGluZ3MsIGAvYXBpL2NsaXBzLyR7Y2xpcElkfWApO1xuXHRpZiAocmVzLnN0YXR1cyAhPT0gMjAwKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gZmV0Y2ggY2xpcCAke2NsaXBJZH06ICR7cmVzLnN0YXR1c31gKTtcblx0fVxuXHRyZXR1cm4gcmVzLmpzb24gYXMgQ2xpcDtcbn1cblxuZnVuY3Rpb24gYWRkU3luY2VkQ2xpcElkKHNldHRpbmdzOiBBSUNoYXRDbGlwU2V0dGluZ3MsIGNsaXBJZDogc3RyaW5nKTogdm9pZCB7XG5cdGlmIChzZXR0aW5ncy5zeW5jZWRDbGlwSWRzLmluY2x1ZGVzKGNsaXBJZCkpIHJldHVybjtcblx0c2V0dGluZ3Muc3luY2VkQ2xpcElkcy5wdXNoKGNsaXBJZCk7XG5cdGlmIChzZXR0aW5ncy5zeW5jZWRDbGlwSWRzLmxlbmd0aCA+IFNZTkNFRF9DTElQX0lEU19NQVgpIHtcblx0XHRzZXR0aW5ncy5zeW5jZWRDbGlwSWRzID0gc2V0dGluZ3Muc3luY2VkQ2xpcElkcy5zbGljZSgtU1lOQ0VEX0NMSVBfSURTX01BWCk7XG5cdH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNTaW5nbGVDbGlwKFxuXHRhcHA6IEFwcCxcblx0c2V0dGluZ3M6IEFJQ2hhdENsaXBTZXR0aW5ncyxcblx0Y2xpcElkOiBzdHJpbmcsXG5cdHNhdmVTZXR0aW5nczogKCkgPT4gUHJvbWlzZTx2b2lkPixcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuXHQvLyBJZGVtcG90ZW5jeTogc2tpcCBpZiBhbHJlYWR5IHN5bmNlZFxuXHRpZiAoc2V0dGluZ3Muc3luY2VkQ2xpcElkcy5pbmNsdWRlcyhjbGlwSWQpKSByZXR1cm4gZmFsc2U7XG5cblx0Y29uc3QgZXhpc3RpbmdJZHMgPSBhd2FpdCBnZXRFeGlzdGluZ1N5bmNlZENsaXBJZHMoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cdGlmIChleGlzdGluZ0lkcy5oYXMoY2xpcElkKSkge1xuXHRcdGFkZFN5bmNlZENsaXBJZChzZXR0aW5ncywgY2xpcElkKTtcblx0XHRhd2FpdCBzYXZlU2V0dGluZ3MoKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRjb25zdCBjbGlwID0gYXdhaXQgZmV0Y2hDbGlwQnlJZChzZXR0aW5ncywgY2xpcElkKTtcblx0Y29uc3QgdXNlclBsYW4gPSBhd2FpdCBmZXRjaFVzZXJQbGFuKHNldHRpbmdzKTtcblx0c2V0dGluZ3MuY2FjaGVkVXNlclBsYW4gPSB1c2VyUGxhbjtcblxuXHRhd2FpdCBlbnN1cmVGb2xkZXIoYXBwLCBzZXR0aW5ncy5pbmJveEZvbGRlcik7XG5cdGF3YWl0IHdyaXRlQ2xpcFRvVmF1bHQoYXBwLCBzZXR0aW5ncywgY2xpcCwgdXNlclBsYW4pO1xuXHRhd2FpdCBtYXJrQ2xpcFN5bmNlZChzZXR0aW5ncywgY2xpcC5pZCk7XG5cblx0YWRkU3luY2VkQ2xpcElkKHNldHRpbmdzLCBjbGlwSWQpO1xuXHRhd2FpdCBzYXZlU2V0dGluZ3MoKTtcblxuXHRyZXR1cm4gdHJ1ZTtcbn1cbiIsICIvKiogV2ViU29ja2V0IGNsaWVudCBmb3IgcmVhbC10aW1lIGNsaXAgcHVzaCBub3RpZmljYXRpb25zIChkZXNrdG9wIG9ubHkpICovXG5leHBvcnQgaW50ZXJmYWNlIFN5bmNXZWJTb2NrZXRPcHRpb25zIHtcblx0YXBpQmFzZVVybDogc3RyaW5nO1xuXHR0b2tlbjogc3RyaW5nO1xuXHRkZXZpY2VJZDogc3RyaW5nO1xuXHRvbk5ld0NsaXA6IChjbGlwSWQ6IHN0cmluZykgPT4gdm9pZDtcblx0b25TdGF0dXNDaGFuZ2U/OiAoY29ubmVjdGVkOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgU3luY1dlYlNvY2tldCB7XG5cdHByaXZhdGUgd3M6IFdlYlNvY2tldCB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIHJlY29ubmVjdEF0dGVtcHQgPSAwO1xuXHRwcml2YXRlIHJlY29ubmVjdFRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuXHRwcml2YXRlIHBpbmdUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0SW50ZXJ2YWw+IHwgbnVsbCA9IG51bGw7XG5cdHByaXZhdGUgc2hvdWxkUmVjb25uZWN0ID0gdHJ1ZTtcblx0cHJpdmF0ZSBvcHRzOiBTeW5jV2ViU29ja2V0T3B0aW9ucztcblxuXHRjb25zdHJ1Y3RvcihvcHRzOiBTeW5jV2ViU29ja2V0T3B0aW9ucykge1xuXHRcdHRoaXMub3B0cyA9IG9wdHM7XG5cdH1cblxuXHRjb25uZWN0KCk6IHZvaWQge1xuXHRcdHRoaXMuc2hvdWxkUmVjb25uZWN0ID0gdHJ1ZTtcblx0XHR0aGlzLmRvQ29ubmVjdCgpO1xuXHR9XG5cblx0cHJpdmF0ZSBkb0Nvbm5lY3QoKTogdm9pZCB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIENvbnZlcnQgaHR0cChzKTovLyB0byB3cyhzKTovL1xuXHRcdFx0Y29uc3Qgd3NVcmwgPSB0aGlzLm9wdHMuYXBpQmFzZVVybFxuXHRcdFx0XHQucmVwbGFjZSgvXmh0dHBzOlxcL1xcLy8sIFwid3NzOi8vXCIpXG5cdFx0XHRcdC5yZXBsYWNlKC9eaHR0cDpcXC9cXC8vLCBcIndzOi8vXCIpO1xuXHRcdFx0Y29uc3QgdXJsID0gYCR7d3NVcmx9L2FwaS93cz90b2tlbj0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLm9wdHMudG9rZW4pfSZkZXZpY2VJZD0ke2VuY29kZVVSSUNvbXBvbmVudCh0aGlzLm9wdHMuZGV2aWNlSWQpfWA7XG5cblx0XHRcdHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHVybCk7XG5cblx0XHRcdHRoaXMud3Mub25vcGVuID0gKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnJlY29ubmVjdEF0dGVtcHQgPSAwO1xuXHRcdFx0XHR0aGlzLnN0YXJ0UGluZygpO1xuXHRcdFx0XHR0aGlzLm9wdHMub25TdGF0dXNDaGFuZ2U/Lih0cnVlKTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMud3Mub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRcdGlmIChldmVudC5kYXRhID09PSBcInBvbmdcIikgcmV0dXJuO1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IG1zZyA9IEpTT04ucGFyc2UoZXZlbnQuZGF0YSBhcyBzdHJpbmcpIGFzIHsgdHlwZTogc3RyaW5nOyBjbGlwSWQ/OiBzdHJpbmcgfTtcblx0XHRcdFx0XHRpZiAobXNnLnR5cGUgPT09IFwibmV3X2NsaXBcIiAmJiBtc2cuY2xpcElkKSB7XG5cdFx0XHRcdFx0XHR0aGlzLm9wdHMub25OZXdDbGlwKG1zZy5jbGlwSWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBjYXRjaCB7XG5cdFx0XHRcdFx0Ly8gaWdub3JlIHVucGFyc2VhYmxlIG1lc3NhZ2VzXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHRoaXMud3Mub25jbG9zZSA9ICgpID0+IHtcblx0XHRcdFx0dGhpcy5zdG9wUGluZygpO1xuXHRcdFx0XHR0aGlzLm9wdHMub25TdGF0dXNDaGFuZ2U/LihmYWxzZSk7XG5cdFx0XHRcdHRoaXMuc2NoZWR1bGVSZWNvbm5lY3QoKTtcblx0XHRcdH07XG5cblx0XHRcdHRoaXMud3Mub25lcnJvciA9ICgpID0+IHtcblx0XHRcdFx0dGhpcy53cz8uY2xvc2UoKTtcblx0XHRcdH07XG5cdFx0fSBjYXRjaCB7XG5cdFx0XHR0aGlzLnNjaGVkdWxlUmVjb25uZWN0KCk7XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBzY2hlZHVsZVJlY29ubmVjdCgpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuc2hvdWxkUmVjb25uZWN0KSByZXR1cm47XG5cblx0XHRjb25zdCBkZWxheSA9IE1hdGgubWluKDEwMDAgKiAyICoqIHRoaXMucmVjb25uZWN0QXR0ZW1wdCwgNjAwMDApO1xuXHRcdHRoaXMucmVjb25uZWN0QXR0ZW1wdCsrO1xuXG5cdFx0dGhpcy5yZWNvbm5lY3RUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5yZWNvbm5lY3RUaW1lciA9IG51bGw7XG5cdFx0XHR0aGlzLmRvQ29ubmVjdCgpO1xuXHRcdH0sIGRlbGF5KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhcnRQaW5nKCk6IHZvaWQge1xuXHRcdHRoaXMuc3RvcFBpbmcoKTtcblx0XHR0aGlzLnBpbmdUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLndzPy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTikge1xuXHRcdFx0XHR0aGlzLndzLnNlbmQoXCJwaW5nXCIpO1xuXHRcdFx0fVxuXHRcdH0sIDMwMDAwKTtcblx0fVxuXG5cdHByaXZhdGUgc3RvcFBpbmcoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMucGluZ1RpbWVyICE9PSBudWxsKSB7XG5cdFx0XHRjbGVhckludGVydmFsKHRoaXMucGluZ1RpbWVyKTtcblx0XHRcdHRoaXMucGluZ1RpbWVyID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRkaXNjb25uZWN0KCk6IHZvaWQge1xuXHRcdHRoaXMuc2hvdWxkUmVjb25uZWN0ID0gZmFsc2U7XG5cdFx0dGhpcy5zdG9wUGluZygpO1xuXHRcdGlmICh0aGlzLnJlY29ubmVjdFRpbWVyICE9PSBudWxsKSB7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy5yZWNvbm5lY3RUaW1lcik7XG5cdFx0XHR0aGlzLnJlY29ubmVjdFRpbWVyID0gbnVsbDtcblx0XHR9XG5cdFx0aWYgKHRoaXMud3MpIHtcblx0XHRcdHRoaXMud3MuY2xvc2UoKTtcblx0XHRcdHRoaXMud3MgPSBudWxsO1xuXHRcdH1cblx0XHR0aGlzLm9wdHMub25TdGF0dXNDaGFuZ2U/LihmYWxzZSk7XG5cdH1cblxuXHRnZXQgaXNDb25uZWN0ZWQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMud3M/LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOO1xuXHR9XG5cblx0dXBkYXRlT3B0cyhvcHRzOiBQYXJ0aWFsPFN5bmNXZWJTb2NrZXRPcHRpb25zPik6IHZvaWQge1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBvcHRzKTtcblx0fVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0EsSUFBQUEsbUJBQWtEOzs7QUNBbEQsc0JBQXFDO0FBR3JDLGVBQXNCLE9BQU8sVUFBOEIsTUFBYztBQUN4RSxRQUFNLE1BQU0sVUFBTSw0QkFBVztBQUFBLElBQzVCLEtBQUssR0FBRyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBQUEsSUFDbEMsUUFBUTtBQUFBLElBQ1IsU0FBUyxFQUFFLGVBQWUsVUFBVSxTQUFTLEtBQUssR0FBRztBQUFBLEVBQ3RELENBQUM7QUFDRCxTQUFPO0FBQ1I7QUFFQSxlQUFzQixRQUFRLFVBQThCLE1BQWMsTUFBZ0I7QUFDekYsUUFBTSxNQUFNLFVBQU0sNEJBQVc7QUFBQSxJQUM1QixLQUFLLEdBQUcsU0FBUyxVQUFVLEdBQUcsSUFBSTtBQUFBLElBQ2xDLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxNQUNSLGVBQWUsVUFBVSxTQUFTLEtBQUs7QUFBQSxNQUN2QyxnQkFBZ0I7QUFBQSxJQUNqQjtBQUFBLElBQ0EsTUFBTSxRQUFRLE9BQU8sS0FBSyxVQUFVLElBQUksSUFBSTtBQUFBLEVBQzdDLENBQUM7QUFDRCxTQUFPO0FBQ1I7QUFFQSxlQUFzQixPQUFPLFVBQThCLE1BQWMsTUFBZTtBQUN2RixRQUFNLE1BQU0sVUFBTSw0QkFBVztBQUFBLElBQzVCLEtBQUssR0FBRyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBQUEsSUFDbEMsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1IsZUFBZSxVQUFVLFNBQVMsS0FBSztBQUFBLE1BQ3ZDLGdCQUFnQjtBQUFBLElBQ2pCO0FBQUEsSUFDQSxNQUFNLEtBQUssVUFBVSxJQUFJO0FBQUEsRUFDMUIsQ0FBQztBQUNELFNBQU87QUFDUjtBQUVBLGVBQXNCLFNBQVMsVUFBOEIsTUFBYyxNQUFnQjtBQUMxRixRQUFNLE1BQU0sVUFBTSw0QkFBVztBQUFBLElBQzVCLEtBQUssR0FBRyxTQUFTLFVBQVUsR0FBRyxJQUFJO0FBQUEsSUFDbEMsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLE1BQ1IsZUFBZSxVQUFVLFNBQVMsS0FBSztBQUFBLE1BQ3ZDLGdCQUFnQjtBQUFBLElBQ2pCO0FBQUEsSUFDQSxNQUFNLFFBQVEsT0FBTyxLQUFLLFVBQVUsSUFBSSxJQUFJO0FBQUEsRUFDN0MsQ0FBQztBQUNELFNBQU87QUFDUjtBQUVBLGVBQXNCLGVBQWUsVUFBNkM7QUFDakYsTUFBSSxDQUFDLFNBQVMsU0FBUyxDQUFDLFNBQVMsU0FBVTtBQUMzQyxNQUFJO0FBQ0gsVUFBTSxRQUFRLFVBQVUsZ0JBQWdCO0FBQUEsTUFDdkMsVUFBVSxTQUFTO0FBQUEsTUFDbkIsWUFBWSx5QkFBUyxZQUFZLHFCQUFxQjtBQUFBLElBQ3ZELENBQUM7QUFBQSxFQUNGLFNBQVMsR0FBRztBQUNYLFlBQVEsS0FBSywwQ0FBMEMsQ0FBQztBQUFBLEVBQ3pEO0FBQ0Q7OztBQzNEQSxJQUFNLGVBQTJEO0FBQUE7QUFBQSxFQUVoRSxhQUFhLEVBQUUsSUFBSSxTQUFTLElBQUksZ0JBQU0sSUFBSSxnQkFBTSxJQUFJLGVBQUs7QUFBQSxFQUN6RCxXQUFXLEVBQUUsSUFBSSxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sSUFBSSxNQUFNO0FBQUEsRUFDeEQsYUFBYSxFQUFFLElBQUksU0FBUyxJQUFJLHNCQUFPLElBQUksZ0JBQU0sSUFBSSxxQkFBTTtBQUFBO0FBQUEsRUFHM0QsYUFBYSxFQUFFLElBQUksa0JBQWtCLElBQUksZ0JBQU0sSUFBSSxnQkFBTSxJQUFJLGVBQUs7QUFBQSxFQUNsRSxrQkFBa0IsRUFBRSxJQUFJLGFBQWEsSUFBSSw0QkFBUSxJQUFJLHNCQUFPLElBQUkscUJBQU07QUFBQSxFQUN0RSxxQkFBcUI7QUFBQSxJQUNwQixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0EsZUFBZSxFQUFFLElBQUksV0FBVyxJQUFJLGtDQUFTLElBQUksZ0JBQU0sSUFBSSxxQkFBTTtBQUFBLEVBQ2pFLGdCQUFnQixFQUFFLElBQUksWUFBWSxJQUFJLHdDQUFVLElBQUksZ0JBQU0sSUFBSSwyQkFBTztBQUFBO0FBQUEsRUFHckUsV0FBVyxFQUFFLElBQUksa0JBQWtCLElBQUksb0RBQVksSUFBSSw0QkFBUSxJQUFJLHdDQUFVO0FBQUEsRUFDN0UsZ0JBQWdCLEVBQUUsSUFBSSxxQkFBcUIsSUFBSSxvQ0FBVyxJQUFJLG9DQUFXLElBQUksbUNBQVU7QUFBQSxFQUN2RixtQkFBbUIsRUFBRSxJQUFJLHdCQUF3QixJQUFJLDhCQUFVLElBQUksb0NBQVcsSUFBSSwwQ0FBWTtBQUFBO0FBQUEsRUFHOUYsZUFBZSxFQUFFLElBQUkseUJBQXlCLElBQUksNEVBQWdCLElBQUksa0NBQVMsSUFBSSwrQ0FBWTtBQUFBLEVBQy9GLGVBQWU7QUFBQSxJQUNkLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSxzQkFBc0IsRUFBRSxJQUFJLGdCQUFnQixJQUFJLG9EQUFZLElBQUksa0NBQVMsSUFBSSx3Q0FBVTtBQUFBO0FBQUEsRUFHdkYsY0FBYyxFQUFFLElBQUksZ0JBQWdCLElBQUksd0NBQVUsSUFBSSx3Q0FBVSxJQUFJLCtDQUFZO0FBQUEsRUFDaEYsY0FBYztBQUFBLElBQ2IsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQTtBQUFBLEVBR0EsaUJBQWlCLEVBQUUsSUFBSSxxQkFBcUIsSUFBSSxvREFBWSxJQUFJLDhDQUFXLElBQUksc0RBQWM7QUFBQSxFQUM3RixpQkFBaUI7QUFBQSxJQUNoQixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBO0FBQUEsRUFHQSxpQkFBaUIsRUFBRSxJQUFJLFlBQVksSUFBSSx3Q0FBVSxJQUFJLGdCQUFNLElBQUkscUJBQU07QUFBQSxFQUNyRSxpQkFBaUI7QUFBQSxJQUNoQixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBO0FBQUEsRUFHQSxpQkFBaUIsRUFBRSxJQUFJLHNCQUFzQixJQUFJLHNFQUFlLElBQUksa0NBQVMsSUFBSSx3Q0FBVTtBQUFBLEVBQzNGLGlCQUFpQjtBQUFBLElBQ2hCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUE7QUFBQSxFQUdBLHlCQUF5QixFQUFFLElBQUksc0JBQXNCLElBQUksd0ZBQWtCLElBQUksOENBQVcsSUFBSSx3RUFBaUI7QUFBQSxFQUMvRyx5QkFBeUI7QUFBQSxJQUN4QixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBO0FBQUEsRUFHQSxhQUFhLEVBQUUsSUFBSSxtQkFBbUIsSUFBSSw4Q0FBVyxJQUFJLDRCQUFRLElBQUksd0NBQVU7QUFBQSxFQUMvRSxhQUFhO0FBQUEsSUFDWixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0EsYUFBYSxFQUFFLElBQUksUUFBUSxJQUFJLGdCQUFNLElBQUksZ0JBQU0sSUFBSSxlQUFLO0FBQUE7QUFBQSxFQUd4RCw4QkFBOEI7QUFBQSxJQUM3QixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0EsOEJBQThCLEVBQUUsSUFBSSxtQkFBbUIsSUFBSSw4Q0FBVyxJQUFJLDRCQUFRLElBQUksa0NBQVM7QUFBQSxFQUMvRix3QkFBd0I7QUFBQSxJQUN2QixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0EsdUJBQXVCO0FBQUEsSUFDdEIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLDJCQUEyQjtBQUFBLElBQzFCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSw0QkFBNEIsRUFBRSxJQUFJLGlCQUFpQixJQUFJLG9EQUFZLElBQUksNEJBQVEsSUFBSSw4Q0FBVztBQUFBLEVBQzlGLG1CQUFtQjtBQUFBLElBQ2xCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUE7QUFBQSxFQUdBLGtCQUFrQjtBQUFBLElBQ2pCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSxzQkFBc0I7QUFBQSxJQUNyQixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsSUFDcEIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLHFCQUFxQjtBQUFBLElBQ3BCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSxxQkFBcUIsRUFBRSxJQUFJLG9CQUFvQixJQUFJLDhDQUFXLElBQUksa0NBQVMsSUFBSSw0QkFBUTtBQUFBLEVBQ3ZGLHFCQUFxQjtBQUFBLElBQ3BCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSw0QkFBNEIsRUFBRSxJQUFJLGtCQUFrQixJQUFJLGlDQUFhLElBQUksa0NBQVMsSUFBSSw4QkFBVTtBQUFBLEVBQ2hHLG1CQUFtQixFQUFFLElBQUksbUJBQW1CLElBQUksMERBQWEsSUFBSSxrQ0FBUyxJQUFJLGtDQUFTO0FBQUEsRUFDdkYsbUJBQW1CO0FBQUEsSUFDbEIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLG9CQUFvQixFQUFFLElBQUksb0JBQW9CLElBQUksOENBQVcsSUFBSSw0QkFBUSxJQUFJLDRCQUFRO0FBQUEsRUFDckYsb0JBQW9CO0FBQUEsSUFDbkIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLHNCQUFzQixFQUFFLElBQUksaUJBQWlCLElBQUksc0VBQWUsSUFBSSxrQ0FBUyxJQUFJLHlDQUFXO0FBQUEsRUFDNUYsbUJBQW1CLEVBQUUsSUFBSSx3QkFBd0IsSUFBSSx3RkFBa0IsSUFBSSx3Q0FBVSxJQUFJLCtDQUFZO0FBQUEsRUFDckcsbUJBQW1CO0FBQUEsSUFDbEIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLHFCQUFxQixFQUFFLElBQUkscUJBQXFCLElBQUksc0VBQWUsSUFBSSx3Q0FBVSxJQUFJLDhDQUFXO0FBQUE7QUFBQSxFQUdoRyx1QkFBdUIsRUFBRSxJQUFJLG9CQUFvQixJQUFJLDBDQUFZLElBQUksd0JBQVMsSUFBSSwwQ0FBWTtBQUFBLEVBQzlGLHNCQUFzQixFQUFFLElBQUksa0JBQWtCLElBQUksd0NBQVUsSUFBSSw0QkFBUSxJQUFJLDRCQUFRO0FBQUEsRUFDcEYsc0JBQXNCO0FBQUEsSUFDckIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLG9CQUFvQixFQUFFLElBQUksaUJBQWlCLElBQUksMERBQWEsSUFBSSx3Q0FBVSxJQUFJLHlDQUFXO0FBQUEsRUFDekYsb0JBQW9CO0FBQUEsSUFDbkIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQTtBQUFBLEVBR0Esb0JBQW9CLEVBQUUsSUFBSSwyQkFBMkIsSUFBSSw4Q0FBVyxJQUFJLGtDQUFTLElBQUksNkJBQVM7QUFBQSxFQUM5Rix5QkFBeUIsRUFBRSxJQUFJLDRCQUE0QixJQUFJLGtDQUFTLElBQUksa0NBQVMsSUFBSSx5Q0FBVztBQUFBLEVBQ3BHLGtCQUFrQjtBQUFBLElBQ2pCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSxxQkFBcUIsRUFBRSxJQUFJLHdCQUF3QixJQUFJLGtGQUFpQixJQUFJLHdDQUFVLElBQUksbUNBQVU7QUFBQSxFQUNwRyxpQkFBaUIsRUFBRSxJQUFJLDBCQUEwQixJQUFJLHlGQUF3QixJQUFJLCtDQUFpQixJQUFJLDZEQUFxQjtBQUFBLEVBQzNILHNCQUFzQjtBQUFBLElBQ3JCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSxxQkFBcUIsRUFBRSxJQUFJLHVCQUF1QixJQUFJLG9DQUFnQixJQUFJLG9DQUFnQixJQUFJLDBDQUFpQjtBQUFBLEVBQy9HLHdCQUF3QixFQUFFLElBQUksbUJBQW1CLElBQUksd0ZBQWtCLElBQUksd0NBQVUsSUFBSSwrQ0FBWTtBQUFBLEVBQ3JHLHFCQUFxQjtBQUFBLElBQ3BCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSx3QkFBd0I7QUFBQSxJQUN2QixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0Esc0JBQXNCLEVBQUUsSUFBSSx3QkFBd0IsSUFBSSxrRkFBaUIsSUFBSSw0QkFBUSxJQUFJLG9EQUFZO0FBQUEsRUFDckcsd0JBQXdCO0FBQUEsSUFDdkIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLDJCQUEyQjtBQUFBLElBQzFCLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxFQUNMO0FBQUEsRUFDQSx1QkFBdUI7QUFBQSxJQUN0QixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsSUFDSixJQUFJO0FBQUEsRUFDTDtBQUFBLEVBQ0EscUJBQXFCO0FBQUEsSUFDcEIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQTtBQUFBLEVBR0EsZUFBZSxFQUFFLElBQUksbUJBQW1CLElBQUksNEJBQVEsSUFBSSw0QkFBUSxJQUFJLDJCQUFPO0FBQUEsRUFDM0UscUJBQXFCLEVBQUUsSUFBSSw2QkFBNkIsSUFBSSxrRkFBaUIsSUFBSSw4Q0FBVyxJQUFJLHFEQUFhO0FBQUEsRUFDN0csb0JBQW9CO0FBQUEsSUFDbkIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLHFCQUFxQixFQUFFLElBQUkscUJBQXFCLElBQUksZ0RBQWEsSUFBSSw4QkFBVSxJQUFJLCtCQUFXO0FBQUEsRUFDOUYsb0JBQW9CO0FBQUEsSUFDbkIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLHFCQUFxQixFQUFFLElBQUkseUJBQXlCLElBQUksMENBQWlCLElBQUksMENBQWlCLElBQUksaURBQW1CO0FBQUEsRUFDckgsb0JBQW9CO0FBQUEsSUFDbkIsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLEVBQ0w7QUFBQSxFQUNBLGtCQUFrQixFQUFFLElBQUksa0NBQTZCLElBQUksaUVBQWUsSUFBSSwrQ0FBWSxJQUFJLGdEQUFhO0FBQUE7QUFBQSxFQUd6RyxrQkFBa0IsRUFBRSxJQUFJLDBCQUEwQixJQUFJLDRFQUFnQixJQUFJLDBEQUFhLElBQUksdURBQWU7QUFDM0c7QUFFTyxTQUFTLEVBQUUsS0FBYSxNQUEwQjtBQTdSekQ7QUE4UkMsVUFBTyw4QkFBYSxHQUFHLE1BQWhCLG1CQUFvQixVQUFwQixhQUE2QixrQkFBYSxHQUFHLE1BQWhCLG1CQUFtQixPQUFoRCxZQUFzRDtBQUM5RDtBQUVPLFNBQVMsU0FBUyxLQUFhLE1BQWtCLGNBQXVEO0FBQzlHLE1BQUksU0FBUyxFQUFFLEtBQUssSUFBSTtBQUN4QixhQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssT0FBTyxRQUFRLFlBQVksR0FBRztBQUNsRCxhQUFTLE9BQU8sUUFBUSxJQUFJLENBQUMsS0FBSyxPQUFPLENBQUMsQ0FBQztBQUFBLEVBQzVDO0FBQ0EsU0FBTztBQUNSO0FBRU8sU0FBUyxhQUF5QjtBQXpTekM7QUEwU0MsUUFBTSxVQUNMLDhCQUFhLFFBQVEsVUFBVSxNQUEvQixhQUNDLGtCQUFlLFdBQWYsbUJBQXVCLFdBQXZCLGdDQURELFlBRUEsVUFBVSxhQUZWLFlBR0E7QUFDRCxRQUFNLE9BQU8sT0FBTyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsWUFBWTtBQUM5QyxNQUFJLENBQUMsTUFBTSxNQUFNLE1BQU0sSUFBSSxFQUFFLFNBQVMsSUFBSSxFQUFHLFFBQU87QUFDcEQsU0FBTztBQUNSOzs7QUNqVEEsSUFBQUMsbUJBQXNFOzs7QUNTdEUsZUFBc0IsWUFDckIsS0FDQSxVQUNBLGdCQUN5QjtBQWQxQjtBQWVDLFFBQU0sVUFBeUIsQ0FBQztBQUNoQyxRQUFNLFNBQVMsa0JBQWtCO0FBRWpDLFFBQU0sY0FBYyxJQUFJLE1BQ3RCLFNBQVMsRUFDVCxPQUFPLENBQUMsTUFBTTtBQUNkLFFBQUksRUFBRSxhQUFhLE9BQVEsUUFBTztBQUNsQyxRQUFJLGFBQWEsR0FBSSxRQUFPO0FBQzVCLFdBQU8sRUFBRSxLQUFLLFdBQVcsR0FBRyxRQUFRLEdBQUc7QUFBQSxFQUN4QyxDQUFDO0FBRUYsYUFBVyxRQUFRLGFBQWE7QUFDL0IsVUFBTSxVQUFVLE1BQU0sSUFBSSxNQUFNLEtBQUssSUFBSTtBQUN6QyxVQUFNLE9BQU0sVUFBSyxXQUFMLG1CQUFhO0FBQ3pCLFFBQUksQ0FBQyxJQUFLO0FBRVYsVUFBTSxlQUNMLGFBQWEsS0FDVixNQUNBLElBQUksV0FBVyxHQUFHLFFBQVEsR0FBRyxJQUM1QixJQUFJLE1BQU0sU0FBUyxTQUFTLENBQUMsSUFDN0I7QUFFTCxRQUFJLGNBQWM7QUFDakIsY0FBUSxLQUFLLEVBQUUsTUFBTSxjQUFjLGFBQWEsUUFBUSxNQUFNLEdBQUcsR0FBSSxFQUFFLENBQUM7QUFBQSxJQUN6RTtBQUFBLEVBQ0Q7QUFFQSxTQUFPO0FBQ1I7QUFFQSxlQUFzQixpQkFDckIsVUFDQSxTQUNnQjtBQUNoQixRQUFNLE1BQU0sTUFBTSxPQUFPLFVBQVUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDO0FBQzlELE1BQUksSUFBSSxXQUFXLEtBQUs7QUFDdkIsVUFBTSxJQUFJLE1BQU0sMkJBQTJCLElBQUksTUFBTSxFQUFFO0FBQUEsRUFDeEQ7QUFDRDs7O0FDcERPLElBQU0sZUFBZTtBQUNyQixJQUFNLFVBQVU7QUF3QmhCLElBQU0sc0JBQXNCO0FBb0I1QixJQUFNLG1CQUF1QztBQUFBLEVBQ25ELFlBQVk7QUFBQSxFQUNaLE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLGdCQUFnQjtBQUFBLEVBQ2hCLGtCQUFrQjtBQUFBLEVBQ2xCLFVBQVU7QUFBQSxFQUNWLGdCQUFnQjtBQUFBLEVBQ2hCLGlCQUFpQjtBQUFBLEVBQ2pCLFVBQVUsS0FBSyxlQUFlLEVBQUUsZ0JBQWdCLEVBQUU7QUFBQSxFQUNsRCxrQkFBa0I7QUFBQSxFQUNsQixhQUFhO0FBQUEsRUFDYixVQUFVO0FBQUEsRUFDVixlQUFlLENBQUM7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFDakI7OztBRnZEQSxJQUFNLGtCQUFrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBY2pCLElBQU0sdUJBQU4sY0FBbUMsa0NBQWlCO0FBQUEsRUFHMUQsWUFBWSxLQUFVLFFBQTBCO0FBQy9DLFVBQU0sS0FBSyxNQUFNO0FBQ2pCLFNBQUssU0FBUztBQUFBLEVBQ2Y7QUFBQSxFQUVBLElBQVksT0FBbUI7QUFDOUIsV0FBTyxLQUFLLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBRUEsVUFBZ0I7QUFDZixVQUFNLEVBQUUsWUFBWSxJQUFJO0FBQ3hCLFVBQU0sSUFBSSxLQUFLO0FBQ2YsZ0JBQVksTUFBTTtBQUdsQixVQUFNLFNBQVMsWUFBWSxVQUFVLEVBQUUsS0FBSyx5QkFBeUIsQ0FBQztBQUN0RSxXQUFPLFNBQVMsS0FBSyxFQUFFLE1BQU0sa0JBQWtCLE1BQU0sUUFBUSxDQUFDO0FBRzlELFVBQU0sWUFBWSxZQUFZLFVBQVUsRUFBRSxLQUFLLHdCQUF3QixDQUFDO0FBRXhFLFVBQU0sV0FBVyxVQUFVLFNBQVMsVUFBVTtBQUFBLE1BQzdDLE1BQU0sRUFBRSxhQUFhLENBQUM7QUFBQSxNQUN0QixLQUFLO0FBQUEsSUFDTixDQUFDO0FBRUQsVUFBTSxTQUFTLFVBQVUsU0FBUyxVQUFVO0FBQUEsTUFDM0MsS0FBSztBQUFBLElBQ04sQ0FBQztBQUNELFdBQU8sV0FBVyxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRztBQUN2QyxXQUFPLFdBQVcsRUFBRSxNQUFNLE9BQU8sS0FBSyx1QkFBdUIsQ0FBQztBQUU5RCxVQUFNLFdBQVcsVUFBVSxTQUFTLFVBQVU7QUFBQSxNQUM3QyxNQUFNLEVBQUUsYUFBYSxDQUFDO0FBQUEsTUFDdEIsS0FBSztBQUFBLElBQ04sQ0FBQztBQUdELFVBQU0sV0FBVyxZQUFZLFVBQVUsRUFBRSxLQUFLLG1DQUFtQyxDQUFDO0FBQ2xGLFVBQU0sU0FBUyxZQUFZLFVBQVUsRUFBRSxLQUFLLHlCQUF5QixDQUFDO0FBQ3RFLFVBQU0sV0FBVyxZQUFZLFVBQVUsRUFBRSxLQUFLLHlCQUF5QixDQUFDO0FBRXhFLFVBQU0sT0FBb0U7QUFBQSxNQUN6RSxPQUFPLEVBQUUsS0FBSyxVQUFVLFNBQVMsU0FBUztBQUFBLE1BQzFDLEtBQUssRUFBRSxLQUFLLFFBQVEsU0FBUyxPQUFPO0FBQUEsTUFDcEMsT0FBTyxFQUFFLEtBQUssVUFBVSxTQUFTLFNBQVM7QUFBQSxJQUMzQztBQUVBLFVBQU0sWUFBWSxDQUFDLFdBQW9CO0FBQ3RDLGlCQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssUUFBUSxDQUFDLEtBQUssT0FBTyxRQUFRLElBQUksR0FBRztBQUM1RCxjQUFNLFdBQVcsU0FBUztBQUMxQixZQUFJLFlBQVksYUFBYSxRQUFRO0FBQ3JDLGdCQUFRLFlBQVksYUFBYSxRQUFRO0FBQUEsTUFDMUM7QUFBQSxJQUNEO0FBRUEsYUFBUyxpQkFBaUIsU0FBUyxNQUFNLFVBQVUsT0FBTyxDQUFDO0FBQzNELFdBQU8saUJBQWlCLFNBQVMsTUFBTSxVQUFVLEtBQUssQ0FBQztBQUN2RCxhQUFTLGlCQUFpQixTQUFTLE1BQU0sVUFBVSxPQUFPLENBQUM7QUFHM0QsU0FBSyxlQUFlLFFBQVE7QUFHNUIsU0FBSyxhQUFhLE1BQU07QUFHeEIsU0FBSyxlQUFlLFFBQVE7QUFHNUIsVUFBTSxTQUFTLFlBQVksVUFBVSxFQUFFLEtBQUssb0JBQW9CLENBQUM7QUFDakUsV0FBTyxTQUFTLEtBQUssRUFBRSxNQUFNLGtCQUFrQixNQUFNLFFBQVEsQ0FBQztBQUFBLEVBQy9EO0FBQUEsRUFFUSxlQUFlLElBQXVCO0FBQzdDLFVBQU0sSUFBSSxLQUFLO0FBR2YsUUFBSSx5QkFBUSxFQUFFLEVBQ1osUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDLEVBQ3pCLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUN6QixZQUFZLENBQUMsYUFBYTtBQUMxQixlQUFTLFdBQVc7QUFBQSxRQUNuQixNQUFNLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQyxLQUFLLFdBQVcsQ0FBQztBQUFBLFFBQzNDLElBQUk7QUFBQSxRQUNKLElBQUk7QUFBQSxRQUNKLElBQUk7QUFBQSxRQUNKLElBQUk7QUFBQSxNQUNMLENBQUM7QUFDRCxlQUFTLFNBQVMsS0FBSyxPQUFPLFNBQVMsY0FBYztBQUNyRCxlQUFTLFNBQVMsT0FBTyxVQUFVO0FBQ2xDLGFBQUssT0FBTyxTQUFTLGlCQUFpQjtBQUN0QyxjQUFNLEtBQUssT0FBTyxhQUFhO0FBQy9CLGFBQUssUUFBUTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0YsQ0FBQztBQUdGLFVBQU0sY0FBYyxJQUFJLHlCQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFDN0QsUUFBSSxLQUFLLE9BQU8sU0FBUyxPQUFPO0FBQy9CLGtCQUFZLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzFDLGtCQUFZO0FBQUEsUUFBVSxDQUFDLFdBQ3RCLE9BQU8sY0FBYyxFQUFFLGdCQUFnQixDQUFDLENBQUMsRUFBRSxRQUFRLFlBQVk7QUEvSG5FO0FBZ0lLLHFCQUFLLE9BQU8sV0FBWixtQkFBb0I7QUFDcEIsZUFBSyxPQUFPLFNBQVMsUUFBUTtBQUM3QixnQkFBTSxLQUFLLE9BQU8sYUFBYTtBQUMvQixlQUFLLFFBQVE7QUFBQSxRQUNkLENBQUM7QUFBQSxNQUNGO0FBQUEsSUFDRCxPQUFPO0FBQ04sa0JBQVksUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7QUFDN0Msa0JBQVk7QUFBQSxRQUFVLENBQUMsV0FDdEIsT0FBTyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxNQUFNO0FBQ2hFLGlCQUFPLEtBQUssR0FBRyxPQUFPLGdCQUFnQjtBQUFBLFFBQ3ZDLENBQUM7QUFBQSxNQUNGO0FBQUEsSUFDRDtBQUdBLFFBQUksS0FBSyxPQUFPLFNBQVMsU0FBUywwQkFBUyxXQUFXO0FBQ3JELFlBQU0sUUFBUSxLQUFLLE9BQU8sY0FBYyxpQkFBaUI7QUFDekQsVUFBSSx5QkFBUSxFQUFFLEVBQ1osUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQ3ZCLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUFBLElBQ3RCO0FBR0EsUUFBSSxLQUFLLE9BQU8sU0FBUyxPQUFPO0FBQy9CLFVBQUkseUJBQVEsRUFBRSxFQUNaLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQyxFQUMzQixRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFDM0I7QUFBQSxRQUFVLENBQUMsV0FDWCxPQUFPLGNBQWMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLEVBQUUsUUFBUSxZQUFZO0FBQ3BFLGNBQUk7QUFDSCxrQkFBTSxTQUFTLEtBQUssT0FBTyxVQUFVLGdCQUFnQixLQUFLLE9BQU8sU0FBUyxRQUFRLFVBQVU7QUFDNUYsZ0JBQUksd0JBQU8sZUFBZSxFQUFFLHFCQUFxQixDQUFDLENBQUMsRUFBRTtBQUNyRCxnQkFBSSwwQkFBUyxXQUFXO0FBQ3ZCLG1CQUFLLE9BQU8saUJBQWlCO0FBQUEsWUFDOUI7QUFBQSxVQUNELFNBQVE7QUFDUCxnQkFBSSx3QkFBTyxlQUFlLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxFQUFFO0FBQUEsVUFDekQ7QUFBQSxRQUNELENBQUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFFBQUkseUJBQVEsRUFBRSxFQUNaLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLEVBQzdCLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLEVBQzdCO0FBQUEsTUFBVSxDQUFDLFdBQ1gsT0FBTyxTQUFTLEtBQUssT0FBTyxTQUFTLGNBQWMsRUFBRSxTQUFTLE9BQU8sVUFBVTtBQUM5RSxhQUFLLE9BQU8sU0FBUyxpQkFBaUI7QUFDdEMsY0FBTSxLQUFLLE9BQU8sYUFBYTtBQUFBLE1BQ2hDLENBQUM7QUFBQSxJQUNGO0FBR0QsUUFBSSwwQkFBUyxVQUFVO0FBQ3RCLFVBQUkseUJBQVEsRUFBRSxFQUNaLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLEVBQ3JDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLEVBQ3JDO0FBQUEsUUFBVSxDQUFDLFdBQ1gsT0FDRSxTQUFTLEtBQUssT0FBTyxTQUFTLGdCQUFnQixFQUM5QyxTQUFTLE9BQU8sVUFBVTtBQUMxQixlQUFLLE9BQU8sU0FBUyxtQkFBbUI7QUFDeEMsZ0JBQU0sS0FBSyxPQUFPLGFBQWE7QUFDL0IsZUFBSyxPQUFPLG9CQUFvQjtBQUFBLFFBQ2pDLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUVBLFFBQUkseUJBQVEsRUFBRSxFQUNaLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQyxFQUMxQixRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUMsRUFDMUI7QUFBQSxNQUFRLENBQUMsU0FDVCxLQUNFLGVBQWUsa0JBQWtCLEVBQ2pDLFNBQVMsS0FBSyxPQUFPLFNBQVMsV0FBVyxFQUN6QyxTQUFTLE9BQU8sVUFBVTtBQUMxQixhQUFLLE9BQU8sU0FBUyxjQUFjO0FBQ25DLGNBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxNQUNoQyxDQUFDO0FBQUEsSUFDSDtBQUVELFFBQUkseUJBQVEsRUFBRSxFQUNaLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLEVBQzdCLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLEVBQzdCO0FBQUEsTUFBUSxDQUFDLFNBQ1QsS0FDRSxlQUFlLDBCQUEwQixFQUN6QyxTQUFTLEtBQUssT0FBTyxTQUFTLGdCQUFnQixFQUM5QyxTQUFTLE9BQU8sVUFBVTtBQUMxQixhQUFLLE9BQU8sU0FBUyxtQkFBbUIsU0FBUztBQUNqRCxjQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsTUFDaEMsQ0FBQztBQUFBLElBQ0g7QUFFRCxRQUFJLHlCQUFRLEVBQUUsRUFDWixRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxFQUM3QixRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxFQUM3QjtBQUFBLE1BQVEsQ0FBQyxTQUNULEtBQ0UsZUFBZSxLQUFLLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQy9ELFNBQVMsS0FBSyxPQUFPLFNBQVMsUUFBUSxFQUN0QyxTQUFTLE9BQU8sVUFBVTtBQUMxQixhQUFLLE9BQU8sU0FBUyxXQUNwQixTQUFTLEtBQUssZUFBZSxFQUFFLGdCQUFnQixFQUFFO0FBQ2xELGNBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxNQUNoQyxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGFBQWEsSUFBdUI7QUFDM0MsVUFBTSxJQUFJLEtBQUs7QUFDZixVQUFNLFFBQVEsS0FBSyxPQUFPLFNBQVMsbUJBQW1CO0FBR3RELFFBQUksQ0FBQyxPQUFPO0FBQ1gsWUFBTSxVQUFVLEdBQUcsVUFBVSxFQUFFLEtBQUssc0JBQXNCLENBQUM7QUFFM0QsWUFBTSxRQUFRLFFBQVEsU0FBUyxTQUFTLEVBQUUsS0FBSyx3QkFBd0IsQ0FBQztBQUN4RSxZQUFNLFFBQVEsTUFBTSxTQUFTLE9BQU87QUFDcEMsWUFBTSxVQUFVLE1BQU0sU0FBUyxJQUFJO0FBQ25DLGNBQVEsU0FBUyxNQUFNLEVBQUUsTUFBTSxHQUFHLENBQUM7QUFDbkMsY0FBUSxTQUFTLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUN2QyxZQUFNLFFBQVEsUUFBUSxTQUFTLE1BQU0sRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUNyRCxZQUFNLFdBQVcsRUFBRSxNQUFNLFNBQVMsS0FBSyx1QkFBdUIsQ0FBQztBQUUvRCxZQUFNLFFBQVEsTUFBTSxTQUFTLE9BQU87QUFDcEMsWUFBTSxXQUF5QztBQUFBLFFBQzlDLENBQUMsRUFBRSw4QkFBOEIsQ0FBQyxHQUFHLE1BQU0sSUFBSTtBQUFBLFFBQy9DLENBQUMsRUFBRSw4QkFBOEIsQ0FBQyxHQUFHLE1BQU0sSUFBSTtBQUFBLFFBQy9DLENBQUMsRUFBRSx3QkFBd0IsQ0FBQyxHQUFHLE9BQU8sSUFBSTtBQUFBLFFBQzFDLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxHQUFHLE9BQU8sSUFBSTtBQUFBLFFBQ3pDLENBQUMsRUFBRSwyQkFBMkIsQ0FBQyxHQUFHLE9BQU8sSUFBSTtBQUFBLFFBQzdDLENBQUMsRUFBRSw0QkFBNEIsQ0FBQyxHQUFHLE9BQU8sSUFBSTtBQUFBLE1BQy9DO0FBQ0EsaUJBQVcsQ0FBQyxNQUFNLE1BQU0sR0FBRyxLQUFLLFVBQVU7QUFDekMsY0FBTSxNQUFNLE1BQU0sU0FBUyxJQUFJO0FBQy9CLFlBQUksU0FBUyxNQUFNLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDakMsWUFBSSxTQUFTLE1BQU0sRUFBRSxNQUFNLE9BQU8sV0FBVyxVQUFVLEtBQUssT0FBTyxxQkFBcUIsa0JBQWtCLENBQUM7QUFDM0csWUFBSSxTQUFTLE1BQU0sRUFBRSxNQUFNLE1BQU0sV0FBVyxVQUFVLEtBQUssTUFBTSxxQkFBcUIsa0JBQWtCLENBQUM7QUFBQSxNQUMxRztBQUVBLFlBQU0sTUFBTSxRQUFRLFVBQVUsRUFBRSxLQUFLLHNCQUFzQixDQUFDO0FBQzVELFVBQUksU0FBUyxLQUFLO0FBQUEsUUFDakIsTUFBTSxFQUFFLG1CQUFtQixDQUFDO0FBQUEsUUFDNUIsTUFBTSxHQUFHLE9BQU87QUFBQSxRQUNoQixLQUFLO0FBQUEsTUFDTixDQUFDO0FBR0QsU0FBRyxTQUFTLE1BQU0sRUFBRSxLQUFLLHVCQUF1QixDQUFDO0FBQUEsSUFDbEQ7QUFHQSxRQUFJLENBQUMsTUFBTztBQUVaLE9BQUcsU0FBUyxLQUFLO0FBQUEsTUFDaEIsTUFBTSxFQUFFLGtCQUFrQixDQUFDO0FBQUEsTUFDM0IsS0FBSztBQUFBLElBQ04sQ0FBQztBQUVELFVBQU0sYUFBYSxHQUFHLFNBQVMsS0FBSyxFQUFFLEtBQUssMkJBQTJCLENBQUM7QUFDdkUsZUFBVyxTQUFTLEtBQUs7QUFBQSxNQUN4QixNQUFNLEVBQUUsc0JBQXNCLENBQUM7QUFBQSxNQUMvQixNQUFNLEdBQUcsT0FBTztBQUFBLElBQ2pCLENBQUM7QUFFRCxRQUFJLHlCQUFRLEVBQUUsRUFDWixRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxFQUNqQyxRQUFRLEVBQUUscUJBQXFCLENBQUMsQ0FBQyxFQUNqQztBQUFBLE1BQVUsQ0FBQyxXQUNYLE9BQU8sU0FBUyxLQUFLLE9BQU8sU0FBUyxlQUFlLEVBQUUsU0FBUyxPQUFPLFVBQVU7QUFDL0UsYUFBSyxPQUFPLFNBQVMsa0JBQWtCO0FBQ3ZDLGNBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxNQUNoQyxDQUFDO0FBQUEsSUFDRjtBQUVELFFBQUkseUJBQVEsRUFBRSxFQUNaLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLEVBQ2pDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLEVBQ2pDO0FBQUEsTUFBUSxDQUFDLFNBQ1QsS0FDRSxlQUFlLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxFQUMvQyxTQUFTLEtBQUssT0FBTyxTQUFTLFFBQVEsRUFDdEMsU0FBUyxPQUFPLFVBQVU7QUFDMUIsYUFBSyxPQUFPLFNBQVMsV0FBVztBQUNoQyxjQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsTUFDaEMsQ0FBQztBQUFBLElBQ0g7QUFFRCxRQUFJLHlCQUFRLEVBQUUsRUFDWixRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxFQUMvQixRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQyxFQUMvQjtBQUFBLE1BQVEsQ0FBQyxTQUNULEtBQ0UsZUFBZSxRQUFRLEVBQ3ZCLFNBQVMsS0FBSyxPQUFPLFNBQVMsY0FBYyxFQUM1QyxTQUFTLE9BQU8sVUFBVTtBQUMxQixhQUFLLE9BQU8sU0FBUyxpQkFBaUIsU0FBUztBQUMvQyxjQUFNLEtBQUssT0FBTyxhQUFhO0FBQUEsTUFDaEMsQ0FBQztBQUFBLElBQ0g7QUFFRCxRQUFJLHlCQUFRLEVBQUUsRUFDWixRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxFQUNoQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxFQUNoQztBQUFBLE1BQVUsQ0FBQyxXQUNYLE9BQU8sY0FBYyxFQUFFLHNCQUFzQixDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxZQUFZO0FBQzdFLFlBQUksQ0FBQyxLQUFLLE9BQU8sU0FBUyxPQUFPO0FBQ2hDLGNBQUksd0JBQU8sZUFBZSxFQUFFLHNCQUFzQixDQUFDLENBQUMsRUFBRTtBQUN0RDtBQUFBLFFBQ0Q7QUFDQSxZQUFJO0FBQ0gsZ0JBQU0sVUFBVSxNQUFNO0FBQUEsWUFDckIsS0FBSztBQUFBLFlBQ0wsS0FBSyxPQUFPLFNBQVM7QUFBQSxZQUNyQixLQUFLLE9BQU8sU0FBUztBQUFBLFVBQ3RCO0FBQ0EsZ0JBQU0saUJBQWlCLEtBQUssT0FBTyxVQUFVLE9BQU87QUFDcEQsY0FBSSx3QkFBTyxlQUFlLFNBQVMsd0JBQXdCLEdBQUcsRUFBRSxPQUFPLFFBQVEsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUFBLFFBQzNGLFNBQVMsR0FBRztBQUNYLGdCQUFNLE1BQU0sYUFBYSxRQUFRLEVBQUUsVUFBVSxPQUFPLENBQUM7QUFDckQsY0FBSSx3QkFBTyxlQUFlLFNBQVMsMkJBQTJCLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQUEsUUFDNUU7QUFBQSxNQUNELENBQUM7QUFBQSxJQUNGO0FBRUQsUUFBSSx5QkFBUSxFQUFFLEVBQ1osUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUMsRUFDL0IsUUFBUSxFQUFFLG1CQUFtQixDQUFDLENBQUMsRUFDL0I7QUFBQSxNQUFVLENBQUMsV0FDWCxPQUFPLGNBQWMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLEVBQUUsUUFBUSxZQUFZO0FBQ25FLGNBQU0sVUFBVSxVQUFVLFVBQVUsZUFBZTtBQUNuRCxZQUFJLHdCQUFPLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLEVBQUU7QUFBQSxNQUN4RCxDQUFDO0FBQUEsSUFDRjtBQUdELE9BQUcsU0FBUyxNQUFNLEVBQUUsS0FBSyx1QkFBdUIsQ0FBQztBQUVqRCxRQUFJLHlCQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLFdBQVc7QUFFaEUsUUFBSSx5QkFBUSxFQUFFLEVBQ1osUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUMsRUFDbEMsUUFBUSxFQUFFLHNCQUFzQixDQUFDLENBQUMsRUFDbEMsWUFBWSxDQUFDLGFBQWE7QUFDMUIsZUFBUyxXQUFXO0FBQUEsUUFDbkIsTUFBTSxFQUFFLGtCQUFrQixDQUFDO0FBQUEsUUFDM0IsSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLE1BQ0wsQ0FBQztBQUVELFdBQUssb0JBQW9CLFFBQVE7QUFDakMsZUFBUyxTQUFTLE9BQU8sVUFBVTtBQUNsQyxjQUFNLEtBQUssZUFBZSxFQUFFLGtCQUFrQixNQUFNLENBQUM7QUFBQSxNQUN0RCxDQUFDO0FBQUEsSUFDRixDQUFDO0FBRUYsUUFBSSx5QkFBUSxFQUFFLEVBQ1osUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUMsRUFDaEMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUMsRUFDaEM7QUFBQSxNQUFRLENBQUMsU0FDVCxLQUNFLGVBQWUsU0FBUyxFQUN4QixTQUFTLEtBQUssT0FBTyxTQUFTLFdBQVcsRUFDekMsU0FBUyxPQUFPLFVBQVU7QUFDMUIsYUFBSyxPQUFPLFNBQVMsY0FBYyxTQUFTO0FBQzVDLGNBQU0sS0FBSyxPQUFPLGFBQWE7QUFBQSxNQUNoQyxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxFQUVRLGVBQWUsSUFBdUI7QUFDN0MsVUFBTSxJQUFJLEtBQUs7QUFFZixRQUFJLHlCQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUMsRUFBRSxXQUFXO0FBRXhELFVBQU0sUUFBUSxHQUFHLFVBQVUsRUFBRSxLQUFLLHlCQUF5QixDQUFDO0FBRTVELGVBQVcsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQVk7QUFDbkMsWUFBTSxPQUFPLE1BQU0sVUFBVSxFQUFFLEtBQUssd0JBQXdCLENBQUM7QUFDN0QsWUFBTSxNQUFNLEtBQUssVUFBVSxFQUFFLEtBQUssNEJBQTRCLENBQUM7QUFDL0QsVUFBSSxRQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ3JCLFlBQU0sVUFBVSxLQUFLLFVBQVUsRUFBRSxLQUFLLGdDQUFnQyxDQUFDO0FBQ3ZFLGNBQVEsU0FBUyxNQUFNLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO0FBQzdELGNBQVEsU0FBUyxLQUFLLEVBQUUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO0FBQUEsSUFDNUQ7QUFFQSxVQUFNLFdBQVcsR0FBRyxVQUFVLEVBQUUsS0FBSyx3QkFBd0IsQ0FBQztBQUM5RCxhQUFTLFNBQVMsS0FBSztBQUFBLE1BQ3RCLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQztBQUFBLE1BQzNCLE1BQU0sR0FBRyxPQUFPO0FBQUEsTUFDaEIsS0FBSztBQUFBLElBQ04sQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQWMsb0JBQW9CLFVBQStEO0FBQ2hHLFFBQUksQ0FBQyxLQUFLLE9BQU8sU0FBUyxNQUFPO0FBQ2pDLFFBQUk7QUFDSCxZQUFNLE1BQU0sTUFBTSxPQUFPLEtBQUssT0FBTyxVQUFVLGtCQUFrQjtBQUNqRSxVQUFJLElBQUksV0FBVyxLQUFLO0FBQ3ZCLGNBQU0sT0FBTyxJQUFJO0FBQ2pCLFlBQUksS0FBSyxrQkFBa0I7QUFDMUIsbUJBQVMsU0FBUyxLQUFLLGdCQUFnQjtBQUFBLFFBQ3hDO0FBQUEsTUFDRDtBQUFBLElBQ0QsU0FBUTtBQUFBLElBRVI7QUFBQSxFQUNEO0FBQUEsRUFFQSxNQUFjLGVBQWUsTUFBOEM7QUFDMUUsVUFBTSxJQUFJLEtBQUs7QUFDZixRQUFJLENBQUMsS0FBSyxPQUFPLFNBQVMsT0FBTztBQUNoQyxVQUFJLHdCQUFPLGVBQWUsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDLEVBQUU7QUFDdEQ7QUFBQSxJQUNEO0FBQ0EsUUFBSTtBQUNILFlBQU0sT0FBTyxLQUFLLE9BQU8sVUFBVSxvQkFBb0IsSUFBSTtBQUFBLElBQzVELFNBQVE7QUFDUCxVQUFJLHdCQUFPLGVBQWUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLEVBQUU7QUFBQSxJQUN0RDtBQUFBLEVBQ0Q7QUFDRDs7O0FHcmNBLFNBQVMsV0FBVyxPQUF1QjtBQUMxQyxNQUFJLHlCQUF5QixLQUFLLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTSxPQUFPO0FBQ25FLFdBQU8sSUFBSSxNQUFNLFFBQVEsT0FBTyxNQUFNLEVBQUUsUUFBUSxNQUFNLEtBQUssQ0FBQztBQUFBLEVBQzdEO0FBQ0EsU0FBTztBQUNSO0FBRU8sU0FBUyxnQkFBZ0IsV0FBbUIsVUFBMEI7QUFDNUUsUUFBTSxJQUFJLElBQUksS0FBSyxTQUFTO0FBQzVCLFFBQU0sTUFBTSxJQUFJLEtBQUssZUFBZSxTQUFTO0FBQUEsSUFDNUMsVUFBVTtBQUFBLElBQ1YsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLEVBQ1QsQ0FBQztBQUNELFFBQU0sUUFBUSxPQUFPO0FBQUEsSUFDcEIsSUFBSSxjQUFjLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQztBQUFBLEVBQ2xEO0FBQ0EsU0FBTyxHQUFHLE1BQU0sSUFBSSxJQUFJLE1BQU0sS0FBSyxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sSUFBSSxJQUFJLE1BQU0sTUFBTSxJQUFJLE1BQU0sTUFBTTtBQUMvRjtBQUVPLFNBQVMscUJBQXFCLE1BQVksVUFBc0M7QUFDdEYsUUFBTSxRQUFrQixDQUFDLEtBQUs7QUFFOUIsUUFBTSxLQUFLLFdBQVcsS0FBSyxNQUFNLEVBQUU7QUFDbkMsTUFBSSxLQUFLLEtBQUs7QUFDYixVQUFNLEtBQUssUUFBUSxXQUFXLEtBQUssR0FBRyxDQUFDLEVBQUU7QUFBQSxFQUMxQztBQUNBLE1BQUksS0FBSyxXQUFXO0FBQ25CLFVBQU0sS0FBSyxlQUFlLFdBQVcsS0FBSyxTQUFTLENBQUMsRUFBRTtBQUFBLEVBQ3ZEO0FBQ0EsUUFBTSxLQUFLLGVBQWUsZ0JBQWdCLEtBQUssV0FBVyxTQUFTLFFBQVEsQ0FBQyxFQUFFO0FBRTlFLE1BQUksS0FBSyxTQUFTO0FBQ2pCLFVBQU0sS0FBSyxZQUFZLFdBQVcsS0FBSyxPQUFPLENBQUMsRUFBRTtBQUFBLEVBQ2xEO0FBQ0EsTUFBSSxLQUFLLE1BQU07QUFDZCxVQUFNLFVBQVUsS0FBSyxLQUNuQixNQUFNLEdBQUcsRUFDVCxJQUFJLENBQUNDLE9BQU1BLEdBQUUsS0FBSyxFQUFFLFFBQVEsTUFBTSxFQUFFLENBQUMsRUFDckMsT0FBTyxPQUFPO0FBQ2hCLFFBQUksUUFBUSxTQUFTLEdBQUc7QUFDdkIsWUFBTSxLQUFLLFVBQVUsUUFBUSxJQUFJLENBQUNBLE9BQU0sV0FBV0EsRUFBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRztBQUFBLElBQ3JFO0FBQUEsRUFDRDtBQUVBLFFBQU0sS0FBSyxLQUFLO0FBQ2hCLFFBQU0sS0FBSyxFQUFFO0FBRWIsTUFBSSxLQUFLLFFBQVE7QUFDaEIsVUFBTSxLQUFLLFdBQVc7QUFDdEIsVUFBTSxLQUFLLEVBQUU7QUFDYixVQUFNLEtBQUssS0FBSyxNQUFNO0FBQ3RCLFVBQU0sS0FBSyxFQUFFO0FBQUEsRUFDZDtBQUVBLFFBQU0sS0FBSyxhQUFhO0FBQ3hCLFFBQU0sS0FBSyxFQUFFO0FBQ2IsUUFBTSxLQUFLLEtBQUssT0FBTztBQUN2QixRQUFNLEtBQUssRUFBRTtBQUViLFNBQU8sTUFBTSxLQUFLLElBQUk7QUFDdkI7OztBQ3REQSxlQUFlLGtCQUFrQixVQUErQztBQUMvRSxRQUFNLE1BQU0sTUFBTSxPQUFPLFVBQVUsb0JBQW9CO0FBQ3ZELE1BQUksSUFBSSxXQUFXLEtBQUs7QUFDdkIsVUFBTSxJQUFJLE1BQU0sa0NBQWtDLElBQUksTUFBTSxFQUFFO0FBQUEsRUFDL0Q7QUFDQSxTQUFPLElBQUk7QUFDWjtBQUVBLGVBQWUsY0FBYyxVQUFpRDtBQXZCOUU7QUF3QkMsTUFBSTtBQUNILFVBQU0sTUFBTSxNQUFNLE9BQU8sVUFBVSxTQUFTO0FBQzVDLFFBQUksSUFBSSxXQUFXLEtBQUs7QUFDdkIsWUFBTSxPQUFPLElBQUk7QUFDakIsZUFBUSxVQUFLLFNBQUwsbUJBQVcsVUFBUyxRQUFRLFFBQVE7QUFBQSxJQUM3QztBQUFBLEVBQ0QsU0FBUTtBQUFBLEVBRVI7QUFDQSxTQUFPO0FBQ1I7QUFFQSxlQUFlLGVBQWUsVUFBOEIsUUFBK0I7QUFDMUYsUUFBTSxNQUFNLE1BQU0sU0FBUyxVQUFVLGNBQWMsTUFBTSxTQUFTO0FBQUEsSUFDakUsV0FBVSxvQkFBSSxLQUFLLEdBQUUsWUFBWTtBQUFBLEVBQ2xDLENBQUM7QUFDRCxNQUFJLElBQUksV0FBVyxLQUFLO0FBQ3ZCLFVBQU0sSUFBSSxNQUFNLHVCQUF1QixNQUFNLGVBQWUsSUFBSSxNQUFNLEVBQUU7QUFBQSxFQUN6RTtBQUNEO0FBRUEsZUFBZSxhQUFhLEtBQVUsWUFBbUM7QUFDeEUsUUFBTSxRQUFRLFdBQVcsTUFBTSxHQUFHO0FBQ2xDLE1BQUksVUFBVTtBQUVkLGFBQVcsUUFBUSxPQUFPO0FBQ3pCLGNBQVUsVUFBVSxHQUFHLE9BQU8sSUFBSSxJQUFJLEtBQUs7QUFDM0MsUUFBSSxDQUFDLElBQUksTUFBTSxzQkFBc0IsT0FBTyxHQUFHO0FBQzlDLFlBQU0sSUFBSSxNQUFNLGFBQWEsT0FBTztBQUFBLElBQ3JDO0FBQUEsRUFDRDtBQUNEO0FBRUEsZUFBZSx5QkFBeUIsS0FBVSxZQUEwQztBQXpENUY7QUEwREMsUUFBTSxNQUFNLG9CQUFJLElBQVk7QUFDNUIsUUFBTSxTQUFTLElBQUksTUFBTSxzQkFBc0IsVUFBVTtBQUN6RCxNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFFBQU0sUUFBUSxJQUFJLE1BQU0saUJBQWlCLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLFdBQVcsR0FBRyxVQUFVLEdBQUcsQ0FBQztBQUU1RixhQUFXLFFBQVEsT0FBTztBQUN6QixVQUFNLFFBQVEsSUFBSSxjQUFjLGFBQWEsSUFBSTtBQUNqRCxVQUFNLFVBQVMsb0NBQU8sZ0JBQVAsbUJBQW9CO0FBQ25DLFFBQUksT0FBTyxXQUFXLFVBQVU7QUFDL0IsVUFBSSxJQUFJLE1BQU07QUFBQSxJQUNmO0FBQUEsRUFDRDtBQUVBLFNBQU87QUFDUjtBQUVBLFNBQVMsaUJBQWlCLE1BQXNCO0FBQy9DLFNBQU8sS0FDTCxRQUFRLGlCQUFpQixHQUFHLEVBQzVCLFFBQVEsT0FBTyxHQUFHLEVBQ2xCLFFBQVEsVUFBVSxFQUFFLEVBQ3BCLEtBQUs7QUFDUjtBQUVPLFNBQVMsc0JBQ2YsVUFDQSxNQUNBLFVBQ0EsVUFDUztBQUNULFFBQU0sWUFBWSxnQkFBZ0IsS0FBSyxXQUFXLFFBQVE7QUFFMUQsUUFBTSxDQUFDLFVBQVUsUUFBUSxJQUFJLFVBQVUsTUFBTSxHQUFHO0FBQ2hELFFBQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxJQUFJLFNBQVMsTUFBTSxHQUFHO0FBQ3pDLFFBQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxJQUFJLFNBQVMsTUFBTSxHQUFHO0FBRXZDLE1BQUksU0FBUyxTQUNYLFFBQVEsYUFBYSxJQUFJLEVBQ3pCLFFBQVEsV0FBVyxFQUFFLEVBQ3JCLFFBQVEsV0FBVyxFQUFFLEVBQ3JCLFFBQVEsV0FBVyxFQUFFLEVBQ3JCLFFBQVEsV0FBVyxFQUFFLEVBQ3JCLFFBQVEsV0FBVyxFQUFFLEVBQ3JCLFFBQVEsZUFBZSxLQUFLLE1BQU0sRUFDbEMsUUFBUSxtQkFBbUIsaUJBQWlCLEtBQUssYUFBYSxVQUFVLENBQUM7QUFFM0UsTUFBSSxhQUFhLE9BQU87QUFDdkIsYUFBUyxPQUFPLFFBQVEsY0FBYyxpQkFBaUIsS0FBSyxTQUFTLFVBQVUsQ0FBQztBQUFBLEVBQ2pGLE9BQU87QUFDTixhQUFTLE9BQU8sUUFBUSxjQUFjLHFCQUFxQjtBQUFBLEVBQzVEO0FBRUEsU0FBTztBQUNSO0FBRUEsZUFBZSxnQkFDZCxLQUNBLGNBQ0EsVUFDa0I7QUFDbEIsTUFBSSxZQUFZLEdBQUcsWUFBWSxJQUFJLFFBQVE7QUFDM0MsTUFBSSxVQUFVO0FBRWQsU0FBTyxJQUFJLE1BQU0sc0JBQXNCLFNBQVMsR0FBRztBQUNsRCxnQkFBWSxHQUFHLFlBQVksSUFBSSxRQUFRLElBQUksT0FBTztBQUNsRDtBQUFBLEVBQ0Q7QUFFQSxTQUFPO0FBQ1I7QUFFQSxlQUFlLGlCQUNkLEtBQ0EsVUFDQSxNQUNBLFVBQ2dCO0FBQ2hCLFFBQU0sZUFBZSxhQUFhLFNBQVMsS0FBSyxhQUM3QyxLQUFLLGFBQ0wsU0FBUztBQUNaLFFBQU0sYUFBYSxLQUFLLFlBQVk7QUFDcEMsUUFBTSxXQUFXLHFCQUFxQixNQUFNLFFBQVE7QUFDcEQsUUFBTSxXQUFXLHNCQUFzQixTQUFTLGtCQUFrQixNQUFNLFNBQVMsVUFBVSxRQUFRO0FBQ25HLFFBQU0sV0FBVyxNQUFNLGdCQUFnQixLQUFLLGNBQWMsUUFBUTtBQUNsRSxRQUFNLElBQUksTUFBTSxPQUFPLFVBQVUsUUFBUTtBQUMxQztBQUVBLGVBQWUsWUFBWSxLQUFVLFVBQTZDO0FBQ2pGLE1BQUksQ0FBQyxTQUFTLGVBQWUsQ0FBQyxTQUFTLE1BQU87QUFDOUMsTUFBSTtBQUNILFVBQU0sV0FBVyxHQUFHLFNBQVMsV0FBVztBQUN4QyxVQUFNLE9BQU8sSUFBSSxNQUFNLHNCQUFzQixRQUFRO0FBQ3JELFFBQUksQ0FBQyxLQUFNO0FBRVgsVUFBTSxTQUFTLElBQUksTUFBTSxpQkFBaUIsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLFNBQVMsUUFBUTtBQUMzRSxRQUFJLENBQUMsT0FBUTtBQUViLFVBQU0sVUFBVSxNQUFNLElBQUksTUFBTSxLQUFLLE1BQU07QUFDM0MsVUFBTSxPQUFPLFVBQVUsb0JBQW9CLEVBQUUsU0FBUyxRQUFRLENBQUM7QUFBQSxFQUNoRSxTQUFRO0FBQ1AsWUFBUSxLQUFLLGlDQUFpQztBQUFBLEVBQy9DO0FBQ0Q7QUFFQSxlQUFzQixVQUFVLEtBQVUsVUFBbUQ7QUFDNUYsUUFBTSxTQUFxQixFQUFFLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsVUFBVSxPQUFPO0FBRWhGLFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxNQUFNLFFBQVEsSUFBSTtBQUFBLElBQzNDLGtCQUFrQixRQUFRO0FBQUEsSUFDMUIsY0FBYyxRQUFRO0FBQUEsRUFDdkIsQ0FBQztBQUNELFNBQU8sV0FBVztBQUdsQixNQUFJLGFBQWEsT0FBTztBQUN2QixRQUFJLFNBQVMsaUJBQWlCO0FBQzdCLFVBQUk7QUFDSCxjQUFNLFVBQVUsTUFBTSxZQUFZLEtBQUssU0FBUyxVQUFVLFNBQVMsY0FBYztBQUNqRixjQUFNLGlCQUFpQixVQUFVLE9BQU87QUFBQSxNQUN6QyxTQUFTLEdBQUc7QUFDWCxnQkFBUSxLQUFLLDZEQUE2RCxDQUFDO0FBQUEsTUFDNUU7QUFBQSxJQUNEO0FBQ0EsVUFBTSxZQUFZLEtBQUssUUFBUTtBQUFBLEVBQ2hDO0FBQ0EsTUFBSSxNQUFNLFdBQVcsRUFBRyxRQUFPO0FBRS9CLFFBQU0sYUFBYSxLQUFLLFNBQVMsV0FBVztBQUU1QyxRQUFNLGNBQWMsTUFBTSx5QkFBeUIsS0FBSyxTQUFTLFdBQVc7QUFFNUUsUUFBTSxZQUFZLElBQUksSUFBSSxTQUFTLGFBQWE7QUFFaEQsYUFBVyxRQUFRLE9BQU87QUFDekIsUUFBSTtBQUNILFVBQUksWUFBWSxJQUFJLEtBQUssRUFBRSxLQUFLLFVBQVUsSUFBSSxLQUFLLEVBQUUsR0FBRztBQUN2RCxjQUFNLGVBQWUsVUFBVSxLQUFLLEVBQUU7QUFDdEMsZUFBTztBQUNQO0FBQUEsTUFDRDtBQUVBLFlBQU0saUJBQWlCLEtBQUssVUFBVSxNQUFNLFFBQVE7QUFFcEQsWUFBTSxlQUFlLFVBQVUsS0FBSyxFQUFFO0FBQ3RDLGFBQU87QUFBQSxJQUNSLFNBQVMsR0FBRztBQUNYLGFBQU87QUFDUCxhQUFPLE9BQU8sS0FBSyxRQUFRLEtBQUssRUFBRSxLQUFLLGFBQWEsUUFBUSxFQUFFLFVBQVUsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUFBLElBQ3BGO0FBQUEsRUFDRDtBQUVBLFNBQU87QUFDUjtBQUVBLGVBQWUsY0FBYyxVQUE4QixRQUErQjtBQUN6RixRQUFNLE1BQU0sTUFBTSxPQUFPLFVBQVUsY0FBYyxNQUFNLEVBQUU7QUFDekQsTUFBSSxJQUFJLFdBQVcsS0FBSztBQUN2QixVQUFNLElBQUksTUFBTSx3QkFBd0IsTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO0FBQUEsRUFDaEU7QUFDQSxTQUFPLElBQUk7QUFDWjtBQUVBLFNBQVMsZ0JBQWdCLFVBQThCLFFBQXNCO0FBQzVFLE1BQUksU0FBUyxjQUFjLFNBQVMsTUFBTSxFQUFHO0FBQzdDLFdBQVMsY0FBYyxLQUFLLE1BQU07QUFDbEMsTUFBSSxTQUFTLGNBQWMsU0FBUyxxQkFBcUI7QUFDeEQsYUFBUyxnQkFBZ0IsU0FBUyxjQUFjLE1BQU0sQ0FBQyxtQkFBbUI7QUFBQSxFQUMzRTtBQUNEO0FBRUEsZUFBc0IsZUFDckIsS0FDQSxVQUNBLFFBQ0EsY0FDbUI7QUFFbkIsTUFBSSxTQUFTLGNBQWMsU0FBUyxNQUFNLEVBQUcsUUFBTztBQUVwRCxRQUFNLGNBQWMsTUFBTSx5QkFBeUIsS0FBSyxTQUFTLFdBQVc7QUFDNUUsTUFBSSxZQUFZLElBQUksTUFBTSxHQUFHO0FBQzVCLG9CQUFnQixVQUFVLE1BQU07QUFDaEMsVUFBTSxhQUFhO0FBQ25CLFdBQU87QUFBQSxFQUNSO0FBRUEsUUFBTSxPQUFPLE1BQU0sY0FBYyxVQUFVLE1BQU07QUFDakQsUUFBTSxXQUFXLE1BQU0sY0FBYyxRQUFRO0FBQzdDLFdBQVMsaUJBQWlCO0FBRTFCLFFBQU0sYUFBYSxLQUFLLFNBQVMsV0FBVztBQUM1QyxRQUFNLGlCQUFpQixLQUFLLFVBQVUsTUFBTSxRQUFRO0FBQ3BELFFBQU0sZUFBZSxVQUFVLEtBQUssRUFBRTtBQUV0QyxrQkFBZ0IsVUFBVSxNQUFNO0FBQ2hDLFFBQU0sYUFBYTtBQUVuQixTQUFPO0FBQ1I7OztBQ3hQTyxJQUFNLGdCQUFOLE1BQW9CO0FBQUEsRUFRMUIsWUFBWSxNQUE0QjtBQVB4QyxTQUFRLEtBQXVCO0FBQy9CLFNBQVEsbUJBQW1CO0FBQzNCLFNBQVEsaUJBQXVEO0FBQy9ELFNBQVEsWUFBbUQ7QUFDM0QsU0FBUSxrQkFBa0I7QUFJekIsU0FBSyxPQUFPO0FBQUEsRUFDYjtBQUFBLEVBRUEsVUFBZ0I7QUFDZixTQUFLLGtCQUFrQjtBQUN2QixTQUFLLFVBQVU7QUFBQSxFQUNoQjtBQUFBLEVBRVEsWUFBa0I7QUFDekIsUUFBSTtBQUVILFlBQU0sUUFBUSxLQUFLLEtBQUssV0FDdEIsUUFBUSxlQUFlLFFBQVEsRUFDL0IsUUFBUSxjQUFjLE9BQU87QUFDL0IsWUFBTSxNQUFNLEdBQUcsS0FBSyxpQkFBaUIsbUJBQW1CLEtBQUssS0FBSyxLQUFLLENBQUMsYUFBYSxtQkFBbUIsS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUUzSCxXQUFLLEtBQUssSUFBSSxVQUFVLEdBQUc7QUFFM0IsV0FBSyxHQUFHLFNBQVMsTUFBTTtBQXBDMUI7QUFxQ0ksYUFBSyxtQkFBbUI7QUFDeEIsYUFBSyxVQUFVO0FBQ2YseUJBQUssTUFBSyxtQkFBViw0QkFBMkI7QUFBQSxNQUM1QjtBQUVBLFdBQUssR0FBRyxZQUFZLENBQUMsVUFBVTtBQUM5QixZQUFJLE1BQU0sU0FBUyxPQUFRO0FBQzNCLFlBQUk7QUFDSCxnQkFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLElBQWM7QUFDM0MsY0FBSSxJQUFJLFNBQVMsY0FBYyxJQUFJLFFBQVE7QUFDMUMsaUJBQUssS0FBSyxVQUFVLElBQUksTUFBTTtBQUFBLFVBQy9CO0FBQUEsUUFDRCxTQUFRO0FBQUEsUUFFUjtBQUFBLE1BQ0Q7QUFFQSxXQUFLLEdBQUcsVUFBVSxNQUFNO0FBdEQzQjtBQXVESSxhQUFLLFNBQVM7QUFDZCx5QkFBSyxNQUFLLG1CQUFWLDRCQUEyQjtBQUMzQixhQUFLLGtCQUFrQjtBQUFBLE1BQ3hCO0FBRUEsV0FBSyxHQUFHLFVBQVUsTUFBTTtBQTVEM0I7QUE2REksbUJBQUssT0FBTCxtQkFBUztBQUFBLE1BQ1Y7QUFBQSxJQUNELFNBQVE7QUFDUCxXQUFLLGtCQUFrQjtBQUFBLElBQ3hCO0FBQUEsRUFDRDtBQUFBLEVBRVEsb0JBQTBCO0FBQ2pDLFFBQUksQ0FBQyxLQUFLLGdCQUFpQjtBQUUzQixVQUFNLFFBQVEsS0FBSyxJQUFJLE1BQU8sS0FBSyxLQUFLLGtCQUFrQixHQUFLO0FBQy9ELFNBQUs7QUFFTCxTQUFLLGlCQUFpQixXQUFXLE1BQU07QUFDdEMsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxVQUFVO0FBQUEsSUFDaEIsR0FBRyxLQUFLO0FBQUEsRUFDVDtBQUFBLEVBRVEsWUFBa0I7QUFDekIsU0FBSyxTQUFTO0FBQ2QsU0FBSyxZQUFZLFlBQVksTUFBTTtBQWxGckM7QUFtRkcsWUFBSSxVQUFLLE9BQUwsbUJBQVMsZ0JBQWUsVUFBVSxNQUFNO0FBQzNDLGFBQUssR0FBRyxLQUFLLE1BQU07QUFBQSxNQUNwQjtBQUFBLElBQ0QsR0FBRyxHQUFLO0FBQUEsRUFDVDtBQUFBLEVBRVEsV0FBaUI7QUFDeEIsUUFBSSxLQUFLLGNBQWMsTUFBTTtBQUM1QixvQkFBYyxLQUFLLFNBQVM7QUFDNUIsV0FBSyxZQUFZO0FBQUEsSUFDbEI7QUFBQSxFQUNEO0FBQUEsRUFFQSxhQUFtQjtBQWhHcEI7QUFpR0UsU0FBSyxrQkFBa0I7QUFDdkIsU0FBSyxTQUFTO0FBQ2QsUUFBSSxLQUFLLG1CQUFtQixNQUFNO0FBQ2pDLG1CQUFhLEtBQUssY0FBYztBQUNoQyxXQUFLLGlCQUFpQjtBQUFBLElBQ3ZCO0FBQ0EsUUFBSSxLQUFLLElBQUk7QUFDWixXQUFLLEdBQUcsTUFBTTtBQUNkLFdBQUssS0FBSztBQUFBLElBQ1g7QUFDQSxxQkFBSyxNQUFLLG1CQUFWLDRCQUEyQjtBQUFBLEVBQzVCO0FBQUEsRUFFQSxJQUFJLGNBQXVCO0FBOUc1QjtBQStHRSxhQUFPLFVBQUssT0FBTCxtQkFBUyxnQkFBZSxVQUFVO0FBQUEsRUFDMUM7QUFBQSxFQUVBLFdBQVcsTUFBMkM7QUFDckQsV0FBTyxPQUFPLEtBQUssTUFBTSxJQUFJO0FBQUEsRUFDOUI7QUFDRDs7O0FSNUdBLElBQU0sWUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTWxCLElBQXFCLG1CQUFyQixjQUE4Qyx3QkFBTztBQUFBLEVBQXJEO0FBQUE7QUFDQyxvQkFBK0I7QUFDL0IsU0FBUSxZQUFZO0FBQ3BCLFNBQVEsYUFBMEM7QUFDbEQsa0JBQStCO0FBQy9CLHVCQUFjO0FBc0tkLFNBQVEscUJBQXFCLE1BQVk7QUFDeEMsVUFBSSxTQUFTLG9CQUFvQixhQUFhLEtBQUssU0FBUyxrQkFBa0I7QUFDN0UsYUFBSyxZQUFZO0FBQUEsTUFDbEI7QUFBQSxJQUNEO0FBQUE7QUFBQSxFQXhLQSxJQUFJLE9BQW1CO0FBQ3RCLFdBQU8sS0FBSyxTQUFTLG1CQUFtQixTQUNyQyxXQUFXLElBQ1gsS0FBSyxTQUFTO0FBQUEsRUFDbEI7QUFBQSxFQUVBLE1BQU0sU0FBd0I7QUFDN0IsVUFBTSxLQUFLLGFBQWE7QUFHeEIsUUFBSSxDQUFDLEtBQUssU0FBUyxVQUFVO0FBQzVCLFdBQUssU0FBUyxXQUFXLE9BQU8sV0FBVztBQUMzQyxZQUFNLEtBQUssYUFBYTtBQUFBLElBQ3pCO0FBRUEsa0NBQVEsbUJBQW1CLFNBQVM7QUFDcEMsU0FBSyxjQUFjLG1CQUFtQixtQkFBbUIsTUFBTSxLQUFLLFlBQVksQ0FBQztBQUVqRixTQUFLLFdBQVc7QUFBQSxNQUNmLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLFVBQVUsTUFBTSxLQUFLLFlBQVk7QUFBQSxJQUNsQyxDQUFDO0FBRUQsU0FBSyxhQUFhLElBQUkscUJBQXFCLEtBQUssS0FBSyxJQUFJO0FBQ3pELFNBQUssY0FBYyxLQUFLLFVBQVU7QUFFbEMsU0FBSyxnQ0FBZ0MsY0FBYyxDQUFDLFdBQVc7QUFDOUQsVUFBSSxPQUFPLE9BQU87QUFDakIsYUFBSyxtQkFBbUIsT0FBTyxLQUFLO0FBQUEsTUFDckM7QUFBQSxJQUNELENBQUM7QUFFRCxTQUFLLElBQUksVUFBVSxjQUFjLFlBQVk7QUFDNUMsVUFBSSxLQUFLLFNBQVMsT0FBTztBQUN4QixjQUFNLGVBQWUsS0FBSyxRQUFRO0FBRWxDLFlBQUksS0FBSyxTQUFTLGdCQUFnQjtBQUNqQyxlQUFLLFlBQVk7QUFBQSxRQUNsQjtBQUVBLFlBQUksMEJBQVMsV0FBVztBQUN2QixlQUFLLGlCQUFpQjtBQUFBLFFBQ3ZCO0FBQUEsTUFDRDtBQUNBLFdBQUssb0JBQW9CO0FBQUEsSUFDMUIsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLFdBQWlCO0FBdkVsQjtBQXdFRSxlQUFLLFdBQUwsbUJBQWE7QUFBQSxFQUNkO0FBQUEsRUFFQSxNQUFNLGVBQThCO0FBQ25DLFNBQUssV0FBVyxPQUFPLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixNQUFNLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDMUU7QUFBQSxFQUVBLE1BQU0sZUFBOEI7QUFDbkMsVUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRO0FBQUEsRUFDbEM7QUFBQSxFQUVBLE1BQU0sY0FBNkI7QUFDbEMsVUFBTSxJQUFJLEtBQUs7QUFDZixRQUFJLEtBQUssV0FBVztBQUNuQixVQUFJLHdCQUFPLGVBQWUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLEVBQUU7QUFDekQ7QUFBQSxJQUNEO0FBRUEsUUFBSSxDQUFDLEtBQUssU0FBUyxPQUFPO0FBQ3pCLFVBQUksd0JBQU8sZUFBZSxFQUFFLGtCQUFrQixDQUFDLENBQUMsRUFBRTtBQUNsRDtBQUFBLElBQ0Q7QUFFQSxTQUFLLFlBQVk7QUFDakIsUUFBSTtBQUNILFlBQU0sU0FBUyxNQUFNLFVBQVUsS0FBSyxLQUFLLEtBQUssUUFBUTtBQUV0RCxXQUFLLFNBQVMsaUJBQWlCLE9BQU87QUFDdEMsWUFBTSxLQUFLLGFBQWE7QUFFeEIsVUFBSSxPQUFPLFdBQVcsS0FBSyxPQUFPLFdBQVcsR0FBRztBQUMvQyxZQUFJLHdCQUFPLGVBQWUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDLEVBQUU7QUFBQSxNQUN0RCxXQUFXLE9BQU8sV0FBVyxHQUFHO0FBQy9CLFlBQUksd0JBQU8sZUFBZSxTQUFTLGlCQUFpQixHQUFHLEVBQUUsT0FBTyxPQUFPLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFBQSxNQUNuRixPQUFPO0FBQ04sWUFBSTtBQUFBLFVBQ0gsZUFBZSxTQUFTLHNCQUFzQixHQUFHLEVBQUUsUUFBUSxPQUFPLFFBQVEsUUFBUSxPQUFPLE9BQU8sQ0FBQyxDQUFDO0FBQUEsUUFDbkc7QUFDQSxtQkFBVyxPQUFPLE9BQU8sUUFBUTtBQUNoQyxrQkFBUSxNQUFNLDBCQUEwQixHQUFHO0FBQUEsUUFDNUM7QUFBQSxNQUNEO0FBQUEsSUFDRCxTQUFTLEdBQUc7QUFDWCxZQUFNLE1BQU0sYUFBYSxRQUFRLEVBQUUsVUFBVSxPQUFPLENBQUM7QUFDckQsVUFBSSx3QkFBTyxlQUFlLFNBQVMscUJBQXFCLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3JFLGNBQVEsTUFBTSwwQkFBMEIsQ0FBQztBQUFBLElBQzFDLFVBQUU7QUFDRCxXQUFLLFlBQVk7QUFBQSxJQUNsQjtBQUFBLEVBQ0Q7QUFBQSxFQUVBLE1BQWMsbUJBQW1CLE9BQThCO0FBQzlELFNBQUssU0FBUyxRQUFRO0FBQ3RCLFVBQU0sS0FBSyxhQUFhO0FBRXhCLGVBQVcsWUFBWTtBQS9IekI7QUFnSUcsWUFBTSxlQUFlLEtBQUssUUFBUTtBQUNsQyxpQkFBSyxlQUFMLG1CQUFpQjtBQUNqQixVQUFJLHdCQUFPLGVBQWUsRUFBRSxvQkFBb0IsS0FBSyxJQUFJLENBQUMsRUFBRTtBQUM1RCxXQUFLLFlBQVk7QUFFakIsVUFBSSwwQkFBUyxXQUFXO0FBQ3ZCLGFBQUssaUJBQWlCO0FBQUEsTUFDdkI7QUFBQSxJQUNELEdBQUcsR0FBRztBQUFBLEVBQ1A7QUFBQSxFQUVBLG1CQUF5QjtBQTNJMUI7QUE0SUUsZUFBSyxXQUFMLG1CQUFhO0FBRWIsUUFBSSxDQUFDLEtBQUssU0FBUyxTQUFTLENBQUMsS0FBSyxTQUFTLFNBQVU7QUFFckQsU0FBSyxTQUFTLElBQUksY0FBYztBQUFBLE1BQy9CLFlBQVksS0FBSyxTQUFTO0FBQUEsTUFDMUIsT0FBTyxLQUFLLFNBQVM7QUFBQSxNQUNyQixVQUFVLEtBQUssU0FBUztBQUFBLE1BQ3hCLFdBQVcsQ0FBQyxXQUFXLEtBQUssdUJBQXVCLE1BQU07QUFBQSxNQUN6RCxnQkFBZ0IsQ0FBQyxjQUFjO0FBckpsQyxZQUFBQztBQXNKSSxhQUFLLGNBQWM7QUFDbkIsU0FBQUEsTUFBQSxLQUFLLGVBQUwsZ0JBQUFBLElBQWlCO0FBQUEsTUFDbEI7QUFBQSxJQUNELENBQUM7QUFDRCxTQUFLLE9BQU8sUUFBUTtBQUFBLEVBQ3JCO0FBQUEsRUFFQSxNQUFjLHVCQUF1QixRQUErQjtBQUNuRSxRQUFJLEtBQUssU0FBUyxjQUFjLFNBQVMsTUFBTSxFQUFHO0FBRWxELFFBQUk7QUFDSCxZQUFNLFNBQVMsTUFBTTtBQUFBLFFBQ3BCLEtBQUs7QUFBQSxRQUNMLEtBQUs7QUFBQSxRQUNMO0FBQUEsUUFDQSxNQUFNLEtBQUssYUFBYTtBQUFBLE1BQ3pCO0FBQ0EsVUFBSSxRQUFRO0FBQ1gsWUFBSSx3QkFBTyxlQUFlLEVBQUUsd0JBQXdCLEtBQUssSUFBSSxDQUFDLEVBQUU7QUFBQSxNQUNqRTtBQUFBLElBQ0QsU0FBUyxHQUFHO0FBQ1gsY0FBUSxNQUFNLGdDQUFnQyxDQUFDO0FBQUEsSUFDaEQ7QUFBQSxFQUNEO0FBQUEsRUFFQSxzQkFBNEI7QUFDM0IsYUFBUyxvQkFBb0Isb0JBQW9CLEtBQUssa0JBQWtCO0FBRXhFLFFBQUksQ0FBQywwQkFBUyxZQUFZLENBQUMsS0FBSyxTQUFTLGlCQUFrQjtBQUUzRCxhQUFTLGlCQUFpQixvQkFBb0IsS0FBSyxrQkFBa0I7QUFDckUsU0FBSztBQUFBLE1BQVMsTUFDYixTQUFTLG9CQUFvQixvQkFBb0IsS0FBSyxrQkFBa0I7QUFBQSxJQUN6RTtBQUFBLEVBQ0Q7QUFPRDsiLAogICJuYW1lcyI6IFsiaW1wb3J0X29ic2lkaWFuIiwgImltcG9ydF9vYnNpZGlhbiIsICJ0IiwgIl9hIl0KfQo=
