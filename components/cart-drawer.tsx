"use client";

/**
 * CartDrawer — slide-in cart panel from the right edge.
 *
 * Lists all cart items with image thumbnails, names, unit prices,
 * and quantity controls. Includes a sticky footer with totals and
 * a placeholder checkout button. Closes via overlay click, Escape
 * key, or the close button. Respects prefers-reduced-motion.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart, useCartCount, useCartTotal } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products/helpers";
import { CartSummary } from "@/components/cart-summary";

/** Props for the CartDrawer component. */
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart();
  const itemCount = useCartCount();
  const total = useCartTotal();

  // Ref to the close button so we can return focus to it (and the
  // trigger element) when the drawer closes.
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key; lock body scroll while open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Prevent background scroll while drawer is open.
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

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

  const items = state.items;
  const isEmpty = items.length === 0;

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sepet"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-card shadow-xl transition-transform duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border px-4 py-4">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Sepetim
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Sepeti kapat"
            onClick={onClose}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </header>

        {/* Item list — scrollable */}
        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag
              className="h-16 w-16 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-lg font-medium text-foreground">
              Sepetiniz boş
            </p>
            <Link
              href="/store"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Mağazaya Git
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto divide-y divide-border px-4">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4 py-4">
                {/* Image thumbnail */}
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {item.name}
                    </h3>
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
                    {formatPrice(item.price)}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    {/* Quantity controls */}
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <button
                        type="button"
                        aria-label={`${item.name} adetini azalt`}
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span
                        className="min-w-8 text-center text-sm font-semibold text-foreground"
                        aria-label={`Adet: ${item.quantity}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`${item.name} adetini artır`}
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="whitespace-nowrap text-sm font-bold text-foreground">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer — sticky bottom with totals and checkout */}
        {!isEmpty && (
          <footer className="border-t border-border bg-card px-4 py-4">
            <CartSummary items={items} />

            <button
              type="button"
              aria-label="Ödemeye geç"
              className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Ödemeye Geç
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              {itemCount} ürün · Toplam {formatPrice(total)}
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}