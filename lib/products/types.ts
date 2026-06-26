/**
 * Product catalog type definitions.
 * Shared between store, cart, and product detail components.
 */

/** All product categories available in the Zer Müzik store. */
export type ProductCategory =
  | "guitars"
  | "parts"
  | "accessories"
  | "violins"
  | "repair";

/** A single product in the catalog. */
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

/** Display labels for each category (Turkish). */
export type ProductCategoryLabel = Record<ProductCategory, string>;