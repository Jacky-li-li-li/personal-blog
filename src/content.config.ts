import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const todayInSiteTime = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

/**
 * 笔记集合：中英文各是一个独立 Markdown 条目，英文文件名带 `.en` 后缀。
 *
 *   src/content/notes/looking-back.md      中文原文（slug: looking-back）
 *   src/content/notes/looking-back.en.md   英文译文（同属 slug: looking-back）
 *
 * 为什么不用一个文件装两段正文：Astro 5 的 content collections 只能渲染条目自身的
 * 正文，没有「把一段字符串当 Markdown 渲染」的公开 API。拆成两个条目后两种语言都走
 * 同一条渲染路径，代码最少，校验也最直接。
 *
 * 日期以中文原文为准；译文可以省略 date（构建时继承原文），避免两处重复维护。
 */
const notes = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().trim().min(1).max(80),
    /** 译文的 date 可省略：由同 slug 的中文条目补齐。 */
    date: z
      .coerce
      .date()
      .refine((date) => date.toISOString().slice(0, 10) <= todayInSiteTime(), {
        message: 'date 不能晚于今天（按 Asia/Shanghai 日期比较）',
      })
      .optional(),
    summary: z.string().trim().min(20).max(160),
    tags: z.array(z.string().trim().min(1)).default([]),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { notes };
