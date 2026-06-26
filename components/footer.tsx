import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";

/**
 * Footer — brand info, quick navigation links, contact details,
 * social media icons, and copyright bar.
 *
 * Server Component — no client hooks or browser APIs needed.
 * Layout: 4 columns on desktop (brand, quick links, contact, social),
 * stacked on mobile. No horizontal scroll at any breakpoint.
 */

/** Quick navigation links for the footer. */
const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Mağaza", href: "/store" },
  { label: "Hizmetler", href: "/#services" },
  { label: "İletişim", href: "/#contact" },
] as const;

/** Contact details rendered with lucide-react SVG icons. */
const contactDetails = [
  { Icon: MapPin, label: "Atölye Sokak No: 7, İstanbul" },
  { Icon: Phone, label: "+90 212 555 00 00" },
  { Icon: Mail, label: "info@zermuzik.com" },
] as const;

/** Social media links rendered with lucide-react SVG icons. */
const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Youtube", href: "https://youtube.com", Icon: Youtube },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Responsive: stack on mobile, 4 columns on lg+ */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="max-w-xs">
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Zer Müzik
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              El yapımı müzik aletleri ve premium luthier zanaatkarlığı.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigasyon">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Hızlı Linkler
            </h3>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              İletişim
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {contactDetails.map(({ Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <span className="text-sm text-muted-foreground">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Sosyal Medya
            </h3>
            <ul className="mt-4 flex gap-4">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 Zer Müzik. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}