"use client";

/**
 * Navbar — responsive site header with brand logo, desktop nav
 * links, mobile hamburger menu, and cart icon with item-count badge.
 *
 * Client Component because it uses useState (mobile menu toggle) and
 * the useCartCount hook (cart context consumer).
 */

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCartCount } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";

/** Navigation links shared between desktop and mobile menus. */
const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Mağaza", href: "/store" },
  { label: "Hizmetler", href: "/#services" },
  { label: "İletişim", href: "/#contact" },
] as const;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = useCartCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <nav
        aria-label="Ana navigasyon"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4"
      >
        {/* Brand */}
        <Link
          href="/"
          className="cursor-pointer font-heading text-2xl font-bold tracking-heading text-foreground transition-colors hover:text-accent md:text-3xl"
        >
          Zer Müzik
        </Link>

        {/* Desktop nav links — hidden on mobile */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side: cart icon + mobile toggle */}
        <div className="flex items-center gap-2">
          {/* Cart icon button — opens slide-in drawer */}
          <button
            type="button"
            aria-label={`Sepet${itemCount > 0 ? ` (${itemCount} ürün)` : ""}`}
            onClick={() => setIsCartOpen(true)}
            className="relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ShoppingBag className="h-6 w-6" aria-hidden="true" />
            {itemCount > 0 && (
              <span
                className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-semibold text-accent-foreground"
                aria-hidden="true"
              >
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile menu toggle — hidden on desktop */}
          <button
            type="button"
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground transition-colors hover:text-accent md:hidden"
          >
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel — animated expand/collapse */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 ease-out md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart slide-in drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
