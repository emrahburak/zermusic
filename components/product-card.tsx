"use client";

/**
 * ProductCard — grid cell for a single product.
 *
 * Client Component: uses `useCart` to dispatch ADD_ITEM and accepts an
 * `onOpenDetail` callback so the parent page can open the detail modal.
 *
 * Clicking the image or name opens the detail view; the Add to Cart
 * button is a separate action that adds one item immediately.
 */

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { formatPrice, getCategoryLabel } from "@/lib/products/helpers";
import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  onOpenDetail: (product: Product) => void;
}

export function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const { dispatch } = useCart();

  /** Add one unit of this product to the cart. */
  function handleAddToCart() {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category,
      },
    });
  }

  /** Open the detail modal for this product. */
  function handleOpen() {
    onOpenDetail(product);
  }

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-md transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg",
      )}
    >
      {/* ── Image (clickable) ─────────────────────────────────── */}
      <button
        type="button"
        onClick={handleOpen}
        aria-label={`${product.name} detayını gör`}
        className="relative block aspect-[4/3] w-full cursor-pointer overflow-hidden bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {/* Category badge overlay */}
        <span className="absolute left-3 top-3 rounded bg-accent/10 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-accent backdrop-blur-sm">
          {getCategoryLabel(product.category)}
        </span>
      </button>

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-4">
        {/* Name (clickable) */}
        <button
          type="button"
          onClick={handleOpen}
          className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <h3 className="truncate font-heading text-lg font-semibold text-foreground md:text-xl">
            {product.name}
          </h3>
        </button>

        {/* Price */}
        <p className="mt-2 text-xl font-semibold text-primary">
          {formatPrice(product.price)}
        </p>

        {/* Stock indicator */}
        <div className="mt-2 flex items-center gap-2">
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              product.inStock ? "bg-green-500" : "bg-destructive",
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              "text-sm font-medium",
              product.inStock ? "text-green-600" : "text-destructive",
            )}
          >
            {product.inStock ? "Stokta" : "Tükendi"}
          </span>
        </div>

        {/* Add to cart — pushed to bottom */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          aria-label={`${product.name} sepete ekle`}
          className={cn(
            "mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            !product.inStock &&
              "cursor-not-allowed opacity-50 hover:opacity-50",
          )}
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {product.inStock ? "Sepete Ekle" : "Tükendi"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;