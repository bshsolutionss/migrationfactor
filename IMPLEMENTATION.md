# Migration Factor implementation and verification

Audit date: 10 October 2026. Application: the single Next.js app at the repository root.

## Scope and preserved UI

The approved homepage, content, photographs, typography, motion, section ordering, logo-only rounded header and contact drawer are preserved. New links live inside the existing Home/Guides dropdowns and mobile drawer. New pages use scoped styles and the existing brand variables. The only existing visible color adjustment is white footer-button text to correct measured contrast. No expert-members section, invented reviews, business qualifications or prices were added.

## SEO and technical work

- Page-specific canonical, Open Graph and Twitter metadata uses the confirmed `https://migrationfactor.com` domain. The home title also carries the business name.
- Public pages have WebPage/Service/Article and breadcrumb JSON-LD where relevant, plus factual Organization and WebSite nodes. JSON is escaped safely. No invented ratings, people or registration details are included. FAQ rich-result schema was not added to this commercial migration consultancy.
- The sitemap includes the new public tools and consultation page, consistently uses canonical paths, and no longer asserts a fabricated last-modified date. Robots allows public pages and excludes API crawling. API responses also carry noindex headers; missing pages return 404 with noindex.
- Hero responsive sizing/fetch priority, shared image sizing and early local-font preload address the measured loading bottleneck without removing visuals or animation. The decorative footer airplane retains its original image bytes.
- Security headers apply in Next.js as well as Vercel. `X-Powered-By` is disabled. Unversioned static assets use a bounded cache lifetime instead of a year-long immutable declaration.
- Enquiry JSON reads are byte-bounded before parsing. Malformed origins are rejected, internal errors avoid logging submitted content, and existing type/lint errors were corrected with explicit types.
- Existing enquiry rate limiting remains per process. A shared limiter/WAF and durable delivery/storage are still required for a multi-instance production deployment. Vercel temporary files are not durable. Configure the existing HTTPS enquiry webhook before relying on enquiry delivery; API responses explicitly distinguish local save and forwarding.

## Consultation: deliberately frontend only

User-confirmed settings: free, 30 minutes, Monday–Friday, 09:00–21:00 **Asia/Karachi**, phone or video. Last start is 20:30.

Implemented: format/date/time preference, weekday and past-time validation, name, email, international phone, residence, visa category, short enquiry, privacy acknowledgement, editable review and clear/reset. The displayed times are explicitly preferences, not live availability. No booking POST, database write, email, reference number or simulated confirmation occurs. Personal details stay in component memory and are not sent to analytics or third parties.

Before live booking can be enabled, implement a server-only provider/database adapter with:

1. Confirmed consultant/resource identity, working calendar, holidays, exceptions, buffers and capacity. The weekday hours alone are not real availability.
2. Availability retrieval and server-side validation against that source. Store UTC instants and retain the Asia/Karachi schedule zone.
3. Durable booking storage with transactional slot-conflict protection and an idempotency key/unique constraint. Add shared rate limiting and spam protection.
4. Authenticated administration, retention/access policies and consent for the selected provider.
5. A real notification provider, verified sending domain, business recipient and phone/video meeting instructions. Only claim email delivery after provider acceptance; document its delivery limitations.
6. End-to-end tests for success, conflicting slots, retries, provider failures, timezone conversion and cancellation/rescheduling if supported.

No booking credentials are needed for the current frontend. Backend/provider work was explicitly deferred by the user.

## Discovered tool inventory

