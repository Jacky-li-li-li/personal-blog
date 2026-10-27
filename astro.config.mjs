import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// 部署时在 Cloudflare Pages 里设置 SITE_URL；本地默认用 example.com 占位。
// 注意用 || 而非 ??：CI 里未配置的 secret 会变成空字符串，?? 不会回退。
const site = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  site,
  output: 'static',
  // 必须用 file 格式（生成 about.html / en.html），不能用 directory。
  //
  // directory 会生成 about/index.html，而 Cloudflare Pages 对目录结果强制补尾斜杠
  // （/about → 308 /about/）。这与站内「URL 不带尾斜杠」的约定正面冲突：
  // _redirects 再把 /about/ 301 回 /about，就形成 /about ⇄ /about/ 无限重定向
  // （线上与 wrangler pages dev 均实测复现）。
  // file 格式没有目录可供规范化，/about、/en 直接命中 about.html、en.html，
  // 带斜杠的旧地址交给 _redirects 一次性 301，不会有第二个跳转来源。
  build: { format: 'file' },
  trailingSlash: 'never',
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
