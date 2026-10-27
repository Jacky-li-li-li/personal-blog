# personal blog

Jacky Li 的个人站点：首页与 About 个人介绍、Work 工作经历与代表项目、Notes 随笔。

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
| 姓名、定位、个人简介、身份标签、邮箱、社交链接、站点 URL（中英各一份） | `src/data/site.ts` |
| 工作经历（中英各一份） | `src/data/experience.ts` |
| 个人项目（中英各一份） | `src/data/projects.ts` |
| 笔记 | `src/content/notes/*.md`，译文为 `*.en.md` |
| 笔记 schema 与校验规则 | `src/content.config.ts` |
| 界面文案字典（导航、按钮、空状态、无障碍标签） | `src/i18n/ui.ts` |
| 全站视觉 token 与组件样式 | `src/styles/global.css` |

笔记 frontmatter：

```yaml
---
title: 为什么我又开始写博客
date: 2026-10-18
summary: 一句话说明这篇在讲什么，20–120 字；用于 SEO / RSS，列表不展示。
tags: [写作, 工具]
draft: false
---
```

`summary` 为必填，长度 20–120 字；`draft: true` 的笔记不会进入生产构建。草稿可以放在 `src/content/notes/_drafts/`，该目录不会被 collection 读取。

## 中英文双语

站点默认中文，英文版挂在 `/en` 下：`/`、`/about`、`/work`、`/notes`、`/notes/:slug` 与 `/en`、`/en/about`、`/en/work`、`/en/notes`、`/en/notes/:slug` 一一对应，两版通过 `<link rel="alternate" hreflang>` 互链，导航右侧的 `EN` / `CN` 按钮在同一页面的两种语言间跳转。

内容分两类维护：

| 类型 | 写法 |
| --- | --- |
| 结构化的短文案（个人简介、经历、项目） | `src/data/*.ts` 里用 `{ zh, en }` 两个字段并列，组件通过 `pick()` 取当前语言 |
| 笔记正文 | 中文 `slug.md` + 英文 `slug.en.md` 两个文件，文件名相同即自动配对 |

英文笔记的 frontmatter：

```yaml
---
title: Looking Back
summary: One sentence explaining what the note is about; 20–160 characters.
tags: [Work]
draft: false
---
```

- 译文**不需要写 `date`**，构建时沿用中文原文的日期，避免两处维护。
- 没有 `.en.md` 的笔记不会出现在 `/en` 列表里，中文页的切换按钮会回退到英文列表页，不会跳到 404。
- `pnpm new "标题" slug` 会同时生成中文与英文两个模板文件；不想翻译时直接删掉 `.en.md`。
- 界面文案（按钮、无障碍标签、空状态）集中在 `src/i18n/ui.ts`，两语言并列，改文案时两边一起改。

带尾斜杠的地址（`/en/`、`/about/`、`/en/notes/` 等）由 `public/_redirects` 在 Cloudflare Pages 边缘 301 到无斜杠版本。

## 示例内容

`src/data/experience.ts` 与 `src/data/projects.ts` 已替换为真实经历与项目（2026-10-23）。第一篇笔记《回顾》已写入 `src/content/notes/looking-back.md`；后续用 `pnpm new "标题" slug` 生成，草稿放 `_drafts/`（不会被 collection 读取），正文样式统一由 `NoteArticle.astro` 提供。

## 部署

线上地址：**https://clok.fun**（自定义域名，Cloudflare 托管 DNS 并签发证书）

备用地址：https://personal-blog-ah8.pages.dev（同一构建产物，canonical 指向 clok.fun）

托管在 Cloudflare Pages，项目名 `personal-blog`，生产分支 `main`。 Notes 阅读次数由 Pages Functions（`functions/api/views*`）写入 KV binding `VIEWS`；页面只展示 PV「x 次阅读」。本地 `astro dev` / `preview` 不跑 Functions，hostname 为 localhost 时前端显示 `0 次阅读`。域名 `clok.fun` 的 NS 已从腾讯云 DNSPod 切换到 Cloudflare（`ara.ns.cloudflare.com` / `julio.ns.cloudflare.com`）。`www.clok.fun` 由两条 Redirect Rule 在边缘 301 到 `https://clok.fun`，保留路径与查询参数。

### 方式一：GitHub Actions（推荐）

推送到 `main` 后自动构建并部署，见 `.github/workflows/deploy.yml`。需要在仓库 Secrets 里配三项：

| Secret | 说明 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token，权限 `Cloudflare Pages: Edit` |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID |
| `SITE_URL` | 线上域名，用于 canonical / RSS / sitemap，当前为 `https://clok.fun` |

### 方式二：本地部署

```bash
pnpm deploy           # 构建并部署到生产（main 分支）
pnpm deploy:preview   # 构建并部署为预览版本
```

首次使用需 `npx wrangler login` 授权。

### 构建参数

- 构建命令：`pnpm build`
- 输出目录：`dist`
- Node 版本：22（见 `.nvmrc`）
- 环境变量：`SITE_URL=https://clok.fun`

`SITE_URL` 用于 canonical、RSS、sitemap 和 OG。未设置时回退到 `https://example.com`。绑定自定义域名后需同步更新此值。

主体是静态产物；Notes 阅读计数依赖 Cloudflare Pages Functions + KV。纯静态托管（Vercel/Netlify 等）可照常部署页面，但阅读计数 API 仅在 Cloudflare Pages 生效。

## 持续集成

`.github/workflows/ci.yml` 在 push 到 `main`、PR 和手动触发时运行：类型检查 → 构建 → 校验 `dist/index.html`、`dist/notes/index.html`、`dist/rss.xml` 存在。

## 设计约定

完整的色彩、排版、布局、组件与动效规范见根目录 `DESIGN.md`，样式 Token 以 `src/styles/global.css` 为实现入口。

- 近白暖纸底 `#FEFDFA`，青碧强调 `#17A8B8`；文字态使用 `#0B7481`（暗色 `#4FCBD8`）保证对比度。
- 标题字体 Instrument Serif，自托管 Latin 子集；中文使用系统宋体/黑体栈，不加载全量 CJK 字体。
- 代码块在明暗模式下都保持深色，作为页面中的「墨块」。
- 首屏不放大面积图片，动效只有进场浮起与悬停反馈，并尊重 `prefers-reduced-motion`。
