import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_D9-nNLeh.mjs';
import { manifest } from './manifest_BNXAHYWS.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/blog/_slug_.astro.mjs');
const _page2 = () => import('./pages/blog/_---page_.astro.mjs');
const _page3 = () => import('./pages/projects/_slug_.astro.mjs');
const _page4 = () => import('./pages/projects/_---page_.astro.mjs');
const _page5 = () => import('./pages/rss.xml.astro.mjs');
const _page6 = () => import('./pages/tags/_slug_/_---page_.astro.mjs');
const _page7 = () => import('./pages/tags.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const _page9 = () => import('./pages/_---slug_.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/blog/[slug].astro", _page1],
    ["src/pages/blog/[...page].astro", _page2],
    ["src/pages/projects/[slug].astro", _page3],
    ["src/pages/projects/[...page].astro", _page4],
    ["src/pages/rss.xml.js", _page5],
    ["src/pages/tags/[slug]/[...page].astro", _page6],
    ["src/pages/tags/index.astro", _page7],
    ["src/pages/index.astro", _page8],
    ["src/pages/[...slug].astro", _page9]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0bea0fba-63e1-4e14-866d-5be029ec8817",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
