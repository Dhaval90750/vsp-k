[← VSp!k home](../README.md)

# Templates

Reusable starters, so no project starts from a blank page. Each one is tested and passes the [quality framework](../docs/00-quality-framework.md) before it's used.

| Starter | Stack | Status |
|---|---|---|
| Business website | Static HTML/CSS/JS, the same structure as [`website/`](../website/) | Ready: copy `website/`, then change the brand tokens and content |
| Website with CMS | Next.js + Tailwind | Planned |
| Admin dashboard | Next.js + Supabase (auth, roles, tables, Excel export) | Planned |
| E-commerce | Next.js + Razorpay | Planned |
| REST API | Node (NestJS) or Python (FastAPI) | Planned |
| Data dashboard | Python / Power BI | Planned |

## Using a starter

1. Copy the starter into `clients/<client-name>/build/`, or into its own repo.
2. Replace the brand tokens (colours, fonts) at the top of the CSS.
3. Replace all content. A starter never ships with its demo text.

## Adding a starter

A starter is added only after it has been used in a real project and has passed the Definition of Done.
