import { i as createAstro, d as createComponent, g as renderTemplate, m as maybeRenderHead, j as addAttribute, s as spreadAttributes, k as renderSlot, h as renderComponent, F as Fragment } from '../astro_DM9Ws_sw.mjs';
import 'kleur/colors';
import { g as getCollection, s as sortItemsByDateDesc, $ as $$BaseLayout, a as $$FormattedDate, b as slugify, c as $$PostPreview, d as $$ProjectPreview } from './__B2vjhCY4.mjs';
import 'clsx';

const $$Astro$2 = createAstro("https://zain-v4-github-io.vercel.app");
const $$Button = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, class: className, ...rest } = Astro2.props;
  const buttonClasses = "inline-flex items-center justify-center px-6 py-2 font-serif text-sm leading-tight italic  text-main bg-main border border-main rounded-full transition hover:bg-muted";
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/Button.astro", void 0);

const $$Astro$1 = createAstro("https://zain-v4-github-io.vercel.app");
async function getStaticPaths$1() {
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const postCount = posts.length;
  return posts.map((post, index) => ({
    params: { slug: post.slug },
    props: {
      post,
      prevPost: index + 1 !== postCount ? posts[index + 1] : null,
      nextPost: index !== 0 ? posts[index - 1] : null
    }
  }));
}
const $$slug$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$slug$1;
  const { href } = Astro2.url;
  const { post, prevPost, nextPost } = Astro2.props;
  const { title, publishDate, updatedDate, excerpt, tags = [], seo } = post.data;
  const { Content } = await post.render();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seo?.title ?? title, "description": seo?.description ?? excerpt, "image": seo?.image, "pageType": "article", "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mb-16 sm:mb-24"> <header class="mb-8"> <h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${title}</h1> <div class="mt-4 text-sm"> ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": publishDate })} ${updatedDate && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${" "}<span>
(Updated on ${renderComponent($$result3, "FormattedDate", $$FormattedDate, { "date": updatedDate })})
</span> ` })}`} </div> </header> <div class="max-w-none prose prose-dante sm:prose-lg"> ${renderComponent($$result2, "Content", Content, {})} </div> <div class="mt-8 flex flex-wrap items-center gap-6 text-sm justify-between sm:mt-12 sm:text-base"> ${tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-x-5 gap-y-1 text-sm"> ${tags.map((tag) => renderTemplate`<a class="text-main hover:underline"${addAttribute(`/tags/${slugify(tag)}`, "href")}>
#${tag} </a>`)} </div>`} ${renderComponent($$result2, "Button", $$Button, { "class": "copy-url-button", "aria-label": "Copy link", "data-url": href, "data-tooltip-default": "Copy link", "data-tooltip-success": "Copied" }, { "default": ($$result3) => renderTemplate`Share` })} </div> </article> ${(prevPost || nextPost) && renderTemplate`<div class="my-16 sm:my-24"> <h2 class="mb-12 text-xl font-serif italic sm:mb-16 sm:text-2xl">Read Next</h2> ${nextPost && renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": nextPost, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`} ${prevPost && renderTemplate`${renderComponent($$result2, "PostPreview", $$PostPreview, { "post": prevPost, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`} </div>`}` })} `;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/blog/[slug].astro", void 0);

const $$file$1 = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/blog/[slug].astro";
const $$url$1 = "/blog/[slug]";

const _slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug$1,
    file: $$file$1,
    getStaticPaths: getStaticPaths$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://zain-v4-github-io.vercel.app");
async function getStaticPaths() {
  const projects = (await getCollection("projects")).sort(sortItemsByDateDesc);
  const projectCount = projects.length;
  return projects.map((project, index) => ({
    params: { slug: project.slug },
    props: {
      project,
      prevProject: index + 1 !== projectCount ? projects[index + 1] : null,
      nextProject: index !== 0 ? projects[index - 1] : null
    }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { project, prevProject, nextProject } = Astro2.props;
  const { title, description, seo } = project.data;
  const { Content } = await project.render();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seo?.title ?? title, "description": seo?.description ?? description, "image": seo?.image, "pageType": "article", "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mb-16 sm:mb-24"> <header class="mb-8"> <h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${title}</h1> </header> <div class="max-w-none prose prose-dante sm:prose-lg"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> ${(prevProject || nextProject) && renderTemplate`<div class="my-16 sm:my-24"> <h2 class="mb-12 text-xl font-serif italic sm:mb-16 sm:text-2xl">View Next</h2> ${nextProject && renderTemplate`${renderComponent($$result2, "ProjectPreview", $$ProjectPreview, { "project": nextProject, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`} ${prevProject && renderTemplate`${renderComponent($$result2, "ProjectPreview", $$ProjectPreview, { "project": prevProject, "class": "mb-10 sm:mb-12", "headingLevel": "h3" })}`} </div>`}` })}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/projects/[slug].astro", void 0);

const $$file = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/projects/[slug].astro";
const $$url = "/projects/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Button as $, _slug_$1 as _, _slug_ as a };
