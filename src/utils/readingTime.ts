/**
 * 粗略估算阅读时长：中文按 400 字/分钟，西文按 200 词/分钟。
 * 对笔记这种长度的内容足够用，不需要额外依赖。
 */
export function getReadingMinutes(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[#>*_~\-]/g, ' ');

  const cjkCount = (plain.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latinWords = plain
    .replace(/[\u3400-\u9fff]/g, ' ')
    .match(/[A-Za-z0-9]+/g)?.length ?? 0;

  return Math.max(1, Math.ceil(cjkCount / 400 + latinWords / 200));
}
