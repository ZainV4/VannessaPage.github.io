import { i as createAstro, d as createComponent, g as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_DM9Ws_sw.mjs';
import 'kleur/colors';
import { g as getCollection, $ as $$BaseLayout } from './__B2vjhCY4.mjs';

const $$Astro = createAstro("https://zain-v4-github-io.vercel.app");
async function getStaticPaths() {
  const pages = await getCollection("pages");
  return pages.map((page) => {
    return {
      params: { slug: page.slug },
      props: { page }
    };
  });
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { page } = Astro2.props;
  const { title, seo } = page.data;
  const { Content } = await page.render();
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seo?.title ?? title, "description": seo?.description, "image": seo?.image, "showHeader": false }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="mb-16 sm:mb-24"> <header class="mb-8"> <h1 class="text-3xl leading-tight font-serif font-medium sm:text-5xl sm:leading-tight">${title}</h1> </header> <div class="max-w-none prose prose-dante sm:prose-lg"> ${renderComponent($$result2, "Content", Content, {})} </div> </article> ` })}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/[...slug].astro", void 0);

const $$file = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/pages/[...slug].astro";
const $$url = "/[...slug]";

export { $$ as default, $$file as file, getStaticPaths, $$url as url };
