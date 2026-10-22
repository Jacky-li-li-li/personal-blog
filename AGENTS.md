# personal blog

## 项目概况

个人网站，用于介绍自己并持续记录随笔。当前已完成 M1 骨架与 M2 的静态发布能力（2026-10-23），尚未接入域名与 Cloudflare Pages。

- `src/`：Astro 站点代码（首页、Notes 列表、正文、404、RSS、robots、sitemap）。
- `src/content/notes/`：Markdown 笔记，Content Collections + Zod 校验。
- `src/styles/global.css`：设计 token、字体、组件样式与响应式。
- `PRD.md`：需求基线（信息架构、页面需求、内容模型）。
- `docs/site-plan.md`：完整产品方案（视觉规范、布局规格、维护 SOP、技术选型、路线图、验收清单）。
- `design/prototype.html`：单文件可交互视觉稿，覆盖首页 / Notes 列表 / 笔记正文、深浅色与移动端，作为实现参考保留。
- `README.md`：本地开发、内容维护与部署说明。

## 已确认决策

- 仅三个公开路由：`/`、`/notes`、`/notes/[slug]`；About / Experience / Projects 全部收在首页。
- 技术栈：Astro 5 + Tailwind 4 + Content Collections + Zod；Cloudflare Pages 静态托管；无服务端与数据库。
- 视觉：近白暖纸底 `#FEFDFA`、青碧强调 `#17A8B8`（文字用 `#0B7481`）、衬线标题（Instrument Serif + 系统中文字体）、克制动效；暗色模式跟随系统并可手动切换。
- 断点：`< 761px` 单列，`761–959px` 过渡，`≥ 960px` 容器 980px / 正文 680px。
- 维护：Markdown + Git push 触发构建；每季度校对首页信息，每月合并依赖升级；无后台。

## 验证方式

已完成依赖安装，本地命令可用：

- `pnpm dev`：启动开发服务器（默认 4321）。
- `pnpm check`：Astro + TypeScript 类型检查。
- `pnpm build`：类型检查并生成 `dist/`；当前构建通过，5 篇示例笔记、8 个页面。
- `pnpm preview`：预览构建产物。
- 自动化截图（可选）：`python3` + Playwright（本机已安装，`channel="chrome"`）按 1440 / 768 / 390 宽度截全页图。
- 发布前需设置 `SITE_URL`，否则 canonical / RSS / sitemap 会回退到 `https://example.com`。

## 下一步

1. 替换 `src/data/experience.ts`、`src/data/projects.ts`、`src/content/notes/` 中的视觉稿示例内容。
2. 确认 `src/data/site.ts` 的邮箱、社交链接与首页文案。
3. 设置 `SITE_URL`，接入 Cloudflare Pages（构建命令 `pnpm build`，输出 `dist`）。
4. 按 `docs/site-plan.md` 第 10 节做线上验收；Lighthouse 性能 ≥ 95、可访问性 100。
