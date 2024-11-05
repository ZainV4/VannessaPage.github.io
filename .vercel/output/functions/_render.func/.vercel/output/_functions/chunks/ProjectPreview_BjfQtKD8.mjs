import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderComponent } from './astro/server_D34pVGWb.mjs';
import 'kleur/colors';
import { $ as $$ArrowRight } from './ArrowRight_D1OIaL3y.mjs';

const $$Astro = createAstro("https://vannessapage-6tfxyjhr4-zainv4s-projects.vercel.app");
const $$ProjectPreview = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProjectPreview;
  const { project, class: className, headingLevel = "h2" } = Astro2.props;
  const { title, description } = project.data;
  const TitleTag = headingLevel;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(["flex justify-between items-start gap-8 group", className], "class:list")}${addAttribute(`/projects/${project.slug}/`, "href")}> <div class="grow"> ${renderComponent($$result, "TitleTag", TitleTag, { "class": "text-xl leading-tight font-serif font-medium group-hover:underline group-hover:decoration-dashed group-hover:underline-offset-4 group-hover:decoration-1 sm:text-2xl" }, { "default": ($$result2) => renderTemplate`${title}` })} ${description && renderTemplate`<div class="mt-1 text-sm leading-normal">${description}</div>`} </div> <div class="hidden font-serif italic opacity-0 transition group-hover:opacity-100 sm:inline-flex sm:gap-1 sm:items-center sm:shrink-0">
View Project ${renderComponent($$result, "ArrowRight", $$ArrowRight, { "class": "fill-current w-4 h-4" })} </div> </a>`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/ProjectPreview.astro", void 0);

export { $$ProjectPreview as $ };
