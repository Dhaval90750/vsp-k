[← VSp!k home](../README.md)

# VSp!k website

A static site (HTML, CSS and a little JavaScript). There is no build step, so it loads fast and deploys anywhere.

## Edit content

| What | Where |
|---|---|
| Phone, email, WhatsApp default message, partner commission numbers | `data/site.js` |
| Projects in the "Work" section | `data/projects.js` (screenshots go in `assets/work/`) |
| Text, services, FAQ | `index.html` |
| Colours, spacing, animation | `css/style.css` (tokens at the top) |

The "Work" section builds itself from `data/projects.js`. While that list is empty, it shows an honest "case studies are being written up" note.

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
