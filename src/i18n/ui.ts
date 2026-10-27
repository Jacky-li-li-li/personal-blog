/**
 * 界面文案字典。
 *
 * 只放「界面」（导航、按钮、标签、空状态、无障碍文案）这类短句，
 * 不放正文内容——个人简介、经历、项目、笔记在各自的 data / content 里维护。
 *
 * 命名约定：
 * - 嵌套对象直接按语义分组；数组必须两语言等长且顺序一致。
 * - 需要插入变量的文案写成函数，例如 `views: (n) => ...`，
 *   避免在组件里拼接中英文片段。
 * - 文案以中文为源，英文是翻译；改中文时记得同步英文。
 */
import type { Locale } from './types';

type UiStrings = {
  nav: {
    /** 主导航与页脚的无障碍标签。 */
    ariaLabel: string;
    /** 跳转链接。 */
    about: string;
    work: string;
    notes: string;
  };
  /**
   * 语言切换按钮：显示「另一门语言」的代码（EN / CN），点击切换过去。
   * 用代码而不是语言全名，是为了两侧按钮宽度一致、导航不因语言变化而位移。
   */
  language: {
    switchTo: string;
    switchAria: string;
    /** 语言自身名称，用于 <html lang> 提示与 hreflang 标签。 */
    currentName: string;
    otherName: string;
  };
  theme: {
    toggleAria: string;
    toLight: string;
    toDark: string;
  };
  skipLink: string;
  /** 首页 / About 的 Hero 区块。 */
  hero: {
    avatarAlt: string;
    socialsAria: string;
    externalHint: string;
    tagsAria: string;
    /** 社交链接的可读名称（按钮上只有图标）。 */
    socialLabels: Record<'github' | 'mail' | 'x' | 'feishu', string>;
  };
  gates: {
    ariaLabel: string;
    notes: string;
    work: string;
  };
  about: {
    title: string;
    description: string;
    /** 首页叠卡之外的「前往」提示，暂时只用于段落级标签。 */
  };
  work: {
    title: string;
    label: string;
    heading: string;
    lede: string;
    description: string;
    /** 经历模块。 */
    experienceLabel: string;
    present: string;
    /** org 是公司名，有 logo 时只作为替代文本，不会在视觉上出现。 */
    jumpTo: (org: string) => string;
    companySite: (org: string) => string;
    honors: string;
    representativeProjects: (count: number) => string;
    selectedWork: string;
    projectCount: (count: number) => string;
    /** 项目卡片。 */
    projectTagsAria: string;
    projectOutcomesAria: string;
    viewCase: string;
    externalHint: string;
  };
  notes: {
    title: string;
    label: string;
    /**
     * 列表页大标题，分两段：桌面端同一行显示，窄屏在第二段前断行。
     * `headingGap` 是两段之间的空白——中文标点本身留白，英文需要在逗号后补一个空格。
     */
    heading: string;
    headingSecondLine: string;
    headingGap: string;
    description: string;
    empty: string;
    backLink: string;
    readingTime: (minutes: number) => string;
    views: (count: number) => string;
  };
  notFound: {
    title: string;
    heading: string;
    body: string;
    back: string;
  };
  footer: {
    socialsAria: string;
    externalHint: string;
  };
  rss: {
    titleSuffix: string;
  };
};

const ZH: UiStrings = {
  nav: {
    ariaLabel: '主导航',
    about: 'About',
    work: 'Work',
    notes: 'Notes',
  },
  language: {
    switchTo: 'EN',
    switchAria: '切换到英文',
    currentName: '中文',
    otherName: 'English',
  },
  theme: {
    toggleAria: '切换深浅色',
    toLight: '切换到浅色模式',
    toDark: '切换到深色模式',
  },
  skipLink: '跳到主要内容',
  hero: {
    avatarAlt: 'Jacky Li 的插画头像',
    socialsAria: '联系方式',
    externalHint: '（新窗口打开）',
    tagsAria: '身份标签',
    socialLabels: {
      github: 'GitHub',
      mail: 'Email',
      x: 'X',
      feishu: '飞书',
    },
  },
  gates: {
    ariaLabel: '前往经历与笔记',
    notes: 'Notes',
    work: 'Work',
  },
  about: {
    title: 'About',
    description:
      '李连硕（Jacky Li），AI 产品经理。2024 年加入安克创新，负责体验域 AI 产品从 0 到 1：虚拟用户访谈、VOC 洞察 Agent、BEES 体验数据系统与 BEC 最佳体验目录。',
  },
  work: {
    title: 'Work',
    label: 'Work',
    heading: '经历',
    lede: '从用户最佳体验出发，把 AI 做成真正可用的产品。',
    description:
      '李连硕（Jacky Li）的工作经历与代表项目：虚拟用户访谈 Agent 平台、VOC 洞察、BEES、BEC Skill 化与 VOC 打标。',
    experienceLabel: 'Experience',
    present: '现在',
    jumpTo: (org) => `跳到 ${org} 的经历`,
    companySite: (org) => `${org} 官网`,
    honors: 'Honors',
    representativeProjects: (count) => `${count} 个代表项目`,
    selectedWork: 'Selected Work',
    projectCount: (count) => `${count} 个项目`,
    projectTagsAria: '项目类型',
    projectOutcomesAria: '项目成果',
    viewCase: '查看案例',
    externalHint: '（新窗口打开）',
  },
  notes: {
    title: 'Notes',
    label: 'Notes',
    heading: '想到什么，',
    headingSecondLine: '写点什么。',
    headingGap: '',
    description: '不定期更新。关于 AI 产品、工具，以及一些还没有结论的想法。',
    empty: '第一篇还在路上。',
    backLink: 'Notes',
    readingTime: (minutes) => `${minutes} 分钟`,
    views: (count) => `${count} 次阅读`,
  },
  notFound: {
    title: '页面不存在',
    heading: '这一页不存在',
    body: '可能是链接过期了，或者页面已经搬走。',
    back: '返回首页',
  },
  footer: {
    socialsAria: '联系方式（页脚）',
    externalHint: '（新窗口打开）',
  },
  rss: {
    titleSuffix: 'Notes',
  },
};

