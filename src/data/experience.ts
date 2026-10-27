/**
 * 工作经历，按时间倒序排列。
 *
 * org 为公司名称（第一层级）；department 可选，与 role 一起展示在第二行。
 * projects 关联 src/data/projects.ts 中的项目 id；awards 没有内容时整行隐藏。
 * 新增经历只需追加本数组并关联项目，不需要修改组件结构。
 */
export type Experience = {
  id: string;
  start: string;
  end: string | 'present';
  role: string;
  org: string;
  department?: string;
  logo?: string;
  logoDark?: string;
  logoHover?: string;
  website?: string;
  summary: string;
  awards?: string[];
  projects?: string[];
};

export const experiences: Experience[] = [
  {
    id: 'anker-adt',
    start: '2024',
    end: 'present',
    role: 'AI Agent 产品经理',
    org: '安克创新',
    department: '最佳体验 ADT',
    logo: '/images/anker-logo.png',
    logoDark: '/images/anker-logo-reverse.png',
    logoHover: '/images/anker-logo-mist-bice.png',
    website: 'https://www.anker.com.cn/',
    summary:
      '以用户最佳体验为中心，用 Agent、Skill、Spec、Eval 与「七步工作法」，把能力做成可评测、可上线、可被业务团队和用户持续使用的产品。更快定位体验问题，并用 Agent 规模化验证与交付改进。',
    awards: ['安克新星', '2025–2026 连续晋升', '2025 极致先锋团队'],
    projects: ['virtual-interview', 'voc-agent', 'bees', 'bec', 'voc-labeling'],
  },
];
