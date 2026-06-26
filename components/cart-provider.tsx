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
 * server (or when storage is unavailable) it falls back to the empty
 * initial state, avoiding hydration mismatches.
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
  const [state, dispatch] = useReducer(cartReducer, initialState, initFromStorage);

  // Persist cart to localStorage on every state change.
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage may be full or disabled — fail silently.
    }
  }, [state]);

  const value = useMemo<CartContextValue>(() => ({ state, dispatch }), [state, dispatch]);

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