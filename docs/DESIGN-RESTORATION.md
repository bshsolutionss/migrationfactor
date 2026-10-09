# Visaco design restoration — 9 October 2026

The requested changes are implemented in the existing Next.js app and mirrored in the static sources used by the current Vercel configuration. The user's Migration Factor content, contact details, services, destinations, coaching programs and branding are retained. No deployment was performed.

## Inspection and section checklist

The original [Home Version Three](https://wordpress.validthemes.net/visaco/home-version-three/) was inspected in the browser from its header to footer before implementation. Its existing saved HTML, CSS, animation CSS and main.js in `docs/animation-source/` were also reviewed. Initial desktop screenshots and DOM measurements were inspected; later browser access was blocked.

| Section | Findings and work |
| --- | --- |
| Topbar, navigation, sticky header, mobile menu | Existing rounded header/contact information retained. Next.js Services and Countries dropdowns added using existing destinations and routes; active-route matching corrected for Next.js paths without trailing slashes. Existing static header work was preserved. |
| Hero | Original airplane-route graphic recovered. User subsequently requested the prior teal diagonal background shown in their screenshot; it is restored with the airplane graphic retained. Centered typography and source padding restored. |
| Three feature cards | Missing original corner pattern, icon sizing, padding and numbered rules restored. Existing pathway text and active-card interaction retained. |
| About | Original landmark decoration and circular badge restored. Badge counts the actual ten existing services instead of importing the demo's 45+ claim. Existing company overview and checks retained; no demo founder, signature or success percentage added. |
| Process | Original arrow track retained; tall flag-shaped icon containers, spacing and alternating colors restored. All four existing business steps remain. |
| Enquiry | Existing image cutout, background, consent and validation retained. Padding, fields and responsive stacking adjusted. No demo passport/income fields introduced. |
| Countries | Row heights, large flags, active background band, overlay dimensions and rounded CTA restored. Pointer/focus/click selection and destination hash links work in code. Full-width bands use clipped shadows to avoid adding overflowing layout boxes. |
| Coaching | Existing IELTS/PTE copy retained; source-style center banner added using existing coaching wording and branding. No demo discount or extra coaching products introduced. |
| Expert members | Explicitly excluded. No team biographies or expert-member section added. |
| Testimonial position / company slider | Missing fade-carousel position restored using existing mission and vision copy. User requested people instead of logo/icons: existing original-theme people photographs are now used. These are decorative theme photos, with no invented client quotes or identities. Exact source testimonial portraits remain pending access. |
| CTA | Original airplane, route, stamp and wave shapes recovered. Airplane size conflict corrected. Red/blue wave colors replaced by masks filled with Migration Factor brand colors. Traveller, company text and assessment link retained. |
| Articles / guides | Existing two guides retained. Card overlap, shadows, spacing and link arrow styling restored; no invented dates, author names or comments. |
| Footer contact strip, columns, decoration and legal line | Inspected against source; existing completed footer and user credit retained. Existing office/contact wording retained in place of the demo newsletter. |

## Files changed by this restoration

Next.js:

- `nextjs-app/src/app/page.tsx`, `layout.tsx`
- `nextjs-app/src/components/layout/Header.tsx`
- `nextjs-app/src/components/sections/HeroSection.tsx`, `AboutSection.tsx`, `CountrySection.tsx`, `CoachingSection.tsx`, `CtaSection.tsx`, `SupportSection.tsx`
- `nextjs-app/src/components/shared/ServiceCount.tsx`
- `nextjs-app/src/styles/restoration.css`

Static build and components:

- `scripts/build.mjs`, `src/app/pages.mjs`, `src/app/client.mjs`
- `src/components/index.mjs`, `src/components/shared/motion.js`
- `src/components/sections/hero.mjs`, `about.mjs`, `countrySection.mjs`, `coachingSection.mjs`, `cta.mjs`, `support.mjs`, `client.js`
- `src/styles/restoration.css`, `tests/site.test.mjs`
- Generated pages, `public/style.css` and `public/site.js` rebuilt through the existing build.

Ten recovered decorative assets were optimized to WebP and copied to both public media folders. Existing photographs were reused. Earlier header/footer edits by the user were not reset. The repository's existing root `.gitignore` excludes `nextjs-app/`; that configuration has been preserved.

## Motion and interaction

- Existing React-owned word reveal, viewport reveals, reduced-motion preference, feature activation, button fill and coaching transitions retained.
- Source fade-carousel timing implemented with native React/JavaScript; timers clean up in Next.js and pause on hover, keyboard focus or reduced-motion preference. Manual selection and pause controls added for access to both slides.
- Two-second service counter uses actual existing service data and supports reduced motion.
- Country overlay entrance, hover/focus selection and hash navigation restored.
- Dropdowns support explicit buttons, Escape and outside clicks. Mobile navigation and source routes retained.

These are native equivalents of the verified source effects, not a claim that the theme's jQuery/Swiper/GSAP implementation was recovered unchanged. No unverified parallax or continuous animation was added.

## Verification

- Final `npm run check`: passed; static build generated 21 pages and all 8 tests passed.
- Tests verify internal routes/assets, SEO, form validation/storage, server/API behavior and homepage order, including expert-member exclusion.
- Final Next.js `npm run build`: passed; production compilation, TypeScript and all 27 generated pages completed.
- Next.js local preview was started and its original pre-restoration page inspected earlier in the task.
- Responsive CSS was updated for desktop, tablet and mobile. Final visual checks, horizontal-overflow measurements, interactive browser tests, hydration/runtime-console checks and matching reference screenshots at those sizes **are not verified**.

## Remaining limitations

The browser tool continued to reject both `http://localhost:3001` and the source theme because of saved permission settings, even after the user said permissions were enabled. No alternate browser or download route was used to bypass that rejection. Final visual acceptance therefore remains pending.

Exact source testimonial headshots and the source world-map/wooden section background assets could not be retrieved after browser access was blocked. Existing original-theme people images and available backgrounds are used instead. Source statistics, reviewer identities, star ratings, signatures, discount claims and newsletter copy were not imported because the user explicitly required their own content. These content differences are intentional; pixel-level fidelity is not claimed.

## Follow-up: replacement portraits

At the user's explicit request to use any different people photographs, all six image slots in the company slider now use new Random User portrait assets (portraitOne through portraitSix). They replace the previous about/enquiry/CTA/preparation pictures in this section only. Assets are local WebP files in both public media folders. The text, layout and carousel behavior are unchanged. Both static and Next.js production builds passed after replacement. Original-theme testimonial portraits are no longer required for this follow-up.

## Follow-up: world-map background and remembered palette

The mission/vision slider now has the reference-style pale world-map backdrop instead of the previous gradient. The local SVG uses [Natural Earth public-domain land geometry](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_land.geojson), filled with the site's dark-teal color at 4.5% opacity. It recreates the map treatment; it is not the inaccessible original theme bitmap. Both production builds passed. The user explicitly required all copied visual elements to follow Migration Factor's palette by default; that preference is now saved in the root `AGENTS.md` for future work.

