const pad = (value: number) => String(value).padStart(2, '0');

/** 列表与首页使用的 2026.10.18 格式。日期来自 YAML，统一按 UTC 取，避免时区偏移。 */
export function formatDotDate(date: Date): string {
  return `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(date.getUTCDate())}`;
}

/** 正文元信息使用的 2026 年 10 月 18 日格式。 */
export function formatLongDate(date: Date): string {
  return `${date.getUTCFullYear()} 年 ${date.getUTCMonth() + 1} 月 ${date.getUTCDate()} 日`;
}

/** 文末「写于 2026 年 10 月」。 */
export function formatMonthYear(date: Date): string {
  return `${date.getUTCFullYear()} 年 ${date.getUTCMonth() + 1} 月`;
}

/** <time datetime> 与 RSS 使用的 ISO 日期。 */
export function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getYear(date: Date): number {
  return date.getUTCFullYear();
}
