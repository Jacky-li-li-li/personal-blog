# personal blog

Jacky Li 的个人站点：首页介绍、工作经历、个人项目与 Notes 随笔。

当前实现对应 `docs/site-plan.md` 的 M1 骨架与 M2 的发布能力，视觉与交互来自 `design/prototype.html`。

## 快速开始

```bash
pnpm install
pnpm dev
```

本地默认打开 `http://localhost:4321`。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 启动开发服务器，支持热更新 |
| `pnpm check` | Astro + TypeScript 类型检查 |
| `pnpm build` | 先检查再生成静态站点到 `dist/` |
| `pnpm preview` | 本地预览构建产物 |
| `pnpm new "标题" slug` | 新建一篇草稿，slug 使用小写英文/数字/连字符 |

`pnpm new` 的第二个参数是必需的，因为内容规范要求文件名只使用 ASCII slug，中文标题不会自动转拼音：

```bash
pnpm new "把工具做成习惯" tools-as-habits
```

## 内容在哪里改

| 内容 | 文件 |
| --- | --- |
| 姓名、定位、个人简介、身份标签、邮箱、社交链接、站点 URL | `src/data/site.ts` |
| 工作经历 | `src/data/experience.ts` |
| 个人项目 | `src/data/projects.ts` |
| 笔记 | `src/content/notes/*.md` |
| 笔记 schema 与校验规则 | `src/content.config.ts` |
| 全站视觉 token 与组件样式 | `src/styles/global.css` |

笔记 frontmatter：

```yaml
---
title: 为什么我又开始写博客
date: 2026-10-18
summary: 一句话说明这篇在讲什么，40–100 字，会出现在列表和首页。
tags: [写作, 工具]
draft: false
---
```

`summary` 为必填，长度 20–120 字；`draft: true` 的笔记不会进入生产构建。草稿可以放在 `src/content/notes/_drafts/`，该目录不会被 collection 读取。

## 示例内容

`src/data/experience.ts`、`src/data/projects.ts` 和 `src/content/notes/` 里的公司、项目、文章目前都是视觉稿示例，**上线前必须替换**。真实内容确认后，只需改这些文件，不需要动页面组件。

## 部署

推荐 Cloudflare Pages：

- 构建命令：`pnpm build`
- 输出目录：`dist`
- Node 版本：22（见 `.nvmrc`）
- 环境变量：`SITE_URL=https://你的域名`

`SITE_URL` 用于 canonical、RSS、sitemap 和 OG。未设置时本地回退到 `https://example.com`。

站点是纯静态产物，也可以部署到 Vercel、Netlify 或任意静态托管。

## 设计约定

- 近白暖纸底 `#FEFDFA`，青碧强调 `#17A8B8`；文字态使用 `#0B7481`（暗色 `#4FCBD8`）保证对比度。
- 标题字体 Instrument Serif，自托管 Latin 子集；中文使用系统宋体/黑体栈，不加载全量 CJK 字体。
- 代码块在明暗模式下都保持深色，作为页面中的「墨块」。
- 首屏不放大面积图片，动效只有进场浮起与悬停反馈，并尊重 `prefers-reduced-motion`。
