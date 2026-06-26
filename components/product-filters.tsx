"use client";

/**
 * ProductFilters — category filter button row.
 *
 * Client Component: receives the active category and a change handler
 * from the parent (controlled). Renders "Tümü" plus one button per
 * category returned by `getCategories()`.
 */

import { getCategories, getCategoryLabel } from "@/lib/products/helpers";
import { cn } from "@/lib/utils";

export interface ProductFiltersProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ProductFilters({
  activeCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  const categories = getCategories();

  return (
    <div
      role="group"
      aria-label="Kategori filtreleri"
      className="flex flex-wrap gap-2"
    >
      {/* "All" button */}
      <FilterButton
        isActive={activeCategory === "all"}
        onClick={() => onCategoryChange("all")}
      >
        Tümü
      </FilterButton>

      {/* One button per category */}
      {categories.map((category) => (
        <FilterButton
          key={category}
          isActive={activeCategory === category}
          onClick={() => onCategoryChange(category)}
        >
          {getCategoryLabel(category)}
        </FilterButton>
      ))}
    </div>
  );
}

/** Internal presentational button used for each filter option. */
function FilterButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-foreground hover:bg-muted/80",
      )}
    >
      {children}
    </button>
  );
}

export default ProductFilters;