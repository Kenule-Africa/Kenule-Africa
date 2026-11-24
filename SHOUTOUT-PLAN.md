# ShoutOut Route: Implementation Plan

Status: **Awaiting approval.** No code will be written until this plan is approved and the open questions in section 2 are answered (or the recommended defaults are accepted).

## 1. Goal

Add a dedicated ShoutOut homepage to the Kenule Africa website at **`/shoutout`**, reachable from the site navbar.

ShoutOut covers four pillars: **Digital Marketing, Influencer Management, Talent Development and Brand Partnerships**. The page must feel like a premium international creative technology company: minimalist, Apple-inspired, black and white with graphite accents, elegant typography, generous white space, fully responsive.

Required sections, in order:

1. Hero: headline "Your Influence Deserves to Be Seen.", short introduction, buttons "I'm a Creator" and "I'm a Brand"
2. About ShoutOut: the agency and its mission
3. Our Services: the four core services
4. Creator Network: invitation for creators to join and access opportunities
5. For Brands: how businesses connect with creators and run campaigns
6. Call to Action: join the network or request a campaign
7. Footer: contact details, social links, essential pages

## 2. Open questions (need your answers)

Each has a recommended default. If you approve the plan without answering, I will use the default.

| # | Question | Recommended default |
|---|----------|---------------------|
| Q1 | How does ShoutOut relate to Kenule Africa? (a Kenule venture like LegitLab, a sister company, or independent) | Treat it as a Kenule Africa venture: small "A Kenule Africa company" attribution in the hero eyebrow and footer, like LegitLab. |
| Q2 | Where should "Join the network" and "Request a campaign" lead? | Two configurable external URLs (for example Google Forms, like LegitLab's application), kept in one data file. Buttons render a disabled state if a URL is not set yet, never a fake destination. Native forms stored in Supabase (reusing the waitlist backend and admin) can be a follow-up phase if you want them. |
| Q3 | Do the hero buttons go straight to those destinations? | No. "I'm a Creator" scrolls to the Creator Network section and "I'm a Brand" scrolls to For Brands. Each section explains the offer and holds the real CTA. This works even before the URLs exist. |
| Q4 | Does ShoutOut have its own logo or wordmark? | If you have one, send it (SVG preferred). Otherwise I set a clean typographic wordmark in Inter. |
| Q5 | Imagery: do you have photography (creators, campaigns, events)? | No stock photos and no invented creator faces. Without real photography the visuals are code-native: typography, subtle graphite gradients and small abstract UI compositions (the approach used on the LegitLab track cards). Real photography can be dropped in later without redesign. |
| Q6 | ShoutOut contact details and social handles (email, phone/WhatsApp, Instagram, TikTok, X, LinkedIn, YouTube)? | Use only the ones you give me. Until then, fall back to the Kenule Africa contact details already on the site and hide social links that do not exist yet. |
| Q7 | Footer "essential pages": privacy policy and terms do not exist on the site today. | Link only to pages that exist (Kenule Africa home, LegitLab Academy, TOMORROW, ShoutOut sections, contact). Legal pages can be a separate task. |
| Q8 | Which navbars get the ShoutOut link? | Homepage header (desktop and mobile drawer) and the LegitLab Academy header. Also add ShoutOut to the homepage footer "Ventures" list and to `sitemap.ts`. The TOMORROW page has no navbar by design, so only its footer gets the link. |
| Q9 | Should ShoutOut also appear in the homepage "Kenule Initiatives" ticker and "Flagship Ventures" cards? | Not in this task; those sections have their own copy and layout. Easy follow-up. |
| Q10 | Copy: are you supplying final copy, or should I draft it? | I draft it (section 5) for your review. No invented statistics, client names, testimonials, creator names or partnerships. |

## 3. Design direction

**Feel:** calm, confident and precise. Big type, lots of air, one idea per screen. Restraint over decoration.

**Palette** (black and white with graphite, scoped to the ShoutOut route):

| Token | Value | Use |
|-------|-------|-----|
| `--so-ink` | `#0a0a0a` | Primary text, primary buttons, dark sections |
| `--so-paper` | `#ffffff` | Page background |
| `--so-mist` | `#f5f5f7` | Alternate light surfaces (service tiles) |
| `--so-graphite` | `#3a3a3c` | Secondary emphasis, dark-section surfaces |
| `--so-muted` | `#6e6e73` | Secondary text (meets WCAG AA on white) |
| `--so-hairline` | `#d2d2d7` | Rare dividers only where structure needs it |

**Typography:** Inter, which is already loaded by the site, so no new fonts. Display headlines with tight tracking (around -0.04em), body at 17px on desktop with generous line height. One weight family, hierarchy through size and colour rather than many weights.

**Layout:** content width around 1120px; section spacing around 160px on desktop and 96px on mobile; large rounded tiles only where they group content (services). No pulsing dots, no glassmorphism except a light translucent sticky header, no em dashes in copy (repo rule).

**Motion:** subtle and optional. Content fades and rises slightly as it enters the viewport; the header gains a translucent background after scrolling. No scroll hijacking, no smooth-scroll library, no pinned sequences (lessons from TOMORROW). Everything respects `prefers-reduced-motion` and the page is fully usable with motion off.

**Responsive:** designed for, and checked at, 1440, 1280, 1024, 768, 390, 375 and 360px. Mobile layouts are composed deliberately (stacked tiles, full-width buttons, readable type sizes), not just shrunk.

## 4. Technical approach

**Route and files**

```text
src/app/shoutout/
  page.tsx                  Server component: metadata + section composition
  shoutout.module.css       Route-scoped design tokens and the few styles Tailwind handles poorly
  opengraph-image.tsx       Generated typographic share image (no asset needed)
src/components/shoutout/
  ShoutOutHeader.tsx        Client: sticky header, section links, mobile menu
  Hero.tsx
  About.tsx
  Services.tsx
  CreatorNetwork.tsx
  ForBrands.tsx
  ClosingCta.tsx
  ShoutOutFooter.tsx
  Reveal.tsx                Client: small IntersectionObserver fade-in wrapper
src/data/shoutout.ts        All copy, services, CTA URLs, contact and social links in one place
```

**Styling:** Tailwind utilities (as the homepage uses) for layout and spacing, with the colour tokens defined once on the ShoutOut page root and referenced from Tailwind. This keeps styles next to the markup and avoids the dead-CSS build-up that happened on TOMORROW. Nothing is added to `globals.css`.

**Rendering:** server components by default. Only the header (mobile menu, scroll state) and `Reveal` are client components. No Three.js, GSAP or Lenis on this route, so the page stays light.

**Existing files touched (small, additive edits only):**

- `src/components/nav/OraviaHeader.tsx`: add "ShoutOut" link to the desktop nav and mobile drawer
- `src/components/legitlab/AcademyHeader.tsx`: add "ShoutOut" to desktop and mobile nav
- `src/components/sections/OraviaFooter.tsx`: add ShoutOut to the Ventures list
- `src/app/tomorrow/page.tsx`: add ShoutOut to the footer Explore list
- `src/app/sitemap.ts`: add `/shoutout`

**SEO:** own title ("ShoutOut | A Kenule Africa Company", adjusted per Q1), description, canonical `/shoutout`, Open Graph and Twitter metadata, generated share image.

**Accessibility:** semantic landmarks and headings, skip link, visible focus states, AA contrast for all text, keyboard-operable mobile menu with Escape to close, descriptive link text for external links.

## 5. Section plan with draft copy

Draft copy is a starting point for your edits. Nothing below claims numbers, clients or partners that do not exist.

**Header.** ShoutOut wordmark (links to top), section links: About, Services, Creators, Brands, Contact. Right side: "Kenule Africa" link back to the main site. Mobile: menu button opening a full-width sheet.

**1. Hero.** White, centred, very large headline.
- Eyebrow: "ShoutOut · A Kenule Africa company"
- Headline: "Your Influence Deserves to Be Seen."
- Intro: "ShoutOut connects creators and brands through digital marketing, influencer management, talent development and brand partnerships."
- Buttons: "I'm a Creator" (solid black) and "I'm a Brand" (outlined)
- Below: the four pillars as a quiet single-line list.

**2. About.** One large statement paragraph, Apple-style, then a short mission line.
- Statement: "We believe great work should travel. ShoutOut helps the people behind it, and the brands that believe in it, get the attention they have earned."
- Mission: "Our mission is to build fair, lasting partnerships between creators and brands, grounded in craft, clarity and results."

**3. Our Services.** Four large tiles on the mist surface (2 by 2 on desktop, stacked on mobile). Each has a title, one sentence and three short capabilities.
- Digital Marketing: strategy, content and paid media that grow brands online. (Campaign strategy · Content production · Performance and analytics)
- Influencer Management: representation and day-to-day management for creators. (Brand deals · Negotiation and contracts · Career planning)
- Talent Development: training and mentorship for emerging creators. (Content craft · Personal brand · Growth coaching)
- Brand Partnerships: matching brands with the right voices. (Creator matching · Campaign management · Reporting)

**4. Creator Network.** Inverted black section for contrast.
- Heading: "Your audience is just the beginning."
- Body: "Join the ShoutOut network for access to brand opportunities, management support and the tools to grow your craft."
- Three short benefits: Opportunities · Representation · Growth
- CTA: "Join the network"

**5. For Brands.** White section with a four-step process laid out horizontally on desktop and vertically on mobile.
- Heading: "Find the voices your audience already trusts."
- Steps: Brief (share your goals) · Match (we pair you with the right creators) · Launch (we manage the campaign end to end) · Measure (clear reporting on what worked)
- CTA: "Request a campaign"

**6. Call to Action.** Split closing panel, two paths side by side (stacked on mobile).
- Creators: "Ready to be seen?" with "Join the network"
- Brands: "Ready to be heard?" with "Request a campaign"

**7. Footer.** Wordmark and one-line description; contact (per Q6); social links (per Q6); pages: ShoutOut sections, Kenule Africa, LegitLab Academy, TOMORROW; "© [year] Kenule Africa Ltd." per Q1.

## 6. Delivery phases

Each phase ends with a working, checkable state.

**Phase 1: Foundation.** Data file, tokens, route shell, header, footer, metadata, share image, navbar and sitemap links.
Check: `/shoutout` renders; navbar links work on desktop and mobile on the homepage and LegitLab; typecheck passes.

**Phase 2: Hero and About.**
Check: screenshots at all seven widths; headline never clips or overflows.

**Phase 3: Services, Creator Network and For Brands.**
Check: screenshots at all seven widths; contrast check on the black section.

**Phase 4: Closing CTA, motion and polish.** Reveal animations, header scroll state, CTA disabled states for unset URLs, focus states.
Check: keyboard-only walkthrough; reduced-motion mode shows all content with no animation.

**Phase 5: Verification.**
- Typecheck and ESLint
- Production build (with the dev server stopped, since both write to `.next`)
- Visual check: headless Chrome screenshots of every section at 1440, 1280, 1024, 768, 390, 375 and 360px, reviewed for overflow, clipping and balance
- Regression check: computed-style comparison of `/`, `/tomorrow`, `/legitlab-academy` and `/admin` before and after, confirming the only change on existing pages is the new navbar or footer link
- Link check: every link and button on the new page resolves or shows its intended disabled state

## 7. Acceptance criteria

1. `/shoutout` exists and is linked from the homepage navbar (desktop and mobile) and the LegitLab header.
2. All seven sections are present in order, with the hero headline exactly "Your Influence Deserves to Be Seen."
3. The page reads as premium and minimal: black, white and graphite, Inter typography, generous spacing, no template look.
4. Fully responsive at all seven target widths with no horizontal scrolling, clipped text or overlapping content.
5. CTAs lead to real destinations or show an honest disabled state; nothing fake.
6. No invented statistics, clients, testimonials or creator identities; no em dashes in copy.
7. Accessible: keyboard navigation, visible focus, AA contrast, reduced motion respected.
8. Typecheck, lint and production build pass.
9. Existing pages are unchanged apart from the added links, proven by the computed-style comparison.

## 8. Out of scope for this task

- Native in-site application forms and admin views for creators and brands (possible follow-up, Q2)
- Additional ShoutOut subpages (case studies, creator directory, blog)
- Legal pages (Q7)
- Adding ShoutOut to the homepage ticker and ventures cards (Q9)
