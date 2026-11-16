// Builds the VSp!k website pages.
//   Source:  site-src/layout.html (shared head, header, footer)
//            site-src/pages/*.html (page content, with a JSON header in <!--page ... -->)
//            site-src/data/*.jsonld (structured data)
//   Output:  website/*.html and website/sitemap.xml
// Run from the repo root:  node site-src/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, "..", "website");
const SITE = "https://vsp-k-website.vercel.app";
const today = new Date().toISOString().slice(0, 10);

const layout = fs.readFileSync(path.join(HERE, "layout.html"), "utf8");
const NAV = ["services", "work", "process", "feed", "partners", "contact"];
const SCRIPTS = { site: "/data/site.js", projects: "/data/projects.js", feed: "/data/feed.js" };

const ld = (name) => {
  const f = path.join(HERE, "data", name + ".jsonld");
  return fs.existsSync(f) ? '<script type="application/ld+json">\n' + fs.readFileSync(f, "utf8").trim() + "\n</script>" : "";
};

const pages = fs.readdirSync(path.join(HERE, "pages")).filter((f) => f.endsWith(".html")).sort();
const urls = [];

for (const file of pages) {
  const raw = fs.readFileSync(path.join(HERE, "pages", file), "utf8");
  const m = raw.match(/^<!--page\n([\s\S]*?)\n-->\n/);
  if (!m) throw new Error(file + ": missing <!--page {json} --> header");
  const meta = JSON.parse(m[1]);
  const content = raw.slice(m[0].length);

  // every page gets the organisation data; pages can add more (e.g. faq)
  const jsonld = [ld("org"), meta.jsonld && meta.jsonld !== "org" ? ld(meta.jsonld) : ""].filter(Boolean).join("\n");
  const scripts = (meta.scripts || ["site"]).map((s) => `<script src="${SCRIPTS[s]}"></script>`).concat('<script src="/js/main.js"></script>').join("\n");

  let html = layout
    .replaceAll("{{title}}", meta.title)
    .replaceAll("{{description}}", meta.description)
    .replaceAll("{{path}}", meta.path)
    .replace("{{jsonld}}", jsonld)
    .replace("{{scripts}}", scripts)
    .replace("{{content}}", content.trim());
  for (const n of NAV) html = html.replace(`{{nav:${n}}}`, meta.nav === n ? ' aria-current="page"' : "");
  html = html.replace(/<body>/, `<body data-page="${meta.nav || "home"}">`);

  const left = html.match(/{{[^}]+}}/);
  if (left) throw new Error(file + ": unfilled placeholder " + left[0]);
  fs.writeFileSync(path.join(OUT, file), html);
  urls.push({ loc: SITE + meta.path, priority: meta.path === "/" ? "1.0" : "0.8" });
  console.log("built", file);
}

fs.writeFileSync(
  path.join(OUT, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n") +
    "\n</urlset>\n"
);
console.log("sitemap:", urls.length, "urls");
