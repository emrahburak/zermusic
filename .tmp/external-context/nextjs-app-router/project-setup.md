---
source: Context7 API (/websites/nextjs)
library: Next.js
package: nextjs-app-router
topic: project setup with TypeScript and Tailwind CSS
fetched: 2026-06-26T00:00:00Z
official_docs: https://nextjs.org/docs/app/getting-started/installation
---

# Next.js App Router — Project Setup (TypeScript + Tailwind CSS)

## Create a new project

Use `create-next-app` to scaffold a project. The `--yes` flag accepts the recommended defaults (TypeScript, ESLint, Tailwind CSS, App Router, and AGENTS.md).

```bash
# pnpm
pnpm create next-app@latest my-app --yes
cd my-app
pnpm dev

# npm
npx create-next-app@latest my-app --yes
cd my-app
npm run dev

# yarn
yarn create next-app@latest my-app --yes
cd my-app
yarn dev

# bun
bun create next-app@latest my-app --yes
cd my-app
bun dev
```

### CLI customization options

`create-next-app` can also be run interactively to choose:

- TypeScript
- Linter (ESLint, Biome, or none)
- React Compiler
- Tailwind CSS
- `src/` directory
- App Router
- Import alias
- AGENTS.md

## Tailwind CSS v3 setup

If not installed by the template, add Tailwind CSS v3 and its peer dependencies, then generate the config files.

```bash
pnpm add -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

### Configure content paths

Update `tailwind.config.js` so Tailwind scans the `app` directory.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add Tailwind directives to global CSS

In `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Import global CSS in the root layout

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

## Key file patterns after setup

```
my-app/
├── app/
│   ├── layout.tsx        # Root layout (required in App Router)
│   ├── page.tsx          # Home page at /
│   ├── globals.css       # Tailwind directives + global styles
│   └── ...
├── components/           # Shared UI components
├── lib/                  # Helpers, types, constants
├── public/               # Static assets
├── next.config.ts        # Next.js configuration
├── tailwind.config.js    # Tailwind content/theme config
├── postcss.config.js     # PostCSS config
└── tsconfig.json         # TypeScript config
```

## Version-specific caveat

The fetched docs still reference **Tailwind CSS v3** (`tailwindcss@^3`). Newer Next.js templates may ship with Tailwind v4, which uses a different configuration model (CSS-based config, no `tailwind.config.js`). Always verify the version installed by `create-next-app` and follow the matching Tailwind docs if you see `@import "tailwindcss"` in `globals.css` instead of the v3 directives.
