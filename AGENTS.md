# Migration Factor UI preferences

For Visaco design-restoration work:

- Use Visaco Home Version Three for section layout, proportions and decoration placement.
- Always adapt copied backgrounds, shapes, icons, borders and hover effects to the existing Migration Factor brand tokens: teal primary, cyan accents and dark teal. Do not retain unrelated demo blue/red colors. The user should not need to repeat this preference.
- Preserve the user's business content and working functionality. Leave already-correct sections alone.
- Keep the expert-members section excluded.
- The mission/vision slider uses decorative portrait photos; preserve the company copy and do not invent client testimonials or reviewer identities.
- The active application is the self-contained Next.js app in `nextjs-app/`. Root commands and Vercel deploy this app. Do not regenerate the retired static output.
- Keep the navbar logo-only, without an added Migration Factor wordmark. Preserve the rounded floating shell, original dropdowns, phone block and contact drawer, and retain the original enlarged favicon. Use the current approved Next.js UI as the reference; never revert to older static or demo UI.

Read the additional Next.js instructions in `nextjs-app/AGENTS.md` when editing that application.

## Locked UI and verification rules

- Preserve the exact current layout, spacing, assets, content and animations. Read existing components before editing; leave working visuals alone.
- Keep the requested brand palette locked: teal #0b666a / #07484b, cyan #35b5ac and dark teal #042628. Do not restyle approved elements or introduce demo colors.
- Keep production builds and TypeScript clean. Check relevant interactions for hydration errors and regressions.
