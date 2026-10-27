import {
  type ViewsEnv,
  isValidSlug,
  getCount,
  incrCount,
  readViews,
  json,
  MAX_VISITOR_ID_LENGTH,
} from '../../_lib/note-views';

type Ctx = {
  env: ViewsEnv;
  params: { slug?: string };
  request: Request;
};

export const onRequestGet = async (context: Ctx): Promise<Response> => {
  const slug = context.params.slug ?? '';
  if (!isValidSlug(slug)) {
    return json({ error: 'invalid slug' }, 400);
  }
  return json(await readViews(context.env.VIEWS, slug));
};

export const onRequestPost = async (context: Ctx): Promise<Response> => {
  const slug = context.params.slug ?? '';
  if (!isValidSlug(slug)) {
    return json({ error: 'invalid slug' }, 400);
  }

  const kv = context.env.VIEWS;
  let visitorId: string | undefined;

  try {
    const body = (await context.request.json()) as { visitorId?: unknown };
    if (
      typeof body?.visitorId === 'string' &&
      body.visitorId.length > 0 &&
      body.visitorId.length <= MAX_VISITOR_ID_LENGTH
    ) {
      visitorId = body.visitorId;
    }
  } catch {
    // Empty / non-JSON body is fine; still count PV.
  }

  const pv = await incrCount(kv, `pv:${slug}`);
  let uv = await getCount(kv, `uv:${slug}`);

  if (visitorId) {
    const seenKey = `seen:${slug}:${visitorId}`;
    const seen = await kv.get(seenKey);
    if (!seen) {
      await kv.put(seenKey, '1');
      uv = await incrCount(kv, `uv:${slug}`);
    }
  }

  return json({ slug, pv, uv });
};
