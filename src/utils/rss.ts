/**
 * RSS 工厂：中英各一份（/rss.xml 与 /en/rss.xml）。
 *
 * 两条路由共用这里，只在语言与站内链接前缀上不同。
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getNotesForLocale } from './notes';
import { getUI, localizePath } from '../i18n';
import type { Locale } from '../i18n/types';

export async function buildFeed(context: APIContext, locale: Locale) {
  const notes = await getNotesForLocale(locale);
  const baseUrl = context.site ?? new URL(site.siteUrl);
  const ui = getUI(locale);

  return rss({
    title: `${site.name[locale]} · ${ui.rss.titleSuffix}`,
    description: site.description[locale],
    site: baseUrl,
    // 与站点一致：文章链接不带尾斜杠（canonical 同样是 /notes/slug）。
    trailingSlash: false,
    items: notes.map((note) => ({
      title: note.title,
      pubDate: note.date,
      description: note.summary,
      link: localizePath(`/notes/${note.id}`, locale),
      author: `${site.email} (${site.name[locale]})`,
      categories: note.tags,
    })),
    customData: `<language>${locale === 'zh' ? 'zh-CN' : 'en'}</language>`,
  });
}
