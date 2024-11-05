import { A as AstroError, c as UnknownContentCollectionError, d as createComponent, r as renderUniqueStylesheet, e as renderScriptElement, f as createHeadAndContent, g as renderTemplate, h as renderComponent, u as unescapeHTML, i as createAstro, j as addAttribute, m as maybeRenderHead, s as spreadAttributes, k as renderSlot, l as renderHead, F as Fragment } from '../astro_DM9Ws_sw.mjs';
import 'kleur/colors';
import { prependForwardSlash } from '@astrojs/internal-helpers/path';
import 'clsx';
/* empty css                           */

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://zain-v4-github-io.vercel.app", "ASSETS_PREFIX": undefined}, { ng: process.env.ng, Path: process.env.Path })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/post-1.md": () => import('../post-1__ByMHh-y.mjs'),"/src/content/blog/post-2.md": () => import('../post-2_C9HqB7Kt.mjs'),"/src/content/pages/about.md": () => import('../about_DkM0Wudk.mjs'),"/src/content/pages/contact.md": () => import('../contact_DPhJ5Rjp.mjs'),"/src/content/projects/project-1.md": () => import('../project-1_BrWyCCe8.mjs'),"/src/content/projects/project-2.md": () => import('../project-2_CFeBSyXx.mjs'),"/src/content/projects/project-3.md": () => import('../project-3_1l_-GWOy.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"blog":{"type":"content","entries":{"post-1":"/src/content/blog/post-1.md","post-2":"/src/content/blog/post-2.md"}},"projects":{"type":"content","entries":{"project-1":"/src/content/projects/project-1.md","project-3":"/src/content/projects/project-3.md","project-2":"/src/content/projects/project-2.md"}},"pages":{"type":"content","entries":{"contact":"/src/content/pages/contact.md","about":"/src/content/pages/about.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/post-1.md": () => import('../post-1_BSds5lVN.mjs'),"/src/content/blog/post-2.md": () => import('../post-2_D6NjSOem.mjs'),"/src/content/pages/about.md": () => import('../about__37xBHLy.mjs'),"/src/content/pages/contact.md": () => import('../contact_Cz7Fg6bs.mjs'),"/src/content/projects/project-1.md": () => import('../project-1_BFkKbbBV.mjs'),"/src/content/projects/project-2.md": () => import('../project-2_sb_JZoi6.mjs'),"/src/content/projects/project-3.md": () => import('../project-3_NYsyfUvY.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$h = createAstro("https://zain-v4-github-io.vercel.app");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/node_modules/astro/components/ViewTransitions.astro", void 0);

const siteConfig = {
  title: "Vannessa",
  subtitle: "Minimal Astro.js theme",
  description: "Astro.js and Tailwind CSS theme for blog and portfolio by justgoodui.com",
  image: {
    src: "/dante-preview.jpg",
    alt: "Dante - Astro.js and Tailwind CSS theme"
  },
  headerNavLinks: [
    {
      text: "Home",
      href: "/"
    },
    {
      text: "Washington black",
      href: "/projects"
    },
    {
      text: "Real cases",
      href: "/blog"
    },
    {
      text: "Work cited",
      href: "/tags"
    }
  ],
  footerNavLinks: [
    /*{
        text: 'About',
        href: '/about'
    },*/
    {
      text: "Contact",
      href: "/contact"
    }
  ],
  hero: {
    title: "Hi There & Welcome to My Corner of the Web!",
    text: "I'm **Ethan Donovan**, a web developer at Amazing Studio, dedicated to the realms of collaboration and artificial intelligence. My approach involves embracing intuition, conducting just enough research, and leveraging aesthetics as a catalyst for exceptional products. I have a profound appreciation for top-notch software, visual design, and the principles of product-led growth. Feel free to explore some of my coding endeavors on <a href='https://github.com/JustGoodUI/dante-astro-theme'>GitHub</a> or follow me on <a href='https://twitter.com/justgoodui'>Twitter/X</a>.",
    image: {
      src: "/hero.jpeg",
      alt: "A person sitting at a desk in front of a computer"
    },
    actions: [
      {
        text: "Get in Touch",
        href: "/contact"
      }
    ]
  },
  postsPerPage: 8,
  projectsPerPage: 8
};

