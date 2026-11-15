[← Docs](README.md)

# VSp!k Brand Direction (draft for approval)

| Item | Value |
|---|---|
| Status | **Draft.** Pick one logo concept and one palette before any website or post work starts (Quality Framework §3.3) |
| Preview | Open [`brand/brand-board.html`](../brand/brand-board.html) in a browser |

## 0. Decision (2026-11-15)

**Chosen logo: the cut-paper wordmark.** "VSp!k" is spelled in torn paper tiles (ink, paper, kraft, paper), and the "!" is the original spike-bang from concept A on a Signal-red tile. The "!" tile alone is the icon.

Files in `brand/logo/`. The letters are converted to vector shapes, so they need no font installed. SVG plus PNG for each:

| File | Use |
|---|---|
| `vspik-logo` | Default, on light backgrounds (with paper shadow) |
| `vspik-logo-flat` | Print, invoices, proposals (no shadow) |
| `vspik-logo-on-dark` | On dark backgrounds |
| `vspik-logo-mono` | Single-colour contexts |
| `vspik-icon` | App icon / favicon (rounded) |
| `vspik-icon-square` | Instagram and LinkedIn avatar (they crop it to a circle) |
| `vspik-icon-paper` | Icon on light backgrounds, post corners |

The accent colour is Signal for now. Volt can still be swapped in.

## 1. What the brand has to say

- **Fast** delivery: we ship in days, not months.
- **Solid** work: it actually works, on real phones, for real customers.
- **Direct** people: no agency jargon, clear prices, clear dates.

The name already does half the work. "Spike" suggests a sharp rise and something pointed. The "!" adds urgency. The identity should use that idea rather than add a generic rocket or lightning bolt.

## 2. Tone of voice

| We sound like | We avoid |
|---|---|
| "Your site, live by Friday." | "We elevate your digital presence." |
| "₹X, fixed. Content changes after launch: ₹Y per hour." | "Affordable solutions tailored to your needs." |
| "Here's what we built for a Nashik bakery." | "Trusted by hundreds of businesses worldwide." |

Short sentences. Concrete numbers. Name the customer and the result.

## 3. Logo concepts

All three are drafts. The final logo will be redrawn as outlined vector paths, not live text.

| | Concept | Idea | Strength | Risk |
|---|---|---|---|---|
| A | **Spike-bang** | The "!" redrawn as a sharp downward spike with a square dot, tilted forward | Very ownable; works alone as an app icon or avatar | Needs the wordmark next to it until people know the brand |
| B | **V-rise** | A "V" whose right arm shoots up past the left, like a chart spike or a tick mark | Says "delivered" and "growth" at once | Tick marks are common; must be drawn carefully to stay distinct |
| C | **Wordmark** | "VSp!k" set tight, the "!" replaced by the spike from A in the accent colour | Name is always visible; simplest to use | Less memorable as a small icon |

**Recommendation: A + C together.** Concept C is the main logo, and the spike-bang from A is the icon for social avatars, the favicon and post corners.

## 4. Palette (pick one)

| Role | Option 1: Ink + Signal | Option 2: Ink + Volt |
|---|---|---|
| Text / dark | `#15171C` | `#15171C` |
| Background | `#F3F0E8` warm paper | `#F3F0E8` warm paper |
| Accent | `#E5482B` signal red-orange | `#C8F031` volt lime |
| Muted | `#6B6A66` | `#6B6A66` |
| Lines | `#DAD5C9` | `#DAD5C9` |

Why these colours: a warm off-white with near-black reads as a confident print studio, not a SaaS template. One loud accent is used sparingly, only for the "!" and the single primary action. There is no gradient.

- Option 1 feels urgent and energetic. Accessibility note: `#E5482B` on paper passes AA for large text only, so body-size red text uses a darker shade (`#B8341C`).
- Option 2 feels technical and fresh. Accessibility note: lime fails as text on light backgrounds, so it is used only as a fill behind dark text, or on dark backgrounds.

## 5. Typography

| Use | Typeface | Why |
|---|---|---|
| Headings + logo | **Bricolage Grotesque** (Google Fonts, free) | Has character in its wide, slightly quirky shapes, and isn't the overused Inter/Poppins look |
| Body + UI | **Instrument Sans** (Google Fonts, free) | Clean and very readable at 16 px on phones |
| Code / labels | **JetBrains Mono** | For small technical labels in posts ("48h", "v1.0 live") |

## 6. Visual system for posts

- 1080 × 1350 (4:5) for Instagram feed, 1080 × 1080 for carousels, 1200 × 1500 for LinkedIn documents.
- Warm paper background, black type, one accent element per post.
- Spike-bang icon in the same corner on every post.
- Real screenshots shown inside a plain device or browser frame. No floating 3D phones.
