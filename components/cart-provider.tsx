"use client";

/**
 * CartProvider — React Context + useReducer cart store with
 * localStorage persistence.
 *
 * The provider is a Client Component so it can use hooks and browser
 * APIs. It is imported into the root layout so cart state is available
 * throughout the tree without prop drilling.
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

import { cartReducer, initialState } from "@/lib/cart/reducer";
import { STORAGE_KEY, type CartAction, type CartState } from "@/lib/cart/types";

/** Value exposed by the cart context. */
interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Lazy initializer for `useReducer`.
 *
 * Reads the persisted cart from localStorage on the client. On the
 * server it falls back to the empty initial state.
 *
 * NOTE: The value from this initializer is NOT used during hydration.
 * See `hydrated` guard below.
 */
function initFromStorage(): CartState {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialState;
    }

    const parsed = JSON.parse(raw) as CartState;
    if (!parsed || !Array.isArray(parsed.items)) {
      return initialState;
    }

    return parsed;
  } catch {
    // Corrupted storage — start fresh rather than crash.
    return initialState;
  }
}

/** Provider component — wrap the app (or a subtree) to enable cart state. */
export function CartProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, initialState, initFromStorage);

  // Mark hydration complete after first client-side paint.
  // Until then, expose initialState to match the server render.
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Persist cart to localStorage on every state change (only after hydration).
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be full or disabled — fail silently.
    }
  }, [state, hydrated]);

  // During hydration the provider exposes initialState so that every consumer
  // produces the same DOM as the server render. After hydration it switches
  // to the real reducer state (which may contain localStorage data).
  const visibleState = hydrated ? state : initialState;
  const value = useMemo<CartContextValue>(
    () => ({ state: visibleState, dispatch }),
    [visibleState, dispatch],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Access the cart context. Throws when used outside a `CartProvider`. */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

/** Convenience selector — total number of individual items in the cart. */
export function useCartCount(): number {
  const { state } = useCart();
  return state.items.reduce((sum, item) => sum + item.quantity, 0);
}

/** Convenience selector — total price of all items in the cart. */
export function useCartTotal(): number {
  const { state } = useCart();
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}