const $$Astro$g = createAstro("https://zain-v4-github-io.vercel.app");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const { description = "", image = siteConfig.image, pageType = "website" } = Astro2.props;
  const title = [Astro2.props.title, siteConfig.title].filter(Boolean).join(" | ");
  const resolvedImage = image?.src ? {
    src: new URL(image.src, Astro2.site).toString(),
    alt: image.alt
  } : void 0;
  const canonicalURL = new URL(Astro2.request.url, Astro2.site);
  function formatCanonicalURL(url) {
    const path = url.toString();
    const hasQueryParams = path.includes("?");
    if (hasQueryParams) {
      path.replace(/\/?$/, "");
    }
    return path.replace(/\/?$/, hasQueryParams ? "" : "/");
  }
  return renderTemplate`<!-- High Priority Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&display=swap" rel="stylesheet"><!-- Low Priority Global Metadata --><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="sitemap" href="/sitemap-index.xml"><link rel="alternate" type="application/rss+xml" href="/rss.xml" title="RSS"><!-- Page Metadata --><link rel="canonical"${addAttribute(formatCanonicalURL(canonicalURL), "href")}><meta name="description"${addAttribute(description, "content")}><!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(pageType, "content")}><meta property="og:url"${addAttribute(formatCanonicalURL(canonicalURL), "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}>${resolvedImage?.src && renderTemplate`<meta property="og:image"${addAttribute(resolvedImage.src, "content")}>`}${resolvedImage?.alt && renderTemplate`<meta property="og:image:alt"${addAttribute(resolvedImage.alt, "content")}>`}<!-- X/Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(formatCanonicalURL(canonicalURL), "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(description, "content")}>${resolvedImage?.src && renderTemplate`<meta property="twitter:image"${addAttribute(resolvedImage.src, "content")}>`}${resolvedImage?.alt && renderTemplate`<meta name="twitter:image:alt"${addAttribute(resolvedImage?.alt, "content")}>`}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/BaseHead.astro", void 0);

const $$Astro$f = createAstro("https://zain-v4-github-io.vercel.app");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$Footer;
  const socialLinks = siteConfig.socialLinks || [];
  const navLinks = siteConfig.footerNavLinks || [];
  return renderTemplate`${maybeRenderHead()}<footer class="w-full max-w-3xl mx-auto pt-12 pb-10 sm:pt-24 sm:pb-14"> ${navLinks.length > 0 && renderTemplate`<div class="mb-4 flex flex-wrap gap-x-6 gap-y-1"> ${navLinks.map((link) => renderTemplate`<a class="font-serif hover:underline hover:underline-offset-2"${addAttribute(link.href, "href")}> ${link.text} </a>`)} </div>`} <div${addAttribute([
    "pt-6 flex flex-col gap-4 border-t border-dashed border-main",
    { "sm:flex-row-reverse sm:justify-between sm:items-center": socialLinks.length > 0 }
  ], "class:list")}></div> </footer>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/Footer.astro", void 0);

const $$Astro$e = createAstro("https://zain-v4-github-io.vercel.app");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead()}<header class="w-full max-w-3xl mx-auto mb-12 sm:mb-16"> ${siteConfig.logo && siteConfig.logo?.src ? renderTemplate`<a href="/"> <img${addAttribute("A message to the world", "src")}${addAttribute(siteConfig.logo.alt || "", "alt")} class="max-h-12"> </a>` : renderTemplate`<a class="font-serif text-2xl leading-tight font-medium text-theme-foreground sm:text-4xl" href="/"> ${"Vannessa Lu"} </a>`} ${renderTemplate`<p class="text-sm leading-tight mt-1">${renderTemplate`<i><q>When a project matters to me</q></i>`}</p>`} </header>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/Header.astro", void 0);

const $$Astro$d = createAstro("https://zain-v4-github-io.vercel.app");
const $$NavLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$NavLink;
  const { href, class: className, ...props } = Astro2.props;
  const { pathname } = Astro2.url;
  const isActive = href === pathname || href === pathname.replace(/\/$/, "");
  return renderTemplate`${maybeRenderHead()}<a${addAttribute([className, { "underline underline-offset-2 decoration-1": isActive }], "class:list")}${addAttribute(href, "href")}${spreadAttributes(props)}> ${renderSlot($$result, $$slots["default"])} </a>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/NavLink.astro", void 0);

const $$Astro$c = createAstro("https://zain-v4-github-io.vercel.app");
const $$ThemeToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$ThemeToggle;
  return renderTemplate`${maybeRenderHead()}<button id="theme-toggle" class="w-8 h-8 -mr-2 flex items-center justify-center" aria-label="Change color scheme"> <svg class="w-4 h-4 fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <circle cx="8" cy="8" r="8"></circle> </svg> </button>  `;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/ThemeToggle.astro", void 0);

