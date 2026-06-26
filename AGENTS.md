# Zer Müzik — AGENTS.md

## Stack

- **Next.js 14.2** (App Router) + TypeScript (strict) + React 18
- **Tailwind CSS 3** via CSS variables (design tokens in `globals.css`)
- **Static export** (`output: "export"`, `distDir: "build"`) — no API routes, no Node server deps
- **Icons**: lucide-react (never emoji)
- **Fonts**: Amatic SC (heading) + Cabin (body), loaded via `next/font` in `app/layout.tsx`
- **State**: React Context + `useReducer` + localStorage for cart persistence
- **No backend/database** — product data is hardcoded in `lib/products/data.ts`

## Commands

```bash
npm run dev       # dev server
npm run build     # static export → build/
npm run start     # serve exported build
npm run lint      # next lint (no custom config)
```

**Order**: lint first, then build. No test runner configured.

## Project Layout

| Area | Purpose |
|------|---------|
| `app/` | Pages (`/`, `/store`, `/cart`), layout, global CSS |
| `components/` | Shared UI — `ui/` for abstract primitives (`badge.tsx`) |
| `sections/` | Page sections, all Server Components except where hooks needed |
| `lib/` | Pure logic — reducers, helpers, static data |
| `design-system/zer-müzik/MASTER.md` | Design token reference (colors, spacing, shadows, specs) |
| `build/` | Static export output (gitignored) |

## Architecture Rules

1. **Client boundary**: Components with `"use client"` are the exception. Server Components by default. Mark only the leaf that needs hooks.
2. **Cart pattern**: `cart-provider.tsx` wraps the root layout. Uses `useReducer` with a lazy initializer for localStorage rehydration. Reads `STORAGE_KEY` from `lib/cart/types.ts`.
3. **Reducer**: Pure, with exhaustiveness check (`never` type in `default` branch).
4. **Helpers**: Pure functions, no mutations. `formatPrice()` uses `tr-TR` locale → `₺18.000`.
5. **`@/*` alias** maps to project root (e.g., `@/lib/utils`, `@/components/navbar`).
6. **`cn()` utility** in `lib/utils.ts` — use for all conditional class merging (clsx + tailwind-merge).
7. **Images**: `next/image` is NOT used (`unoptimized: true`, `<img>` tags with `eslint-disable-next-line`). Product images are local files in `public/images/products/` (currently a shared `product-default.jpg` for all products).
8. **Metadata**: Turkish locale (`tr_TR`), title template `"%s | Zer Müzik"`.
9. **No `.env`** required — no external API calls in the app itself.

## Design System Constraints (from MASTER.md)

- **Palette**: Warm ivory `#FFFBF5` bg, near-black `#171717` fg, gold `#A16207` accent
- **Spacing/shadows/radius**: CSS variables in `:root` (`--space-*`, `--shadow-*`, `--radius-*`)
- **Anti-patterns**: No emoji as icons, `cursor:pointer` on all clickables, visible focus rings, `prefers-reduced-motion` respected, transitions on all state changes (150–300ms), no layout-shifting hovers

## Key Gotchas

- **No `/store` nav link on `/store` page** — watch for active link styling; there is currently none
- **Hero section** is commented out in `app/page.tsx` — it exists in `sections/hero.tsx` but is not rendered
- **Contact form** is non-functional (no backend) — it `preventDefault`s and shows a thank-you state
- **`build/` is both Next.js distDir and gitignored** — do not commit generated output
- **No tests exist** — no test framework installed
