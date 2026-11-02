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
      zh: '面向真实用研任务：搭建多场景、多用户、可协作、可编排的虚拟用户访谈 Harness，用 pi SDK + Skill/MCP 跑访谈与洞察，在关键 checkpoint 保留决策 Owner 人工校准——把一次性访谈做成可复用的用户洞察能力，并练出对异常回答与失败边界的嗅觉。',
      en: 'Built for real research tasks: a multi-scenario, multi-persona, collaborative virtual user interview Harness. Interviews and insight synthesis run on the pi SDK with Skills and MCP, while decision owners stay in the loop at key checkpoints — turning one-off interviews into a reusable user-insight capability, and sharpening the nose for odd answers and failure boundaries.',
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
      zh: '把「用户最佳体验目录」创建从专家经验拆成可组合、可检索、可执行的 Skill：覆盖 PRD 提炼、场景拆解、用户洞察归纳、内外部最佳实践沉淀；通过流程编排让业务团队可复用、Agent 可调用，并持续校准——用结构化方法定义「什么体验值得做、做到什么算好」。',
      en: 'Turned Best User Experience Catalog creation from expert know-how into composable, searchable, executable Skills — covering PRD distillation, scenario breakdown, user-insight synthesis and capture of internal and external best practices. Orchestration lets business teams reuse the method and Agents call it, with ongoing calibration — a structured way to define which experiences are worth building and what "good" looks like.',
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
    id: 'bees',
    name: {
      zh: 'VOC 数据平台',
      en: 'VOC Data Platform',
    },
    summary: {
      zh: '以 Vibe Coding 主导从 0 到 1 建成 VOC 数据平台，覆盖展示、监控、归因、分发与闭环；以用户能看懂、找得到、能行动为体验目标设计 BI，并推动闭环结果回流打标与模型，形成「反馈—归因—分发—解决—再训练」飞轮——用数据和原型把问题拆开、门槛压低。',
      en: 'Led the VOC Data Platform from 0 to 1 with Vibe Coding — display, monitoring, attribution, routing and closure. BI charts are designed so business users can read them, find what matters and act. Closed-loop outcomes feed labeling and models, forming a flywheel from feedback to attribution, routing, resolution and retraining — using data and prototypes to break problems down and lower the barrier.',
    },
    outcomes: {
      zh: [
        'VOC 从「看过」变为可追因、可分发、可闭环、可回流',
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
    id: 'voc-agent',
    name: {
      zh: 'VOC 洞察 Agent 助手',
      en: 'VOC Insight Agent Assistant',
    },
    summary: {
      zh: '用 Multi-Agent + Spec/RPAC 把 VOC 从原始数据到归因报告拆成可执行洞察任务，设计 PA / AA / CA 三级架构；再场景化为飞书机器人，支持对话式查询与定时出报——让一线用户和业务同学直接用得上，把冰冷数据变成有归因、有分级、可校验的行动建议。',
      en: 'With Multi-Agent plus Spec/RPAC, I broke VOC from raw data to attribution reports into executable insight tasks and designed a PA / AA / CA three-tier architecture; then shipped it as a Feishu bot for conversational queries and scheduled reports — so frontline users and business teammates can use it directly, turning cold data into attributed, severity-ranked, checkable recommendations.',
    },
    outcomes: {
      zh: [
        '报告带归因、分级与行动建议，跨团队对齐成本下降',
        '洞察进入飞书日常工作流：对话即查、定时自动出报，使用门槛与跟进成本显著降低',
      ],
      en: [
        'Reports carry attribution, severity and recommended actions, cutting cross-team alignment cost',
        'Insights live in the Feishu daily workflow: ask in chat, get scheduled reports — much lower barrier to use and follow-up',
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
      zh: '基于 Dify Workflow 搭建 VOC 打标流水线，建立标签体系、金标集与 Bad Case Eval：价值不在「打完一批」，而在标签一致、可量化、可回流；Bad Case 改规则与模型，让下游归因和洞察有可信底座——用评测定义「AI 是否真的帮到人」。',
      en: 'Built a VOC labeling pipeline on Dify Workflow with a taxonomy, golden set and Bad Case Eval. The point is not finishing another batch: it is consistent, measurable labels that flow back. Bad cases revise rules and models so downstream attribution and insight stand on trustworthy data — evaluation that asks whether AI is actually helping people.',
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
