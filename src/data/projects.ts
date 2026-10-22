/**
 * 个人项目。
 *
 * TODO(M0): 项目名称、描述、外链均为视觉稿示例，上线前替换。
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
    name: 'Look',
    summary: '把书签、摘录和零散想法放进同一个可检索的视图。',
    url: 'https://example.com/look',
    tags: ['产品', 'Astro', '阅读'],
    mark: 'L',
  },
  {
    name: 'Tick',
    summary: '极简的每日习惯打卡，一屏之内完成记录。',
    url: 'https://example.com/tick',
    tags: ['iOS', 'SwiftUI', '习惯'],
    mark: 'T',
  },
];
