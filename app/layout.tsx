import type { Metadata } from "next";
import { Amatic_SC, Cabin } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/* Fonts — loaded via next/font for self-hosting, preconnect, and
   zero layout shift. CSS variables match tailwind.config.ts tokens. */
const amaticSC = Amatic_SC({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-heading",
  display: "swap",
});

const cabin = Cabin({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zer Müzik — El Yapımı Müzik Aletleri",
    template: "%s | Zer Müzik",
  },
  description:
    "Zer Müzik — Premium luthier zanaatkarlığı. El yapımı müzik aletleri, enstrümanlar ve aksesuarlar.",
  keywords: [
    "müzik",
    "enstrüman",
    "luthier",
    "el yapımı",
    "gitar",
    "Zer Müzik",
  ],
  authors: [{ name: "Zer Müzik" }],
  openGraph: {
    title: "Zer Müzik — El Yapımı Müzik Aletleri",
    description: "Premium luthier zanaatkarlığı. El yapımı müzik aletleri.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${amaticSC.variable} ${cabin.variable} font-body antialiased`}
      >
        <CartProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
