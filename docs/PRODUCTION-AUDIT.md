# Production preparation audit

Date: 8 October 2026

## Scope

Refactored the existing static rendering architecture and Node backend. Preserved the approved homepage's nine sections and their order, responsive breakpoints, card positions, image containers and motion timings. No replacement framework or layout redesign was introduced.

Brand identity now uses the supplied Migration Factor logos and cyan/teal/blue colors. Header mark, favicon and social preview are derived only from those files.

Logo follow-up: the header now shows only the company mark, as requested, at 64–68px on phones, 72px on tablets and 80px on desktop. The footer uses the supplied flat logo with its original company name and tagline, aligned at the user-requested 169.4px width. Header heights remain 72/78/86px. All ten requested widths passed overflow and logo-containment checks. Services stays highlighted when viewing a service detail page. The diagonal hero shade was restored at the user's request in the current teal/cyan palette, preserving section geometry.

## Cleanup and organization

- Split the former component monolith into reusable layout, section, form, UI and shared modules.
- Separated content, navigation, SEO, environment, HTTP headers, form validation, durable storage and delivery.
- Reused one field validator in the browser and server.
- Removed unused theme imagery, duplicate optimized images, obsolete migration scripts, temporary reference downloads and unused demo CSS selectors.
- Removed the unused Playwright accessibility dependency. Lighthouse remains a development audit tool; there are no production npm dependencies.
- Preserved original user assets and private enquiry records. Only curated public assets enter the build.
- Build output is recreated to avoid stale pages and assets; generated source files stay outside runtime output.

## Verification

- Six automated tests passed via `npm run check`.
- 21 rendered routes checked at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 and 1920 CSS pixels: 210 browser checks, no horizontal overflow or broken loaded images observed.
- All generated local page links, linked asset files and image files checked by automated tests.
- Mobile navigation opened/closed, Escape returned focus, and invalid enquiry submission displayed associated field errors and focused the first invalid field.
- Contact service query preselection verified for Student Visa and PTE Coaching.
- Successful browser submission tested on an isolated local server: success message, durable storage, form reset and enabled submit state verified. Test records were isolated from real lead data.
- FAQ disclosure and country-selector expanded/hidden states verified.
- Titles, descriptions, canonicals, Open Graph image, Twitter cards, Organization, office LocalBusiness, FAQ and Breadcrumb structured data validated across routes.
- Sitemap contains 20 indexable routes; error page is excluded and marked noindex. Missing URLs return HTTP 404.

## Lighthouse laboratory measurements

| Mode | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Mobile | 100 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 96 | 100 |

Desktop Best Practices flags the approved decorative process-track image's stretched aspect ratio. Its appearance was preserved rather than changing the approved design for a metric. These are local headless Chrome measurements; deployed measurements and field Core Web Vitals depend on hosting and real traffic.

## Outstanding launch configuration

Live delivery endpoint, approved privacy/retention policy, verified office addresses and final business/editorial approval remain on the source-content TODO list. No testimonials, statistics, credentials or company claims were invented to fill missing information. The site is available as a local network preview; no external deployment was performed.

## Responsive follow-up — 8 October 2026

- Fixed the About image on Home and About: its HTML height of 800px was remaining fixed when its width shrank on mobile. CSS now keeps the original square proportions without the tall crop. The photograph, container, section order and desktop circular treatment are retained.
- Added automatic height to the coaching sidebar photograph to preserve natural sizing within its existing height limit.
- Replaced unsupported United States, New Zealand and European flag emoji with native vector icons. The supplied Australia, UK and Canada image assets are retained. Flag positions and desktop/mobile dimensions are unchanged.
- Rechecked all 21 routes at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440 and 1920px. All 210 checks passed viewport overflow, text/control containment and heading-count checks. No broken completed image loads were observed. These measurements are saved in responsive-audit.json.
- Verified mobile menu open/close, Escape focus return, navigation to FAQ, all eight FAQ disclosures, single-country expanded state, both forms' error messages/first-invalid-field focus, and the IELTS CTA's contact-service preselection.
- Latest npm run check passed syntax/build and six tests covering saved enquiries, invalid input, server protections, generated links/assets, SEO and homepage section order. No browser JavaScript errors were reported during the audit.
- A fresh browser success-submission check on a separate isolated local server was blocked by browser security review because access permission was denied. The blocked action was not retried through a workaround; automated persistence tests passed. The temporary test server and its isolated data directory were removed.
- Email delivery remains pending configuration. The current form states this clearly; local persistence is available.

Visual evidence: mobile-about-preview.png and mobile-countries-preview.png.
