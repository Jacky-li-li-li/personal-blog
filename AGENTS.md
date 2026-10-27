# personal blog

## 项目概况

个人网站，用于介绍自己并持续记录随笔。当前已完成 M1 骨架与 M2 的静态发布能力（2026-10-23），已上线 Cloudflare Pages，主域名 **https://clok.fun**（备用 https://personal-blog-ah8.pages.dev，canonical 指向 clok.fun）。GitHub Actions Secrets（`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` / `SITE_URL`）已于 2026-10-23 配置完成，push 到 `main` 会自动构建并部署。

域名 `clok.fun` 在腾讯云 DNSPod 注册，2026-10-23 已将 NS 切换为 Cloudflare（`ara.ns.cloudflare.com` / `julio.ns.cloudflare.com`），zone 状态 active；Cloudflare 中有一条已代理的 CNAME `clok.fun → personal-blog-ah8.pages.dev`；Pages 自定义域名已 active，证书由 Google 签发。`www.clok.fun` 已配置代理 CNAME，并通过两条 Redirect Rule（`https://www.*` 与 `http://www.*`）301 到 `https://clok.fun`，路径与查询参数保留，不经过 Pages 回源。腾讯云侧「禁止转移锁」与「禁止更新锁」均保持开启。

- `src/`：Astro 站点代码（首页、Notes 列表、正文、404、RSS、robots、sitemap），中英文各一套路由。
- `src/i18n/`：双语基础设施。`ui.ts` 是界面文案字典（导航、按钮、空状态、无障碍标签，中英并列），`paths.ts` 负责 `/en` 前缀与路径互转，`types.ts` 定义 `Locale` / `Localized<T>` 与 `pick()`。
- `src/views/`：中英文共用的页面版式（`AboutPage`、`WorkPage`、`NotesPage`）。`src/pages/*` 只做薄入口并传入 `locale`，改版时只需改一处。
- `src/content/notes/`：Markdown 笔记，Content Collections + Zod 校验。
- `src/styles/global.css`：设计 token、字体、组件样式与响应式。
- `src/components/BlockField.astro`：首页 Hero 的方块阵背景，静止完全隐藏，指针进入后整片淡入并在光标附近抬升；纯装饰 Canvas，不进入可访问性树。
- `PRD.md`：需求基线（信息架构、页面需求、内容模型）。
- `docs/site-plan.md`：完整产品方案（视觉规范、布局规格、维护 SOP、技术选型、路线图、验收清单）。
- `design/prototype.html`：单文件可交互视觉稿，覆盖首页 / Notes 列表 / 笔记正文、深浅色与移动端，作为实现参考保留。
- `docs/dot-matrix-motion-spec.md`：首页方块阵背景动效规范 v1.0（已实现），定义几何、颜色、交互曲线、降级与验收标准；静止隐藏、悬停时整片底纹淡入并在光标附近抬升。
- `design/dot-matrix-preview.html`：方块阵背景单文件交互预览（静止不显示、悬停整片淡入、局部抬升），支持明暗主题与青碧 / 参考紫切换；字体与头像副本在 `design/preview-assets/`，仅用于离线预览。
- `README.md`：本地开发、内容维护与部署说明。
- `.github/workflows/ci.yml`：类型检查 + 构建 + 产物校验。
- `.github/workflows/deploy.yml`：推送到 `main` 自动部署到 Cloudflare Pages。
- `wrangler.toml`：Cloudflare Pages 项目配置。
- 首页 hero 已定稿为两栏：左栏头像 + 社交入口；右栏姓名（Array 点阵字体）、定位句、个人简介，`#ISTJ / #AI PM / #AI Building` 话题标签另起一行跟在简介末尾（小红书式排布）。邮箱与社交链接均为真实地址。

## 已确认决策

