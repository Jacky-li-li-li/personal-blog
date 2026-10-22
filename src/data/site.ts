/**
 * 站点级文案与身份信息。
 *
 * TODO(M0): 下面除视觉稿已有内容外，域名、邮箱、社交链接都还是占位值，
 * 上线前统一替换。SITE_URL 在 Cloudflare Pages 的环境变量里设置。
 */
export const site = {
  name: 'Jacky Li',
  title: 'Jacky Li — 产品设计与前端',
  description:
    'Jacky Li 的个人站点。产品设计与前端，关注人与工具之间的关系，记录做过的事和一些没地方放的思考。',
  tagline: '产品设计与前端，关注人与工具之间的关系。',
  headline: ['把复杂的事，', '做清楚一点。'],
  headlineAccent: '清楚',
  intro:
    '我在做协作工具的产品设计，也写一点前端。相信好的界面应该让人少想一步：不需要说明书，不需要培训，打开就知道该做什么。这个站点用来放我的经历、做过的东西，以及一些没地方放的思考。',
  email: 'hi@example.com',
  socials: [
    { label: 'GitHub', href: 'https://github.com', icon: 'github' },
    { label: 'Email', href: 'mailto:hi@example.com', icon: 'mail' },
    { label: 'X', href: 'https://x.com', icon: 'x' },
  ],
  siteUrl: (import.meta.env.SITE ?? 'https://example.com').replace(/\/$/, ''),
  ogImage: '/og-default.png',
  locale: 'zh-CN',
} as const;

export type Social = (typeof site.socials)[number];
