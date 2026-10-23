import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getNoteSlug, getPublishedNotes } from '../utils/notes';

export async function GET(context: APIContext) {
  const notes = await getPublishedNotes();
  const baseUrl = context.site ?? new URL(site.siteUrl);

  return rss({
    title: `${site.name} · Notes`,
    description: site.description,
    site: baseUrl,
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      description: note.data.summary,
      link: `/notes/${getNoteSlug(note)}`,
      author: `${site.email} (${site.name})`,
      categories: note.data.tags,
    })),
    customData: '<language>zh-CN</language>',
  });
}
