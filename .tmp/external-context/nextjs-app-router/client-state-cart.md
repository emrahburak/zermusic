---
source: Context7 API (/websites/nextjs + /reactjs/react.dev)
library: Next.js + React
package: nextjs-app-router
topic: client-side cart state with Context and useReducer
fetched: 2026-06-26T00:00:00Z
official_docs:
  - https://nextjs.org/docs/app/getting-started/server-and-client-components
  - https://react.dev/learn/extracting-state-logic-into-a-reducer
  - https://react.dev/reference/react/useContext
---

# Next.js App Router — Client-Side Cart State (Context + useReducer)

## Server vs. Client Components

In the App Router:

- **Server Components** render on the server by default. They are good for data fetching, accessing backend resources, and reducing client-side JavaScript.
- **Client Components** are needed for interactivity: state, effects, event handlers, and browser APIs.

Add `'use client'` at the top of any file that uses client-only features.

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>
}
```

## Composition pattern

Keep Client Components as small and as deep in the tree as possible. A Server Component layout can import and render both Server and Client Components.

```tsx
// app/layout.tsx (Server Component by default)
import Logo from './logo'        // Server Component
import Search from './search'    // Client Component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav>
        <Logo />
        <Search />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

Server Components can fetch data and pass it as props to Client Components.

```tsx
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)
  return <LikeButton likes={post.likes} />
}
```

## React Context provider as a Client Component

React Context requires a Client Component. Wrap children with the provider so both Server and Client children can consume it (children rendered inside a Client Component can be Server Components passed as `children`).

```tsx
'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' }

const initialState: CartState = { items: [] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }
      return { items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((item) => item.id !== action.id) }
    case 'UPDATE_QUANTITY':
      return {
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      }
    case 'CLEAR_CART':
      return initialState
    default:
      throw new Error('Unknown cart action')
  }
}

interface CartContextValue {
  state: CartState
  dispatch: React.Dispatch<CartAction>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
```

## Place the provider in the root layout

Because the provider is a Client Component, keep it in its own file and import it into the root layout. This keeps the root layout mostly server-rendered.

```tsx
// app/layout.tsx
import './globals.css'
import { CartProvider } from '@/components/cart-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
```

## Using the cart in components

Any component that calls `useCart()` must be a Client Component.

```tsx
'use client'

import { useCart } from '@/components/cart-provider'

export function AddToCartButton({ product }: { product: { id: string; name: string; price: number } }) {
  const { dispatch } = useCart()

  return (
    <button
      onClick={() =>
        dispatch({
          type: 'ADD_ITEM',
          payload: { ...product, quantity: 1 },
        })
      }
    >
      Add to cart
    </button>
  )
}
```

```tsx
'use client'

import { useCart } from '@/components/cart-provider'

export function CartSummary() {
  const { state } = useCart()
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div>
      <p>Items: {state.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  )
}
```

## Best practices for a store frontend

1. **Minimize client boundaries** — Keep `'use client'` as close to the leaves as possible. Product grids, layouts, and marketing pages can stay Server Components.
2. **Lift shared state via Context** — Use a single `CartProvider` near the root so cart state is available everywhere without prop drilling.
3. **Encapsulate state logic in a reducer** — `useReducer` scales better than `useState` for multi-action state like add/remove/update/clear.
4. **Pass server-fetched data into Client Components** — Fetch product catalogs in Server Components and pass them as props to interactive Client Components.
5. **Persist if needed** — The docs above show in-memory state. For real stores, pair the reducer with `localStorage` inside an effect or a store library like Zustand/Jotai.