const EN: UiStrings = {
  nav: {
    ariaLabel: 'Main navigation',
    about: 'About',
    work: 'Work',
    notes: 'Notes',
  },
  language: {
    // 与中文页对称：两侧都显示目标语言的两字母代码，视觉上固定宽度、不跳动。
    switchTo: 'CN',
    switchAria: 'Switch to Chinese',
    currentName: 'English',
    otherName: '中文',
  },
  theme: {
    toggleAria: 'Toggle dark mode',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
  },
  skipLink: 'Skip to content',
  hero: {
    avatarAlt: 'Illustrated portrait of Jacky Li',
    socialsAria: 'Contact',
    externalHint: ' (opens in a new tab)',
    tagsAria: 'Identity tags',
    socialLabels: {
      github: 'GitHub',
      mail: 'Email',
      x: 'X',
      feishu: 'Feishu',
    },
  },
  gates: {
    ariaLabel: 'Go to work and notes',
    notes: 'Notes',
    work: 'Work',
  },
  about: {
    title: 'About',
    description:
      'Lianshuo Li (Jacky Li) is an AI product manager. He joined Anker Innovations in 2024 and has led experience-domain AI products from zero to one: virtual user interviews, a VOC insight agent, the BEES experience data system and the BEC best-experience catalogue.',
  },
  work: {
    title: 'Work',
    label: 'Work',
    heading: 'Experience',
    lede: 'Turning AI into products people can actually use, starting from the best possible user experience.',
    description:
      'Work history and selected projects of Lianshuo Li (Jacky Li): a virtual user interview agent platform, VOC insights, BEES, BEC skill-ification and VOC labelling.',
    experienceLabel: 'Experience',
    present: 'Present',
    jumpTo: (org) => `Jump to experience at ${org}`,
    companySite: (org) => `${org} website`,
    honors: 'Honors',
    representativeProjects: (count) => `${count} selected ${count === 1 ? 'project' : 'projects'}`,
    selectedWork: 'Selected Work',
    projectCount: (count) => `${count} ${count === 1 ? 'project' : 'projects'}`,
    projectTagsAria: 'Project type',
    projectOutcomesAria: 'Project outcomes',
    viewCase: 'View case',
    externalHint: ' (opens in a new tab)',
  },
  notes: {
    title: 'Notes',
    label: 'Notes',
    heading: 'Thinking out loud,',
    headingSecondLine: 'one note at a time.',
    headingGap: ' ',
    description: 'Published irregularly. On AI products, tools, and ideas that have not settled yet.',
    empty: 'The first note is on its way.',
    backLink: 'Notes',
    readingTime: (minutes) => `${minutes} min read`,
    views: (count) => `${count} ${count === 1 ? 'view' : 'views'}`,
  },
  notFound: {
    title: 'Page not found',
    heading: 'This page does not exist',
    body: 'The link may have expired, or the page has moved.',
    back: 'Back to home',
  },
  footer: {
    socialsAria: 'Contact (footer)',
    externalHint: ' (opens in a new tab)',
  },
  rss: {
    titleSuffix: 'Notes',
  },
};

const DICTIONARIES: Record<Locale, UiStrings> = { zh: ZH, en: EN };

export type { UiStrings };

/** 取当前语言的界面文案。 */
export function getUi(locale: Locale): UiStrings {
  return DICTIONARIES[locale];
}
