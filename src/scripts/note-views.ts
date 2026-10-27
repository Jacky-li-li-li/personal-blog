/**
 * Client helper for Notes PV display.
 * - list items: data-mode="read" → batch GET
 * - article: data-mode="hit" → POST once per session, else GET
 * - localhost: show "0 次阅读" without calling the API
 *
 * 语言跟随 <html lang>：中文「x 次阅读」，英文「x views / 1 view」。
 */

const VISITOR_KEY = 'clok.visitorId';
const VIEWED_PREFIX = 'clok.viewed:';
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isLocalhost(): boolean {
  const host = window.location.hostname;
  return host === 'localhost' || host === '127.0.0.1';
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

function isEnglish(): boolean {
  return !(document.documentElement.lang || '').toLowerCase().startsWith('zh');
}

function formatPv(pv: number): string {
  // 与界面字典 i18n/ui.ts 的 notes.views 保持一致；纯客户端脚本读不到 Astro 变量。
  if (isEnglish()) return `${pv} ${pv === 1 ? 'view' : 'views'}`;
  return `${pv} 次阅读`;
}

function fill(el: HTMLElement, pv: number): void {
  el.textContent = formatPv(pv);
}

async function fetchPv(slug: string): Promise<number | null> {
  try {
    const res = await fetch(`/api/views/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { pv?: unknown };
    return typeof data.pv === 'number' ? data.pv : null;
  } catch {
    return null;
  }
}

async function hitSlug(slug: string): Promise<number | null> {
  if (isLocalhost()) return 0;

  const sessionKey = `${VIEWED_PREFIX}${slug}`;
  let already = false;
  try {
    already = sessionStorage.getItem(sessionKey) === '1';
  } catch {
    already = false;
  }

  if (already) return fetchPv(slug);

  try {
    const res = await fetch(`/api/views/${encodeURIComponent(slug)}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ visitorId: getVisitorId() }),
    });
    if (!res.ok) return null;
    try {
      sessionStorage.setItem(sessionKey, '1');
    } catch {
      // ignore quota / private mode
    }
    const data = (await res.json()) as { pv?: unknown };
    return typeof data.pv === 'number' ? data.pv : null;
  } catch {
    return null;
  }
}

async function readSlugs(slugs: string[]): Promise<Record<string, number> | null> {
  if (slugs.length === 0) return {};
  if (isLocalhost()) {
    return Object.fromEntries(slugs.map((s) => [s, 0]));
  }

  try {
    const res = await fetch(`/api/views?slugs=${encodeURIComponent(slugs.join(','))}`);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      views?: Record<string, { pv?: number }>;
    };
    const out: Record<string, number> = {};
    for (const slug of slugs) {
      const pv = data.views?.[slug]?.pv;
      out[slug] = typeof pv === 'number' ? pv : 0;
    }
    return out;
  } catch {
    return null;
  }
}

export function initNoteViews(): void {
  const nodes = document.querySelectorAll<HTMLElement>('[data-note-views][data-slug]');
  if (nodes.length === 0) return;

  const hits: HTMLElement[] = [];
  const reads: HTMLElement[] = [];

  for (const el of nodes) {
    const slug = el.dataset.slug ?? '';
    if (!SLUG_RE.test(slug)) continue;
    if (el.dataset.mode === 'hit') hits.push(el);
    else reads.push(el);
  }

  for (const el of hits) {
    const slug = el.dataset.slug!;
    void hitSlug(slug).then((pv) => {
      if (pv !== null) fill(el, pv);
    });
  }

  if (reads.length > 0) {
    const slugs = [...new Set(reads.map((el) => el.dataset.slug!))];
    void readSlugs(slugs).then((map) => {
      if (!map) return;
      for (const el of reads) {
        const slug = el.dataset.slug!;
        if (slug in map) fill(el, map[slug]!);
      }
    });
  }
}

initNoteViews();
