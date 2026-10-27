import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/types';

/** 原始内容条目：中文原文或英文译文，都是一个独立 Markdown 文件。 */
export type RawNote = CollectionEntry<'notes'>;

/**
 * 英文译文的标识：looking-back.en.md ↔ looking-back.md。
 *
 * 注意 Astro 的 glob loader 会把 `foo.en.md` 的 id 算成 `foo`（把 `.en` 当作
 * 复合扩展名吃掉），所以这里以**文件名**为准判断译文，id 只用于路由。
 */
const EN_FILE_RE = /\.en\.(md|mdx)$/i;

/** 条目的文件名（id 可能已丢掉 .en 后缀，不能用来判断语言）。 */
function noteFileName(note: RawNote): string {
  return note.filePath?.split('/').pop() ?? note.id;
}

/** 路由用的 slug：去掉扩展名与 `.en` 后缀，中英文共用一个 slug。 */
export function getNoteSlug(note: RawNote): string {
  return noteFileName(note)
    .replace(EN_FILE_RE, '')
    .replace(/\.(md|mdx)$/i, '');
}

/** 条目是否为英文译文。 */
export function isTranslation(note: RawNote): boolean {
  return EN_FILE_RE.test(noteFileName(note));
}

/**
 * 单个语言下的笔记视图。
 *
 * 标题、摘要与正文放在同一个对象里，页面和组件只消费这一层。
 * 英文没有译文时回退中文原文，`translated` 为 false。
 */
export type Note = {
  /** URL slug，来自文件名。 */
  id: string;
  locale: Locale;
  title: string;
  summary: string;
  date: Date;
  updated?: Date;
  tags: string[];
  draft: boolean;
  /** 用于渲染正文的条目（中文原文，或英文译文条目）。 */
  entry: RawNote;
  /** 是否存在当前语言的译文（中文恒为 true）。 */
  translated: boolean;
};

/**
 * 生产构建排除 draft，开发环境保留，方便本地预览草稿。
 * 日期倒序；日期相同则按标题排序，保证构建结果稳定。
 */
export async function getPublishedNotes(): Promise<RawNote[]> {
  const notes = await getCollection('notes', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return notes.sort((a, b) => {
    const aDate = a.data.date?.getTime() ?? Number.POSITIVE_INFINITY;
    const bDate = b.data.date?.getTime() ?? Number.POSITIVE_INFINITY;
    return bDate - aDate;
  });
}

/**
 * 把中文原文与同名英文译文配成对；没有中文原文的孤译条目直接忽略
 * （译文单独存在时无处承载日期与草稿状态）。
 */
function pairNotes(notes: RawNote[]): Map<string, NotePair> {
  const pairs = new Map<string, NotePair>();

  for (const note of notes) {
    const slug = getNoteSlug(note);
    const pair = pairs.get(slug) ?? ({ id: slug } as NotePair);

    if (isTranslation(note)) pair.en = note;
    else pair.zh = note;

    pairs.set(slug, pair);
  }

  for (const [slug, pair] of pairs) {
    if (!pair.zh) pairs.delete(slug);
  }
  return pairs;
}

/** 一对条目（中文原文 + 可选英文译文）；路由与视图都从它是出发。 */
export type NotePair = { id: string; zh: RawNote; en?: RawNote };

/** 把一对条目投影成指定语言的阅读视图，供页面直接调用。 */
export function toNoteView(pair: NotePair, locale: Locale): Note {
  const source = pair.zh;
  const translation = pair.en;
  const id = getNoteSlug(source);
  // 日期以中文原文为准；原文缺日期时才退回译文。
  const date = source.data.date ?? translation?.data.date ?? new Date(0);

  if (locale === 'en' && translation) {
    return {
      id,
      locale,
      title: translation.data.title,
      summary: translation.data.summary,
      date,
      updated: translation.data.updated ?? source.data.updated,
      tags: translation.data.tags.length > 0 ? translation.data.tags : source.data.tags,
      draft: source.data.draft,
      entry: translation,
      translated: true,
    };
  }

  return {
    id,
    locale,
    title: source.data.title,
    summary: source.data.summary,
    date,
    updated: source.data.updated,
    tags: source.data.tags,
    draft: source.data.draft,
    entry: source,
    translated: locale === 'zh',
  };
}

/** 当前语言下的笔记视图列表，已按日期倒序。 */
export async function getNotesForLocale(locale: Locale): Promise<Note[]> {
  const notes = await getPublishedNotes();
  const pairs = [...pairNotes(notes).values()];
  const views = pairs.map((pair) => toNoteView(pair, locale));

  return views.sort((a, b) => {
    const byDate = b.date.getTime() - a.date.getTime();
    if (byDate !== 0) return byDate;
    return a.title.localeCompare(b.title, locale === 'zh' ? 'zh-CN' : 'en');
  });
}

/** 单个语言下的一篇笔记；不存在时返回 undefined（用于生成路由）。 */
export async function getNoteForLocale(slug: string, locale: Locale): Promise<Note | undefined> {
  const notes = await getNotesForLocale(locale);
  return notes.find((note) => note.id === slug);
}

/** 全部有中文原文的笔记（两种语言）；路由据此生成静态页面。 */
export async function getNotePairs(): Promise<NotePair[]> {
  const notes = await getPublishedNotes();

  return [...pairNotes(notes).entries()].map(([id, pair]) => ({ id, zh: pair.zh, en: pair.en }));
}

export type NoteYearGroup = {
  year: number;
  notes: Note[];
};

export function groupNotesByYear(notes: Note[]): NoteYearGroup[] {
  const groups = new Map<number, NoteYearGroup>();

  for (const note of notes) {
    const year = note.date.getUTCFullYear();
    const bucket = groups.get(year) ?? { year, notes: [] };
    bucket.notes.push(note);
    groups.set(year, bucket);
  }

  return [...groups.values()].sort((a, b) => b.year - a.year);
}
