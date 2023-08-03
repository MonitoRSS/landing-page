import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import image from '@astrojs/image';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import partytown from '@astrojs/partytown';
import compress from 'astro-compress';
import { readingTimeRemarkPlugin } from './src/utils/frontmatter.mjs';
import { SITE_CONFIG, ANALYTICS_CONFIG } from './src/utils/config.ts';
import cloudflare from "@astrojs/cloudflare";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const whenExternalScripts = (items = []) => ANALYTICS_CONFIG.vendors.googleAnalytics.isEnabled ? Array.isArray(items) ? items.map(item => item()) : [items()] : [];

// https://astro.build/config
export default defineConfig({
  site: SITE_CONFIG.site,
  base: SITE_CONFIG.base,
  trailingSlash: SITE_CONFIG.trailingSlash ? 'always' : 'never',
  output: 'hybrid',
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), mdx(), icon({
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
  },
  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    }
  },
  adapter: cloudflare()
});