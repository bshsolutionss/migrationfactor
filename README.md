# Migration Factor

A single Next.js 16 App Router application, running directly from this project root. The approved website UI, business content and animations are preserved.

## Commands

```powershell
npm install
npm run dev
npm run build
npm start
npm run typecheck
npm test
npm run lint
```

The server prints its local URL (normally http://localhost:3000). Vercel uses the root Next.js application and default build output. There is one package.json, package-lock.json, public directory and src directory.

## Component-based structure

```text
src/
  app/                 Pages, layouts, metadata and API routes
  components/
    layout/            Header, Footer, Breadcrumb and header controller
    sections/          Homepage/service sections, forms and assessment
    shared/            Motion, word reveals and animated counter
    ui/                Reusable buttons, headings, images and icons
  lib/                 Business constants, validation and enquiry/assessment logic
  styles/              Approved site, restoration, motion and assessment CSS
public/                Media, brand assets, fonts and supplied originals
tests/                 Animation regression checks
docs/                  Project documentation and verification records
```

Page files compose the existing reusable components. Update shared components at their source and preserve approved visuals. No nested nextjs-app or legacy static generator is required.

## Enquiries

The contact form and Visa Assessment submit JSON to /api/enquiries. /api/config reports whether forwarding is configured. The assessment collects a profile and presents existing guidance; it does not calculate visa eligibility.

Copy .env.example to .env.local for local configuration. DATA_DIR overrides private enquiry storage. Otherwise local enquiries are stored in data/enquiries.ndjson. On Vercel, temporary filesystem storage is not durable; configure ENQUIRY_WEBHOOK_URL for external delivery, with optional ENQUIRY_WEBHOOK_TOKEN. The response reports actual delivery status. Never commit enquiry records or environment secrets.

See docs/ROOT-STRUCTURE.md for the root migration and docs/NEXTJS-VERIFICATION.md for the earlier consolidation audit. Earlier historical reports may use the former nextjs-app path.
