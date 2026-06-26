---
source: Context7 API (/websites/nextjs)
library: Next.js
package: nextjs-app-router
topic: App Router routing and layout conventions
fetched: 2026-06-26T00:00:00Z
official_docs: https://nextjs.org/docs/app/getting-started/layouts-and-pages
---

# Next.js App Router — Routing & Layout Conventions

## App Router basics

The App Router was introduced in Next.js 13 and is built on top of React Server Components. It uses file-system based routing and supports layouts, nested routing, loading states, and error handling.

## Special file conventions

| File        | Purpose                                                              |
|-------------|----------------------------------------------------------------------|
| `page`      | Exposes a route publicly (must export a component).                  |
| `layout`    | Provides shared UI across multiple routes in a segment.              |
| `loading`   | Shows an instant loading state by wrapping `page` in Suspense.       |
| `error`     | Defines an error boundary for the segment.                           |
| `template`  | Similar to layout, but re-mounts on navigation.                      |
| `route`     | Defines an API / Route Handler (limited with static export).         |

These files can use `.js`, `.jsx`, `.ts`, or `.tsx` extensions.

## Root layout

Every App Router app requires a root layout in `app/layout.tsx`. It replaces `pages/_app.tsx` and `pages/_document.tsx` from the Pages Router and **must** include `<html>` and `<body>` tags.

```tsx
// app/layout.tsx
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

## Nested layouts

Create a `layout.tsx` inside a route segment to share UI for that subtree.

```tsx
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

This layout wraps all pages under `/blog`.

## Loading UI

Create a `loading.tsx` in a segment to show a skeleton while the page loads.

```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <LoadingSkeleton />
}
```

This automatically wraps `page.tsx` and its children in a React `<Suspense>` boundary.

## Error handling

Create `error.tsx` inside a segment. Error boundaries must be Client Components.

```tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

For root-level errors, use `app/global-error.tsx`, which must define its own `<html>` and `<body>`.

```tsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```

## Dynamic routes

Use bracket syntax for dynamic segments.

```
app/
└── products/
    └── [slug]/
        └── page.tsx   # matches /products/shoe, /products/hat, etc.
```

### Static generation for dynamic routes

Use `generateStaticParams` to pre-render specific paths at build time.

```tsx
// app/products/[slug]/page.tsx
export async function generateStaticParams() {
  const products = await fetch('https://api.example.com/products').then((res) =>
    res.json()
  )

  return products.map((product: { slug: string }) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // fetch/display product details
  return <div>Product: {slug}</div>
}
```

### Important notes for static export

- Dynamic routes **must** implement `generateStaticParams()` or set `export const dynamic = 'force-static'`.
- `dynamicParams: true` is not supported in static export mode.
- `generateStaticParams` replaces `getStaticPaths` from the Pages Router.

## Route groups

Use parentheses to group routes without affecting the URL path.

```
app/
├── (shop)/
│   ├── layout.tsx      # Shared shop layout
│   ├── page.tsx        # /
│   └── cart/
│       └── page.tsx    # /cart
└── (marketing)/
    ├── about/
│       └── page.tsx    # /about
```

## Key conventions summary

- `app/page.tsx` = `/`
- `app/about/page.tsx` = `/about`
- `app/blog/[slug]/page.tsx` = `/blog/:slug`
- `app/(group)/page.tsx` = `/` (group name is omitted from URL)
- Layouts preserve state and do not re-mount on navigation; templates re-mount.
