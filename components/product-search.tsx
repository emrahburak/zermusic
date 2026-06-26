"use client";

/**
 * ProductSearch — controlled search input with clear button.
 *
 * Client Component: receives `value` and `onChange` from the parent.
 * Shows a clear (X) button when the input is non-empty.
 */

import { Search, X } from "lucide-react";

export interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative w-full sm:max-w-xs">
      {/* Search icon */}
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ürün ara..."
        aria-label="Ürün ara"
        className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />

      {/* Clear button — only visible when there is text */}
      {value !== "" && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Aramayı temizle"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default ProductSearch;