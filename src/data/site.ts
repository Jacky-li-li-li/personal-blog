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
  zh: 'Jacky Li — 用户向 AI 产品经理',
  en: 'Jacky Li — User-facing AI Product Manager',
};

const description: Localized = {
  zh: 'Jacky Li 的个人站点。用户向 AI 产品经理：用观察、访谈与行为数据听清真实用户，把体验洞察做成可落地、可验收的 Agent 产品。',
  en: 'The personal site of Jacky Li, a user-facing AI product manager. I listen to real users through observation, interviews and behavior data, then turn experience insights into Agent products you can ship and measure.',
};

const tagline: Localized = {
  zh: '听清用户，把 AI Agent 做成真正帮到人的产品。',
  en: 'Hear users clearly, then make AI Agents into products that actually help.',
};

/* 支持行内 HTML（用于强调片段）。英文版保留同样的 <strong> 标记，两版结构需一致。 */
const intro: Localized = {
  zh: '嗨，中文名叫李连硕，24 届本科 211 毕业。实践让我更踏实：2024 年 AI 爆发后，我开始把<strong>用户最佳体验与 AI Agent</strong>绑在一起做产品——想接触更多真实用户，听清痛点与期望，用观察、访谈和行为数据判断价值与优先级，再推到落地与迭代。自己也是高强度 Agent 用户，特别留意异常分支、失败边界，以及「模型有没有在更多场景更深入地帮到人」。还在路上……想做 ToC，想离用户更近，我们交个朋友吧～',
  en: "Hi, I'm Lianshuo Li — Jacky for short. I graduated in 2024 from a 211 university with a bachelor's degree. Practice is where I learn best: after AI took off in 2024, I started tying <strong>the best possible user experience to AI Agents</strong> — I want to meet more real users, hear their pain points and hopes clearly, use observation, interviews and behavior data to judge value and priority, then drive landing and iteration. I am a heavy Agent user myself, and I pay close attention to edge cases, failure boundaries, and whether a model actually helps more people, more deeply, across more scenarios. Still on the road. I want to do To C and get closer to users. Let's be friends.",
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
    jobTitle: locale === 'zh' ? '用户向 AI 产品经理' : 'User-facing AI Product Manager',
    description: tagline[locale],
    email,
    sameAs: socials.filter((social) => social.href.startsWith('http')).map((social) => social.href),
  };
}
