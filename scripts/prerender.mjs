// Tras `vite build`: renderiza <App/> a HTML y lo mete en dist/index.html para que buscadores y
// vistas previas vean el contenido sin ejecutar JS. El navegador lo sustituye al cargar (createRoot).
// ponytail: sin hidratación; si el parpadeo molestara, pasar main.jsx a hydrateRoot y hacer el HTML idéntico al cliente.
import { readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
const html = renderToString(createElement(App));
await vite.close();

const file = 'dist/index.html';
const page = await readFile(file, 'utf8');
if (!page.includes('<div id="root"></div>')) throw new Error('prerender: no encuentro <div id="root"></div> en ' + file);
await writeFile(file, page.replace('<div id="root"></div>', `<div id="root">${html}</div>`));
console.log(`prerender: ${(html.length / 1024).toFixed(1)} kB de HTML en ${file}`);
