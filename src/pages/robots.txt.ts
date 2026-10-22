import type { APIContext } from 'astro';
import { site } from '../data/site';

export function GET({ site: astroSite }: APIContext) {
  const baseUrl = astroSite ?? new URL(site.siteUrl);
  const sitemap = new URL('sitemap-index.xml', baseUrl).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
