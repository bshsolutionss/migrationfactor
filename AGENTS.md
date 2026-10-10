# Migration Factor UI preferences

For Visaco design-restoration work:

- Use Visaco Home Version Three for section layout, proportions and decoration placement.
- Always adapt copied backgrounds, shapes, icons, borders and hover effects to the existing Migration Factor brand tokens: teal primary, cyan accents and dark teal. Do not retain unrelated demo blue/red colors. The user should not need to repeat this preference.
- Preserve the user's business content and working functionality. Leave already-correct sections alone.
- Keep the expert-members section excluded.
- The mission/vision slider uses decorative portrait photos; preserve the company copy and do not invent client testimonials or reviewer identities.
- The active application is the single Next.js app at the project root. Use root `src/`, `public/`, `package.json` and configs. Do not recreate a nested `nextjs-app` or retired static output.
- Keep the navbar logo-only, without an added Migration Factor wordmark. Preserve the rounded floating shell, original dropdowns, phone block and contact drawer, and retain the original enlarged favicon. Use the current approved Next.js UI as the reference; never revert to older static or demo UI.

Keep pages composed from reusable components under `src/components/layout`, `sections`, `shared` and `ui`.

## Locked UI and verification rules

- Preserve the exact current layout, spacing, assets, content and animations. Read existing components before editing; leave working visuals alone.
- Keep the requested brand palette locked: teal #0b666a / #07484b, cyan #35b5ac and dark teal #042628. Do not restyle approved elements or introduce demo colors.
- Keep production builds and TypeScript clean. Check relevant interactions for hydration errors and regressions.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
