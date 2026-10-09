# Animation restoration — 9 October 2026

Scope: animation behavior only in `nextjs-app`. Preserve all routes, text, images, colors, typography, spacing and section geometry. The previous static prototype is not the Next.js application.

## Source inspection and checklist (recorded before implementation)

Inspected the rendered [Visaco home version three](https://wordpress.validthemes.net/visaco/home-version-three/), its public HTML, [main.js](https://wordpress.validthemes.net/visaco/wp-content/themes/visaco/assets/js/main.js), [animate.min.css](https://wordpress.validthemes.net/visaco/wp-content/themes/visaco/assets/css/animate.min.css), [style.css](https://wordpress.validthemes.net/visaco/wp-content/themes/visaco/assets/css/style.css), validnavs CSS/JS and WOW initialization. Local source evidence is in `docs/animation-source/`. The requested URL actually renders `banner-style-five-area`, a single-image hero, rather than the unrelated `banner-fade` slider defined in the shared theme script.

| Source effect | Current project / mapped components | Restoration checklist |
| --- | --- | --- |
| GSAP / SplitText word entrance: yPercent 100, 25ms stagger, trigger top 90%; tween defaults 500ms and power1.out (the timeline's `ease: power4` is not a tween default) | HeroSection, SectionHeading, AboutSection, ProcessSection, CtaSection, Breadcrumb | Replace unsafe post-hydration text-node replacement with React-owned word spans; match source timing and trigger; clean route lifecycle |
| WOW / animate CSS: fadeInUp +20px and fadeInDown -20px, **800ms** duration; viewport entry with offset 0; mobile enabled | All existing `.reveal` elements | Correct the existing 35px / 1s approximation; separate word and WOW triggers; keep no-JS / reduced-motion content visible |
| Hero description 100ms, CTA 300ms; feature group 200ms; process group 100ms; consultant / enquiry image 100ms; enquiry form fadeInDown | HeroSection, FeaturesSection, ProcessSection, AboutSection, EnquirySection / EnquiryForm | Restore group timing and missing downwards form entrance without repositioning components |
| Feature active sibling swap on mouseenter; background, heading, description, icon, number and rule transitions 350ms ease-in-out | FeaturesSection / MotionEffect | Retain active behavior, include keyboard focus and reduced motion; transition descendants together |
| Button skewed fill: 250ms ease-in-out, translateY(-45%) skew(25deg) scale(0 → 1.2) | Existing shared `.button`, including enquiry submit | Restore fill using a pseudo-element while keeping current dots, label, padding and palette |
| Coaching fill expands from centered 60% rectangle to full card, 350ms ease-in-out | CoachingSection | Restore expanding fill using existing approved hover color; remove the unrelated lift effect |
| Country hover / active overlay: 350ms opacity and 110px upward travel | CountrySection | Restore entry direction / timing and desktop pointer/focus activation; retain click selection and existing panel position |
| Sticky nav state at scroll >34px; menu collapse and smooth anchor scrolling | Header / global CSS / back-to-top | Match threshold, preserve sticky dimensions, animate mobile menu height and clean listeners on route changes |
| Blog/image and reusable link transitions | ArticlesSection / ServiceGrid / nav | Inspect and preserve existing applicable effects; do not invent new motion |
| Counters / circle progress, Swiper testimonial fade and other shared-script carousels, team social overlays, preloader | No matching current business sections or loading UI | Not applicable: introducing these would add content/components or change the approved UX. No carousel/counter claims are fabricated |
| Parallax `.upDownScrol`; spinning / continuous utility animations | No matching classes on this reference homepage or current pages; hero bands are static in source | Do not add parallax or continuous motion to static assets |

The current dependency manifest has Next.js / React only. Keep the existing native CSS / IntersectionObserver approach: these effects need only transforms, opacity, transitions and one-shot viewport triggers. Importing the entire source jQuery/WOW/GSAP/SplitText/Swiper stack would introduce DOM ownership problems and unused carousel code. Native easing approximates the source GSAP tween; no new dependency is necessary.

Pre-edit risks found: global `html.motion` hides future route content before initialization; raw heading text replacement persists without cleanup; reduced-motion early-return also disables feature interactivity; one observer gives WOW the wrong 90% trigger; missing live preference handling; menu opens instantly and stays open after route changes.

## Implementation and verification

To be completed after browser checks, lint, typecheck and production build.
