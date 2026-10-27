import type { Locale } from '../i18n/types';

/**
 * 粗略估算阅读时长：中文按 400 字/分钟，西文按 200 词/分钟。
 * 对笔记这种长度的内容足够用，不需要额外依赖。
 */
export function getReadingMinutes(markdown: string): number {
  const plain = toPlainText(markdown);
  const cjkCount = (plain.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latinWords = plain
    .replace(/[\u3400-\u9fff]/g, ' ')
    .match(/[A-Za-z0-9]+/g)?.length ?? 0;

  return Math.max(1, Math.ceil(cjkCount / 400 + latinWords / 200));
}

/** Strip markdown noise to plain text for excerpts / timing. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 列表副标题取正文第一句。
 *
 * 中文句号是「。！？」；英文句末是「. ! ?」，但缩写（e.g. / Mr.）与省略号
 * 容易误切，所以英文只在句号后面跟着空格且下一个字符是大写或结尾时才断句。
 */
export function getFirstSentence(
  markdown: string,
  maxLen = 72,
  locale: Locale = 'zh',
): string {
  const plain = toPlainText(markdown);
  if (!plain) return '';

  const match =
    locale === 'en'
      ? plain.match(/^.*?(?:[!?]+|\.(?=\s+["“(]?[A-Z])|\.$)/)
      : plain.match(/^.*?[。！？!?]/);

  let sentence = (match ? match[0] : plain).trim();
  if (sentence.length > maxLen) {
    sentence = `${sentence.slice(0, maxLen).replace(/\s+\S*$/, '').trim()}…`;
  }
  return sentence;
}
