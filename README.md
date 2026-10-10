# Migration Factor

The active website is a self-contained Next.js 16 App Router application in `nextjs-app/`. Preserve the approved UI, business content, header and animations when making changes.

## Development and verification

```powershell
npm run dev
npm run build
npm start
npm run lint
```

Root commands delegate to `nextjs-app`. The local server prints its URL; the default port is 3000. Run TypeScript and the existing animation regression checks inside the app:

```powershell
cd nextjs-app
npx tsc --noEmit
node --test tests/motion.test.mjs
```

## Active source

- `nextjs-app/src/app/`: pages, metadata and enquiry API handlers.
- `nextjs-app/src/components/`: approved layout, sections and interactions.
- `nextjs-app/src/lib/`: business constants, validation, assessment controller and enquiry persistence/delivery.
- `nextjs-app/src/styles/`: site, restoration, motion and assessment styles.
- `nextjs-app/public/`: media, branding, fonts and preserved source assets.

Application imports remain inside `nextjs-app`. Vercel uses the `nextjs` framework and `nextjs-app/.next`; root HTML output no longer shadows Next.js routes. Root `src/`, legacy generator scripts and static tests remain for historical reference and are excluded from the deployed application. Avoid running `static:build`, which recreates the retired static output.

## Enquiries

Both the contact form and the three-step Visa Assessment submit JSON to `/api/enquiries`. The assessment presents existing guidance and collects profile details; it does not calculate visa eligibility. `/api/config` reports whether forwarding is configured.

Validated enquiries are saved to private `enquiries.ndjson` files. `DATA_DIR` overrides the default local data directory. On Vercel, the fallback is temporary storage; configure an HTTPS `ENQUIRY_WEBHOOK_URL` for external delivery, with optional `ENQUIRY_WEBHOOK_TOKEN`. The UI reports the backend's actual delivery result and never claims unconfigured email delivery. Do not put enquiry records or environment secrets in Git.

See `docs/NEXTJS-VERIFICATION.md` for the consolidation changelog and verification results.