- 五个公开路由：`/`（简介 + 经历项目入口 + 最近笔记）、`/about`（简介 + 联系）、`/work`（工作经历 + 代表项目）、`/notes`、`/notes/[slug]`。URL 不带尾斜杠，`/about/`、`/work/` 与 `/notes/` 由 `_redirects` 301 到无斜杠版本。
- 中英文双语：中文为默认语言，保持现有 URL 不变；英文挂在 `/en` 前缀下（`/en`、`/en/about`、`/en/work`、`/en/notes`、`/en/notes/:slug`）。两版通过 `hreflang`（`zh-CN` / `en` / `x-default` → 中文）互链，导航右侧 `EN` / `CN` 按钮在同一页面的两种语言间跳转。结构化文案在 `src/data/*.ts` 里用 `{ zh, en }` 并列存放；笔记译文是独立文件 `slug.en.md`（不写 `date`，沿用中文原文日期），没有译文的笔记不出现在 `/en`，中文页的切换回退到英文列表页。构建 `build.format` 必须是 `file`（`/en` → `en.html`）：`directory` 会让 Cloudflare Pages 给目录 URL 强制补尾斜杠，与「URL 不带尾斜杠」冲突成死循环。带尾斜杠地址由 `_redirects` 一次性 301。
- 技术栈：Astro 5 + Tailwind 4 + Content Collections + Zod；Cloudflare Pages 静态托管；Notes 阅读计数用 Pages Functions + KV（`VIEWS`），页面只显示 PV。
- 视觉：近白暖纸底 `#FEFDFA`、青碧强调 `#17A8B8`（文字用 `#0B7481`）、衬线标题（Instrument Serif + 系统中文字体）、姓名用 Array 点阵字体、话题标签用 Striper 描边字体、克制动效；暗色模式跟随系统并可手动切换。
- 首页 Hero 背景为方块阵：24px 间距、3px 直角方块，静止完全隐藏；指针进入后整片底纹淡入，150px 半径内方块上抬 9px 并染青碧色，离开 380ms 回落。只在空白区域触发，名称、简介、标签、导航与下方文本区域不唤醒背景。范围止于 Hero 下缘 +120px（最大 880px），触屏与 `prefers-reduced-motion` 不启用。
- About 顶部为全幅纸版草原：远景丘陵、中景野马群与蒙古包、近景草叶构成纵深，绿色采用真实草木的橄榄绿与鼠尾草绿；移动端重排叙事物，避免裁切后丢失主体，场景为装饰并适配暗色与 reduced-motion。
- Work 顶部为全幅纸版日照雪山，右上暖日、三层山体与 SVG 油墨颗粒；右侧雪坡有两支沿登山绳有序上行的小队，近大远小，外套使用低饱和赭红、藏蓝与岩黄；左侧融水沿 128px 时间栏流向首个经历并收束为时间轴，最后一段之后渐隐不封口。场景为装饰、无卡片外框，明暗主题与 reduced-motion 均有独立降级。纸版源码另存于 `design/paper-landscape-backup/`，使用 `.txt` 后缀，不参与构建；写实图片资源与独立预览仍保留在 `public/images/` 和 `public/design/snow-mountain-realistic.html`。
- Work 经历模块：首行左侧为安克官方 logo（Black / Mist Bice / Reverse 三态按品牌规范切换，素材裁切左右安全留白使首字母与正文左缘对齐，点击新标签页跳转官网），右侧为「部门 · 岗位」（14px 墨色，靠右对齐）；默认全部收起；只有指针落在某段经历的**内容区**（时间列右侧的正文块）才展开该段并收起其余，同一时间只展开一段；左侧时间列（年份与轨道）不绑定任何事件，悬停它不展开也不收起。离开整个经历模块才折叠，滚动不再参与开合（页面不会自行伸缩）；但如果此刻处于深度滚动（收起会让浏览器夹紧 scrollY、把整屏内容拽下数百像素），则暂缓折叠，等滚回安全位置再收。判定用指针坐标 + 命中检测而不是元素的 mouseenter/leave：卡片开合会把相邻经历整体推走，元素边界在指针底下移动会误触发。键盘焦点进入内容区等价于悬停；滚动时融水水位沿河道与时间线随阅读线连续跟随。详细规范见 `DESIGN.md` 8.4。
- 头像下方的身份标签悬停时进入「对焦」态：当前标签亮起并浮现四角取景标记与跟随指针的柔光，同组其余标签虚化；触屏与 `prefers-reduced-motion` 下降级。头像与页面其他内容不参与该效果。
- 断点：`< 761px` 单列，`761–959px` 过渡，`≥ 960px` 容器 1160px / 正文 680px。
- 维护：Markdown + Git push 触发构建；每季度校对首页信息，每月合并依赖升级；无后台。

## 验证方式

已完成依赖安装，本地命令可用：

- `pnpm dev`：启动开发服务器（默认 4321）。
- `pnpm check`：Astro + TypeScript 类型检查。
- `pnpm build`：类型检查并生成 `dist/`；当前构建通过，1 篇笔记（含英文译文）、中英合计 12 个页面（含 404；RSS 另各一份）。
- `pnpm verify`：只校验已有 `dist/` 产物（路由齐全、file 格式、hreflang、canonical 无尾斜杠、`_redirects` 无死循环规则）。
- `pnpm preflight`：**推送前必须跑**，等价于 CI 的全部步骤（check + build + verify）。它与 CI 共用 `scripts/verify-dist.sh`，本地绿即 CI 绿。
- 踩过的坑：曾因 `ci.yml` 的产物断言与构建配置不一致（file vs directory 格式）连续两次推红，触发失败通知邮件。改构建配置时必须同步 `scripts/verify-dist.sh`，并用 `pnpm preflight` 自测。
- `pnpm preview`：预览构建产物。
- 自动化截图（可选）：`python3` + Playwright（本机已安装，`channel="chrome"`）按 1440 / 768 / 390 宽度截全页图。
- 发布前需设置 `SITE_URL`（当前为 `https://clok.fun`），否则 canonical / RSS / sitemap 会回退到 `https://example.com`。

## 内容状态

首页经历与项目已替换为真实信息（2026-10-23）：安克创新 2024–至今的产品经理经历，含 4 条成果要点；4 个项目卡片为虚拟用户访谈、VOC 洞察 Agent、BEES 体验数据系统、BEC 最佳体验目录。`src/content/notes/` 已有第一篇真实笔记《回顾》（`looking-back.md`）；新增笔记用 `pnpm new "标题" slug`，草稿放 `_drafts/`，正文统一走 `NoteArticle.astro` + `.prose`。分享图 `public/og-default.png` 已按 AI 产品经理定位重做。

## 下一步

1. 继续写真实笔记，并同步补英文译文（`slug.en.md`）；暂无译文的篇目在英文站自动隐藏。
2. 按 `docs/site-plan.md` 第 10 节做线上验收；Lighthouse 性能 ≥ 95、可访问性 100。
