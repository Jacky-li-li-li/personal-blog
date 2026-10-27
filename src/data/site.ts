/**
 * 站点级文案与身份信息。
 *
 * 邮箱与社交链接已替换为真实地址；域名仍是占位值，
 * 上线前设置 SITE_URL（Cloudflare Pages 环境变量）。
 */
const email = 'jackylilsh@163.com';

export const site = {
  name: 'Jacky Li',
  title: 'Jacky Li — AI 产品经理',
  description:
    'Jacky Li 的个人站点。AI 产品经理，专注把体验洞察做成可验收的 Agent 产品，记录做过的事和一些没地方放的思考。',
  tagline: '因为相信所以热爱！持续探索—让热爱有回响！',
  /* 支持行内 HTML（用于强调片段） */
  intro:
    '嗨，中文名叫李连硕，24 届本科 211 毕业（哪不重要，重要的是实在不喜欢搞学术），总天真地认为实践出真知。巧合的是，24 年 AI 爆发——像是遇到了启蒙导师，让我有方向、有激情、有目标地致力于把<strong>用户最佳体验与 AI Agent</strong>相结合，把产品落地到真实用户场景和业务流程中，实现双倍+的价值产出。还在路上……我也想做 Toc 啊，想了解更多的用户，我们交个朋友吧～',
  email,
  /* 头像下方的身份标签（Striper 无中文字形时回退系统字体），可继续追加 */
  tags: ['ISTJ', 'AI PM', 'AI Building', '好奇心'],
  socials: [
    { label: 'GitHub', href: 'https://github.com/Jacky-li-li-li', icon: 'github' },
    { label: 'Email', href: `mailto:${email}`, icon: 'mail' },
    { label: '飞书', href: 'https://www.feishu.cn/invitation/page/add_contact/?token=b42nc543-2547-467b-8a3b-d73db71acce1&unique_id=QZ0ppaN5dLmMdgcZOM08SA==', icon: 'feishu' },
    { label: 'X', href: 'https://x.com/Jackyli05', icon: 'x' },
  ],
  siteUrl: (import.meta.env.SITE ?? 'https://example.com').replace(/\/$/, ''),
  ogImage: '/og-default.png',
  locale: 'zh-CN',
} as const;

export type Social = (typeof site.socials)[number];


/** Person 结构化数据，首页与 About 页共用。 */
export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.siteUrl,
  jobTitle: 'AI 产品经理',
  description: site.tagline,
  email: site.email,
  sameAs: site.socials.filter((social) => social.href.startsWith('http')).map((social) => social.href),
};