const $$Astro$b = createAstro("https://zain-v4-github-io.vercel.app");
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Nav;
  const navLinks = siteConfig.headerNavLinks || [];
  return renderTemplate`${maybeRenderHead()}<nav class="min-h-10 pt-4 pb-12 relative sm:min-h-14 sm:pb-24 md:pt-8" data-astro-cid-dmqpwcec> ${navLinks.length > 0 && renderTemplate`<div class="w-full max-w-3xl mx-auto relative" data-astro-cid-dmqpwcec> <button class="menu-toggle w-8 h-8 -ml-1 flex items-center justify-center relative z-30 md:hidden" aria-label="Open Menu" aria-expanded="false" aria-controls="menu-items" data-astro-cid-dmqpwcec> <span class="menu-toggle-icon w-6 h-px relative bg-current" data-astro-cid-dmqpwcec></span> </button> <ul id="menu-items" class="menu flex gap-6" data-astro-cid-dmqpwcec> ${navLinks.map((link) => renderTemplate`<li class="py-1" data-astro-cid-dmqpwcec> ${renderComponent($$result, "NavLink", $$NavLink, { "class": "text-xl font-serif text-main hover:underline hover:underline-offset-2 hover:decoration-1 md:text-base", "href": link.href, "data-astro-cid-dmqpwcec": true }, { "default": ($$result2) => renderTemplate`${link.text}` })} </li>`)} </ul> </div>`} <div class="absolute right-0 top-4 z-10 md:top-8" data-astro-cid-dmqpwcec> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, { "data-astro-cid-dmqpwcec": true })} </div> </nav>  `;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/Nav.astro", void 0);

