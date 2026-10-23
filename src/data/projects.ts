/**
 * 个人 / 主导项目。
 *
 * summary 说明方法，outcomes 单独呈现结果，避免与经历摘要重复。
 * 不填 url 时只展示内容；填写后显示案例链接。
 */
export type Project = {
  id: string;
  name: string;
  summary: string;
  outcomes?: string[];
  url?: string;
  tags?: string[];
};

export const projects: Project[] = [
  {
    id: 'virtual-interview',
    name: '虚拟用户访谈',
    summary:
      '用虚拟用户 Agent 替代高成本真人调研，跑通场景识别、访谈执行到结论验收的完整流程。',
    outcomes: ['单次调研 5 万 → 3 千', '周期 2–4 周 → 约 2 天', '上线首月 39 份有效报告'],
    tags: ['AI Agent', '用户研究', '0→1'],
  },
  {
    id: 'voc-agent',
    name: 'VOC 洞察 Agent',
    summary:
      '按 PA / AA / CA 分层定义公司级多 Agent 规格与编排，把依赖个人经验的 VOC 洞察变成可验收、可复用的流程 Agent。',
    outcomes: ['统筹 4 PA + 35 AA', '年运行约 2,000 次', '单次 4–5 天 → 约 1 小时'],
    tags: ['Multi Agent', 'Spec', '流程编排'],
  },
  {
    id: 'bees',
    name: 'BEES 体验数据系统',
    summary:
      '全链路 VOC 与品质闭环平台，围绕问题识别、归因、处置、验证、沉淀，把体验问题真正推进到 Owner 解决。',
    outcomes: ['117 万+ 已打标 VOC', '覆盖 15 个数据源 / 232 个品牌'],
    tags: ['数据产品', 'VOC', '0→1'],
  },
  {
    id: 'bec',
    name: 'BEC 最佳体验目录',
    summary:
      '把「用户最理想体验」做成跨软硬件的品类标准目录，统一体验语言、指导设计与测评，并生成 Agent 让人人都能查。',
    outcomes: ['覆盖 17 个品类', '沉淀 448 条体验增量认知'],
    tags: ['方法论', '体验标准', 'Agent'],
  },
];
