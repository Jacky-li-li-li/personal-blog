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
  /** Optional hover preview image paths (public URLs). */
  previews?: string[];
};

export const projects: Project[] = [
  {
    id: 'virtual-interview',
    name: '虚拟用户访谈 Agent 平台',
    summary:
      '搭建多场景、多用户、可协作、可编排的虚拟用户访谈 Harness，基于 pi SDK + Skill/MCP 执行访谈与洞察，在关键 checkpoint 保留决策 Owner 进行人工校准。',
    outcomes: [
      '访谈从一次性项目变为可复用研究能力，洞察可沉淀复用',
      '关键判断保留人工校准，决策质量可控',
    ],
    tags: ['Harness', 'pi SDK', 'Skill', 'MCP', 'Checkpoint', 'Human-in-the-loop'],
    previews: [
      '/images/virtual-interview-home.jpg',
      '/images/virtual-interview-report.jpg',
    ],
  },
  {
    id: 'voc-agent',
    name: 'VOC 洞察 Agent 助手',
    summary:
      '以 Multi-Agent + Spec/RPAC 方法，将 VOC 从原始数据到归因报告的全链路拆解为可执行洞察任务，设计 PA（流程智能体）/AA（活动智能体）/CA（检查智能体）三级 Agent 架构，把分散、冰冷的 VOC 数据转化为有归因、有分级、可校验的业务洞察报告。进一步将 VOC 洞察 Agent 场景化为飞书机器人助手，支持每个人对话式查询洞察，并通过定时任务监控 VOC 数据、自动产出报告。',
    outcomes: [
      '报告变为有归因、有分级、有行动建议，跨团队对齐成本下降',
      '洞察进入飞书日常工作流：对话即查、定时自动出报，使用门槛与跟进成本显著降低',
    ],
    tags: ['Multi-Agent', 'Spec', 'RPAC', 'IM通信', '定时任务'],
  },
  {
    id: 'bees',
    name: 'VOC 数据平台',
    summary:
      '以 Vibe Coding 主导完成 VOC 数据平台从 0 到 1 建设，覆盖数据展示、数据监控、归因分析、问题分发与问题闭环全链路；以用户最佳体验为中心设计 BI 图表展示，让业务用户看得懂、找得到、能行动，并推动闭环结果回流打标与模型，形成“反馈—归因—分发—解决—再训练”的数据飞轮。',
    outcomes: [
      'VOC 从“看过”变为可追因、可分发、可闭环、可回流',
      '人工二次对齐减少，问题闭环效率与洞察复用率同步提升',
    ],
    tags: ['Vibe Coding', 'BI 图表', '数据监控', '归因分析'],
  },
  {
    id: 'bec',
    name: '用研方法论 Skill 化',
    summary:
      '负责用研业务中“用户最佳体验目录”创建场景的方法论与流程 Skill 化：将 PRD 提炼、场景拆解、用户洞察归纳、内外部最佳实践沉淀等关键流程拆成可组合、可检索、可执行的 Skill，而非停留在一次性文档或专家经验中；通过流程编排，让目录创建方法业务团队可复用、Agent 可调用执行，并持续迭代校准。',
    outcomes: [
      '用研经验从个人能力变为可调用、可复用的组织能力资产',
      '新人上手成本下降，跨团队复用效率提升，目录迭代更可持续',
    ],
    tags: ['Skill 能力化', 'Skill 调优'],
  },
  {
    id: 'voc-labeling',
    name: 'VOC 数据打标 workflow',
    summary:
      '基于 Dify Workflow 搭建 VOC 打标流水线，建立标签体系、金标集与 Bad Case Eval 机制，持续校准标签质量。判断打标价值不在“打完一批数据”，而在标签一致、可量化、可回流；Bad Case 回流改规则与模型，让下游归因、洞察和闭环有可信数据底座。',
    outcomes: [
      '标签一致性提升，人工复核成本下降',
      '下游归因与洞察更可信，误判与返工减少',
    ],
    tags: ['Dify Workflow', '金标集', 'Bad Case Eval'],
  },
];
