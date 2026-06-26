import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

/**
 * Contact — brand narrative, contact info, social links, and a
 * non-functional contact form.
 *
 * Server Component — the interactive form is delegated to the
 * ContactForm client component.
 *
 * Anchor target: id="contact" (linked from navbar and footer).
 * Layout: two columns on md+ (brand story left, form right),
 * stacked on mobile.
 */

/** Contact info entries — icon, label, and value. */
const contactInfo = [
  {
    Icon: MapPin,
    label: "Adres",
    value: "Atölye Sokak No: 7, İstanbul",
  },
  {
    Icon: Phone,
    label: "Telefon",
    value: "+90 212 555 00 00",
  },
  {
    Icon: Mail,
    label: "E-posta",
    value: "info@zermuzik.com",
  },
] as const;

/** Social media links rendered with lucide-react SVG icons. */
const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { label: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { label: "Youtube", href: "https://youtube.com", Icon: Youtube },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="İletişim"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Two-column layout: brand narrative (left) + form (right) */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left column — brand narrative & contact info */}
          <div className="flex flex-col">
            <h2 className="font-heading text-4xl font-bold tracking-heading text-foreground md:text-5xl">
              İletişim
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              Zer Müzik atölyesi, 1995&apos;ten beri el yapımı enstrümanlar
              üretiyor. Her bir gitar ve keman, ustalık ve tutkuyla hazırlanır.
            </p>

            {/* Contact info list */}
            <ul className="mt-8 space-y-5">
              {contactInfo.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-base text-foreground">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Sosyal Medya
              </h3>
              <ul className="mt-3 flex gap-4">
                {socialLinks.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-accent hover:text-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column — contact form (client component) */}
          <div className="mt-2 md:mt-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}