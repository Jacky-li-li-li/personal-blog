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
      '搭建多场景、多用户、可协作、可编排的虚拟用户访谈 Harness，基于 pi SDK + Skill/MCP 执行访谈与洞察，在关键 checkpoint 保留决策 Owner 进行人工校准。',
    outcomes: [
      '访谈提效不靠单点问答，而靠流程可编排、洞察可沉淀、关键判断可人工校准',
      '把访谈从一次性项目变成可复用的研究能力',
    ],
    tags: ['Harness', 'pi SDK', 'Skill', 'MCP', 'Checkpoint', 'Human-in-the-loop'],
  },
  {
    id: 'voc-agent',
    name: 'VOC 洞察 Agent 助手',
    summary:
      '以 Multi-Agent + Spec/RPAC 方法，将 VOC 从原始数据到归因报告的全链路拆解为可执行洞察任务，设计 PA（流程智能体）/AA（活动智能体）/CA（检查智能体）三级 Agent 架构，把分散、冰冷的 VOC 数据转化为有归因、有分级、可校验的业务洞察报告。进一步将 VOC 洞察 Agent 场景化为飞书机器人助手，支持每个人对话式查询洞察，并通过定时任务监控 VOC 数据、自动产出报告。',
    outcomes: [
      'VOC 的价值不在“看数据”，而在输出可决策、可行动、可跨团队使用的结论；洞察也不能只停在报告里，而要进入业务团队日常工作流',
      '报告从“数据罗列”变为“有归因、有分级、有行动建议”，跨团队对齐成本明显下降，可直接复用的结论占比大幅提升',
      '业务人员可随时对话获取洞察，定时监控自动产出报告，使用门槛和人工跟进成本显著降低',
    ],
    tags: ['Multi-Agent', 'Spec', 'RPAC', 'IM通信', '定时任务'],
  },
  {
    id: 'bees',
    name: 'VOC 数据平台',
    summary:
      '以 Vibe Coding 主导完成 VOC 数据平台从 0 到 1 建设，覆盖数据展示、数据监控、归因分析、问题分发与问题闭环全链路；以用户最佳体验为中心设计 BI 图表展示，让业务用户看得懂、找得到、能行动，并推动闭环结果回流打标与模型，形成“反馈—归因—分发—解决—再训练”的数据飞轮。',
    outcomes: [
      'VOC 平台的价值不在“堆图表”，而在用最佳体验的 BI 展示降低理解门槛，并让每条反馈可追因、可分发、可闭环、可回流；Vibe Coding 让 PM 能把产品判断快速落成可用平台',
      '平台从 0 到 1 快速上线并覆盖 VOC 全链路；BI 图表提升数据可读性与使用意愿，VOC 从“看过”变为“可追因、可分发、可闭环”',
      '减少人工二次对齐，问题闭环效率与洞察复用率同步提升',
    ],
    tags: ['Vibe Coding', 'BI 图表', '数据监控', '归因分析'],
  },
  {
    id: 'bec',
    name: '用研方法论 Skill 化',
    summary:
      '负责用研业务中“用户最佳体验目录”创建场景的方法论与流程 Skill 化：将 PRD 提炼、场景拆解、用户洞察归纳、内外部最佳实践沉淀等关键流程拆成可组合、可检索、可执行的 Skill，而非停留在一次性文档或专家经验中；通过流程编排，让目录创建方法业务团队可复用、Agent 可调用执行，并持续迭代校准。',
    outcomes: [
      '最佳体验目录的价值不在“写出一版文档”，而在创建方法能被调用、被执行、被复用；只有 Skill 化，用研经验才能从个人能力变成组织能力，支撑目录持续更新和规模化复用',
      '用户最佳体验目录从“专家一次性产出”变为“可复用、可执行的能力资产”；新人上手成本下降，跨团队复用效率提升，目录迭代更标准化、可持续',
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
      '下游 VOC 归因更准、洞察结论更可信、问题闭环更有依据，减少因标签偏差导致的误判和返工',
    ],
    tags: ['Dify Workflow', '金标集', 'Bad Case Eval'],
  },
];
