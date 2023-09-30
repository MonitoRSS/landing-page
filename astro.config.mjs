import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs';
import { SITE, ANALYTICS } from './src/utils/config.ts';
import vercel from "@astrojs/vercel/serverless";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => ANALYTICS.vendors.googleAnalytics.isEnabled ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

// https://astro.build/config
export default defineConfig({
  site: SITE.site,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash ? 'always' : 'never',
  output: 'static',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(),
  // image({
  //   serviceEntryPoint: '@astrojs/image/sharp',
  // }),
  mdx(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': ['reddit', 'filled-filter', 'steam', 'start', 'bullish', 'landscape', 'reading-ebook', 'news'],
      ri: ['twitter-fill', 'facebook-box-fill', 'linkedin-box-fill', 'whatsapp-fill', 'mail-fill']
    }
  }), ...whenExternalScripts(() => partytown({
    config: {
      forward: ['dataLayer.push']
    }
  })), compress({
    css: true,
    html: {
      removeAttributeQuotes: false
    },
    img: false,
    js: true,
    svg: false,
    logger: 1
  })],
  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin]
  },vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  },
  output: 'hybrid',
  adapter: vercel()
});