# ShoutOut Page Implementation Progress

Source plan: [`SHOUTOUT-PLAN.md`](SHOUTOUT-PLAN.md), approved with its recommended defaults on 2026-11-24.

## Summary

ShoutOut, a Kenule Africa creative agency for creators and brands, now has its own homepage at **`/shoutout`**, linked from the main site navigation. The page follows a premium, minimal, Apple-inspired direction built on the ShoutOut logo: pure black, white and the logo's silver, Inter typography and generous space. It is fully responsive and carries a choreographed motion design that respects reduced-motion preferences.

## What was built

### Page sections

1. **Header:** ShoutOut logo, section links (About, Services, Creators, Brands, Contact) with a marker for the section in view, a link back to Kenule Africa, and a full-screen mobile menu.
2. **Hero:** the assembling S-mark, the headline "Your Influence Deserves to Be Seen." with the second line in the logo's silver, a short introduction, and "I'm a Creator" / "I'm a Brand" buttons that scroll to the matching sections. The four service pillars sit below as a quiet row on desktop and an edge-to-edge marquee on mobile.
3. **About ShoutOut:** a large statement and the mission.
4. **Our Services:** four cards for Digital Marketing, Influencer Management, Talent Development and Brand Partnerships, each with capabilities.
5. **Creator Network:** black section with the invitation, three benefits and "Join the network".
6. **For Brands:** a four-step process (Brief, Match, Launch, Measure) and "Request a campaign".
7. **Call to action:** two panels, "Ready to be seen?" for creators and "Ready to be heard?" for brands.
8. **Footer:** logo, page links, Kenule Africa links, contact and social links.

### Branding from the logo

The supplied `public/assets/shoutout/shoutout-logo.PNG` is white and silver on solid black. Derived assets in the same folder:

| File | Use |
|---|---|
| `shoutout-logo-white.png`, `shoutout-logo-dark.png` | Transparent logo for dark and light backgrounds |
| `shoutout-mark-white.png`, `shoutout-mark-dark.png` | The S-mark alone (watermark, marquee separators, homepage ticker) |
| `shoutout-mark-top.png`, `shoutout-mark-bottom.png` | The mark's two swooshes as aligned layers, for the hero assembly animation |
| `shoutout-icon.png` | 512px square icon (browser tab and home-screen icon for `/shoutout`) |
| `src/app/shoutout/opengraph-image.png` | 1200x630 social share image |

Colour tokens were sampled from the logo: white "Shout", silver "Out" (`#acacac`) and the white-to-grey gradient of the mark. Two-tone headlines echo the "Shout"/"Out" split throughout.

### Motion design

All motion lives in `src/components/shoutout/ShoutOutMotion.tsx` (GSAP and ScrollTrigger) with one shared set of easing curves, durations, distances and staggers.

- **Hero reveal:** the hero opens like an iris from the S-mark; the mark's two halves sweep in from opposite sides and lock together with a single flash of light; the headline words rise out of masks; the silver line wipes up and catches a sheen once; then the copy, buttons and pillars settle in.
- **Scroll choreography:** headings rise line by line, the About statement lights up word by word as it scrolls past, divider lines draw themselves, service cards lift in with their icons settling, brand steps fill along a progress track, the closing panels rise, and the Creator Network watermark drifts with the scroll. The hero eases away as you scroll into the page.
- **Desktop pointer details:** a soft spotlight follows the cursor across the hero, hero buttons lean gently toward the cursor, and service cards carry a light that tracks the pointer on hover.
- **No endless loops** apart from the mobile pillars marquee, which was requested. An earlier sound-wave ring animation and a repeating sheen were removed at the client's request.
- **Reduced motion:** with `prefers-reduced-motion`, nothing animates and all content is shown immediately.
- **No flash before the reveal:** a tiny inline script hides the hero intro before it paints; the motion script takes over on load, and a CSS failsafe shows everything after 3 seconds if scripts never run.

### Mobile

- Edge-to-edge pillars marquee in the hero, separated by the S-mark.
- Full-screen menu that fades in with staggered links and closes on Escape, link tap or rotation to desktop.
- 52px buttons with press feedback, comfortable footer tap targets, safe-area padding on the menu and footer, and labels that never wrap ("Request a campaign" stays on one line at 360px).
- Checked at 1440, 1280, 1024, 768, 390, 375 and 360px with no horizontal overflow.

## Site-wide changes

- **Navigation:** ShoutOut added to the homepage header (desktop and mobile), the LegitLab Academy header (desktop and mobile), the homepage footer and the TOMORROW footer.
- **Homepage ticker:** ShoutOut replaced Kédu in the "Kenule Initiatives & Hubs" strip.
- **Sitemap:** `/shoutout` added.

## Configuration

Everything editable is in `src/data/shoutout.ts`:

- `creatorApplicationUrl` and `campaignRequestUrl`: empty for now, so "Join the network" and "Request a campaign" show a "Soon" state with an email fallback. Set them to the real form URLs to enable the buttons.
- `contact` and `socialLinks`: currently Kenule Africa's details, since ShoutOut has no channels of its own yet.
- Services, benefits, brand steps and section links.

## Files

New:

- `src/app/shoutout/page.tsx`, `opengraph-image.png`, `opengraph-image.alt.txt`
- `src/components/shoutout/`: `ShoutOutHeader.tsx`, `Hero.tsx`, `About.tsx`, `Services.tsx`, `CreatorNetwork.tsx`, `ForBrands.tsx`, `ClosingCta.tsx`, `ShoutOutFooter.tsx`, `ShoutOutButton.tsx`, `Line.tsx`, `ShoutOutMotion.tsx`, `shoutout.module.css`
- `src/data/shoutout.ts`
- Derived logo assets listed above

Modified:

- `src/components/nav/OraviaHeader.tsx`, `src/components/legitlab/AcademyHeader.tsx`, `src/components/sections/OraviaFooter.tsx`, `src/app/tomorrow/page.tsx`: ShoutOut links
- `src/components/sections/OraviaHeroSection.tsx`: ShoutOut in place of Kédu in the ticker
- `src/app/sitemap.ts`: `/shoutout`

## Verification

- TypeScript: passed after the motion work.
- Screenshots reviewed at all seven target widths, plus the open mobile menu, scroll reveals with motion enabled, and a filmstrip of the hero reveal on desktop and mobile.
- Existing pages: on mobile, the only differences are the added ShoutOut links. The desktop comparison needs a clean re-run (see below).

## Open items

- Provide the creator application and campaign request URLs.
- Provide ShoutOut's own email, phone and social handles if they exist.
- Run lint and a production build with the dev server stopped.
- Re-run the desktop regression comparison of existing pages in a matching browser setup.
- Homepage hero legibility: on small phones the 3D Africa passes behind the hero paragraph. A text-halo fix was tried and reverted because it hid too much of the 3D. A lighter fix is still to be agreed.
