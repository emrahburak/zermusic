"use client";

/**
 * Cart Page — full-page cart view at /cart.
 *
 * Lists all cart items with image thumbnails, names, unit prices,
 * quantity controls, and remove buttons. Includes a cart summary
 * with totals and a placeholder checkout button. Shows an empty
 * state with a link to the store when no items are present.
 */

import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products/helpers";
import { CartSummary } from "@/components/cart-summary";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const items = state.items;
  const isEmpty = items.length === 0;

  /** Decrease quantity; remove item entirely when it reaches zero. */
  function handleDecrease(id: string, currentQty: number) {
    if (currentQty <= 1) {
      dispatch({ type: "REMOVE_ITEM", id });
    } else {
      dispatch({ type: "UPDATE_QUANTITY", id, quantity: currentQty - 1 });
    }
  }

  /** Increase quantity by one. */
  function handleIncrease(id: string, currentQty: number) {
    dispatch({ type: "UPDATE_QUANTITY", id, quantity: currentQty + 1 });
  }

  /** Remove an item from the cart. */
  function handleRemove(id: string) {
    dispatch({ type: "REMOVE_ITEM", id });
  }

  if (isEmpty) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
        <ShoppingBag
          className="h-20 w-20 text-muted-foreground"
          aria-hidden="true"
        />
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Sepetiniz boş
        </h1>
        <p className="text-muted-foreground">
          Henüz sepetinize ürün eklemediniz. Mağazamızı keşfedin.
        </p>
        <Link
          href="/store"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-8 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Mağazaya Git
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 font-heading text-4xl font-bold text-foreground">
        Sepetim
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        {/* Item list */}
        <section aria-label="Sepet ürünleri">
          <ul className="divide-y divide-border rounded-lg border border-border bg-card">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 p-4">
                {/* Image thumbnail */}
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="text-base font-semibold text-foreground">
                      {item.name}
                    </h2>
                    <button
                      type="button"
                      aria-label={`${item.name} ürününü sepetten çıkar`}
                      onClick={() => handleRemove(item.id)}
                      className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Birim fiyat: {formatPrice(item.price)}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`${item.name} adetini azalt`}
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span
                        className="min-w-10 text-center text-sm font-semibold text-foreground"
                        aria-label={`Adet: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`${item.name} adetini artır`}
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="text-base font-bold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Continue shopping link */}
          <Link
            href="/store"
            className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowRight
              className="h-4 w-4 rotate-180"
              aria-hidden="true"
            />
            Alışverişe Devam Et
          </Link>
        </section>

        {/* Summary sidebar */}
        <aside aria-label="Sepet özeti" className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">
              Sipariş Özeti
            </h2>

            <CartSummary items={items} />

            <button
              type="button"
              aria-label="Ödemeye geç"
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Ödemeye Geç
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}