import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_DW6B11zy.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Thank you for reaching out. If you or someone you know is experiencing child abuse, please know that support is available. You are not alone, and there are people ready to listen and assist. Here are ways to connect with help:</p>\n<h3 id=\"email\">Email</h3>\n<p>For confidential support or to ask questions, you can email them at <a href=\"https://kidshelpphone.ca/need-help-now-text-us/\">kidshelpphone</a>. they are here to help and will respond as soon as possible.</p>\n<h3 id=\"social-media\">Social Media</h3>\n<p>If you prefer to connect on social media, you can find help on <a href=\"https://cwrp.ca/provincial-and-territorial-assistance#:~:text=Prince%20Edward%20Island-,To%20report%20suspected%20child%20maltreatment,-800-341-6868\">provincial/territorial assistance</a>. Please send a direct message, and they will respond promptly.</p>\n<h3 id=\"immediate-help\">Immediate Help</h3>\n<p>If you are in immediate danger, please contact emergency services or a local child abuse hotline for urgent support.</p>\n<p>Your safety and well-being are our priority.</p>";

				const frontmatter = {"title":"Get Help for Child Abuse","seo":{"title":"Child Abuse Support","description":"Find resources and support for child abuse concerns. Reach out through email or social media for help."}};
				const file = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/contact.md";
				const url = "/contact";
				function rawContent() {
					return "\nThank you for reaching out. If you or someone you know is experiencing child abuse, please know that support is available. You are not alone, and there are people ready to listen and assist. Here are ways to connect with help:\n\n### Email\nFor confidential support or to ask questions, you can email them at [kidshelpphone](https://kidshelpphone.ca/need-help-now-text-us/). they are here to help and will respond as soon as possible.\n\n### Social Media\nIf you prefer to connect on social media, you can find help on [provincial/territorial assistance](https://cwrp.ca/provincial-and-territorial-assistance#:~:text=Prince%20Edward%20Island-,To%20report%20suspected%20child%20maltreatment,-800-341-6868). Please send a direct message, and they will respond promptly.\n\n### Immediate Help\nIf you are in immediate danger, please contact emergency services or a local child abuse hotline for urgent support.\n\nYour safety and well-being are our priority.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":3,"slug":"email","text":"Email"},{"depth":3,"slug":"social-media","text":"Social Media"},{"depth":3,"slug":"immediate-help","text":"Immediate Help"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
