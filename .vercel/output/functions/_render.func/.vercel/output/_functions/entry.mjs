import { renderers } from './renderers.mjs';
import { manifest } from './manifest_DUgy86HV.mjs';
import * as serverEntrypointModule from '@astrojs/vercel/serverless/entrypoint';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_oUmnhJOs.mjs');
const _page1 = () => import('./chunks/_slug__B9FWjoUD.mjs');
const _page2 = () => import('./chunks/_.._Bhtz-1F6.mjs');
const _page3 = () => import('./chunks/_slug__CKDxlr-F.mjs');
const _page4 = () => import('./chunks/_.._CVgoK6j7.mjs');
const _page5 = () => import('./chunks/rss_DAFP_8Z7.mjs');
const _page6 = () => import('./chunks/_.._BbGLPjkz.mjs');
const _page7 = () => import('./chunks/index_DCqSKHde.mjs');
const _page8 = () => import('./chunks/index_DBNpjU76.mjs');
const _page9 = () => import('./chunks/_.._BZHrCFi9.mjs');
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

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "b29e3b75-b0fd-497c-af60-1c9f02e7fb74",
    "skewProtection": false
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
