---
source: Context7 API (/websites/nextjs)
library: Next.js
package: nextjs-app-router
topic: static export configuration for frontend-only sites
fetched: 2026-06-26T00:00:00Z
official_docs: https://nextjs.org/docs/app/guides/static-exports
---

# Next.js App Router — Static Export (Frontend-Only / No Backend)

## Enable static export

Set `output: 'export'` in `next.config.js` or `next.config.ts`. Running `next build` will then generate a static site in the `out` directory.

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Optional: change `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: prevent automatic `/me` -> `/me/`
  // skipTrailingSlashRedirect: true,

  // Optional: change the output directory from `out` to `dist`
  // distDir: 'dist',
}

module.exports = nextConfig
```

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'build',
}

export default nextConfig
```

## Build the static site

```bash
npm run build
# or
pnpm build
```

The output will be in `out/` by default (or the directory set by `distDir`).

## Image optimization

The default Next.js image optimization server is **not available** in static export. Choose one of these options:

### Option A: Disable optimization globally

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

### Option B: Use a custom image loader

Use a CDN such as Cloudinary or Imgix.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './my-loader.ts',
  },
}

module.exports = nextConfig
```

### Option C: Use the `unoptimized` prop on a specific image

```tsx
import Image from 'next/image'

export default function Logo() {
  return <Image src="/logo.svg" alt="Logo" width={120} height={40} unoptimized />
}
```

## Unsupported features in static export

The following features require a Node.js server or dynamic logic and are **not supported** with `output: 'export'`:

- Dynamic Routes without `generateStaticParams()` or with `dynamicParams: true`
- Route Handlers that rely on `Request`, Cookies, or runtime logic (only static `GET` handlers with `export const dynamic = 'force-static'` are supported)
- Rewrites, Redirects, Headers, Proxy
- Incremental Static Regeneration (ISR)
- Image Optimization with the default loader
- Draft Mode
- Server Actions
- Intercepting Routes

### Static Route Handler example

If you need static JSON files at build time:

```ts
export const dynamic = 'force-static'

export function GET() {
  return new Response('Hello World', { status: 200 })
}
```

## Version-specific caveats

- App Router Route Handlers **can** be used with static exports, unlike Pages Router API Routes.
- Only `GET` Route Handlers work, and only when marked `dynamic = 'force-static'`.
- Server Actions are unavailable; use client-side state or call external APIs from Client Components instead.
- If you later need server features (API routes, SSR, etc.), remove `output: 'export'`.
