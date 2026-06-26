"use client";

/**
 * Store Page — /store
 *
 * Client Component: manages filter/search state and the product detail
 * modal. Renders a responsive product grid with category filters and a
 * search input. Shows an empty state when no products match.
 */

import { useMemo, useState } from "react";
import { PackageSearch } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import ProductDetail from "@/components/product-detail";
import { ProductFilters } from "@/components/product-filters";
import { ProductSearch } from "@/components/product-search";
import { products } from "@/lib/products/data";
import { filterByCategory, searchProducts } from "@/lib/products/helpers";
import type { Product, ProductCategory } from "@/lib/products/types";

export default function StorePage() {
  // ── State ────────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

  // ── Derived: filtered product list ────────────────────────────
  const visibleProducts = useMemo(() => {
    const byCategory = filterByCategory(
      products,
      selectedCategory as ProductCategory | "all",
    );
    return searchProducts(byCategory, searchQuery);
  }, [selectedCategory, searchQuery]);

  /** Open the detail modal for a given product. */
  function handleOpenDetail(product: Product) {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  }

  /** Close the detail modal. */
  function handleCloseDetail() {
    setIsDetailOpen(false);
  }

  return (
    <main className="container-page py-8 md:py-12">
      {/* ── Heading ───────────────────────────────────────────── */}
      <header className="mb-8">
        <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
          Mağaza
        </h1>
        <p className="mt-2 text-muted-foreground">
          El yapımı enstrümanlar ve parçalar
        </p>
      </header>

      {/* ── Search + Filters ───────────────────────────────────── */}
      <section
        aria-label="Ürün arama ve filtreleme"
        className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <ProductSearch value={searchQuery} onChange={setSearchQuery} />
        <ProductFilters
          activeCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </section>

      {/* ── Product grid / empty state ────────────────────────── */}
      {visibleProducts.length > 0 ? (
        <section
          aria-label="Ürün listesi"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetail={handleOpenDetail}
            />
          ))}
        </section>
      ) : (
        <section
          aria-label="Sonuç bulunamadı"
          className="flex flex-col items-center justify-center gap-4 py-20 text-center"
        >
          <PackageSearch
            className="h-16 w-16 text-muted-foreground"
            aria-hidden="true"
          />
          <h2 className="font-heading text-2xl font-semibold text-foreground">
            Sonuç bulunamadı
          </h2>
          <p className="max-w-md text-muted-foreground">
            Arama veya filtre kriterlerinize uygun ürün bulunamadı. Filtreleri
            değiştirip tekrar deneyin.
          </p>
        </section>
      )}

      {/* ── Product detail modal ──────────────────────────────── */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </main>
  );
}