Discovery covered [Migration Republic](https://migrationrepublic.com.au/), its [employer page](https://migrationrepublic.com.au/employer-sponsored-visas-australia/), [tools portal](https://immigrationagentnearme.com/tools), and linked occupation pages. The portal lists seven tools; an eighth interactive occupation search was found outside the portal. The general skilled-occupation article is informational, rather than another calculator.

| Reference URL | Observed input/flow and output boundary | Implemented route |
| --- | --- | --- |
| https://immigrationagentnearme.com/tools/pr-calculator | Seven stages: age, English, overseas/Australian employment, qualification, Australian study, partner; results are gated by contact submission | `/tools/pr-calculator` — official factors plus specialist education, regional study, Professional Year, NAATI and conditional nomination, capped employment breakdown |
| https://immigrationagentnearme.com/tools/visa-quiz | Four stages: goal, skilled background, funds, partner; result contact gate | `/tools/visa-quiz` — conditional pathway guidance, circumstances, employer, study, onshore restrictions and missing evidence |
| https://immigrationagentnearme.com/tools/eligibility-checker | Passport, under-45 question, English, qualification, character; result contact gate | `/tools/eligibility-checker` — self-reported criteria separated into appears met, attention and verification; no universal six-month passport rule or automatic character refusal |
| https://immigrationagentnearme.com/tools/subclass-482-checker | Eight-stage form; sponsor, occupation, experience/recency/employment type, English, qualification, assessment, location/visa history; public questions and client assets inspected | `/tools/subclass-482-checker` — stream-aware experience, occupation, salary, English and evidence checks; Labour Agreement conditions kept separate |
| https://immigrationagentnearme.com/tools/business-sponsor-checker | Eight questions: sponsor status, trading/compliance, position, salary, capacity, recruitment, location; consent/contact gate | `/tools/business-sponsor-checker` — 482/186/494 business readiness, regional certification, TRT and agreement conditions |
| https://immigrationagentnearme.com/tools/sponsorship-cost-estimator | Four-stage subclass/business/duration setup; itemized output gated by business/contact fields | `/tools/sponsorship-cost-estimator` — government employer costs, SAF turnover/duration and separate applicant-cost link; no invented professional fee |
| https://immigrationagentnearme.com/tools/applicant-cost-calculator | Two-stage subclass/family setup; itemized output behind contact gate | `/tools/applicant-cost-calculator` — 482/186/494 standard and eligible Pacific-regional first-instalment components, adult/child charges and exclusions |
| https://migrationrepublic.com.au/core-skills-occupation-list-csol/ | Search by occupation or ANZSCO; reference page showed 187 entries | `/tools/occupation-search` — 456 official entries from each applicable instrument, search, pagination, 482 caveats and 186 assessing authorities/caveats |

No personal information was submitted to the reference sites to unlock their results. Their gated outputs were not represented as verified. Our calculations are independent implementations using the official sources below. No reference UI, testimonial, fee logic or proprietary backend was copied. All our tool outputs are available without a lead-capture requirement.

## Official rules and data

- [189 points table](https://immi.homeaffairs.gov.au/supporting/Pages/Work/189-points-table.aspx), [190 table](https://immi.homeaffairs.gov.au/supporting/Pages/Work/190-points-table.aspx), [491 table](https://immi.homeaffairs.gov.au/supporting/Pages/Work/491-points-table.aspx), [EOI threshold and invitation limitations](https://immi.homeaffairs.gov.au/visas/working-in-australia/skillselect/expression-of-interest). The calculator uses one qualification, one partner category, a 20-point employment cap and 5/15 points only with relevant nomination/sponsorship confirmed.
- [Salary requirements](https://immi.homeaffairs.gov.au/visas/employing-and-sponsoring-someone/sponsoring-workers/nominating-a-position/salary-requirements): 2026–27 CSIT/TSMIT AUD79,423; SSIT AUD146,576. No generic threshold is applied to an individual labour agreement. Market salary remains a separate requirement.
- [2026 fee amendment](https://www.legislation.gov.au/F2026L00874/asmade/text), Schedule 3 items 7, 62 and 64, effective 1 July 2026. Standard main/adult/child: 482 **4015/4015/1005**; 186 and 494 **6140/3070/1535**. Eligible Pacific-regional rates: 482 **3290/3290/825**; 186/494 **5035/2515/1260**. Eligibility for the concession must be checked; the tool does not determine passport eligibility.
- [Sponsor costs](https://immi.homeaffairs.gov.au/visas/employing-and-sponsoring-someone/sponsoring-workers/learn-about-sponsoring/cost-of-sponsoring), [SAF legislation](https://www.legislation.gov.au/F2018L01092/latest/text) and Migration Regulations regulation 5.37 govern employer estimates. Existing-holder replacement nominations, exemptions, payment surcharges, refunds and professional fees are outside the standard estimate.
- [Official Visa Pricing Estimator](https://immi.homeaffairs.gov.au/visas/visa-pricing-estimator) is the final fee cross-check. This implementation excludes second instalments, subsequent temporary application/non-internet charges, health/testing costs and other special cases, and says so alongside the result.
- Occupations: [482 latest instrument](https://www.legislation.gov.au/F2024L01620/latest), compilation **7 November 2025**, and [186 latest instrument](https://www.legislation.gov.au/F2024L01618/latest), compilation **28 March 2026**. Data was extracted from their official HTML tables; all 456 codes match, are unique, and every caveat resolves to its relevant instrument. Inclusion alone is not visa eligibility. Current amendments must be checked before reliance.
- [BIIP closure](https://immi.homeaffairs.gov.au/visas/getting-a-visa/biip-closure-and-refunds): the quiz does not suggest a new subclass 188 application.

Some Home Affairs pages blocked direct browser retrieval or returned JavaScript shells. Indexed official text and Federal Register documents were used for verification, rather than substituting third-party fee claims. These are dated local rule snapshots, not a live Home Affairs API. Recheck on policy changes; the fee/salary guard withholds results after 30 June 2027.

## Verification and limitations

Automated tests cover motion lifecycle/reduced motion, PR factors/boundaries/caps, invalid answers, conditional fields, independent fee examples, stream-specific thresholds, rollover, occupation search/caveats, consultation validation and bounded requests. Browser checks cover real contact/wizard POSTs to isolated local storage, failure/retry paths, existing country tabs, dropdowns/drawer, metadata, JSON-LD syntax, status codes, internal links, mobile overflow and new frontend flows. No outbound notification provider was used for QA.

Local machine Lighthouse measurements are recorded below after the final run. They are not production/field Core Web Vitals. INP, Google indexing, Search Console ownership and ranking outcomes require external access or real-user data and have not been claimed.

`npm audit --omit=dev` reports zero production vulnerabilities. The development ESLint dependency chain reports five high advisories involving braces/micromatch/fast-glob. Published braces 3.0.3 remained affected at inspection; the offered audit fix downgrades eslint-config-next to an incompatible major. No unsafe forced downgrade was performed. Recheck upstream releases before installing tooling for untrusted repositories.

Live domain check: HTTPS returns 200 from Hostinger/PHP; HTTP redirects 301 to HTTPS. That is a different site from this local Next.js application. Connect the confirmed domain to the intended Next.js deployment, then verify production headers, canonical redirects (including www), assets, sitemap and Search Console. A Git push alone does not establish that the confirmed domain runs this code.

Local full-resolution screenshots, reference observations and audit JSON remain in ignored `docs/`; they are not included in Git or the production bundle.
