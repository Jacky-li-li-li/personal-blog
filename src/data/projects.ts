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
    name: '虚拟用户访谈 Agent 平台',
    summary:
      '搭可编排的虚拟用户访谈 Harness，用 pi + Skill/MCP 跑访谈与洞察，关键节点保留人在环。',
    outcomes: ['访谈周期从周级压到小时级', '同一套流程可复用到多品类研究'],
    tags: ['Harness', 'pi', 'Skill', 'MCP', '人在环'],
  },
  {
    id: 'voc-agent',
    name: 'VOC 洞察',
    summary:
      'Multi-Agent + Spec/RPAC 把海量 VOC 拆成可执行洞察，输出 PA / AA / CA 级结论。',
    outcomes: ['洞察从「看过」变成「能排期」', '跨团队对齐成本明显下降'],
    tags: ['Multi-Agent', 'Spec', 'RPAC', 'PA·AA·CA'],
  },
  {
    id: 'bees',
    name: 'BEES',
    summary:
      'VOC 链路全场景智能化——收集 → 详细归因 → 问题分发 → 闭环；闭环结果回流打标与模型，形成「反馈—归因—分发—解决—再训练」的数据飞轮。',
    outcomes: ['每条反馈可追因、可分发、可闭环', '飞轮越转越准，少靠人工二次对齐'],
    tags: ['Vibe Coding', 'Skill', 'VOC', '归因分析', '问题分发', '闭环', '数据飞轮'],
  },
  {
    id: 'bec',
    name: 'BEC Skill 化',
    summary:
      '把 BEC（能力目录 / 旅程 / Agent 能力）拆成可组合 Skill，而不是一次性文档。',
    outcomes: ['能力可检索、可拼装、可交给 Agent 执行', '新人上手成本下降'],
    tags: ['Skill', 'BEC', '能力目录', '旅程', 'Agent'],
  },
  {
    id: 'voc-labeling',
    name: 'VOC 打标',
    summary:
      'Dify Workflow 建打标流水线，配金标与 Bad Case Eval，持续校准标签质量。',
    outcomes: ['打标一致性可量化', 'Bad Case 能回流改规则，而不是一次性上线'],
    tags: ['Dify', 'Workflow', '金标', 'Bad Case', 'Eval'],
  },
];
