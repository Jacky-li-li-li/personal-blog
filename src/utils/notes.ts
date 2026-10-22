import { getCollection, type CollectionEntry } from 'astro:content';

export type Note = CollectionEntry<'notes'>;

/** Content Layer 的 glob loader 用文件名作为 id，这里兼容带扩展名的实现。 */
export function getNoteSlug(note: Note): string {
  return note.id.replace(/\.(md|mdx)$/i, '');
}

/**
 * 生产构建排除 draft，开发环境保留，方便本地预览草稿。
 * 日期倒序；日期相同则按标题排序，保证构建结果稳定。
 */
export async function getPublishedNotes(): Promise<Note[]> {
  const notes = await getCollection('notes', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  return notes.sort((a, b) => {
    const byDate = b.data.date.getTime() - a.data.date.getTime();
    return byDate !== 0 ? byDate : a.data.title.localeCompare(b.data.title, 'zh-CN');
  });
}

export type NoteYearGroup = {
  year: number;
  notes: Note[];
};

export function groupNotesByYear(notes: Note[]): NoteYearGroup[] {
  const groups = new Map<number, Note[]>();

  for (const note of notes) {
    const year = note.data.date.getUTCFullYear();
    const bucket = groups.get(year) ?? [];
    bucket.push(note);
    groups.set(year, bucket);
  }

  return [...groups.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, group]) => ({ year, notes: group }));
}
