# personal blog

## 项目概况

个人网站，用于介绍自己并持续记录随笔。当前已完成 M1 骨架与 M2 的静态发布能力（2026-10-23），已上线 Cloudflare Pages，主域名 **https://clok.fun**（备用 https://personal-blog-ah8.pages.dev，canonical 指向 clok.fun）。GitHub Actions Secrets（`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` / `SITE_URL`）已于 2026-10-23 配置完成，push 到 `main` 会自动构建并部署。

域名 `clok.fun` 在腾讯云 DNSPod 注册，2026-10-23 已将 NS 切换为 Cloudflare（`ara.ns.cloudflare.com` / `julio.ns.cloudflare.com`），zone 状态 active；Cloudflare 中有一条已代理的 CNAME `clok.fun → personal-blog-ah8.pages.dev`；Pages 自定义域名已 active，证书由 Google 签发。`www.clok.fun` 已配置代理 CNAME，并通过两条 Redirect Rule（`https://www.*` 与 `http://www.*`）301 到 `https://clok.fun`，路径与查询参数保留，不经过 Pages 回源。腾讯云侧「禁止转移锁」与「禁止更新锁」均保持开启。

- `src/`：Astro 站点代码（首页、Notes 列表、正文、404、RSS、robots、sitemap）。
- `src/content/notes/`：Markdown 笔记，Content Collections + Zod 校验。
- `src/styles/global.css`：设计 token、字体、组件样式与响应式。
- `PRD.md`：需求基线（信息架构、页面需求、内容模型）。
- `docs/site-plan.md`：完整产品方案（视觉规范、布局规格、维护 SOP、技术选型、路线图、验收清单）。
- `design/prototype.html`：单文件可交互视觉稿，覆盖首页 / Notes 列表 / 笔记正文、深浅色与移动端，作为实现参考保留。
- `README.md`：本地开发、内容维护与部署说明。
- `.github/workflows/ci.yml`：类型检查 + 构建 + 产物校验。
- `.github/workflows/deploy.yml`：推送到 `main` 自动部署到 Cloudflare Pages。
- `wrangler.toml`：Cloudflare Pages 项目配置。
- 首页 hero 已定稿为两栏：左栏头像 + `#ISTJ / #AI PM / #AI Building` 话题标签 + 社交入口；右栏姓名（Array 点阵字体）、定位句与个人简介。邮箱与社交链接均为真实地址。

## 已确认决策

- 四个公开路由：`/`（简介 + 经历项目入口 + 最近笔记）、`/about`（简介 + 经历 + 项目）、`/notes`、`/notes/[slug]`。URL 不带尾斜杠，`/about/` 与 `/notes/` 由 `_redirects` 301 到无斜杠版本。
- 技术栈：Astro 5 + Tailwind 4 + Content Collections + Zod；Cloudflare Pages 静态托管；无服务端与数据库。
- 视觉：近白暖纸底 `#FEFDFA`、青碧强调 `#17A8B8`（文字用 `#0B7481`）、衬线标题（Instrument Serif + 系统中文字体）、姓名用 Array 点阵字体、话题标签用 Striper 描边字体、克制动效；暗色模式跟随系统并可手动切换。
- 断点：`< 761px` 单列，`761–959px` 过渡，`≥ 960px` 容器 1160px / 正文 680px。
- 维护：Markdown + Git push 触发构建；每季度校对首页信息，每月合并依赖升级；无后台。

## 验证方式

已完成依赖安装，本地命令可用：

- `pnpm dev`：启动开发服务器（默认 4321）。
- `pnpm check`：Astro + TypeScript 类型检查。
- `pnpm build`：类型检查并生成 `dist/`；当前构建通过，5 篇示例笔记、8 个页面。
- `pnpm preview`：预览构建产物。
- 自动化截图（可选）：`python3` + Playwright（本机已安装，`channel="chrome"`）按 1440 / 768 / 390 宽度截全页图。
- 发布前需设置 `SITE_URL`（当前为 `https://clok.fun`），否则 canonical / RSS / sitemap 会回退到 `https://example.com`。

## 内容状态

首页经历与项目已替换为真实信息（2026-10-23）：安克创新 2024–至今的产品经理经历，含 4 条成果要点；4 个项目卡片为虚拟用户访谈、VOC 洞察 Agent、BEES 体验数据系统、BEC 最佳体验目录。`src/content/notes/` 目前为空（示例笔记已删除），首页 Recent Notes 与 `/notes` 显示空状态；新增笔记用 `pnpm new`，草稿放 `_drafts/`。分享图 `public/og-default.png` 已按 AI 产品经理定位重做。

## 下一步

1. 写第一篇真实笔记（当前笔记集合为空）。
2. 按 `docs/site-plan.md` 第 10 节做线上验收；Lighthouse 性能 ≥ 95、可访问性 100。
