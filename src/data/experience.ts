/**
 * 工作经历，按时间倒序排列。
 *
 * org 为公司名称（第一层级）；department 可选，与 role 一起展示在第二行。
 * projects 关联 src/data/projects.ts 中的项目 id；awards 没有内容时整行隐藏。
 * 新增经历只需追加本数组并关联项目，不需要修改组件结构。
 *
 * 双语迁移：站点默认中文（`/`），英文挂在 `/en` 下。面向读者的字段
 * （role / org / department / summary / awards）改为 `Localized`，
 * 中英文共用同一份结构；id、排序、logo、website、projects 关联保持原样。
 * 取当前语言值请用 `src/i18n` 的 `pick()`，组件内不要手写中英文。
 */
export type Localized<T = string> = { zh: T; en: T };

export type Experience = {
  id: string;
  start: string;
  end: string | 'present';
  role: Localized;
  /** 公司名称。有 logo 时视觉上只显示图标，这个名字只用于读屏文字与锚点提示。 */
  org: Localized;
  department?: Localized;
  logo?: string;
  logoDark?: string;
  logoHover?: string;
  website?: string;
  summary: Localized;
  awards?: Localized<string[]>;
  projects?: string[];
};

export const experiences: Experience[] = [
  {
    id: 'anker-adt',
    start: '2024',
    end: 'present',
    role: {
      zh: 'AI Agent 产品经理',
      en: 'AI Agent Product Manager',
    },
    // 首行是官方 logo（品牌规范要求不拆字、不翻译），org 只作为它的替代文本。
    org: {
      zh: '安克创新',
      en: 'Anker Innovations',
    },
    department: {
      zh: '最佳体验 ADT',
      en: 'Best Experience ADT',
    },
    logo: '/images/anker-logo.png',
    logoDark: '/images/anker-logo-reverse.png',
    logoHover: '/images/anker-logo-mist-bice.png',
    website: 'https://www.anker.com.cn/',
    summary: {
      zh: '做用户向的 AI 产品：靠真实任务观察、用户访谈与行为数据洞察需求，判断场景价值与优先级并推路线图；与工程、业务一起把 Agent / Skill / Spec / Eval 写进产品定义与验收，盯异常分支与失败边界，用金标、Bad Case 和反馈闭环降门槛、提体验；持续跟踪真实场景采用，让 AI 在更多场景更深入地帮到更多人',
      en: "I build user-facing AI products: discover needs through real-task observation, user interviews and behavior data; judge scenario value and priority, then push the roadmap. With engineering and business partners I bake Agent, Skill, Spec and Eval into product definition and acceptance — watching edge cases and failure boundaries, using golden sets, Bad Case loops and feedback to lower the barrier and raise experience. I keep tracking real-scenario adoption so AI helps more people, more deeply, across more scenarios.",
    },
    awards: {
      zh: ['安克新星', '2025–2026 连续晋升', '2025 极致先锋团队'],
      en: ['Anker Rising Star', 'Promoted twice in 2025–2026', '2025 Ultimate Pioneer Team'],
    },
    projects: ['virtual-interview', 'bec', 'bees', 'voc-agent', 'voc-labeling'],
  },
];
