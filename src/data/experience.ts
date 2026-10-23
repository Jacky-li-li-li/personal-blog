/**
 * 工作经历。
 *
 * 数组顺序就是展示顺序，按时间倒序排列。
 * `highlights` 可选，用于在经历下补充可验证的成果要点；不填时只展示 summary。
 */
export type Experience = {
  start: string;
  end: string | 'present';
  role: string;
  org: string;
  summary: string;
  highlights?: string[];
};

export const experiences: Experience[] = [
  {
    start: '2024',
    end: 'present',
    role: '产品经理',
    org: '安克创新 · 最佳体验 ADT',
    summary:
      '负责体验域 AI 产品从 0 到 1：把用户调研、VOC 洞察与体验标准做成可验收、可复用的 Agent 产品。',
    highlights: [
      '虚拟用户访谈平台：单次调研成本 5 万 → 3 千，周期 2–4 周 → 约 2 天，上线首月 39 份有效报告。',
      'VOC 洞察 Agent：统筹 4 PA + 35 AA，年运行约 2,000 次，单次 4–5 天 → 约 1 小时。',
      'BEES 体验数据系统：承接 117 万+ 已打标 VOC，覆盖 15 数据源 / 232 品牌。',
      'VOC 智能打标：金标 F1 75% → 92%，人工复核约 100% → 20%。',
    ],
  },
];
