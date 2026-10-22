/**
 * 工作经历。
 *
 * TODO(M0): 公司、年份和描述均为视觉稿示例，上线前替换为真实经历。
 * 数组顺序就是展示顺序，按时间倒序排列。
 */
export type Experience = {
  start: string;
  end: string | 'present';
  role: string;
  org: string;
  summary: string;
};

export const experiences: Experience[] = [
  {
    start: '2023',
    end: 'present',
    role: '产品负责人',
    org: '栖木科技',
    summary: '负责一款协作工具从 0 到 1，带 6 人小组，完成首个付费版本与设计系统。',
  },
  {
    start: '2021',
    end: '2023',
    role: '高级产品设计师',
    org: '未名工作室',
    summary: '主导工作台改版，把核心任务路径从 5 步压缩到 3 步，次周留存提升 12%。',
  },
  {
    start: '2019',
    end: '2021',
    role: '交互设计师',
    org: '某 SaaS 团队',
    summary: '做 B 端后台与组件规范，维护 40 多个组件的使用文档。',
  },
];
