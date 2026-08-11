---
name: next-app-router-migration
description: Migrate this portfolio from Vite React Router to Next.js App Router without changing its visual system or duplicating UI components.
---

# Next App Router migration

- Preserve the existing `src/components/*` components and Tailwind design language. Do not recreate markup when a component already owns it.
- Put route entries in `app/` using App Router conventions: a shared `layout.tsx`, `page.tsx` files, and a dynamic `project/[id]/page.tsx` route.
- Mark only stateful, browser-dependent, animated, or event-handling modules with `"use client"`; keep route shells and metadata server-rendered where possible.
- Replace React Router `Link`, navigation, params, and outlet behavior with Next.js `Link`, `useRouter`, `usePathname`, and App Router layout composition.
- Keep global styles in `app/globals.css` and configure external image hosts through `next.config.ts` when using `next/image`; otherwise retain intentionally external native image rendering.
- Verify with the production build and TypeScript checks after migration.
