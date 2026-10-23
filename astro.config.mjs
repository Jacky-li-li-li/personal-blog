import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 部署时在 Cloudflare Pages 里设置 SITE_URL；本地默认用 example.com 占位。
// 注意用 || 而非 ??：CI 里未配置的 secret 会变成空字符串，?? 不会回退。
const site = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  site,
  trailingSlash: 'never',
  output: 'static',
  // 生成 about.html / notes.html 而不是 about/index.html，配合无尾斜杠 URL。
  build: { format: 'file' },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // 视觉稿里的代码块在明暗模式下都保持深色「墨块」，所以固定使用暗色主题。
    shikiConfig: {
      theme: 'vesper',
      wrap: true,
    },
  },
});
