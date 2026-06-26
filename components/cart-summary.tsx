"use client";

/**
 * CartSummary — reusable totals display.
 *
 * Purely derives subtotal, shipping (free placeholder), and total
 * from the provided `items` array. Used in both the cart drawer and
 * the full /cart page so totals stay consistent everywhere.
 */

import { useMemo } from "react";

import type { CartItem } from "@/lib/cart/types";
import { formatPrice } from "@/lib/products/helpers";

/** Props for the CartSummary component. */
interface CartSummaryProps {
  items: CartItem[];
}

/** Shipping cost placeholder — free shipping for now. */
const FREE_SHIPPING = 0;

export function CartSummary({ items }: CartSummaryProps) {
  const { subtotal, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { subtotal: sub, total: sub + FREE_SHIPPING };
  }, [items]);

  return (
    <dl className="space-y-3 border-t border-border pt-4">
      {/* Subtotal */}
      <div className="flex items-center justify-between text-sm">
        <dt className="text-muted-foreground">Ara Toplam</dt>
        <dd className="whitespace-nowrap font-medium text-foreground">{formatPrice(subtotal)}</dd>
      </div>

      {/* Shipping — free placeholder */}
      <div className="flex items-center justify-between text-sm">
        <dt className="text-muted-foreground">Kargo</dt>
        <dd className="whitespace-nowrap font-medium text-accent">Ücretsiz</dd>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between border-t border-border pt-3 text-base">
        <dt className="font-semibold text-foreground">Toplam</dt>
        <dd className="whitespace-nowrap text-lg font-bold text-foreground">
          {formatPrice(total)}
        </dd>
      </div>
    </dl>
  );
}