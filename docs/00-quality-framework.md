[← Docs](README.md)

# VSp!k Quality Framework (AI-CQF, studio edition)

| Item | Value |
|---|---|
| Version | 1.0 |
| Date | 2026-11-15 |
| Based on | AI Creation Quality Framework (AI-CQF) v1.2 |
| Applies to | Every website, app, design, post, proposal and document VSp!k produces, by people or by AI |
| Status | **Mandatory.** Nothing goes to a client or goes public until it passes |

> **Core principle:** Fast is our promise; good is the requirement. We don't make AI work look less AI-made. We make it as good as careful professional work, and we get there faster.

---

## 1. How we stay fast without cutting quality

Speed comes from preparation, not from skipping steps.

| Lever | What it means |
|---|---|
| One standard stack | Next.js + TypeScript + Tailwind + Supabase/Postgres, hosted on Vercel or a VPS. A different stack needs a reason the client cares about |
| Starters, not blank pages | Every project begins from a tested starter in `templates/` (auth, UI kit, forms, SEO, deployment already done) |
| Fixed intake | A one-page brief, signed off before work starts. Unclear requirements are the main cause of slow delivery |
| Small, visible milestones | The client sees real working software every 1 to 3 days, not mock-ups |
| Scope is fixed per package | New ideas go into a change request with its own price and date. They don't quietly grow the project |

---

## 2. The five stages (no skipping)

| Stage | What happens | Output |
|---|---|---|
| 1. Understand | Read the brief, define the user, the one main goal and the success measure | Signed brief |
| 2. Create | Build from the starter, using the client's brand tokens | Draft |
| 3. Review | Check against the 12 standards (§3) and the 5-Human Test (§4) | List of weaknesses |
| 4. Fix and prove | Fix every weakness; test on real phones and browsers; collect evidence | Screenshots, test results |
| 5. Deliver | Hand over only what is genuinely ready, with a delivery note (§6) | Live link + delivery note |

---

## 3. The 12 standards

The full AI-CQF has 20 standards. Here they are grouped into 12 that suit studio-sized projects. Nothing was removed; related standards were merged.

### 1. Purpose
- Every page, section and feature traces to something in the signed brief.
- No features added just to look impressive.

### 2. Real content, real claims
- Copy is written for the client's actual customers: their city, their language level, their prices.
- **No invented testimonials, client logos, statistics, awards or "trusted by 500+ businesses" lines.** Ever. This includes our own studio website and social posts.
- No lorem ipsum or placeholder text in anything a client sees. If content is missing, the gap is marked clearly (for example `[Client to supply: opening hours]`) and listed in the delivery note.
- Legal and policy pages are reviewed by the client, not AI-written and published as-is.

### 3. A design that belongs to this client
Each client gets a short brand direction (palette, type, shape language, photo style, tone) before UI is built. To avoid the generic AI look, these are **banned unless they have a stated reason**:
- Purple-to-blue or pink-to-orange gradients, glowing blobs, glassmorphism cards
- The default shadcn/ui, Bootstrap or template look shipped unchanged
- Three identical feature cards with an emoji or icon on top of each
- "Unlock", "Elevate", "Seamless", "Empower", "Revolutionize", "Next-level" and similar filler words
- Stock photos of people pointing at laptops
- Centered hero + gradient headline + two buttons, used on every project

### 4. Visual hierarchy and layout
- One primary action per screen.
- A fixed type scale and a 4 px spacing scale (4, 8, 12, 16, 24, 32, 48, 64), set as design tokens. No one-off sizes.

### 5. UX
- A first-time visitor on a phone knows what the business does and how to act within 5 seconds.
- Contact, booking or buy is never more than one tap away.

### 6. Everything works
- No fake buttons, dead links or "coming soon" elements. Unfinished features are hidden.
- Forms really send. Payments are tested in the provider's test mode before being called done.
- Mock-ups and concept screens are always labelled as such.

### 7. Responsive and compatible
- Works from 320 px to 2560 px with no horizontal scroll.
- Checked on a real low-to-mid-range Android phone and a real iPhone, not only browser emulation.

### 8. Images and icons
- Real photos of the client's business wherever possible. Stock only when it truly fits, and it is never presented as the client's own work, staff or premises.
- One icon set per project, consistent stroke and size.
- Images optimised (WebP/AVIF, correct sizes, meaningful alt text).

### 9. Clean engineering
- TypeScript strict mode; lint and typecheck pass.
- Shared components reused, not duplicated. Every new dependency needs a one-line reason.
- Secrets never committed. Authorisation enforced on the server, not only in the UI.
- Simplest solution that meets the brief. No speculative features.

### 10. Data, states and errors
- Every screen that loads data has loading, empty, error and success states.
- Errors are in plain language with a next step. Users never see raw codes.
- Money stored as integers (paise/cents). Calculations have tests with worked examples.

### 11. Accessible and fast
- WCAG 2.1 AA: contrast, keyboard use, visible labels, status never shown by colour alone.
- Body text at least 16 px on mobile, tap targets at least 44 × 44 px.
- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95. LCP < 2.5 s on 4G.

### 12. Finished
- No `TODO`, placeholder, test data or console errors in a delivery.
- Handover includes logins, a short "how to edit your site" guide, and the delivery note.

---

## 4. The 5-Human Test

Run before every delivery, including social posts.

| Perspective | Question |
|---|---|
| The Thinker | Does it make sense? Are the facts, prices and logic correct? |
| The Designer | Does it look made for this client, or could it belong to anyone? |
| The User | Can a first-time visitor on a cheap phone do the main task without help? |
| The Engineer | Is it secure, tested and maintainable? |
| The Auditor | Is it complete, verified, and are its limits written down? |

---

## 5. Definition of Done

- [ ] Matches the signed brief; nothing unrequested added
- [ ] Real content, or clearly marked gaps listed in the delivery note
- [ ] Brand tokens used; none of the §3.3 banned patterns without a reason
- [ ] Every link, form and button works end-to-end
- [ ] Checked at 360 / 768 / 1280 px and on one real Android + one real iPhone
- [ ] Loading, empty, error and success states present
- [ ] Lighthouse and accessibility targets met (§3.11)
- [ ] No secrets, console errors, `TODO`s or test data
- [ ] 5-Human Test done; delivery note written

---

## 6. Delivery note template

```
Project / milestone:
What was delivered:
How it was verified:      (devices, browsers, tests, Lighthouse scores, screenshots)
Not done / known issues:
Assumptions made:
Waiting on client:        (content, photos, logins, approvals)
```

---

## 7. Rules for social posts and marketing

Our marketing follows the same standard as our client work.

- Only real projects, real numbers and real quotes. Concept work is labelled "Concept".
- Delivery-time claims ("48 hours") are only made for packages we have actually delivered in that time.
- Every post is written for a specific reader (a local business owner, a startup founder) and says one useful thing.
- Screenshots in posts come from real, working builds, not mock-ups passed off as live sites.
