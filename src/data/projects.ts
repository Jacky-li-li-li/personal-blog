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
 *
 * 排序约定（用户产品叙事）：用户洞察 → 定义方法 → 落地平台 → 降门槛采用 → 评测闭环。
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
      zh: '从真实用研任务切入做用户洞察产品：先看访谈怎么跑、哪里卡、决策卡在哪，再搭多场景、多用户、可协作的虚拟访谈 Harness（pi SDK + Skill/MCP）；关键 checkpoint 留决策 Owner 人工校准，盯异常回答与失败边界——把一次性访谈做成可复用洞察能力，也练出对 Agent 访谈失真的嗅觉。',
      en: 'Started from real research tasks as a user-insight product: watched how interviews run, where they stall and where decisions stick, then built a multi-scenario, multi-persona collaborative virtual interview Harness on the pi SDK with Skills and MCP. Decision owners stay in the loop at key checkpoints, watching odd answers and failure boundaries — turning one-off interviews into a reusable insight capability, and sharpening judgment on when Agent interviews go off the rails.',
    },
    outcomes: {
      zh: [
        '访谈从一次性项目变为可复用研究能力，洞察可沉淀、可复用',
        '关键判断保留人工校准，决策质量可控，异常分支可回放',
      ],
      en: [
        'Interviews shifted from one-off projects to a reusable research capability, with insights captured and reused',
        'Key judgments keep human calibration, so decision quality stays controlled and edge cases can be replayed',
      ],
    },
    tags: ['Harness', 'pi SDK', 'Skill', 'MCP', 'Checkpoint', 'Human-in-the-loop'],
    previews: [
      '/images/virtual-interview-home.jpg',
      '/images/virtual-interview-report.jpg',
    ],
  },
  {
    id: 'bec',
    name: {
      zh: '用研方法论 Skill 化',
      en: 'Turning Research Methodology into Skills',
    },
    summary: {
      zh: '把「用户最佳体验目录」从专家经验拆成可组合、可检索、可执行的 Skill（PRD 提炼、场景拆解、洞察归纳、最佳实践沉淀），让业务团队和 Agent 共用一套方法判断「什么体验值得做、做到什么算好」——把场景优先级与体验验收写进可调用流程，也把用研门槛压低到可复用、可校准。',
      en: 'Turned Best User Experience Catalog creation from expert know-how into composable, searchable, executable Skills — PRD distillation, scenario breakdown, insight synthesis, best-practice capture — so business teams and Agents share one method for deciding which experiences are worth building and what "good" looks like. Scenario priority and experience acceptance criteria land in callable workflows, and the research barrier drops to something reusable and calibratable.',
    },
    outcomes: {
      zh: [
        '用研经验从个人能力变为可调用、可复用的组织能力资产',
        '新人上手门槛下降，跨团队复用更顺，目录迭代更可持续',
      ],
      en: [
        'Research know-how turned from individual skill into callable, reusable organizational assets',
        'Lower onboarding barrier, smoother cross-team reuse and a more sustainable catalog iteration cycle',
      ],
    },
    tags: ['Skill 能力化', 'Skill 调优'],
  },
  {
    id: 'bees',
    name: {
      zh: 'VOC 数据平台',
      en: 'VOC Data Platform',
    },
    summary: {
      zh: '以 Vibe Coding 从 0 到 1 落地 VOC 数据平台（展示、监控、归因、分发、闭环），围绕业务用户「看得懂、找得到、能行动」做 BI 与交互；闭环结果回流打标与模型，形成反馈—归因—分发—解决—再训练飞轮——用行为数据与原型把问题拆开、门槛压低，并和工程一起把洞察推进到可行动。',
      en: 'Landed the VOC Data Platform from 0 to 1 with Vibe Coding — display, monitoring, attribution, routing, closure — designing BI and interaction so business users can read it, find what matters and act. Closed-loop outcomes feed labeling and models into a feedback→attribution→routing→resolution→retraining flywheel. Behavior data and prototypes break problems open and lower the barrier, while engineering partnership pushes insight into action.',
    },
    outcomes: {
      zh: [
        'VOC 从「看过」变为可追因、可分发、可闭环、可回流',
        '人工二次对齐减少，问题闭环效率与洞察复用同步提升',
      ],
      en: [
        'VOC moved from being noticed to being traceable, routable, closable and feedable back into the system',
        'Less manual re-alignment, with higher issue-closure efficiency and better insight reuse',
      ],
    },
    tags: ['Vibe Coding', 'BI 图表', '数据监控', '归因分析'],
  },
  {
    id: 'voc-agent',
    name: {
      zh: 'VOC 洞察 Agent 助手',
      en: 'VOC Insight Agent Assistant',
    },
    summary: {
      zh: '面向一线「查洞察、跟问题」的真实任务，用 Multi-Agent + Spec/RPAC 把 VOC 从原始数据到归因报告拆成可执行洞察任务（PA / AA / CA），再场景化为飞书对话机器人与定时出报——让业务同学在日常工作流里直接用得上，把冰冷数据变成有归因、有分级、可校验的行动建议，持续压低采用门槛。',
      en: 'Aimed at the real frontline job of looking up insights and following issues: with Multi-Agent plus Spec/RPAC I broke VOC from raw data to attribution reports into executable insight tasks (PA / AA / CA), then shipped it as a Feishu conversational bot with scheduled reports — so business teammates can use it inside their daily workflow, turning cold data into attributed, severity-ranked, checkable recommendations and steadily lowering the adoption barrier.',
    },
    outcomes: {
      zh: [
        '报告带归因、分级与行动建议，跨团队对齐成本下降',
        '洞察进入飞书日常工作流：对话即查、定时自动出报，采用门槛与跟进成本显著降低',
      ],
      en: [
        'Reports carry attribution, severity and recommended actions, cutting cross-team alignment cost',
        'Insights live in the Feishu daily workflow: ask in chat, get scheduled reports — much lower adoption barrier and follow-up cost',
      ],
    },
    tags: ['Multi-Agent', 'Spec', 'RPAC', 'IM通信', '定时任务'],
  },
  {
    id: 'voc-labeling',
    name: {
      zh: 'VOC 数据打标 workflow',
      en: 'VOC Data Labeling Workflow',
    },
    summary: {
      zh: '基于 Dify Workflow 搭 VOC 打标流水线，建标签体系、金标集与 Bad Case Eval：用一致、可量化、可回流的标签定义下游归因与洞察的可信度；Bad Case 改规则与模型——把评测当成产品验收，回答「AI 是否在更多场景更深入地帮到人」，而不是「又打完一批」。',
      en: 'Built a VOC labeling pipeline on Dify Workflow with a taxonomy, golden set and Bad Case Eval: consistent, measurable, feed-back labels define how trustworthy downstream attribution and insight can be. Bad cases revise rules and models — treating evaluation as product acceptance that asks whether AI is helping people more deeply across more scenarios, not whether another batch got labeled.',
    },
    outcomes: {
      zh: [
        '标签一致性提升，人工复核成本下降',
        '下游归因与洞察更可信，误判与返工减少，评测结果可回流改进',
      ],
      en: [
        'Higher label consistency, lower manual review cost',
        'More reliable downstream attribution and insight, fewer misjudgments and less rework, with eval results feeding improvement',
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
