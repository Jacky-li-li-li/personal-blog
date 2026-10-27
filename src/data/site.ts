/**
 * 站点级身份信息与双语简介。
 *
 * 中英两版各自维护：中文保持原有说法，英文是面向国际读者的重写而非逐字直译，
 * 读起来要像英文母语者自己写的。改中文时请同步英文，避免两版信息不一致。
 *
 * 域名仍是占位值，上线前设置 SITE_URL（Cloudflare Pages 环境变量）。
 */
import type { Localized } from '../i18n/types';

const email = 'jackylilsh@163.com';

const name: Localized = {
  zh: 'Jacky Li',
  en: 'Jacky Li',
};

const title: Localized = {
  zh: 'Jacky Li — AI 产品经理',
  en: 'Jacky Li — AI Product Manager',
};

const description: Localized = {
  zh: 'Jacky Li 的个人站点。AI 产品经理，专注把体验洞察做成可验收的 Agent 产品，记录做过的事和一些没地方放的思考。',
  en: 'The personal site of Jacky Li, an AI product manager who turns experience insights into Agent products you can actually ship and measure. Notes on what I have built, and on thoughts with nowhere else to go.',
};

const tagline: Localized = {
  zh: '因为相信所以热爱！持续探索—让热爱有回响！',
  en: 'I believe it, so I love it. Keep exploring, until the passion echoes back.',
};

/* 支持行内 HTML（用于强调片段）。英文版保留同样的 <strong> 标记，两版结构需一致。 */
const intro: Localized = {
  zh: '嗨，中文名叫李连硕，24 届本科 211 毕业（哪不重要，重要的是实在不喜欢搞学术），总天真地认为实践出真知。巧合的是，24 年 AI 爆发——像是遇到了启蒙导师，让我有方向、有激情、有目标地致力于把<strong>用户最佳体验与 AI Agent</strong>相结合，把产品落地到真实用户场景和业务流程中，实现双倍+的价值产出。还在路上……我也想做 Toc（To C，面向 C 端用户）啊，想了解更多的用户，我们交个朋友吧～',
  en: "Hi, I'm Lianshuo Li — Jacky for short. I graduated in 2024 from a 211 university with a bachelor's degree (the school barely matters; what really matters is that I never enjoyed academia), and I have always naively believed that practice is where real knowledge comes from. Then AI exploded in 2024, and it felt like meeting a mentor: suddenly I had direction, energy and a goal — combining <strong>the best possible user experience with AI Agents</strong>, landing products in real user scenarios and business workflows, and creating value that doubles up. I am still on the road. I would love to do Toc too — To C, building for consumers — and get to know more users. Let's be friends.",
};

/**
 * 头像下方的身份标签（Striper 描边字体只覆盖拉丁字符，中文回退系统字体）。
 * 中文版保留「好奇心」，英文版用 Curious，避免拉丁字体下出现方框。
 */
const tags: Localized<string[]> = {
  zh: ['ISTJ', 'AI PM', 'AI Building', '好奇心'],
  en: ['ISTJ', 'AI PM', 'AI Building', 'Curious'],
};

/** 社交图标按钮的可读名称在界面字典里（i18n/ui.ts），这里只存地址与图标。 */
const socials = [
  { href: 'https://github.com/Jacky-li-li-li', icon: 'github' },
  { href: `mailto:${email}`, icon: 'mail' },
  { href: 'https://x.com/Jackyli05', icon: 'x' },
  { href: 'https://www.feishu.cn/invitation/page/add_contact/?token=b42nc543-2547-467b-8a3b-d73db71acce1&unique_id=QZ0ppaN5dLmMdgcZOM08SA==', icon: 'feishu' },
] as const;

export const site = {
  name,
  title,
  description,
  tagline,
  intro,
  tags,
  email,
  socials,
  siteUrl: (import.meta.env.SITE ?? 'https://example.com').replace(/\/$/, ''),
  ogImage: '/og-default.png',
} as const;

export type Social = (typeof site.socials)[number];
export type SocialIconName = Social['icon'];

/** Person 结构化数据，About / Work 页共用；随语言切换 name / jobTitle / description。 */
export function getPersonJsonLd(locale: 'zh' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name[locale],
    url: site.siteUrl,
    jobTitle: locale === 'zh' ? 'AI 产品经理' : 'AI Product Manager',
    description: tagline[locale],
    email,
    sameAs: socials.filter((social) => social.href.startsWith('http')).map((social) => social.href),
  };
}
