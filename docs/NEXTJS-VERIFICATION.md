# Next.js consolidation verification

Verified 2026-10-10 against the current approved working tree. No page component markup, stylesheet values, image files or animation behavior were changed during this verification.

## Consolidation changelog

- Root dev/build/start/lint commands delegate to the self-contained Next.js 16 app.
- Vercel deploys the Next.js build; retired static HTML, CSS/JS output and metadata files were removed from root public to prevent conflicting routes.
- Canonical styles, header controller and assessment markup/controller/data now live inside nextjs-app and use internal imports.
- Added the coaching listing route and included it in the sitemap.
- Preserved the approved UI and recorded its non-regression rules in AGENTS.md.
- Kept legacy root scripts for reference; they are not part of the active deployment.

## Completed checks

- Root npm run build: successful, 27 generated entries including the not-found page, API routes and metadata routes.
- TypeScript npx tsc --noEmit: successful.
- Existing animation regression suite: 7/7 passed, including Strict Mode cleanup, hero hydration, observer fallbacks, keyboard focus and reduced motion.
- Source import audit: zero relative imports resolve outside nextjs-app.
- Migrated site.css, restoration.css and assessment.css are byte-identical to their existing canonical copies. All 72 comparable copied assets are byte-identical.
- Existing header browser suite: passed at 1900, 1440, 1280, 1199, 1024, 768, 390 and 320 px. Verified logo-only navigation, five dropdown menus, Escape handling, contact drawer, restored scrolling, mobile route navigation, sticky header, original favicon and eight coaching cards.
- Existing assessment browser suite: passed step validation, conditional fields, summary, back navigation, consent, failed-request retry, real local submission, honest delivery messaging, restart, safe text rendering and responsive checks at 800/390/320 px.
- Contact page browser check: passed validation, simulated network failure, preserved answers, retry, POST 201, form reset and truthful local-delivery confirmation.
- Country controls: each selects its corresponding panel.
- API checks: malformed JSON 400, invalid fields 422, unsupported content type 415, cross-origin rejection 403, config GET 200 and enquiries GET 405.
- All 24 public HTML/metadata paths returned 200, including all ten service pages, three coaching pages, both guides, sitemap and robots. The two APIs were checked separately; the production inventory includes not-found as its 27th entry.
- No uncaught browser exceptions or hydration errors in these smoke checks.

## Local verification setup and evidence

An existing dev server was already running on localhost:3000 and was left untouched. Browser/API checks used a separate production server on localhost:3010, with external forwarding disabled and synthetic enquiries stored under the temporary verification data directory. No business inbox or external webhook received test submissions.

Existing scripts: tmp/verify-navbar.mjs and tmp/verify-assessment.mjs. Additional smoke script/results: tmp/verify-consolidation.mjs and tmp/consolidation-smoke-results.json. Screenshots: tmp/navbar-qa/next-*.png, tmp/assessment-qa/next-*.png and tmp/consolidation-home-*.png. These ignored local artifacts are not deployed.

The full-page screenshots at initial scroll position include sections waiting for their normal scroll-entry animation; blank unrevealed sections in those captures are not a layout change. Geometry was checked in the browser and migration preservation was checked through identical source styles/assets. This audit does not constitute a pixel-by-pixel baseline comparison or verification of a new Vercel deployment.
