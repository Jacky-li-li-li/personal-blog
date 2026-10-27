/**
 * 个人 / 主导项目。
 *
 * summary 说明方法，outcomes 单独呈现结果，避免与经历摘要重复。
 * 不填 url 时只展示内容；填写后显示案例链接。
 *
 * 双语迁移：name / summary / outcomes 改为 `Localized`（类型从 experience.ts 引入），
 * 中英文共用同一份结构；id、排序、url、previews 保持原样。
 * tags 维持 `string[]`：其中多是技术缩写与产品环节名，中英文可直接共用；
 * 少数中文标签按「中文保留 / 英文改写」收录于 tagLabels（见文件末尾）。
 */
import type { Localized } from './experience';

export type Project = {
  id: string;
  name: Localized;
  summary: Localized;
  outcomes?: Localized<string[]>;
  url?: string;
  /** 技术缩写与产品环节名，中英文直接共用，原样渲染。 */
  tags?: string[];
  /** Optional hover preview image paths (public URLs). */
  previews?: string[];
};

export const projects: Project[] = [
  {
    id: 'virtual-interview',
    name: {
      zh: '虚拟用户访谈 Agent 平台',
      en: 'Virtual User Interview Agent Platform',
    },
    summary: {
      zh: '搭建多场景、多用户、可协作、可编排的虚拟用户访谈 Harness，基于 pi SDK + Skill/MCP 执行访谈与洞察，在关键 checkpoint 保留决策 Owner 进行人工校准。',
      en: 'Built a virtual user interview Harness that supports multiple scenarios and user personas, team collaboration and flexible orchestration. Interviews and insight synthesis run on the pi SDK with Skills and MCP, while decision owners stay in the loop for manual calibration at key checkpoints.',
    },
    outcomes: {
      zh: [
        '访谈从一次性项目变为可复用研究能力，洞察可沉淀复用',
        '关键判断保留人工校准，决策质量可控',
      ],
      en: [
        'Interviews shifted from one-off projects to a reusable research capability, with insights captured and reused across studies',
        'Key judgments keep a human calibration step, so decision quality stays under control',
      ],
    },
    tags: ['Harness', 'pi SDK', 'Skill', 'MCP', 'Checkpoint', 'Human-in-the-loop'],
    previews: [
      '/images/virtual-interview-home.jpg',
      '/images/virtual-interview-report.jpg',
    ],
  },
  {
    id: 'voc-agent',
    name: {
      zh: 'VOC 洞察 Agent 助手',
      en: 'VOC Insight Agent Assistant',
    },
    summary: {
      zh: '以 Multi-Agent + Spec/RPAC 方法，将 VOC 从原始数据到归因报告的全链路拆解为可执行洞察任务，设计 PA（流程智能体）/AA（活动智能体）/CA（检查智能体）三级 Agent 架构，把分散、冰冷的 VOC 数据转化为有归因、有分级、可校验的业务洞察报告。进一步将 VOC 洞察 Agent 场景化为飞书机器人助手，支持每个人对话式查询洞察，并通过定时任务监控 VOC 数据、自动产出报告。',
      en: 'Using a Multi-Agent approach with Spec/RPAC, I broke the end-to-end VOC flow from raw data to attribution reports into executable insight tasks and designed a three-tier Agent architecture: PA (process agent), AA (activity agent) and CA (checking agent). The result turns scattered, raw VOC data into business insight reports that carry attribution, severity levels and built-in checks. I then packaged the VOC Insight Agent as a Feishu bot, so anyone can query insights in conversation, with scheduled jobs monitoring VOC data and generating reports automatically.',
    },
    outcomes: {
      zh: [
        '报告变为有归因、有分级、有行动建议，跨团队对齐成本下降',
        '洞察进入飞书日常工作流：对话即查、定时自动出报，使用门槛与跟进成本显著降低',
      ],
      en: [
        'Reports now carry attribution, severity levels and recommended actions, cutting the cost of cross-team alignment',
        'Insights live inside the Feishu daily workflow: ask in chat, get scheduled reports, with a much lower barrier to use and to follow up',
      ],
    },
    tags: ['Multi-Agent', 'Spec', 'RPAC', 'IM通信', '定时任务'],
  },
  {
    id: 'bees',
    name: {
      zh: 'VOC 数据平台',
      en: 'VOC Data Platform',
    },
    summary: {
      zh: '以 Vibe Coding 主导完成 VOC 数据平台从 0 到 1 建设，覆盖数据展示、数据监控、归因分析、问题分发与问题闭环全链路；以用户最佳体验为中心设计 BI 图表展示，让业务用户看得懂、找得到、能行动，并推动闭环结果回流打标与模型，形成“反馈—归因—分发—解决—再训练”的数据飞轮。',
      en: 'Led the VOC Data Platform from 0 to 1 through Vibe Coding, covering the full chain of data display, data monitoring, attribution analysis, issue routing and issue closure. The BI charts are designed around the best possible user experience, so business users can read them, find what matters and act on it. Closed-loop outcomes feed back into labeling and models, forming a data flywheel from feedback to attribution, routing, resolution and retraining.',
    },
    outcomes: {
      zh: [
        'VOC 从“看过”变为可追因、可分发、可闭环、可回流',
        '人工二次对齐减少，问题闭环效率与洞察复用率同步提升',
      ],
      en: [
        'VOC moved from being noticed to being traceable, routable, closable and feedable back into the system',
        'Less manual re-alignment, with higher issue closure efficiency and better insight reuse',
      ],
    },
    tags: ['Vibe Coding', 'BI 图表', '数据监控', '归因分析'],
  },
  {
    id: 'bec',
    name: {
      zh: '用研方法论 Skill 化',
      en: 'Turning Research Methodology into Skills',
    },
    summary: {
      zh: '负责用研业务中“用户最佳体验目录”创建场景的方法论与流程 Skill 化：将 PRD 提炼、场景拆解、用户洞察归纳、内外部最佳实践沉淀等关键流程拆成可组合、可检索、可执行的 Skill，而非停留在一次性文档或专家经验中；通过流程编排，让目录创建方法业务团队可复用、Agent 可调用执行，并持续迭代校准。',
      en: 'Owned the methodology and process work behind turning the Best User Experience Catalog creation into Skills: key steps such as PRD distillation, scenario breakdown, user insight synthesis and the capture of internal and external best practices became composable, searchable, executable Skills instead of one-off documents or expert know-how. Through orchestration, business teams can reuse the catalog method and Agents can call and execute it, with continuous iteration and calibration.',
    },
    outcomes: {
      zh: [
        '用研经验从个人能力变为可调用、可复用的组织能力资产',
        '新人上手成本下降，跨团队复用效率提升，目录迭代更可持续',
      ],
      en: [
        'Research know-how turned from individual skill into callable, reusable organizational assets',
        'Lower onboarding cost, faster cross-team reuse and a more sustainable catalog iteration cycle',
      ],
    },
    tags: ['Skill 能力化', 'Skill 调优'],
  },
  {
    id: 'voc-labeling',
    name: {
      zh: 'VOC 数据打标 workflow',
      en: 'VOC Data Labeling Workflow',
    },
    summary: {
      zh: '基于 Dify Workflow 搭建 VOC 打标流水线，建立标签体系、金标集与 Bad Case Eval 机制，持续校准标签质量。判断打标价值不在“打完一批数据”，而在标签一致、可量化、可回流；Bad Case 回流改规则与模型，让下游归因、洞察和闭环有可信数据底座。',
      en: 'Built a VOC labeling pipeline on Dify Workflow, with a taxonomy, a golden set and a Bad Case Eval loop to keep label quality calibrated. The value of labeling is not finishing another batch of data: it is consistent, measurable labels that flow back into the system. Bad cases feed back into rules and models, giving downstream attribution, insight and closure a trustworthy data foundation.',
    },
    outcomes: {
      zh: [
        '标签一致性提升，人工复核成本下降',
        '下游归因与洞察更可信，误判与返工减少',
      ],
      en: [
        'Higher label consistency, lower manual review cost',
        'More reliable downstream attribution and insight, with fewer misjudgments and less rework',
      ],
    },
    tags: ['Dify Workflow', '金标集', 'Bad Case Eval'],
  },
];

/**
 * 仅中文标签的非中文写法。
 *
 * `tags` 仍以中文原样保留（渲染时无需改动）；需要在英文页本地化标签时，
 * 按标签文本在这里查表替换，查不到则原样展示（Harness / MCP / Skill 等本就通用）。
 */
export const tagLabels: Record<string, Localized> = {
  IM通信: { zh: 'IM通信', en: 'IM Messaging' },
  定时任务: { zh: '定时任务', en: 'Scheduled Jobs' },
  'BI 图表': { zh: 'BI 图表', en: 'BI Dashboards' },
  数据监控: { zh: '数据监控', en: 'Data Monitoring' },
  归因分析: { zh: '归因分析', en: 'Attribution Analysis' },
  'Skill 能力化': { zh: 'Skill 能力化', en: 'Skill Productization' },
  'Skill 调优': { zh: 'Skill 调优', en: 'Skill Tuning' },
  金标集: { zh: '金标集', en: 'Golden Set' },
};

/** 取标签在指定语言下的写法；没有映射时返回原文。 */
export function localizeTag(tag: string, locale: 'zh' | 'en'): string {
  if (locale === 'zh') return tag;
  return tagLabels[tag]?.en ?? tag;
}
