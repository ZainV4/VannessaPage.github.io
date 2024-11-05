import { a as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_D34pVGWb.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p><img src=\"/imageOfmyLove.jpg\" alt=\"Vanessa Lu enjoying a book\"></p>\n<h2 id=\"vanessa-lu---student-at-victoria-park-collegiate-institute\">Vanessa Lu - Student at Victoria Park Collegiate Institute</h2>\n<p><strong>Hello!</strong> I’m Vanessa Lu, a proud and enthusiastic student at Victoria Park Collegiate Institute. My passions include reading, writing, and exploring the fascinating worlds of biology and chemistry. I’m dedicated to learning and enjoy diving deep into subjects that challenge and inspire me.</p>\n<h2 id=\"a-love-for-books-and-writing\">A Love for Books and Writing</h2>\n<p>Books are my constant companions. Whether it’s discovering new authors or revisiting classics, reading fuels my imagination and broadens my understanding of the world. Writing is equally important to me; it allows me to express my thoughts and share my perspective.</p>\n<h2 id=\"interest-in-biology-and-chemistry\">Interest in Biology and Chemistry</h2>\n<p>I’m deeply interested in the sciences, especially biology and chemistry. Learning about how life functions at a molecular level and understanding the intricacies of chemical reactions excites me. These subjects not only satisfy my curiosity but also motivate me to consider a future career in science or healthcare.</p>\n<h2 id=\"embracing-learning-and-growth\">Embracing Learning and Growth</h2>\n<p>At Victoria Park Collegiate, I’m constantly inspired by my teachers and peers to push myself academically. Each day presents a new opportunity to grow and learn, and I’m committed to making the most of my education.</p>\n<h2 id=\"looking-forward\">Looking Forward</h2>\n<p>As I continue my journey, I hope to connect with others who share my passion for learning, literature, and science. Feel free to reach out if you’d like to discuss books, science, or just exchange ideas!</p>\n<p><em>Let’s inspire each other and make a positive impact!</em></p>";

				const frontmatter = {"title":"About","seo":{"title":"About Me","description":"Learn more about Vanessa Lu, a dedicated student with a love for learning and creativity.","image":{"src":"/about.jpeg","alt":"A person reading a book at a desk"}}};
				const file = "C:/Users/iyoun/Desktop/dante-astro-theme-v0.0.1/dante-astro-theme-main/src/content/pages/about.md";
				const url = "/about";
				function rawContent() {
					return "\n![Vanessa Lu enjoying a book](/imageOfmyLove.jpg)\n\n## Vanessa Lu - Student at Victoria Park Collegiate Institute\n\n**Hello!** I'm Vanessa Lu, a proud and enthusiastic student at Victoria Park Collegiate Institute. My passions include reading, writing, and exploring the fascinating worlds of biology and chemistry. I'm dedicated to learning and enjoy diving deep into subjects that challenge and inspire me.\n\n## A Love for Books and Writing\n\nBooks are my constant companions. Whether it’s discovering new authors or revisiting classics, reading fuels my imagination and broadens my understanding of the world. Writing is equally important to me; it allows me to express my thoughts and share my perspective.\n\n## Interest in Biology and Chemistry\n\nI'm deeply interested in the sciences, especially biology and chemistry. Learning about how life functions at a molecular level and understanding the intricacies of chemical reactions excites me. These subjects not only satisfy my curiosity but also motivate me to consider a future career in science or healthcare.\n\n## Embracing Learning and Growth\n\nAt Victoria Park Collegiate, I’m constantly inspired by my teachers and peers to push myself academically. Each day presents a new opportunity to grow and learn, and I’m committed to making the most of my education.\n\n## Looking Forward\n\nAs I continue my journey, I hope to connect with others who share my passion for learning, literature, and science. Feel free to reach out if you’d like to discuss books, science, or just exchange ideas!\n\n_Let’s inspire each other and make a positive impact!_\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [{"depth":2,"slug":"vanessa-lu---student-at-victoria-park-collegiate-institute","text":"Vanessa Lu - Student at Victoria Park Collegiate Institute"},{"depth":2,"slug":"a-love-for-books-and-writing","text":"A Love for Books and Writing"},{"depth":2,"slug":"interest-in-biology-and-chemistry","text":"Interest in Biology and Chemistry"},{"depth":2,"slug":"embracing-learning-and-growth","text":"Embracing Learning and Growth"},{"depth":2,"slug":"looking-forward","text":"Looking Forward"}];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
