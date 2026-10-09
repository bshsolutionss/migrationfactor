# Migration Factor — reference audit and build plan

Prepared before implementation, 7 October 2026.

## Sources
Business copy: Migration-Factor-Website-Report-English.pdf, pages 3–5. Extract: pdf-extracted.txt.
UI only: https://wordpress.validthemes.net/visaco/home-version-three/ . Inspected rendered desktop page, full-page screenshot, HTML, theme CSS, and main.js; reference captures remain in tmp/.
Existing user-supplied assets: public/migrationfactor. No logos used, including logos embedded in promotional posters. No image generation.

## Sections and mapping
1. Blue contact strip and floating white sticky header → verified email, Monday–Friday, text-only brand, requested navigation and telephone.
2. Full-width image hero with centered typography and diagonal blue overlay → exact PDF tagline and consultancy summary.
3. Three overlapping numbered feature cards → student, skilled/employment and family services.
4. Text left / circular photograph right, circular badge → company overview; four-step process badge, no unverified achievement.
5. Pale process strip → four PDF stages instead of reference's three.
6. Dark blue image-left / enquiry-form-right → validated inquiry, local server persistence and optional delivery webhook.
7. Country list with expanding active panel → Australia, United States, Canada, New Zealand, Europe (region), United Kingdom. No invented country-specific offerings.
8. Coaching tiles around center panel → IELTS/PTE, mock tests and tutor feedback; no invented discounts or extra coaching.
9. Three-column team zone → explicit TODO pending authorized biographies, photos and credentials.
10. Centered testimonial zone → explicit TODO pending approved quotes and permission. No fabricated carousel content.
11. Split photo/blue CTA → eligibility assessment.
12. Two editorial cards → PDF next steps and document preparation, not invented news.
13. Contact strip and navy footer → verified contacts/locations; newsletter/social TODO.
Additional pages: Home, About, Services and ten service detail pages, Countries, Testimonials, FAQ, Contact, IELTS, PTE, preparation guides, content TODO.

## Motion audit
Theme main.js: SplitText words yPercent 100, stagger .025, power4 easing, trigger top 90%; default GSAP tween duration .5s. WOW fadeInUp/fadeInDown with 100/200/300ms stagger; default animate.css duration 1s. Feature card transitions .35s ease-in-out. Circular and numeric counters are visibility triggered; markup counter data-speed=2000. Country selector changes active pane on click; CSS handles opacity/transforms. Testimonial Swiper uses fade/crossFade with autoplay, default 300ms speed and 3000ms delay. Team hover reveals social overlay; CTA button fill/ripple hover. Sticky navigation compacts on scroll. No invented slideshow in the single-background hero.
Implement equivalent native CSS/IntersectionObserver motion, with reduced-motion handling. Counter uses verified four process steps; unsupported rating/progress metrics remain TODO. Team/social/testimonial transitions cannot be demonstrated with absent content and stay pending.

## Reusable components
TextBrand, Header, Footer, Button, SectionTitle, Photo, FeatureCard, AboutSection, Process, EnquiryForm, CountrySelector, Coaching, TodoSection, ArticleCard, FAQ, BreadcrumbHero, ServiceCard.

## Content controls
Central content module records PDF page provenance. Paraphrases retain original meaning. No eligibility/legal advice or current legislative claims. Specific potentially obsolete subclass lists and AAT wording held for owner review rather than promoted as current. No unsupported scores, experience, rates or customer totals. FAQ answers derived solely from report. Canonical domain is migrationfactor.com as stated in report.

## Build
Dependency-light generated HTML, shared CSS/JS and Node HTTP backend, chosen for fast delivery and minimal browser JavaScript. All source, generated pages, data and reports stay in this folder. Editable image mapping is separate from templates. Local enquiries are durably saved server-side; successful persistence is explicitly distinguished from email delivery. Configured optional webhook delivery uses real responses.

## Verification
Build + syntax checks; actual server validation/persistence and no false-success tests; all routes/assets; browser widths 320,360,375,390,414,768,1024,1280,1440,1920; mobile menu, countries, FAQ, error/success UX, keyboard, reduced motion; Lighthouse where tooling is available. Record measured results, never assume 90+.


## User correction implemented
The user explicitly clarified that the exact reference image files must be reused in the same visual positions. 56 original reference images were downloaded to public/reference; docs/reference-assets.json maps every source URL. Home now uses the exact airport family hero, blue overlay, plane graphic, feature icons, consultant photograph and silhouette, process graphics, enquiry traveller/background, matching flags for documented destinations, eight coaching icons, three team portraits, testimonial portraits/map, CTA cutout/decorations, two article photos and footer graphics. Reference logos remain excluded. Dubai/France destination services remain excluded because the business PDF does not list them. Company profiles and client claims remain TODO. No AI generation.
