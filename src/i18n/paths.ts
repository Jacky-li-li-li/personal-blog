/**
 * 语言与路径的换算。
 *
 * 中文是默认语言，放在站点根路径；英文统一挂在 `/en` 下。
 * 所有页面在页面级 props 里带上 `locale`，同一份路径工具同时服务于
 * 站内链接、hreflang alternates 与语言切换按钮。
 */
import { DEFAULT_LOCALE, type Locale } from './types';

/** 英文前缀；集中一处便于将来改语言或加第三语言。 */
export const EN_PREFIX = '/en';

/** 各语言的 html lang / og:locale / JSON-LD inLanguage。 */
export const HTML_LANG: Record<Locale, string> = {
  zh: 'zh-CN',
  en: 'en',
};

export const OG_LOCALE: Record<Locale, string> = {
  zh: 'zh_CN',
  en: 'en_US',
};

/** 英文页面统一用长破折号连接月份与年份，日期格式细节在 utils/date.ts。 */
export const LOCALE_PATHNAME_STRIP = /^\/en(?=\/|$)/;

/** 把当前 locale 的站内路径翻译成目标 locale 的等价路径。 */
export function localizePath(path: string, locale: Locale): string {
  const clean = normalizePath(path);
  const bare = toRootPath(clean);

  if (locale === DEFAULT_LOCALE) return bare;
  return bare === '/' ? EN_PREFIX : `${EN_PREFIX}${bare}`;
}

/** 从 URL 的 pathname 判断当前语言（`/en` 前缀即英文）。 */
export function getLocaleFromPath(pathname: string): Locale {
  return LOCALE_PATHNAME_STRIP.test(pathname) ? 'en' : DEFAULT_LOCALE;
}

/** 去掉语言前缀后的根路径，用于和中文页互相对应。 */
export function toRootPath(path: string): string {
  const clean = normalizePath(path).replace(LOCALE_PATHNAME_STRIP, '');
  return clean === '' ? '/' : clean;
}

/** 去掉 .html 尾缀（build.format = 'file'）并补上前导斜杠，不保留尾斜杠。 */
export function normalizePath(path: string): string {
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  const withoutHtml = withSlash.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  // 查询串与哈希不参与路径比较。
  const bare = withoutHtml.split(/[?#]/)[0];
  if (bare === '/') return '/';
  return bare.replace(/\/+$/, '');
}

/** 目标语言下同一页面的路径。 */
export function alternatePath(pathname: string, locale: Locale): string {
  return localizePath(toRootPath(pathname === '/index.html' ? '/' : pathname), locale);
}
