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
 * Images use placehold.co placeholders.
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
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Zer+Klasik+Gitar",
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
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Zer+Akustik+Gitar",
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
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Zer+Elektro+Gitar",
    inStock: true,
  },
  {
    id: "gtr-bas-01",
    name: "Zer Bas Gitar",
    category: "guitars",
    price: 28000,
    description:
      "4 telli elektro bas gitar. Ağaç gövde, dengeli mid ve derin bas frekansları.",
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Zer+Bas+Gitar",
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
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Gitar+Teli+Seti",
    inStock: true,
  },
  {
    id: "prt-akort-01",
    name: "Zer Akort Kafası (Krom)",
    category: "parts",
    price: 1200,
    description:
      "Krom kaplı akort kafası seti (6'lı). Yumuşak akort ve yüksek hassasiyet.",
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Akort+Kafasi",
    inStock: true,
  },
  {
    id: "prt-koprü-01",
    name: "Zer Gitar Köprüsü",
    category: "parts",
    price: 850,
    description:
      "Akustik gitar için kemik köprü saddle seti. Net ve dengeli ses aktarımı.",
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Gitar+Koprusu",
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
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Gitar+Askisi",
    inStock: true,
  },
  {
    id: "acc-kapo-01",
    name: "Zer Kapo",
    category: "accessories",
    price: 600,
    description:
      "Yaylı mekanizmalı gitar kapo. Tüm akustik ve klasik gitarlarla uyumlu.",
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Zer+Kapo",
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
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Zer+El+Yapimi+Keman",
    inStock: true,
  },
  {
    id: "vln-ogrenci-01",
    name: "Zer Öğrenci Kemanı",
    category: "violins",
    price: 8500,
    description:
      "Başlangıç seviyesi öğrenci kemanı. Yay ve kılıf dahil, okul önerisi.",
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Zer+Ogrenci+Kemani",
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
    image: "https://placehold.co/600x400/FFFBF5/171717?text=Gitar+Ayar+Servisi",
    inStock: true,
  },
];