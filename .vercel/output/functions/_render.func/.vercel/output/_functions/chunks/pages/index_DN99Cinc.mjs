import { i as createAstro, d as createComponent, g as renderTemplate, h as renderComponent, m as maybeRenderHead, j as addAttribute } from '../astro_DM9Ws_sw.mjs';
import 'kleur/colors';
import { g as getCollection, s as sortItemsByDateDesc, e as getAllTags, f as getPostsByTag, h as $$ArrowRight, $ as $$BaseLayout, i as siteConfig } from './__B2vjhCY4.mjs';
import { $ as $$Button } from './_slug__CH2XCWZB.mjs';

const $$Astro$2 = createAstro("https://zain-v4-github-io.vercel.app");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$1;
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  const tags = getAllTags(posts).sort((tagA, tagB) => {
    const postCountTagA = getPostsByTag(posts, tagA.slug).length;
    const postCountTagB = getPostsByTag(posts, tagB.slug).length;
    return postCountTagB - postCountTagA;
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Tags", "description": "", "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="mb-12 text-2xl font-serif italic sm:mb-16 sm:text-4xl">All Tags</h1> ${tags.map((tag) => {
    const postCount = getPostsByTag(posts, tag.slug).length;
    return renderTemplate`<a class="mb-10 flex justify-between items-start gap-8 group sm:mb-12"${addAttribute(`/tags/${tag.slug}`, "href")}> <div class="grow"> <h2 class="text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl"> ${tag.name} </h2> <div class="mt-1 text-sm leading-normal"> ${postCount} ${postCount === 1 ? "post" : "posts"} </div> </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
View Tag Archive ${renderComponent($$result2, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
  })}` })}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/tags/index.astro", void 0);

const $$file$1 = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/tags/index.astro";
const $$url$1 = "/tags";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://zain-v4-github-io.vercel.app");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  const hero = siteConfig.hero;
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<section class="w-full flex flex-col gap-8 mb-16 sm:mb-24">${renderTemplate`<h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${"Protecting Little Hearts: Understanding and Preventing Child Abuse"}</h1>`}${renderTemplate`<figure><img class="w-full"${addAttribute("https://americanspcc.org/wp-content/uploads/2021/03/whatischildabuse-e1616189214413.jpg", "src")} loading="lazy" decoding="async"${addAttribute(hero.image.alt , "alt")}>${hero.image.caption && renderTemplate`<figcaption class="mt-1.5 text-xs sm:text-sm">${hero.image.caption}</figcaption>`}</figure>`}${renderTemplate`<p>Child abuse is a difficult yet essential topic to address, particularly for parents, educators, and community members committed to creating a safe world for children. In this blog, we’ll explore the different forms of child abuse, recognize the signs, and discuss ways to protect vulnerable young ones. We’ll also look at <a href="#"><u><i>real-life cases of abuse</i></u></a> and delve into Esi Edugyan’s novel <a href="#"><u><i>Washington Black</i></u></a>, which sheds light on the lasting impact of abuse through the life of its young protagonist.</p>`}<br>${"Types of Child Abuse Child abuse takes many forms, and it\u2019s crucial to recognize each to better protect children:"}<h2><u>Understanding Child Abuse</u></h2><p>Child abuse takes many forms, each requiring awareness to protect children effectively:</p><ul><li><strong>Physical Abuse</strong>: Deliberate harm, like hitting or burning.</li><li><strong>Emotional Abuse</strong>: Verbal attacks, constant criticism, damaging a child’s self-worth.</li><li><strong>Neglect</strong>: Failure to provide basic needs (food, shelter, medical care).</li><li><strong>Sexual Abuse</strong>: Any sexual activity involving a child, even without physical contact.</li></ul><h2><u>Recognizing Abuse Signs</u></h2><p>Children may show signs of abuse without expressing it verbally:</p><ul><li><strong>Physical Signs</strong>: Bruises, burns, or unexplained injuries.</li><li><strong>Behavioral Changes</strong>: Withdrawal, aggression, fear of certain places.</li><li><strong>Regression</strong>: Bedwetting or developmental setbacks.</li><li><strong>Poor Hygiene</strong>: Signs of neglect, lack of access to clean clothing or food.</li></ul><p>Staying vigilant helps protect children in any environment.</p>${hero.actions && hero.actions.length > 0 && renderTemplate`<div class="flex flex-wrap gap-4">${hero.actions.map((action) => renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": action.href }, { "default": ($$result2) => renderTemplate`${action.text}` })}`)}</div>`}</section>`}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/Hero.astro", void 0);

const $$Astro = createAstro("https://zain-v4-github-io.vercel.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const posts = (await getCollection("blog")).sort(sortItemsByDateDesc);
  posts.filter(({ data }) => data.isFeatured);
  const projects = (await getCollection("projects")).sort(sortItemsByDateDesc);
  projects.filter(({ data }) => data.isFeatured);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "description": siteConfig.description, "image": siteConfig.image }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Hero", $$Hero, {})} ` })}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/index.astro", void 0);

const $$file = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index as a, index$1 as i };