const $$Astro$a = createAstro("https://zain-v4-github-io.vercel.app");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { showHeader = true, ...head } = Astro2.props;
  return renderTemplate`<html lang="en" class="antialiased break-words"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { ...head })}${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderHead()}</head> <body class="bg-main text-main"> <div class="flex flex-col min-h-screen px-4 md:px-8"> ${renderComponent($$result, "Nav", $$Nav, {})} ${showHeader && renderTemplate`${renderComponent($$result, "Header", $$Header, {})}`} <main class="grow w-full max-w-3xl mx-auto"> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </div> </body></html>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/layouts/BaseLayout.astro", void 0);

const $$Astro$9 = createAstro("https://zain-v4-github-io.vercel.app");
const $$FormattedDate = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$FormattedDate;
  const { date } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<time${addAttribute(date.toISOString(), "datetime")}> ${date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })} </time>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/FormattedDate.astro", void 0);

const $$Astro$8 = createAstro("https://zain-v4-github-io.vercel.app");
const $$ArrowRight = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ArrowRight;
  const { class: className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${addAttribute(className, "class")}${spreadAttributes(props)}> <path d="M4.286 12c0-0.533 0.432-0.964 0.964-0.964v0h11.172l-4.14-4.138c-0.175-0.175-0.283-0.416-0.283-0.683 0-0.533 0.432-0.965 0.965-0.965 0.267 0 0.508 0.108 0.683 0.283v0l5.785 5.785c0.175 0.175 0.283 0.416 0.283 0.683s-0.108 0.508-0.283 0.683l-5.785 5.785c-0.175 0.175-0.416 0.283-0.683 0.283-0.533 0-0.965-0.432-0.965-0.965 0-0.267 0.108-0.508 0.283-0.683v0l4.14-4.138h-11.172c-0.533 0-0.964-0.432-0.964-0.964v0z"></path> </svg>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/icons/ArrowRight.astro", void 0);

const $$Astro$7 = createAstro("https://zain-v4-github-io.vercel.app");
const $$PostPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$PostPreview;
  const { post, class: className, headingLevel = "h2" } = Astro2.props;
  const { title, publishDate, updatedDate, excerpt } = post.data;
  const TitleTag = headingLevel;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(["flex justify-between items-start gap-8 group", className], "class:list")}${addAttribute(`/blog/${post.slug}/`, "href")}> <div class="grow"> ${renderComponent($$result, "TitleTag", TitleTag, { "class": "text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl" }, { "default": ($$result2) => renderTemplate`${title}` })} <div class="mt-1 text-sm leading-normal"> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": publishDate })} ${updatedDate && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${" "}<span>
(Updated on ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": updatedDate })})
</span> ` })}`} </div> ${excerpt && renderTemplate`<div class="mt-3 text-sm leading-normal">${excerpt}</div>`} </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
Read Post ${renderComponent($$result, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/PostPreview.astro", void 0);

function slugify(input) {
  if (!input)
    return "";
  var slug = input.toLowerCase().trim();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();
  slug = slug.replace(/[\s-]+/g, "-");
  return slug;
}

function sortItemsByDateDesc(itemA, itemB) {
  return new Date(itemB.data.publishDate).getTime() - new Date(itemA.data.publishDate).getTime();
}
function getAllTags(posts) {
  const tags = [...new Set(posts.flatMap((post) => post.data.tags || []).filter(Boolean))];
  return tags.map((tag) => {
    return {
      name: tag,
      slug: slugify(tag)
    };
  }).filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos;
  });
}
function getPostsByTag(posts, tagSlug) {
  const filteredPosts = posts.filter((post) => (post.data.tags || []).map((tag) => slugify(tag)).includes(tagSlug));
  return filteredPosts;
}

const $$Astro$6 = createAstro("https://zain-v4-github-io.vercel.app");
const $$ArrowLeft = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ArrowLeft;
  const { class: className, ...props } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${addAttribute(className, "class")}${spreadAttributes(props)}> <path d="M19.714 12c0 0.533-0.432 0.964-0.964 0.964v0h-11.172l4.14 4.138c0.175 0.175 0.283 0.416 0.283 0.683 0 0.533-0.432 0.965-0.965 0.965-0.267 0-0.508-0.108-0.683-0.283v0l-5.785-5.785c-0.175-0.175-0.283-0.416-0.283-0.683s0.108-0.508 0.283-0.683l5.785-5.785c0.175-0.175 0.416-0.283 0.683-0.283 0.533 0 0.965 0.432 0.965 0.965 0 0.267-0.108 0.508-0.283 0.683v0l-4.14 4.138h11.172c0.533 0 0.964 0.432 0.964 0.964v0z"></path> </svg>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/icons/ArrowLeft.astro", void 0);

const $$Astro$5 = createAstro("https://zain-v4-github-io.vercel.app");
const $$IconButton = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$IconButton;
  const { href, class: className, ...rest } = Astro2.props;
  const buttonClasses = "inline-flex items-center justify-center p-2 text-main bg-main border border-main rounded-full transition hover:bg-muted";
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/IconButton.astro", void 0);

const $$Astro$4 = createAstro("https://zain-v4-github-io.vercel.app");
const $$Pagination = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { page, class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="Pagination"${addAttribute(["px-12 py-2 relative text-center", className], "class:list")}> ${page.url.prev && renderTemplate`${renderComponent($$result, "IconButton", $$IconButton, { "class": "absolute left-0 top-1/2 -translate-y-1/2", "href": page.url.prev, "aria-label": `Go to page ${page.currentPage - 1} of ${page.lastPage}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArrowLeft", $$ArrowLeft, { "class": "w-5 h-5 fill-current" })} ` })}`} <span class="text-sm" aria-current="page">Page ${page.currentPage} of ${page.lastPage}</span> ${page.url.next && renderTemplate`${renderComponent($$result, "IconButton", $$IconButton, { "class": "absolute right-0 top-1/2 -translate-y-1/2", "href": page.url.next, "aria-label": `Go to page ${page.currentPage + 1} of ${page.lastPage}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "class": "w-5 h-5 fill-current" })} ` })}`} </nav>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/Pagination.astro", void 0);

const $$Astro$3 = createAstro("https://zain-v4-github-io.vercel.app");
async function getStaticPaths$2({ paginate }) {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  return paginate(posts, { pageSize: siteConfig.postsPerPage  });
}
const $$$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$$2;
  const { page } = Astro2.props;
  const blog = page.data;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Real Cases", "description": "care and abuse", "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-12 text-2xl leading-tight font-serif italic sm:mb-16 sm:text-4xl">Real Cases</h1> ${blog.map((post) => renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": post, "class": "mb-10 sm:mb-12" })}`)}${renderComponent($$result2, "Pagination", $$Pagination, { "page": page, "class": "my-16 sm:my-24" })} ` })}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/blog/[...page].astro", void 0);

const $$file$2 = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/blog/[...page].astro";
const $$url$2 = "/blog/[...page]";

const ____page_$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$2,
  file: $$file$2,
  getStaticPaths: getStaticPaths$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$2 = createAstro("https://zain-v4-github-io.vercel.app");
const $$ProjectPreview = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProjectPreview;
  const { project, class: className, headingLevel = "h2" } = Astro2.props;
  const { title, description } = project.data;
  const TitleTag = headingLevel;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(["flex justify-between items-start gap-8 group", className], "class:list")}${addAttribute(`/projects/${project.slug}/`, "href")}> <div class="grow"> ${renderComponent($$result, "TitleTag", TitleTag, { "class": "text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl" }, { "default": ($$result2) => renderTemplate`${title}` })} ${description && renderTemplate`<div class="mt-1 text-sm leading-normal">${description}</div>`} </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
View Project ${renderComponent($$result, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/ProjectPreview.astro", void 0);

const $$Astro$1 = createAstro("https://zain-v4-github-io.vercel.app");
async function getStaticPaths$1({ paginate }) {
  const projects = (await getCollection("projects")).sort(sortItemsByDateDesc);
  return paginate(projects, { pageSize: siteConfig.projectsPerPage  });
}
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$$1;
  const { page } = Astro2.props;
  const portfolio = page.data;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Washington black", "description": "Explore a diverse", "image": { src: "/dante-preview.jpg", alt: "The preview of the site" }, "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-12 text-1xl leading-tight font-serif italic sm:mb-16 sm:text-4xl">Washington Black</h1> <h3 class="text-xl font-semibold mb-4 ">Literature and Child Abuse</h3> <p class="mb-6   leading-relaxed">
Literature serves as a powerful lens through which we can explore complex social issues, 
        including the pervasive nature of child abuse. Novels like *Washington Black* offer profound insights into the psychological and emotional ramifications of abuse, 
        illuminating the nuanced dynamics between power, control, and identity. Edugyan’s narrative not only highlights the experiences of those marginalized by society but also delves into the internal struggles faced by victims. 
        By portraying Washington's relationship with Titch, the novel allows readers to witness the insidious effects of emotional manipulation and the longing for acceptance that often characterize the lives of abuse survivors. 
        Through its vivid storytelling, *Washington Black* encourages empathy and understanding, shedding light on the struggles faced by individuals caught in cycles of abuse and the complex interplay between victim and perpetrator.
</p> <br> <br> ${portfolio.map((project) => renderTemplate`${renderComponent($$result2, "ProjectPreview", $$ProjectPreview, { "project": project, "class": "mb-10 sm:mb-12" })}`)}${renderComponent($$result2, "Pagination", $$Pagination, { "page": page, "class": "my-16 sm:my-24" })} ` })}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/projects/[...page].astro", void 0);

