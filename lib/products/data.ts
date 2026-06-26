import type { Product, ProductCategoryLabel } from "./types";

/**
 * Turkish display labels for each product category.
 * Used by `getCategoryLabel` in helpers.
 */
export const categoryLabels: ProductCategoryLabel = {
  guitars: "Gitarlar",
  parts: "Yedek Parça",
  accessories: "Aksesuarlar",
  violins: "Kemanlar",
  repair: "Tamir & Bakım",
};

/**
 * Dummy product catalog for the Zer Müzik store.
 * Static data only — no backend API references.
 * Images use a shared product photo in /images/products/.
 */
export const products: Product[] = [
  // ── Guitars (4) ──────────────────────────────────────────────
  {
    id: "gtr-klasik-01",
    name: "Zer Klasik Gitar",
    category: "guitars",
    price: 18000,
    description:
      "El yapımı klasik gitar. Sedim (sedir) tabla, maun gövde. Sıcak ve dolu ton.",
    image: "/images/products/product-default.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "gtr-akustik-01",
    name: "Zer Akustik Gitar",
    category: "guitars",
    price: 25000,
    description:
      "Dreadnought gövde formu, lamine spruce tabla. Geniş ve net ses projeksiyonu.",
    image: "/images/products/product-default.jpg",
    inStock: true,
    featured: true,
  },
  {
    id: "gtr-elektro-01",
    name: "Zer Elektro Gitar",
    category: "guitars",
    price: 32000,
    description:
      "SSS manyetik dizilimi, akçaağaç gövde. Çok yönlü ton ve hafif ağırlık.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },
  {
    id: "gtr-bas-01",
    name: "Zer Bas Gitar",
    category: "guitars",
    price: 28000,
    description:
      "4 telli elektro bas gitar. Ağaç gövde, dengeli mid ve derin bas frekansları.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },

  // ── Parts (3) ───────────────────────────────────────────────
  {
    id: "prt-tel-01",
    name: "Zer Gitar Teli Seti",
    category: "parts",
    price: 350,
    description:
      "Akustik gitar için 12 telli phosphor bronze set. Uzun ömürlü ve parlak ton.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },
  {
    id: "prt-akort-01",
    name: "Zer Akort Kafası (Krom)",
    category: "parts",
    price: 1200,
    description:
      "Krom kaplı akort kafası seti (6'lı). Yumuşak akort ve yüksek hassasiyet.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },
  {
    id: "prt-koprü-01",
    name: "Zer Gitar Köprüsü",
    category: "parts",
    price: 850,
    description:
      "Akustik gitar için kemik köprü saddle seti. Net ve dengeli ses aktarımı.",
    image: "/images/products/product-default.jpg",
    inStock: false,
  },

  // ── Accessories (2) ──────────────────────────────────────────
  {
    id: "acc-aski-01",
    name: "Zer Gitar Askısı",
    category: "accessories",
    price: 450,
    description:
      "Ayarlanabilir deri gitar askısı. Rahat ve omuz dostu tasarım.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },
  {
    id: "acc-kapo-01",
    name: "Zer Kapo",
    category: "accessories",
    price: 600,
    description:
      "Yaylı mekanizmalı gitar kapo. Tüm akustik ve klasik gitarlarla uyumlu.",
    image: "/images/products/product-default.jpg",
    inStock: true,
    featured: true,
  },

  // ── Violins (2) ──────────────────────────────────────────────
  {
    id: "vln-el-01",
    name: "Zer El Yapımı Keman",
    category: "violins",
    price: 45000,
    description:
      "El yapımı keman. Ladin tabla, akçaağaç gövde, profesyonel ses kalitesi.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },
  {
    id: "vln-ogrenci-01",
    name: "Zer Öğrenci Kemanı",
    category: "violins",
    price: 8500,
    description:
      "Başlangıç seviyesi öğrenci kemanı. Yay ve kılıf dahil, okul önerisi.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },

  // ── Repair (1) ───────────────────────────────────────────────
  {
    id: "rpr-ayar-01",
    name: "Gitar Ayar & Bakım Servisi",
    category: "repair",
    price: 1500,
    description:
      "Profesyonel gitar ayar servisi: tel değişimi, truss rod, intonasyon ve aksiyon ayarı.",
    image: "/images/products/product-default.jpg",
    inStock: true,
  },
];