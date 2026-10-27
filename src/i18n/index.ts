/**
 * i18n 入口：项目规模的轻量实现，不引入框架。
 *
 * 用法：
 * - 页面在 props 里给出 `locale`，布局再传给所有组件；组件内 `getUI(locale)` 取文案。
 * - 需要在 `set:html` 里渲染富文本（<strong> 等）时直接 `set:html={site.intro[locale]}`：
 *   双语数据都是带索引访问的常量，Astro 能推断出 string 类型，不需要额外指令。
 * - 需要在页面内联脚本里使用文案、却不想用 `define:vars`（Astro 会把它序列化成
 *   `JSON.parse('...')`，正则里的反斜杠会被浏览器自动转义机制吃掉）时，
 *   用 `clientText()` 安全地写进 `data-*` 属性，脚本再读取。
 */
import { getUi } from './ui';

export { HTML_LANG, OG_LOCALE, alternatePath, getLocaleFromPath, localizePath, toRootPath } from './paths';
export { LOCALES, DEFAULT_LOCALE, isLocale, pick } from './types';
export type { Locale, Localized, SecondaryLocale } from './types';
export type { UiStrings } from './ui';
export { getUi };

/** `getUI(locale)` 的别名，组件里更顺手。 */
export const getUI = getUi;

function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * 把文案安全地写进 HTML 属性，供内联脚本读取。
 * 输出的是可直接 `set:html` 的属性串：`<button {...clientText('aria-label', label)}>`。
 */
export function clientText(attribute: string, value: string): string {
  return `${attribute}="${escapeAttribute(value)}"`;
}

