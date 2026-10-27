import type { Locale } from '../i18n/types';

const pad = (value: number) => String(value).padStart(2, '0');

const MONTHS_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const MONTHS_EN_SHORT = MONTHS_EN.map((month) => month.slice(0, 3));

/** 中文列表使用的 2026.10.18 格式。日期来自 YAML，统一按 UTC 取，避免时区偏移。 */
export function formatDotDate(date: Date): string {
  return `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(date.getUTCDate())}`;
}

/** 正文元信息日期：中文 2026 年 10 月 18 日，英文 October 18, 2026。 */
export function formatLongDate(date: Date, locale: Locale = 'zh'): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  if (locale === 'en') return `${MONTHS_EN[month]} ${day}, ${year}`;
  return `${year} 年 ${month + 1} 月 ${day} 日`;
}

/**
 * 列表日期：中文沿用 2026.10.18，英文用 Oct 18, 2026。
 * 英文采用短月份，保持列表左侧时间栏的紧凑对齐。
 */
export function formatListDate(date: Date, locale: Locale = 'zh'): string {
  if (locale === 'zh') return formatDotDate(date);
  return `${MONTHS_EN_SHORT[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
}

/** 文末「写于 2026 年 10 月」/ "October 2026"。 */
export function formatMonthYear(date: Date, locale: Locale = 'zh'): string {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();

  if (locale === 'en') return `${MONTHS_EN[month]} ${year}`;
  return `${year} 年 ${month + 1} 月`;
}

/** <time datetime> 与 RSS 使用的 ISO 日期。 */
export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getYear(date: Date): number {
  return date.getUTCFullYear();
}
