import rss from '@astrojs/rss';
import { A as AstroError, i as UnknownContentCollectionError, f as createComponent, j as renderUniqueStylesheet, k as renderScriptElement, l as createHeadAndContent, r as renderTemplate, n as renderComponent, u as unescapeHTML } from '../astro_C04o1omu.mjs';
import { prependForwardSlash } from '@astrojs/internal-helpers/path';
import 'kleur/colors';

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
lookupMap = {"blog":{"type":"content","entries":{"post-1":"/src/content/blog/post-1.md","post-2":"/src/content/blog/post-2.md"}},"pages":{"type":"content","entries":{"about":"/src/content/pages/about.md","contact":"/src/content/pages/contact.md"}},"projects":{"type":"content","entries":{"project-1":"/src/content/projects/project-1.md","project-2":"/src/content/projects/project-2.md","project-3":"/src/content/projects/project-3.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/post-1.md": () => import('../post-1_CH2ql7I6.mjs'),"/src/content/blog/post-2.md": () => import('../post-2_DhZ_MEPb.mjs'),"/src/content/pages/about.md": () => import('../about_DA3TSprU.mjs'),"/src/content/pages/contact.md": () => import('../contact_L681RJZn.mjs'),"/src/content/projects/project-1.md": () => import('../project-1_Kn5O4j6D.mjs'),"/src/content/projects/project-2.md": () => import('../project-2_B9izAby3.mjs'),"/src/content/projects/project-3.md": () => import('../project-3_BEQoJZUx.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

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

async function GET(context) {
    const posts = (await getCollection('blog')).sort(sortItemsByDateDesc);
    return rss({
        title: siteConfig.title,
        description: siteConfig.description,
        site: context.site,
        items: posts.map((item) => ({
            title: item.data.title,
            description: item.data.excerpt,
            link: `/blog/${item.slug}/`,
            pubDate: item.data.publishDate.setUTCHours(0)
        }))
    });
}

const rss_xml = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

export { sortItemsByDateDesc as a, slugify as b, getAllTags as c, getPostsByTag as d, getCollection as g, rss_xml as r, siteConfig as s };
