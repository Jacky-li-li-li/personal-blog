import {
  type ViewsEnv,
  isValidSlug,
  getCount,
  json,
  MAX_BATCH_SLUGS,
} from '../_lib/note-views';

type Ctx = {
  env: ViewsEnv;
  request: Request;
};

export const onRequestGet = async (context: Ctx): Promise<Response> => {
  const url = new URL(context.request.url);
  const raw = url.searchParams.get('slugs');
  if (raw == null || raw.trim() === '') {
    return json({ error: 'slugs query required' }, 400);
  }

  const slugs = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (slugs.length === 0 || slugs.length > MAX_BATCH_SLUGS) {
    return json({ error: `slugs must be 1–${MAX_BATCH_SLUGS}` }, 400);
  }

  for (const slug of slugs) {
    if (!isValidSlug(slug)) {
      return json({ error: 'invalid slug', slug }, 400);
    }
  }

  const kv = context.env.VIEWS;
  const views: Record<string, { pv: number; uv: number }> = {};

  await Promise.all(
    slugs.map(async (slug) => {
      const [pv, uv] = await Promise.all([
        getCount(kv, `pv:${slug}`),
        getCount(kv, `uv:${slug}`),
      ]);
      views[slug] = { pv, uv };
    }),
  );

  return json({ views });
};
