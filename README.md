# Migration Factor

The approved website is preserved: section order, layout, spacing, image placements, navigation and animation behavior. This project uses pre-rendered HTML and a Node.js enquiry backend, with no client framework runtime. Requires Node.js 22 or later.

```powershell
npm run build
npm start
```

Open http://127.0.0.1:3000/ or the network URL printed by the server. Forms require the server; opening an HTML file directly does not run the backend.

## Editing

- `src/constants/content.mjs`: business facts and copy derived from the supplied PDF; missing information stays in the private checklist.
- `src/constants/navigation.mjs`: shared navigation.
- `src/app/pages.mjs`: page composition and route descriptions.
- `src/components/`: reusable layout, sections, forms, UI and shared rendering helpers.
- `src/components/*/client.js`: browser behavior, combined at build time into one small deferred script.
- `src/lib/`: SEO generation and shared browser/server validation.
- `src/config/`: environment, domain, response headers and MIME types.
- `src/services/`: enquiry validation, durable saving and optional delivery.
- `src/assets/image-manifest.json`: editable image slots, dimensions and provenance.
- `src/styles/site.css`: approved geometry, motion, breakpoints and logo-derived brand tokens.
- `public/media/` and `public/brand/`: curated optimized runtime images.
- `public/migrationfactor/`: preserved original user files; the build never copies these into the served website.

Only actual, used modules are created. Empty framework folders and runtime dependencies are deliberately avoided. The static architecture was retained to honor the instruction to preserve the approved site rather than rebuild it.

## Branding and assets

The supplied 3D logo provides the header mark and favicon. The supplied flat logo provides the social preview image. Original logo files remain intact. The primary teal `#087780`, cyan `#45c7cd`, blue `#2b90b8` and dark `#173b45` derive from the supplied visual identity; the darker primary supports readable white button text.

Existing approved photographs and image positions are retained. Unused copied portraits, signatures, graphics, authoring scripts, duplicate images and obsolete styling were removed. No AI-generated assets were used. Optimized runtime media is approximately 529 KB, compared with 1.9 MB across the old 56 reference assets.

The build recreates `dist/` from the curated sources, preventing stale demo pages or assets from surviving a new build. CSS, JavaScript and images receive a content revision for safe browser caching. HTML remains revalidated.

## Configuration and enquiries

The homepage includes a three-step, 2-minute Visa Assessment after the pathway cards, linked from the hero. It shows a profile summary before collecting contact details and consent, then submits the answers in the existing enquiry `message` field. It does not calculate visa eligibility. The static site and Next.js app share the assessment markup, controller and CSS; conditional work and English-result answers are omitted when no longer relevant. Confirmation uses the backend's actual delivery status.

Copy `.env.example` to `.env` and set `SITE_URL` before building for a different public domain. Both the build and server read the same environment. The default domain comes from the supplied report.

Validated enquiries are appended and flushed to private `data/enquiries.ndjson`. Consent, size limits, request-origin checks, a honeypot and rate limits are enforced. These records are never copied into `dist/` or served publicly. Tests use isolated temporary storage.

Set an HTTPS `ENQUIRY_WEBHOOK_URL` and optional `ENQUIRY_WEBHOOK_TOKEN` to forward saved enquiries to your provider. Success text distinguishes forwarding from local saving, including delivery failures. No provider credentials were supplied. Configure approved privacy wording, data retention, hosting backups and delivery before public launch; see `docs/TODO.md`.

## Verification

`npm run check` builds the site, checks server/browser syntax and runs tests covering validation, durable saving, private-data isolation, response MIME/cache headers, Unicode, size/rate limits, internal links, image files, SEO and approved homepage section order.

`docs/PRODUCTION-AUDIT.md` records current browser and Lighthouse checks. The Lighthouse JSON files contain the actual measurements. They are local laboratory results, not a guarantee of scores after hosting or real-user Core Web Vitals.
