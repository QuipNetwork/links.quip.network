import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const serverEntry = resolve('build-ssr/entry-server.js');
const { render } = await import(pathToFileURL(serverEntry).href);

const appHtml = render();
const template = readFileSync('dist/index.html', 'utf-8');
const placeholder = '<div id="root"></div>';

if (!template.includes(placeholder)) {
  throw new Error(`Expected ${placeholder} in dist/index.html`);
}

const canonicalUrl = template.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
if (!canonicalUrl) {
  throw new Error('Expected an absolute canonical URL in dist/index.html');
}
const sitemapUrl = new URL('sitemap.xml', canonicalUrl).href;

writeFileSync(
  'dist/index.html',
  template.replace(placeholder, `<div id="root">${appHtml}</div>`),
);

writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${canonicalUrl}</loc></url>
</urlset>
`,
);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`);

rmSync('build-ssr', { recursive: true, force: true });

console.log(`Prerendered dist/index.html (${appHtml.length} bytes of app HTML), sitemap.xml, and robots.txt`);
