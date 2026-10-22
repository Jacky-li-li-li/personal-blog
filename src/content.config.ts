import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const todayInSiteTime = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

const notes = defineCollection({
  // 只读取 notes 根目录下的 Markdown；_drafts/ 子目录天然被排除。
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().trim().min(1).max(60),
    date: z.coerce.date().refine(
      (date) => date.toISOString().slice(0, 10) <= todayInSiteTime(),
      { message: 'date 不能晚于今天（按 Asia/Shanghai 日期比较）' },
    ),
    summary: z.string().trim().min(20).max(120),
    tags: z.array(z.string().trim().min(1)).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { notes };
