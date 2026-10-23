/**
 * 个人 / 主导项目。
 *
 * 不填 url 时卡片仍展示，但没有外链箭头、不可点击。
 */
export type Project = {
  name: string;
  summary: string;
  url?: string;
  tags?: string[];
  mark?: string;
};

export const projects: Project[] = [
  {
    name: '虚拟用户访谈',
    summary:
      '用虚拟用户 Agent 替代高成本真人调研，跑通场景识别、访谈执行到结论验收的完整流程。单次调研从 5 万元降到 3 千元，周期从 2–4 周压缩到约 2 天。',
    tags: ['AI Agent', '用户研究', '0→1'],
    mark: 'V',
  },
  {
    name: 'VOC 洞察 Agent',
    summary:
      '按 PA / AA / CA 分层定义公司级多 Agent 规格与编排，把依赖个人经验的 VOC 洞察变成可验收、可复用的流程 Agent。统筹 4 个 PA 与 35 个 AA，单次耗时 4–5 天降到约 1 小时。',
    tags: ['Multi Agent', 'Spec', '流程编排'],
    mark: 'O',
  },
  {
    name: 'BEES 体验数据系统',
    summary:
      '全链路 VOC 与品质闭环平台，围绕问题识别、归因、处置、验证、沉淀，把体验问题真正推进到 Owner 解决。承接 117 万+ 已打标 VOC，覆盖 15 个数据源、232 个品牌。',
    tags: ['数据产品', 'VOC', '0→1'],
    mark: 'B',
  },
  {
    name: 'BEC 最佳体验目录',
    summary:
      '把「用户最理想体验」做成跨软硬件的品类标准目录，统一体验语言、指导设计与测评，并生成 Agent 让人人都能查。覆盖 17 个品类，沉淀 448 条体验增量认知。',
    tags: ['方法论', '体验标准', 'Agent'],
    mark: 'C',
  },
];
