import type { APIContext } from 'astro';
import { buildFeed } from '../utils/rss';

export function GET(context: APIContext) {
  return buildFeed(context, 'zh');
}
