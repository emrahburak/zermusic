"use client";

/**
 * ProductDetail — modal dialog displaying full product information with
 * quantity selector and add-to-cart integration.
 *
 * Controlled component: parent manages `product`, `isOpen`, and `onClose`.
 * Renders nothing when closed or when no product is selected.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { formatPrice, getCategoryLabel } from "@/lib/products/helpers";
import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils";

/** Minimum and maximum selectable quantity. */
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

export interface ProductDetailProps {
  /** The product to display, or `null` when the modal is closed. */
  product: Product | null;
  /** Whether the modal is currently open. */
  isOpen: boolean;
  /** Called when the user requests to close the modal. */
  onClose: () => void;
}

export default function ProductDetail({
  product,
  isOpen,
  onClose,
}: ProductDetailProps) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState<number>(MIN_QUANTITY);

  // Refs for focus trap.
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Reset quantity to 1 whenever a new product is shown.
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(MIN_QUANTITY);
    }
  }, [isOpen, product]);

  // Close on Escape key + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Prevent background scroll.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the modal on open.
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  // Focus trap — cycle Tab within the dialog.
  const handleTabTrap = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [],
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      // Only close when clicking the overlay itself, not the modal content.
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose],
  );

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(MIN_QUANTITY, prev - 1));
  }, []);

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(MAX_QUANTITY, prev + 1));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product) {
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
      },
    });

    onClose();
  }, [dispatch, product, quantity, onClose]);

  // Render nothing when closed or no product.
  if (!isOpen || !product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} ürün detayı`}
        onKeyDown={handleTabTrap}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-xl animate-modal-content md:flex-row"
      >
        {/* ── Image section ─────────────────────────────────────── */}
        <div className="relative shrink-0 md:w-1/2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full object-cover md:h-full"
          />
        </div>

        {/* ── Details section ──────────────────────────────────── */}
        <div className="relative flex flex-1 flex-col p-6 md:w-1/2">
          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Category */}
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            {getCategoryLabel(product.category)}
          </p>

          {/* Name */}
          <h2 className="mt-1 font-heading text-2xl leading-tight text-foreground md:text-3xl">
            {product.name}
          </h2>

          {/* Price */}
          <p className="mt-3 text-2xl font-semibold text-foreground">
            {formatPrice(product.price)}
          </p>

          {/* Stock status */}
          <div className="mt-3 flex items-center gap-2">
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
                product.inStock
                  ? "text-green-600"
                  : "text-destructive",
              )}
            >
              {product.inStock ? "Stokta" : "Tükendi"}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            {product.description}
          </p>

          {/* Quantity selector */}
          <div className="mt-6">
            <span
              id="quantity-label"
              className="mb-2 block text-sm font-medium text-foreground"
            >
              Adet
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={decrementQuantity}
                disabled={quantity <= MIN_QUANTITY}
                aria-label="Adet azalt"
                className={cn(
                  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  quantity <= MIN_QUANTITY &&
                    "cursor-not-allowed opacity-40 hover:bg-transparent",
                )}
              >
                <Minus className="h-4 w-4" />
              </button>

              <span
                className="min-w-[2.5rem] text-center text-lg font-semibold text-foreground"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                onClick={incrementQuantity}
                disabled={quantity >= MAX_QUANTITY}
                aria-label="Adet artır"
                className={cn(
                  "flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  quantity >= MAX_QUANTITY &&
                    "cursor-not-allowed opacity-40 hover:bg-transparent",
                )}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              "mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              !product.inStock &&
                "cursor-not-allowed opacity-50 hover:opacity-50",
            )}
          >
            <ShoppingBag className="h-5 w-5" />
            {product.inStock ? "Sepete Ekle" : "Tükendi"}
          </button>
        </div>
      </div>
    </div>
  );
}