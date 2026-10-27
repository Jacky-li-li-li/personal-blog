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
      '负责 AI 产品体验与交付闭环：从业务目标和用户场景出发，判断场景优先级与最佳产品方案，平衡用户体验、技术可行性和交付成本；将 Agent、Skill、Spec、Eval 融入产品定义、评测和上线流程，推动 AI 能力产品化、标准化和可规模化复用；建立用户体验问题快速定位与 Agent 规模化验证机制，持续交付改进，提升业务采用率和用户满意度',
    awards: ['安克新星', '2025–2026 连续晋升', '2025 极致先锋团队'],
    projects: ['virtual-interview', 'voc-agent', 'bees', 'bec', 'voc-labeling'],
  },
];
