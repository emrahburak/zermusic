/**
 * Cart reducer — pure state transitions for the shopping cart.
 *
 * Every case returns a new state object; the previous state is never
 * mutated. This keeps the reducer predictable and easy to test.
 */

import type { CartAction, CartState } from "./types";

/** The empty cart used as the initial state and by `CLEAR_CART`. */
export const initialState: CartState = { items: [] };

/**
 * Add an item to the cart.
 *
 * If an item with the same id already exists, its quantity is
 * incremented by the incoming payload quantity. Otherwise the new
 * item is appended.
 */
function addItem(state: CartState, payload: CartState["items"][number]): CartState {
  const existing = state.items.find((item) => item.id === payload.id);

  if (existing) {
    return {
      items: state.items.map((item) =>
        item.id === payload.id
          ? { ...item, quantity: item.quantity + payload.quantity }
          : item,
      ),
    };
  }

  return { items: [...state.items, payload] };
}

/** Remove every item matching the given id. */
function removeItem(state: CartState, id: string): CartState {
  return { items: state.items.filter((item) => item.id !== id) };
}

/**
 * Update the quantity of a single item.
 *
 * If the requested quantity is zero or negative the item is removed
 * entirely, keeping the cart free of zero-quantity lines.
 */
function updateQuantity(state: CartState, id: string, quantity: number): CartState {
  if (quantity <= 0) {
    return removeItem(state, id);
  }

  return {
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    ),
  };
}

/**
 * The cart reducer.
 *
 * A pure function: given the same state and action it always returns
 * the same next state with no side effects.
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      return addItem(state, action.payload);
    case "REMOVE_ITEM":
      return removeItem(state, action.id);
    case "UPDATE_QUANTITY":
      return updateQuantity(state, action.id, action.quantity);
    case "CLEAR_CART":
      return initialState;
    default:
      // Exhaustiveness check — a new action type will fail to compile.
      const _exhaustive: never = action;
      throw new Error(`Unknown cart action: ${JSON.stringify(_exhaustive)}`);
  }
}