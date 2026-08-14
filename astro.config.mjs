import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

const SITE_URL = process.env.SITE_URL || 'https://shopify-shipping-calc.com';

// Blog bodies contain internal links to root-level article slugs that were never
// published (e.g. /shop-pay-vs-paypal), producing ~200 "Not found (404)" URLs in
// Search Console. This remark plugin unwraps any link to a single-segment root path
// that is not a real page — the link text stays, the dead href is removed. Real
// pages and multi-segment links (/shipping/california/, /blog/..., /free-shipping-threshold/)
// are preserved.
const REAL_ROOT_PAGES = new Set([
    'about', 'blog', 'break-even', 'carrier-comparison', 'china-shipping', 'contact',
    'dimensional-weight', 'free-shipping-threshold', 'privacy', 'profit-margin',
    'shipping', 'shipping-calculator', 'terms',
  ]);

function remarkStripDeadInternalLinks() {
    const isDead = (url) => {
          const m = /^\/([a-z0-9][a-z0-9-]*)\/?$/.exec(url || '');
          return !!m && !REAL_ROOT_PAGES.has(m[1]);
    };
    const walk = (node) => {
          if (!node || !Array.isArray(node.children)) return;
          const out = [];
          for (const child of node.children) {
                  if (child.type === 'link' && isDead(child.url)) {
                            out.push(...(child.children || []));
                  } else {
                            walk(child);
                            out.push(child);
                  }
          }
          node.children = out;
    };
    return (tree) => walk(tree);
}

export default defineConfig({
    site: SITE_URL,
    markdown: {
          remarkPlugins: [remarkStripDeadInternalLinks],
    },
    integrations: [
          sitemap(),
          tailwind(),
        ],
    output: 'static',
});
