import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, s as spreadAttributes, e as renderSlot } from './astro/server_D34pVGWb.mjs';
import 'clsx';

const $$Astro = createAstro("https://vannessapage-6tfxyjhr4-zainv4s-projects.vercel.app");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, class: className, ...rest } = Astro2.props;
  const buttonClasses = "inline-flex items-center justify-center px-6 py-2 font-serif text-sm leading-tight italic  text-main bg-main border border-main rounded-full transition hover:bg-muted";
  return renderTemplate`${href ? renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</a>` : renderTemplate`<button${addAttribute([buttonClasses, className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</button>`}`;
}, "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/components/Button.astro", void 0);

export { $$Button as $ };