const $$file$1 = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/projects/[...page].astro";
const $$url$1 = "/projects/[...page]";

const ____page_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$1,
  file: $$file$1,
  getStaticPaths: getStaticPaths$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://zain-v4-github-io.vercel.app");
async function getStaticPaths({ paginate }) {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const tags = getAllTags(posts);
  return tags.flatMap((tag) => {
    const filteredPosts = getPostsByTag(posts, tag.slug);
    return paginate(filteredPosts, {
      params: { slug: tag.slug },
      pageSize: siteConfig.postsPerPage 
    });
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const blog = page.data;
  const params = Astro2.params;
  const allPosts = await getCollection("blog");
  const allTags = getAllTags(allPosts);
  const currentTag = allTags.find((tag) => {
    return tag.slug === params.slug;
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `Posts Tagged ${currentTag?.name}`, "description": `Explore a curated collection of blog posts under ${currentTag?.name}`, "image": { src: "/dante-preview.jpg", alt: "The preview of the site" }, "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-12 text-2xl leading-tight font-serif italic sm:mb-16 sm:text-4xl">Posts Tagged "${currentTag?.name}"</h1> ${blog.map((post) => renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": post, "class": "mb-10 sm:mb-12" })}`)}${renderComponent($$result2, "Pagination", $$Pagination, { "page": page, "class": "my-16 sm:my-24" })} ` })}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/tags/[slug]/[...page].astro", void 0);

const $$file = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/tags/[slug]/[...page].astro";
const $$url = "/tags/[slug]/[...page]";

const ____page_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$BaseLayout as $, ____page_$2 as _, $$FormattedDate as a, slugify as b, $$PostPreview as c, $$ProjectPreview as d, getAllTags as e, getPostsByTag as f, getCollection as g, $$ArrowRight as h, siteConfig as i, ____page_$1 as j, ____page_ as k, sortItemsByDateDesc as s };
