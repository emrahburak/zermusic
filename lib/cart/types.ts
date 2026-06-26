/**
 * Cart type definitions.
 *
 * These types describe the shape of cart state and the discriminated
 * union of actions consumed by `cartReducer`.
 */

/** A single product line item in the cart. */
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

/** The full cart state — a list of line items. */
export interface CartState {
  items: CartItem[];
}

/** Discriminated union of all cart actions. */
export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "UPDATE_QUANTITY"; id: string; quantity: number }
  | { type: "CLEAR_CART" };

/** localStorage key used to persist and rehydrate cart state. */
export const STORAGE_KEY = "zer-muzik-cart";