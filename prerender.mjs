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

writeFileSync(
  'dist/index.html',
  template.replace(placeholder, `<div id="root">${appHtml}</div>`),
);

rmSync('build-ssr', { recursive: true, force: true });

console.log(`Prerendered dist/index.html (${appHtml.length} bytes of app HTML)`);
