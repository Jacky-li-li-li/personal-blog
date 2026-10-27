/** Shared helpers for Notes view-count Pages Functions. */

export interface ViewsEnv {
  VIEWS: KVNamespace;
}

export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const MAX_BATCH_SLUGS = 50;
export const MAX_VISITOR_ID_LENGTH = 80;

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

export async function getCount(kv: KVNamespace, key: string): Promise<number> {
  const raw = await kv.get(key);
  if (!raw) return 0;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export async function incrCount(kv: KVNamespace, key: string): Promise<number> {
  const next = (await getCount(kv, key)) + 1;
  await kv.put(key, String(next));
  return next;
}

export async function readViews(
  kv: KVNamespace,
  slug: string,
): Promise<{ slug: string; pv: number; uv: number }> {
  const [pv, uv] = await Promise.all([
    getCount(kv, `pv:${slug}`),
    getCount(kv, `uv:${slug}`),
  ]);
  return { slug, pv, uv };
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
