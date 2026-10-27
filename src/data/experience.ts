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
      zh: '负责 AI 产品体验与交付闭环：从业务目标和用户场景出发，判断场景优先级与最佳产品方案，平衡用户体验、技术可行性和交付成本；将 Agent、Skill、Spec、Eval 融入产品定义、评测和上线流程，推动 AI 能力产品化、标准化和可规模化复用；建立用户体验问题快速定位与 Agent 规模化验证机制，持续交付改进，提升业务采用率和用户满意度',
      en: "Own the full loop from AI product experience to delivery: starting from business goals and user scenarios, I set scenario priority and the best product approach, balancing user experience, technical feasibility and delivery cost. I embed Agent, Skill, Spec and Eval into product definition, evaluation and release, turning AI capabilities into productized, standardized and reusable assets. I also built mechanisms for fast root-causing of experience issues and large-scale Agent validation, shipping improvements continuously to raise business adoption and user satisfaction.",
    },
    awards: {
      zh: ['安克新星', '2025–2026 连续晋升', '2025 极致先锋团队'],
      en: ['Anker Rising Star', 'Promoted twice in 2025–2026', '2025 Ultimate Pioneer Team'],
    },
    projects: ['virtual-interview', 'voc-agent', 'bees', 'bec', 'voc-labeling'],
  },
];
