[← VSp!k home](../README.md)

# VSp!k website

A static site (HTML, CSS and a little JavaScript). Vercel serves it as-is, so there is no build step on deploy, and it loads fast.

## Pages

The site has 7 pages: Home (`/`), Services, Work, How we work (`/process`), Feed, Partners and Contact & FAQ.
The page HTML is **generated**. Don't edit `website/*.html` directly.

| Edit | Where |
|---|---|
| Shared head, menu and footer | `site-src/layout.html` |
| A page's content, title and description | `site-src/pages/<page>.html` (JSON header at the top) |
| Structured data for Google | `site-src/data/org.jsonld`, `site-src/data/faq.jsonld` |

Then rebuild from the repo root. This also regenerates `sitemap.xml`:

```
node site-src/build.mjs
```

Commit the generated files along with your source changes.

## Edit content

| What | Where |
|---|---|
| Phone, email, WhatsApp default message, partner commission numbers | `data/site.js` |
| Projects in the "Work" section | `data/projects.js` (screenshots go in `assets/work/`) |
| Reels and posts in the "Feed" section | `data/feed.js` (files go in `assets/feed/`) |
| Text, services, FAQ | `site-src/pages/*.html`, then rebuild |
| Colours, spacing, animation | `css/style.css` (tokens at the top) |

The "Work" section builds itself from `data/projects.js`. While that list is empty, it shows an honest "case studies are being written up" note.

The "Feed" section builds itself from `data/feed.js`. To add a new post or reel:

1. Copy the file into `assets/feed/`. For posts, use a 720 px wide JPEG copy of the 1080 × 1350 PNG from `marketing/instagram/` (about 60 KB instead of 500 KB). Reels can be copied as they are, plus their cover JPEG.
2. Add an entry at the top of `reels` or `posts` in `data/feed.js`, with the Instagram caption from `marketing/captions.md`. A post with several images becomes a swipeable carousel.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve website
```

## Deploy on Vercel

1. Push the repo to GitHub.
2. In Vercel, choose **Add New → Project** and import the repo.
3. Set **Root Directory** to `website`. Framework preset: **Other**. Leave the build command empty.
4. Deploy. `vercel.json` adds security headers and asset caching.
5. When you connect a domain, change `og:image` in `index.html` to the full URL (for example `https://yourdomain.in/assets/vspik-logo.png`) so link previews show the logo.

## Before going public

- Confirm the "Typical" timelines on each service card.
- Confirm the partner commission numbers in `data/site.js`. They are still a proposal.
- Test on one real Android phone and one iPhone (Quality Framework §3.7).
