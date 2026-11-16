[← Docs](README.md)

# VSp!k Design System and UI/UX Guide

| Item | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-11-16 |
| Applies to | Every website, app and dashboard VSp!k designs or builds, plus our own brand work |
| Works with | [00-quality-framework.md](00-quality-framework.md) (what "done" means) and [01-brand-direction.md](01-brand-direction.md) (VSp!k's own brand) |

**How to read this.** Rules marked with a source link come from W3C, MDN, web.dev, Material Design, Apple, Nielsen Norman Group or the GOV.UK Design System. Rules marked **(studio rule)** are our own decisions where no authoritative number exists. Follow both.

---

## Contents

1. [Principles](#1-principles)
2. [Choosing a visual style](#2-choosing-a-visual-style)
3. [Foundations: colour, type, spacing, grid, shape, elevation, texture, icons](#3-foundations)
4. [Motion system](#4-motion-system)
5. [3D effects](#5-3d-effects)
6. [Components](#6-components)
7. [States: empty, loading, error, success](#7-states)
8. [Content and UX writing](#8-content-and-ux-writing)
9. [Accessibility checklist (WCAG 2.2 AA)](#9-accessibility-checklist-wcag-22-aa)
10. [Performance budgets](#10-performance-budgets)
11. [Project setup and review checklists](#11-project-setup-and-review-checklists)
12. [Sources](#12-sources)

---

## 1. Principles

1. **Clarity beats decoration.** Every visual effect must help someone understand, find or do something. If it doesn't, remove it.
2. **One loud thing per screen.** One primary action, one accent colour moment, one expressive animation.
3. **Signifiers are not optional.** Anything clickable must look clickable. Flat design is fine; flat design without signifiers costs users effort ([NN/g](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)).
4. **Motion explains, it doesn't perform.** Animate to show where something came from, what changed, or that something worked.
5. **Accessible by default.** Contrast, focus, keyboard and reduced motion are designed in from the start, not fixed at the end.
6. **Same thing, same look, same behaviour.** One button style per role, one icon set, one way to show errors, across the whole product.

---

## 2. Choosing a visual style

Pick **one base style** per project and at most **one accent style**. Write the choice into the project's brand direction before building.

### 2.1 Style library

| Style | What it looks like | Use when | Avoid when | Accessibility watch-outs |
|---|---|---|---|---|
| **Semi-flat (Flat 2.0)** | Mostly flat colour, subtle shadows and layers to show depth | Default for app UI, dashboards and admin panels | Rarely wrong | Make sure buttons and links still look clickable ([NN/g](https://www.nngroup.com/articles/flat-design/)) |
| **Flat** | Solid colour, no depth at all | Icons, illustrations, very simple marketing pages | Interactive UI with many controls | Weak signifiers ([NN/g](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/)) |
| **Neo-brutalism** | Thick black borders, hard offset shadows (no blur), 2–3 loud colours, bold type, monospace accents | Brands that want to feel direct, young and confident: studios, startups, creators | Banking, healthcare, luxury, older audiences | Some vivid colour pairs fail contrast; can overwhelm without whitespace ([NN/g](https://www.nngroup.com/articles/neobrutalism/)) |
| **Paper-cut / collage** | Torn paper tiles, tape, slight rotations, layered shadows, grain | Playful brands, food, kids, events, creative work. Our own brand | Data-heavy screens, forms, anything that needs precision | Decoration only: rotation, tape and torn edges must never carry meaning or state **(studio rule)** |
| **Swiss / International** | Strict grid, sans-serif type, hierarchy through size and whitespace, asymmetric layouts | Corporate, architecture, B2B, portfolios, documentation | Brands needing warmth or playfulness | Low risk; check small grey text contrast |
| **Skeuomorphism** | Objects imitate real ones (notebook, dial, card) | When the real-world metaphor teaches how something works ([NN/g](https://www.nngroup.com/articles/flat-design/)) | Decoration for its own sake ("realism") | Texture behind text lowers contrast |
| **Claymorphism** | Puffy, soft 3D shapes with inner and outer shadows | Illustrations, kids' brands, playful hero art | Controls and form fields | Same contrast risk as neumorphism **(studio rule)** |
| **Glassmorphism** | Frosted, blurred translucent panels | Sparingly, over controlled, simple backgrounds | Text-heavy panels, busy photo backgrounds | Text becomes unreadable over busy areas; respect reduce-transparency settings ([NN/g](https://www.nngroup.com/articles/glassmorphism/)). **On our "AI look" ban list unless there's a reason** |
| **Neumorphism** | Soft extruded shapes in the same colour as the background | Decorative surfaces only | Any button, toggle or input | Controls usually fail 3:1 non-text contrast, and on/off states are hard to tell apart. Add a visible border if used at all ([secondary source](https://blog.logrocket.com/ux-design/neumorphism-ui-design)) |
| **Risograph / halftone** | Grainy 2–3 colour print look, slight misregistration | Posters, social posts, editorial headers | Body text and UI | Grain under text reduces legibility |
| **Isometric** | 3D drawn at a fixed angle | Explaining systems, processes, products | Small screens with dense detail | Provide text equivalents for diagrams |

### 2.2 Style recipes

**VSp!k house style = paper-cut + neo-brutalism + physics motion.**

| Layer | Rule |
|---|---|
| Surfaces | Warm paper background, card white, kraft accent |
| Borders | 2 px ink on interactive elements and cards |
| Shadows | Hard offset, no blur: 4 px default, 6 px hover, 10 px for hero cards |
| Paper effects | Rotation (−3° to +3°), tape and torn edges on decorative and marketing elements only, never on form fields or tables |
| Accent | One accent colour (Signal red), used for the primary action and the "!" |
| Motion | Expressive tier for hero and drop-ins, subtle tier everywhere else |

**Client recipes.** Pick one per project:

| Recipe | Base + accent | Good for |
|---|---|---|
| Clean business | Semi-flat + Swiss | Clinics, CAs, B2B, manufacturers |
| Bold modern | Neo-brutalism + semi-flat | Startups, agencies, creators, gyms |
| Warm and crafted | Paper-cut + semi-flat | Food, bakeries, events, kids, NGOs |
| Premium calm | Swiss + subtle skeuomorphic photography | Hotels, real estate, salons |
| Data and admin | Semi-flat only | Dashboards, internal tools, admin panels |

---

## 3. Foundations

All foundations are **design tokens** (CSS custom properties). Never hard-code a colour, size or duration in a component.

### 3.1 Colour

| Role | Token | VSp!k value | Rule |
|---|---|---|---|
| Text / ink | `--ink` | `#15171C` | Body text on light backgrounds |
| Secondary text | `--ink-2`, `--muted` | `#2B2E36`, `#5E5D59` | Muted text must still reach 4.5:1 |
| Background | `--paper` | `#F3F0E8` | Page background |
| Surface | `--card` | `#FBFAF6` | Cards, inputs, tables |
| Line | `--line` | `#DAD5C9` | Dividers only, never the only boundary of a control |
| Accent | `--accent` | `#E5482B` | Primary action, key highlight. Large text and fills only |
| Accent text | `--accent-text` | `#B8341C` | Accent-coloured text at body size |
| Success / warning / danger / info | `--ok`, `--warn`, `--danger`, `--info` | Set per project | Always paired with an icon or text, never colour alone |

**Contrast** ([WCAG 2.2](https://www.w3.org/TR/WCAG22/)):
- Text **4.5:1**; large text (≥ 24 px, or ≥ 18.66 px bold) **3:1** (1.4.3, AA).
- UI component boundaries, icons and states **3:1** against neighbours (1.4.11, AA).
- Never use colour as the only signal (1.4.1, A): add text, an icon or a pattern.

### 3.2 Typography

| Token | Size (desktop / phone) | Use |
|---|---|---|
| `display` | clamp(44 px → 88 px) | Home hero only |
| `h1` | clamp(36 px → 72 px) | One per page |
| `h2` | clamp(30 px → 56 px) | Section titles |
| `h3` | 22–28 px | Card and block titles |
| `body-lg` | 18–20 px | Lead paragraphs |
| `body` | 16–17 px | Default. **Never below 16 px on phones** **(studio rule)** |
| `small` | 14–15 px | Secondary info |
| `label` | 11–13 px mono, uppercase, letter-spacing 0.08em | Kickers, tags, metadata |

Rules:
- Line length 45–75 characters for paragraphs (`max-width: 60ch`) **(studio rule)**.
- Line height 1.5–1.6 for body, 1.0–1.15 for display headings.
- Maximum **2 typefaces** plus 1 mono. VSp!k: Bricolage Grotesque (display), Instrument Sans (body), JetBrains Mono (labels).
- Use tabular figures (`font-variant-numeric: tabular-nums`) in tables, prices and stats.

### 3.3 Spacing

Use a **4 px base, 8 px rhythm**: `4, 8, 12, 16, 24, 32, 48, 64, 96`. This is Material's 8 dp grid with a 4 dp half-step **(studio rule, based on the known Material convention)**.

| Space | Use |
|---|---|
| 4–8 | Inside chips, between an icon and its label |
| 12–16 | Inside buttons and inputs, between related fields |
| 24–32 | Card padding, between groups |
| 48–64 | Between sections on phones |
| 64–96 | Between sections on desktop |

### 3.4 Layout, grid and breakpoints

Breakpoints follow window size classes ([Android](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes); dp ≈ CSS px):

| Class | Width | Layout |
|---|---|---|
| Compact (phones) | < 600 px | 1 column, 16 px side gutter |
| Medium (tablets) | 600–839 px | 2 columns |
| Expanded (small laptops) | 840–1199 px | 2–3 columns, full navigation |
| Large | 1200–1599 px | 3–4 columns |
| Extra-large | ≥ 1600 px | Content max-width (VSp!k: 1760 px), gutters `clamp(16px, 4.5vw, 88px)` |

Rules:
- Mobile-first CSS. Test at **320, 360, 768, 1280 and 1920 px**.
- **No horizontal scrolling** at any width (except inside a data table container).
- Full-bleed backgrounds; text blocks keep a readable max-width.

### 3.5 Shape and borders

| Token | Value | Use |
|---|---|---|
| `radius-0` | 0 | Neo-brutal and paper styles (VSp!k) |
| `radius-sm` | 6–8 px | Inputs, chips (semi-flat recipes) |
| `radius-md` | 12–16 px | Cards (semi-flat recipes) |
| `radius-full` | 999 px | Avatars, pills, round icon buttons |
| `border` | 1.5–2 px | Interactive elements need a boundary of 3:1 contrast |

### 3.6 Elevation (shadows)

| Level | Neo-brutal / paper | Semi-flat | Use |
|---|---|---|---|
| 0 | none | none | Page, flat sections |
| 1 | `4px 4px 0 ink` | `0 1px 2px rgb(0 0 0 / .08)` | Cards, buttons |
| 2 | `6px 6px 0 ink` | `0 4px 12px rgb(0 0 0 / .12)` | Hover, raised cards |
| 3 | `10px 10px 0 accent` | `0 12px 32px rgb(0 0 0 / .18)` | Hero cards, dialogs |

- Hard (blur-free) shadows are cheaper to paint than blurred ones ([web.dev](https://web.dev/articles/animations-guide)).
- **Don't animate `box-shadow` directly.** For a "press" effect, move the element with `transform` towards a static shadow, or put the shadow on a pseudo-element and animate that with `transform` ([web.dev](https://web.dev/articles/animations-guide)).

### 3.7 Texture (paper grain)

- Use a small tiled noise image with plain `opacity` (0.08–0.14) and `pointer-events: none`.
- **Avoid `mix-blend-mode` on large or many layers.** There are reports of scroll lag with big blend layers ([Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1684781)). If you use it, use it once, page-wide, and profile it on a low-end phone.
- **Never put grain, `filter`, `opacity < 1`, `clip-path`, `mix-blend-mode` or `overflow: hidden` inside a 3D (`preserve-3d`) element.** They flatten the 3D ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)).

### 3.8 Icons

- **One icon set per project** (VSp!k sites: Lucide, or our own inline SVG set). Never mix sets.
- Sizes: 16 px (inline with small text), 20 px (buttons, inputs), 24 px (navigation, standalone). Stroke width consistent (1.5–2 px).
- Decorative icons get `aria-hidden="true"`. An icon-only button needs an accessible name (`aria-label`).
- Emoji are fine in social copy, but not as UI icons. They render differently on every device **(studio rule)**.

---

## 4. Motion system

### 4.1 Motion tiers

Every animation must belong to one tier. Decide the tier **before** animating.

| Tier | Feel | Duration | Easing / spring | Use for |
|---|---|---|---|---|
| **0 · None** | Instant | 0 ms | — | Reduced-motion users; data updates in tables; typing |
| **1 · Subtle** (default) | Calm, quick, no bounce | 100–200 ms | `standard` `cubic-bezier(0.2,0,0,1)`; spring damping 0.9 | Hover, focus, toggles, button press, colour changes, dropdown open |
| **2 · Smooth** | Clear movement | 200–400 ms | `emphasized-decelerate` in `(0.05,0.7,0.1,1)`, `standard-accelerate` out `(0.3,0,1,1)` | Dialogs, drawers, page sections revealing, accordions |
| **3 · Expressive ("hard")** | Physical: drop, bounce, settle | 400–800 ms | Spring damping 0.6–0.8 (visible overshoot); e.g. `cubic-bezier(.2,.9,.25,1.25)` | Hero entrances, logo tiles, celebrations, success moments. **Max one per screen** **(studio rule)** |

Sources: durations ([NN/g](https://www.nngroup.com/articles/animation-duration/)); easing and duration tokens ([Material 3 tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss)); spring values ([Material 3 Expressive](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt)).

### 4.2 Duration rules

- Small feedback (checkbox, toggle): **~100 ms**. Larger changes (dialog): **200–300 ms**. Above ~**500 ms** UI motion starts to feel like a drag ([NN/g](https://www.nngroup.com/articles/animation-duration/)).
- **Exits are faster than entrances**, e.g. 300 ms in, 200–250 ms out ([NN/g](https://www.nngroup.com/articles/animation-duration/)).
- Material duration tokens: short 50–200 ms, medium 250–400 ms, long 450–600 ms, extra-long 700–1000 ms ([source](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss)).

### 4.3 Easing and springs

| Token | Value | When |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Most UI movement |
| `--ease-enter` | `cubic-bezier(0.05, 0.7, 0.1, 1)` | Things arriving on screen |
| `--ease-exit` | `cubic-bezier(0.3, 0, 1, 1)` | Things leaving |
| `--ease-spring` | `cubic-bezier(0.2, 0.9, 0.25, 1.25)` | Expressive tier only (overshoot) |

- **Opacity and colour never bounce.** Effect springs use damping 1.0 ([Material 3](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt)).
- Never use `linear` easing for UI movement. It's fine for progress bars, spinners and marquees.

### 4.4 Choreography

- **Stagger:** 30–90 ms between items, and keep the total under ~500 ms **(studio rule)**. Stagger at most the first ~6 items; the rest appear together.
- Animate in reading order: top to bottom, left to right.
- One focal animation at a time. Don't run a hero animation and a marquee and a counter all at once.
- Scroll reveals happen **once**, not every time the element re-enters the screen.

### 4.5 What to animate

- Only **`transform` and `opacity`** for movement. Don't animate `top`, `left`, `width`, `height`, `margin` or `box-shadow` ([web.dev](https://web.dev/articles/animations-guide)).
- `will-change` only just before an animation, and remove it after ([web.dev](https://web.dev/articles/animations-guide)).
- Transform animations don't count towards **CLS**; layout-moving animations do ([web.dev CLS](https://web.dev/articles/optimize-cls)).
- Respond to every click or tap **on the next frame** (pressed state first, then the work). This protects **INP** ([web.dev INP](https://web.dev/articles/inp)).

### 4.6 Reduced motion and auto-playing motion

- Wrap tier 2 and 3 motion in `@media (prefers-reduced-motion: no-preference)`, or turn it off under `reduce`. Under `reduce`, **replace movement with a fade**; don't remove the feedback itself ([web.dev](https://web.dev/articles/prefers-reduced-motion)).
- JavaScript animations must check `matchMedia('(prefers-reduced-motion: reduce)')` and listen for changes ([web.dev](https://web.dev/articles/prefers-reduced-motion)).
- **WCAG 2.2.2 Pause, Stop, Hide (A):** anything that moves automatically for more than 5 seconds alongside other content (marquees, carousels, looping animations) needs a way to pause it ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)). Marquees must pause on hover **and** stop under reduced motion.
- **WCAG 2.3.3 Animation from Interactions (AAA, we follow it):** motion triggered by interaction, such as parallax and tilt, can be turned off ([W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)).
- Never flash more than 3 times per second (2.3.1, A).

---

## 5. 3D effects

### 5.1 Allowed 3D effects

| Effect | Tier | Rules |
|---|---|---|
| **Tilt on hover** (card follows the mouse) | 1–2 | Mouse only: `@media (hover: hover) and (pointer: fine)`. Max **10°** rotation **(studio rule)**. Animate `transform` only; update in `requestAnimationFrame`. Off under reduced motion. Springs back on leave |
| **Flip card** (front/back) | 2 | Must be a `<button>` with `aria-pressed` so it works by keyboard. Both faces must be readable by screen readers. Never hide essential info only on the back |
| **Perspective tiles / logo** | 3 | Hero only. Purely decorative (`aria-hidden` or labelled once) |
| **Layered depth / parallax** | 2 | Small offsets (≤ 40 px). Off under reduced motion (parallax is a common vestibular trigger, [W3C](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)) |
| **Unfold / fold reveal** (`rotateX` from −80°) | 2 | Section reveals only, once per element |
| **Menu unfold** (`rotateX` from −90°) | 2 | Mobile menu only, 300–450 ms |

### 5.2 How to build it

```css
.scene { perspective: 1000px; }                      /* on the parent */
.card3d { transform-style: preserve-3d; transition: transform .6s var(--ease-spring); }
.face { backface-visibility: hidden; position: absolute; inset: 0; }
.back { transform: rotateY(180deg); }                 /* pre-rotate the back face */
```

- `backface-visibility` only works with 3D transforms ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility)).
- These **flatten** a 3D chain, so keep them off `preserve-3d` elements: `overflow` (other than visible/clip), `opacity < 1`, `filter`, `clip-path`, `mask`, `mix-blend-mode`, `isolation: isolate` and `contain: paint` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style)).

### 5.3 When 3D hurts

- On forms, tables, checkout and reading content: **never use 3D there**.
- On touch devices: no tilt (there's no hover). Flip only on an explicit tap.
- Many large 3D layers on low-end phones: cap at a few per screen and test on a real budget Android phone.

---

## 6. Components

Every component is built once, with all its states, and reused everywhere.

### 6.1 Buttons

**Hierarchy**

| Type | Look (VSp!k house style) | Rule |
|---|---|---|
| **Primary** | Accent fill, ink border, hard shadow | **One per screen or section.** The main thing you want people to do |
| **Secondary** | Card fill, ink border, hard shadow | Alternative actions |
| **Tertiary / text** | Text with underline or arrow | Low-emphasis actions, "Learn more" |
| **Destructive** | Danger colour **plus** a clear verb ("Delete project") | Always confirm, or offer undo |
| **Icon button** | Square or circle, ≥ 44 px | Needs an `aria-label` |

**Sizes**

| Size | Height | Use |
|---|---|---|
| Large | 52–56 px | Hero and page-level calls to action |
| Medium | 44–48 px | Default |
| Small | 36–40 px, with a ≥ 44 px hit area | Dense toolbars, tables (desktop) |

**States.** Every button has all of these:

| State | What changes | Rule |
|---|---|---|
| Default | — | Label is a verb: "Get a quote", not "Submit" |
| Hover | Lifts (translate −2 px) and the shadow grows | Mouse only |
| Focus-visible | Visible outline in the accent colour, offset 3 px | Must differ from the default border; ≥ 2 px, 3:1 contrast ([2.4.7 AA](https://www.w3.org/TR/WCAG22/), [2.4.13 AAA](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html)) |
| Active / pressed | Moves into the shadow (translate +3 px, smaller shadow) | Shows on the next frame |
| Disabled | Lower contrast, no shadow, `aria-disabled` or `disabled` | Explain why nearby. Prefer hiding over showing a disabled "coming soon" |
| Loading | Spinner + "Sending…", same width, `aria-busy="true"` | Prevent double submits |

**Target sizes:** at least **24×24 px** (WCAG 2.5.8, AA, [W3C](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)). **Our rule is 44×44 px** on touch, which matches WCAG 2.5.5 AAA, [Apple's 44 pt](https://developer.apple.com/design/tips/) and close to [Android's 48 dp](https://developer.android.com/guide/topics/ui/accessibility/apps).

**Links vs buttons:** a link goes somewhere (`<a href>`); a button does something (`<button>`). Never use a `<div>` as a button.

### 6.2 Forms

**Labels and help**
- Every field has a **visible label above it**. Never use a placeholder as the only label: it disappears, is hard to review and is often low-contrast ([NN/g](https://www.nngroup.com/articles/form-design-placeholders/)).
- Hint text sits between the label and the field.
- Mark required fields clearly ("Required" or an asterisk with a legend), or mark optional fields when most are required ([NN/g](https://www.nngroup.com/articles/required-fields/)).
- Use the right `type` and `autocomplete` (`email`, `tel`, `name`, `postal-code`). This is required for personal data fields (1.3.5 AA, [W3C](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)).
- One column of fields. Group related fields with `<fieldset>` and `<legend>`.
- Input height ≥ 44 px, text ≥ 16 px (this also stops iOS zooming in).

**Validation** ([GOV.UK](https://design-system.service.gov.uk/patterns/validation/)):
- Validate **on submit**, not on every keystroke or blur.
- If there are errors, show an **error summary at the top**, move focus to it, and prefix the page title with "Error: ".
- Show each error **next to its field**, after the hint, with a red border **and** text. Use specific wording ("Enter your phone number", not "Invalid input") ([GOV.UK](https://design-system.service.gov.uk/components/error-message/)).
- Keep everything the user typed.
- Always validate again on the server.

**Choosing a selection control**

| Need | Use | Notes |
|---|---|---|
| Pick 1 of 2–6 options | **Radio buttons** | All options visible at once. GOV.UK prefers these over a dropdown ([GOV.UK](https://design-system.service.gov.uk/components/select/)) |
| Pick several of a few | **Checkboxes** | Never `select multiple` |
| Pick 1 of 7–15 | **Native `<select>`** | Free accessibility and mobile pickers |
| Pick 1 of many (long list, searchable) | **Combobox / autocomplete** | Follow the [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/): Down arrow opens, Esc closes, Enter selects, focus stays in the input |
| Choose an **action** (Edit, Duplicate, Delete) | **Menu button** | Not a select. Follow the [APG menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) |
| A setting that applies immediately | **Toggle switch** | Applies instantly. If it needs "Save", use a checkbox ([NN/g](https://www.nngroup.com/articles/toggle-switch-guidelines/), [APG switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)) |
| Visual choice (topic, size, colour) | **Chips / segmented buttons** | Built as radios or checkboxes underneath (VSp!k contact form topics) |

**Dropdown rules:** the open state has a clear border and shadow, sits above the content (z-index layer "overlay"), stays within the screen, closes on Esc and outside click, and returns focus to the trigger.

### 6.3 Data tables

| Rule | Detail |
|---|---|
| Use a table for | Comparing values across rows and columns. Not for layout |
| Header | `<th scope="col">`, sticky on long tables, with a subtle shadow on the frozen edge ([NN/g](https://www.nngroup.com/articles/data-tables/)) |
| Alignment | Text left, **numbers and money right**, with tabular figures. Headers align with their column's content |
| Rows | Zebra striping **or** light row lines, plus a row hover on desktop ([NN/g](https://www.nngroup.com/articles/data-tables/)) |
| Density | Comfortable 52–56 px rows by default; compact 40 px only for expert/admin views **(studio rule)** |
| Sorting | A button inside the header with a sort icon; `aria-sort` on the sorted column ([APG table](https://www.w3.org/WAI/ARIA/apg/patterns/table/)) |
| Filters | Above the table; show active filters as removable chips |
| Row actions | Final column, as icon buttons with labels, or a "⋯" menu button |
| Selection | Checkbox in the first column; a bulk-action bar appears when rows are selected |
| Empty / loading / error | Designed states inside the table area (see §7) |
| Phones | Either a horizontally scrolling container with the first column sticky, **or** stack each row into a card (label: value). Choose stacking when people read one row at a time **(studio rule)** |
| Pagination | Prefer pagination or "Load more" over infinite scroll for anything people search, compare or come back to ([NN/g](https://www.nngroup.com/articles/infinite-scrolling-tips/)) |

**Comparison tables** (like "VSp!k vs the usual"): highlight the recommended column with colour **and** a ✓ icon plus text.

### 6.4 Navigation

| Component | Rules |
|---|---|
| **Header** | Logo links home. 4–6 links maximum. The current page is marked with `aria-current="page"` and a visible underline. Sticky is fine, but it must not hide focused elements (2.4.11 AA) |
| **Mobile menu** | A disclosure button with `aria-expanded` ([APG disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)). Closes on Esc and on link click. Primary CTAs inside it, full-width |
| **Breadcrumbs** | For pages 2+ levels deep. `nav aria-label="Breadcrumb"`, with the last item `aria-current="page"` ([APG](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)) |
| **Tabs** | For switching views of the same content. Arrow keys move between tabs, Tab enters the panel ([APG tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)). Don't use tabs for steps in a process |
| **Pagination** | `nav aria-label="Pagination"`; hide "Previous" on page 1 and "Next" on the last page; put the page number in the `<title>`; no pagination for a single page ([GOV.UK](https://design-system.service.gov.uk/components/pagination/)) |
| **Stepper** | For multi-step flows (checkout, onboarding): show step N of M with names, allow going back, save progress **(studio rule)** |
| **Footer** | Repeat the main links, contact details and legal links |
| **Floating action** (WhatsApp) | One only, bottom-right, ≥ 54 px, and it must not cover content or form buttons on phones |

### 6.5 Overlays

| Component | Rules |
|---|---|
| **Dialog / modal** | Use native `<dialog>` with `showModal()`: inert background, focus moves in, Esc closes ([MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)). Always a visible close button. `autofocus` on the safest action. Return focus to the trigger on close. Use it for confirmations and focused tasks, not for marketing pop-ups |
| **Drawer / side sheet** | A modal drawer behaves like a dialog. Slides in 250–300 ms and out 200 ms |
| **Popover** | Non-modal, anchored to its trigger, closes on Esc and outside click |
| **Tooltip** | Supplementary info only, never essential. Shows on hover **and** focus, can be dismissed with Esc, can be hovered (1.4.13 AA, [W3C](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)). No links or buttons inside. Don't rely on tooltips on touch ([NN/g](https://www.nngroup.com/articles/tooltip-guidelines/)) |
| **Lightbox** (images) | Dialog with previous/next buttons, arrow keys, Esc, and a caption |

### 6.6 Feedback messages

| Component | When | Rules |
|---|---|---|
| **Toast / snackbar** | Low-priority confirmation ("Copied", "Saved") | `role="status"` (polite). Visible ≥ 5 s, pauses on hover/focus. **Never the only place an action or error lives** (2.2.1) **(studio rule for duration)** |
| **Inline alert** | A message about one section or form | Icon + title + text. Success, info, warning and error variants, shown in colour **and** with an icon |
| **Banner** | Site-wide notices | Dismissible. Doesn't push layout around after load (CLS) |
| **Error alert** | Something failed and needs attention | `role="alert"` only for urgent messages; don't combine it with `aria-live` ([MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)) |

Live regions must exist in the page **before** their text changes ([MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)).

### 6.7 Content components

| Component | Rules |
|---|---|
| **Card** | One topic, one primary action. If the whole card is clickable, make the title the link and stretch it, not a nested mess of links. Same padding, border and shadow everywhere |
| **Badge / tag / chip** | Short (1–3 words). Status chips use colour **and** text. Removable chips have an "×" button with a label |
| **Avatar** | Round, with alt text = the person's name, or initials as a fallback. Real photos only |
| **Accordion / FAQ** | `<details>`/`<summary>` or the [APG accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/). The icon rotates (subtle tier). Several can be open at once |
| **Stats / numbers** | Only real, sourced numbers (quality framework). Label units |
| **Images** | Real photos, correct aspect ratio, `width`/`height` set (no CLS), `loading="lazy"` below the fold, meaningful `alt` text, or `alt=""` if decorative |
| **Video / reels** | Never autoplay with sound. Poster image, visible play button, captions for speech, pause control |
| **Charts** | Bars start at zero, label units, colour plus labels, and a data table or summary for screen readers |
| **Marquee / carousel** | Pause on hover and focus, stop under reduced motion, and never hide key content inside it (2.2.2) |

### 6.8 Signature "fun" elements (house style)

| Element | Rule |
|---|---|
| Sticky-note jokes | Max one per page, never inside forms, tables or checkout. Hidden on phones if the page is already long |
| Paper tiles (logo) | Hero only. Draggable is a bonus, not a requirement; must work without JS |
| Tape, torn edges | Decoration on marketing blocks only |
| Rotations | −3° to +3° on decorative cards. Interactive controls stay straight |

---

## 7. States

Every screen that shows data has **four designed states**:

| State | Rules |
|---|---|
| **Loading** | Under ~1 s: show nothing. ~1–10 s: a skeleton (whole page or section) or a spinner (small module). Over ~10 s: a progress bar with an estimate and a way to cancel ([NN/g](https://www.nngroup.com/articles/skeleton-screens/)). Keep layout stable (no CLS) |
| **Empty** | Explain why it's empty, and give the next action ("No orders yet. Share your store link to get your first order") |
| **Error** | Plain words, what happened, what to do, and a retry button. Never a raw error code |
| **Success** | Confirm what happened and what's next. A celebration (expressive tier) is fine for big moments only |

Also design: **partial** (some data failed), **offline** and **permission denied**, where relevant.

---

## 8. Content and UX writing

- **Buttons:** verb + object ("Get a quote", "Send on WhatsApp"). Never "Submit", "Click here".
- **Headings:** say what the section gives the reader, not a slogan.
- **Errors:** say what's wrong and how to fix it ("Enter a 10-digit phone number").
- **Numbers and money:** ₹ with Indian digit grouping (₹1,00,000), dates as "16 Nov 2026".
- **Tone:** short sentences, plain English, concrete. No "elevate", "seamless", "unlock", "revolutionise" (quality framework banned list).
- **Jokes** target situations, never religion, caste, region, gender or real people and companies.
- **Accessible names:** every icon button, image and form field has one.

---

## 9. Accessibility checklist (WCAG 2.2 AA)

| # | Check | Criterion |
|---|---|---|
| 1 | Text contrast 4.5:1 (large 3:1) | 1.4.3 AA |
| 2 | Control boundaries, icons and states 3:1 | 1.4.11 AA |
| 3 | Colour is never the only signal | 1.4.1 A |
| 4 | Everything works by keyboard, in a logical order | 2.1.1 A, 2.4.3 A |
| 5 | Visible focus on every interactive element | 2.4.7 AA |
| 6 | Focused element is never fully hidden by sticky headers or bars | 2.4.11 AA |
| 7 | Targets ≥ 24×24 px (our rule: 44×44) | 2.5.8 AA |
| 8 | Labels on every field; `autocomplete` on personal data | 3.3.2 A, 1.3.5 AA |
| 9 | Errors identified in text with a suggestion | 3.3.1 A, 3.3.3 AA |
| 10 | Hover/focus content is dismissible, hoverable and persistent | 1.4.13 AA |
| 11 | Auto-moving content > 5 s can be paused | 2.2.2 A |
| 12 | Reduced motion respected | 2.3.3 AAA (we follow it) |
| 13 | Content reflows at 320 px without horizontal scroll | 1.4.10 AA |
| 14 | Text can be zoomed to 200% | 1.4.4 AA |
| 15 | One `<h1>`, logical heading order, landmarks (`header`, `nav`, `main`, `footer`) | 1.3.1 A |
| 16 | Images have alt text; decorative ones `alt=""` | 1.1.1 A |
| 17 | Page `<title>` unique and descriptive | 2.4.2 A |
| 18 | Skip link to main content | 2.4.1 A |

Criteria: [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

---

## 10. Performance budgets

| Metric | Good | Source |
|---|---|---|
| LCP (largest content visible) | ≤ 2.5 s on mobile 4G | Quality framework |
| INP (response to taps and clicks) | ≤ 200 ms (poor > 500 ms) | [web.dev](https://web.dev/articles/inp) |
| CLS (layout shift) | ≤ 0.1 (poor > 0.25) | [web.dev](https://web.dev/articles/optimize-cls) |
| JavaScript per page | ≤ 200 KB gzipped | Quality framework |
| Images | WebP/AVIF, sized for the slot, lazy below the fold | Quality framework |
| Lighthouse mobile | Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 | Quality framework |

Motion and 3D must stay inside these budgets on a **real budget Android phone**.

---

## 11. Project setup and review checklists

### 11.1 Before designing a client project
- [ ] Requirements form received ([clients/_template](../clients/_template/))
- [ ] Recipe chosen (§2.2) and written into the project brief
- [ ] Tokens set: colours with contrast checked, type scale, spacing, radius, elevation, motion tiers
- [ ] Icon set chosen (one)
- [ ] Key screens sketched: home, a listing or service page, a form, plus empty and error states

### 11.2 Design and build review (with the 5-Human Test)
- [ ] Only one primary button per screen; button labels are verbs
- [ ] All button and field states exist (hover, focus, active, disabled, loading, error)
- [ ] The right selection control for each choice (§6.2 table)
- [ ] Tables: aligned numbers, sticky header, phone strategy chosen
- [ ] Dialogs, menus and dropdowns close on Esc and return focus
- [ ] Every animation has a tier; at most one expressive animation per screen; reduced motion tested
- [ ] 3D only where §5 allows it; nothing flattened by filters or overflow
- [ ] Loading, empty, error and success states designed
- [ ] Accessibility checklist (§9) passed with keyboard and a screen reader
- [ ] Performance budgets (§10) met on a real phone
- [ ] Tested at 320, 360, 768, 1280 and 1920 px

---

## 12. Sources

- W3C: [WCAG 2.2](https://www.w3.org/TR/WCAG22/) · [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · [Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) · [Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · [Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html) · [Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) · [Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html)
- WAI-ARIA Authoring Practices: [patterns index](https://www.w3.org/WAI/ARIA/apg/patterns/) (button, combobox, listbox, menu button, switch, tabs, accordion, disclosure, breadcrumb, table, tooltip)
- MDN: [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) · [transform-style](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style) · [backface-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility) · [pointer media feature](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) · [ARIA live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- web.dev: [Animations guide](https://web.dev/articles/animations-guide) · [prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion) · [Optimize CLS](https://web.dev/articles/optimize-cls) · [INP](https://web.dev/articles/inp)
- Material Design 3: [motion tokens](https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-motion.scss) · [Expressive spring tokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt) · [Standard spring tokens](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt) · [Window size classes](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes) · [Android accessibility (48 dp)](https://developer.android.com/guide/topics/ui/accessibility/apps)
- Apple: [Design tips (44 pt targets)](https://developer.apple.com/design/tips/)
- Nielsen Norman Group: [Flat design](https://www.nngroup.com/articles/flat-design/) · [Flat UI and uncertainty](https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/) · [Neobrutalism](https://www.nngroup.com/articles/neobrutalism/) · [Glassmorphism](https://www.nngroup.com/articles/glassmorphism/) · [Animation duration](https://www.nngroup.com/articles/animation-duration/) · [Data tables](https://www.nngroup.com/articles/data-tables/) · [Infinite scrolling](https://www.nngroup.com/articles/infinite-scrolling-tips/) · [Placeholders](https://www.nngroup.com/articles/form-design-placeholders/) · [Required fields](https://www.nngroup.com/articles/required-fields/) · [Toggle switches](https://www.nngroup.com/articles/toggle-switch-guidelines/) · [Tooltips](https://www.nngroup.com/articles/tooltip-guidelines/) · [Skeleton screens](https://www.nngroup.com/articles/skeleton-screens/)
- GOV.UK Design System: [Validation](https://design-system.service.gov.uk/patterns/validation/) · [Error message](https://design-system.service.gov.uk/components/error-message/) · [Select](https://design-system.service.gov.uk/components/select/) · [Pagination](https://design-system.service.gov.uk/components/pagination/)

**Not confirmed by an authoritative source** (kept as studio rules): paper-cut, claymorphism and Swiss style guidance; stagger timing; maximum tilt angle; toast duration; table density and phone strategy; grain-overlay performance numbers; icon sizes and the 4/8 px grid.
