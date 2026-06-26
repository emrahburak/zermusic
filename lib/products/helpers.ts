import type { Product, ProductCategory } from "./types";
import { categoryLabels } from "./data";

/**
 * Pure helper utilities for the product catalog.
 * Every function is side-effect free and never mutates its inputs.
 */

/** Returns all category keys in catalog order. */
export const getCategories = (): ProductCategory[] =>
  Object.keys(categoryLabels) as ProductCategory[];

/** Returns the Turkish display label for a given category. */
export const getCategoryLabel = (category: ProductCategory): string =>
  categoryLabels[category];

/**
 * Formats a number as Turkish Lira, e.g. 18000 → "₺18.000".
 * Uses `tr-TR` locale grouping without decimals.
 */
export const formatPrice = (price: number): string =>
  `₺${price.toLocaleString("tr-TR")}`;

/**
 * Filters products by category.
 * Passing `"all"` returns a shallow copy of the full list (no mutation).
 */
export const filterByCategory = (
  products: Product[],
  category: ProductCategory | "all",
): Product[] =>
  category === "all"
    ? [...products]
    : products.filter((product) => product.category === category);

/**
 * Case-insensitive search across product name and description.
 * Returns a new array; never mutates the input.
 */
export const searchProducts = (products: Product[], query: string): Product[] => {
  const normalized = query.trim().toLowerCase();
  if (normalized === "") return [...products];
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(normalized) ||
      product.description.toLowerCase().includes(normalized),
  );
};

/** Returns only products marked as `featured: true`. */
export const getFeaturedProducts = (products: Product[]): Product[] =>
  products.filter((product) => product.featured === true);

/** Finds a single product by id. Returns `undefined` if not found. */
export const getProductById = (
  products: Product[],
  id: string,
): Product | undefined => products.find((product) => product.id === id);