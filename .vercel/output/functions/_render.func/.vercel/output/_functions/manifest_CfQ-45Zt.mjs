import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { j as decodeKey } from './chunks/astro/server_D34pVGWb.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = (_, next) => next();

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CWWbcPv4.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/blog/[slug]","isIndex":false,"type":"page","pattern":"^\\/blog\\/([^/]+?)\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/blog/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChkmJnts.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/blog/[...page]","isIndex":false,"type":"page","pattern":"^\\/blog(?:\\/(.*?))?\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/blog/[...page].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChkmJnts.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/projects/[slug]","isIndex":false,"type":"page","pattern":"^\\/projects\\/([^/]+?)\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/projects/[slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChkmJnts.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/projects/[...page]","isIndex":false,"type":"page","pattern":"^\\/projects(?:\\/(.*?))?\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["...page"],"component":"src/pages/projects/[...page].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChkmJnts.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/tags/[slug]/[...page]","isIndex":false,"type":"page","pattern":"^\\/tags\\/([^/]+?)(?:\\/(.*?))?\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"...page","dynamic":true,"spread":true}]],"params":["slug","...page"],"component":"src/pages/tags/[slug]/[...page].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChkmJnts.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChkmJnts.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ChkmJnts.js"}],"styles":[{"type":"external","src":"/_astro/_slug_.DaPI9yns.css"}],"routeData":{"route":"/[...slug]","isIndex":false,"type":"page","pattern":"^(?:\\/(.*?))?\\/?$","segments":[[{"content":"...slug","dynamic":true,"spread":true}]],"params":["...slug"],"component":"src/pages/[...slug].astro","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://vannessapage-6tfxyjhr4-zainv4s-projects.vercel.app","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/blog/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/projects/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/projects/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/tags/[slug]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/projects/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[slug]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}],["C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/utils/data-utils.ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/blog/[...page]@_@astro":"pages/blog/_---page_.astro.mjs","\u0000@astro-page:src/pages/projects/[slug]@_@astro":"pages/projects/_slug_.astro.mjs","\u0000@astro-page:src/pages/projects/[...page]@_@astro":"pages/projects/_---page_.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/[slug]/[...page]@_@astro":"pages/tags/_slug_/_---page_.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/[...slug]@_@astro":"pages/_---slug_.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CfQ-45Zt.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/blog/post-1.md?astroContentCollectionEntry=true":"chunks/post-1__ByMHh-y.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/blog/post-2.md?astroContentCollectionEntry=true":"chunks/post-2_C9HqB7Kt.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/about.md?astroContentCollectionEntry=true":"chunks/about_DkM0Wudk.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/contact.md?astroContentCollectionEntry=true":"chunks/contact_DPhJ5Rjp.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-1.md?astroContentCollectionEntry=true":"chunks/project-1_BrWyCCe8.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-2.md?astroContentCollectionEntry=true":"chunks/project-2_CFeBSyXx.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-3.md?astroContentCollectionEntry=true":"chunks/project-3_1l_-GWOy.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/blog/post-1.md?astroPropagatedAssets":"chunks/post-1_BkpolXTC.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/blog/post-2.md?astroPropagatedAssets":"chunks/post-2_CFembuxD.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/about.md?astroPropagatedAssets":"chunks/about_CeZEdr9M.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/contact.md?astroPropagatedAssets":"chunks/contact_CbcvbxWE.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-1.md?astroPropagatedAssets":"chunks/project-1_C11INjdl.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-2.md?astroPropagatedAssets":"chunks/project-2_B48_GM3N.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-3.md?astroPropagatedAssets":"chunks/project-3_Cnh-0epg.mjs","\u0000astro:asset-imports":"chunks/_astro_asset-imports_D9aVaOQr.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BcEe_9wP.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/blog/post-1.md":"chunks/post-1_DqmWIfTf.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/blog/post-2.md":"chunks/post-2_DGGe-aRp.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/about.md":"chunks/about_vbnLbLgG.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/contact.md":"chunks/contact_Co1DWDpB.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-1.md":"chunks/project-1_DEok3_dl.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-2.md":"chunks/project-2_BuJTiUB_.mjs","C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/projects/project-3.md":"chunks/project-3_BYt82b_J.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.CWWbcPv4.js","/astro/hoisted.js?q=1":"_astro/hoisted.ChkmJnts.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_slug_.DaPI9yns.css","/about.jpeg","/childAbuse1.jpg","/dante-preview.jpg","/favicon.svg","/hero.jpeg","/imageOfmyLove.jpg","/post-1.jpg","/post-10.jpg","/post-11.jpg","/post-12.jpg","/post-13.jpg","/post-14.jpg","/post-2.jpg","/post-3.jpg","/post-4.jpg","/post-5.jpg","/post-6.jpg","/post-7.jpg","/post-8.jpg","/post-9.jpg","/project-1.jpg","/project-2.jpg","/project-3.jpg","/project-4.jpg","/project-5.jpg","/project-6.jpg","/project-7.jpg","/_astro/hoisted.ChkmJnts.js","/_astro/hoisted.CWWbcPv4.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"hn3Nnvcrl453939wqSP/2pFBPCLzNdEusy0EvC/XeR0=","experimentalEnvGetSecretEnabled":false});

export { manifest };