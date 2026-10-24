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
  summary: string;
  awards?: string[];
  projects?: string[];
};

export const experiences: Experience[] = [
  {
    id: 'anker-adt',
    start: '2024',
    end: 'present',
    role: '产品经理',
    org: '安克创新',
    department: '最佳体验 ADT',
    logo: '/images/anker-logo.png',
    logoDark: '/images/anker-logo-reverse.png',
    summary:
      '负责体验域 AI 产品从 0 到 1：把用户调研、VOC 洞察与体验标准做成可验收、可复用的 Agent 产品。',
    projects: ['virtual-interview', 'voc-agent', 'bees', 'bec'],
  },
];
