/**
 * 双语内容的公共类型。
 *
 * 站点以中文为默认语言，英文版本挂在 `/en` 前缀下。
 * 所有面向读者、且需要翻译的固定文案都收成 `Localized<T>`，
 * 调用 `t(locale)` 取当前语言的一份；组件不应在 <script> 里拼中英文。
 */
export type Locale = 'zh' | 'en';

/** 非默认语言：访问 `/` 时据此重定向或给出切换入口。 */
export type SecondaryLocale = Exclude<Locale, 'zh'>;

export type Localized<T = string> = Record<Locale, T>;

export const LOCALES: readonly Locale[] = ['zh', 'en'] as const;

export const DEFAULT_LOCALE: Locale = 'zh';

export function isLocale(value: string | undefined): value is Locale {
  return value === 'zh' || value === 'en';
}

/** 取当前语言值，找不到时回退中文。 */
export function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value[DEFAULT_LOCALE];
}
