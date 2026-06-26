import { Guitar, Wrench, Settings, Music } from "lucide-react";

/**
 * Services — showcases the four core craft services offered by
 * Zer Müzik: handmade guitars, guitar repair, guitar parts, and
 * violin making.
 *
 * Server Component — no client hooks or browser APIs needed.
 * Anchor target: id="services" (linked from navbar and hero CTA).
 */

/** Service card data — icon, title, and description for each craft. */
const services = [
  {
    title: "El Yapımı Gitarlar",
    description: "Atölyemizde el yapımı akustik, klasik ve elektro gitarlar",
    Icon: Guitar,
  },
  {
    title: "Gitar Tamirat",
    description: "Profesyonel gitar tamir ve bakım hizmetleri",
    Icon: Wrench,
  },
  {
    title: "Gitar Parçaları",
    description: "Özel üretilen gitar parçaları ve aksesuarlar",
    Icon: Settings,
  },
  {
    title: "Keman Yapımı",
    description: "El yapımı kemanlar ve keman bakım hizmetleri",
    Icon: Music,
  },
] as const;

export function Services() {
  return (
    <section
      id="services"
      aria-label="Hizmetler"
      className="bg-muted py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-4xl font-bold tracking-heading text-foreground md:text-5xl">
            Hizmetlerimiz
          </h2>
          <p className="mt-3 text-base text-muted-foreground md:text-lg">
            Usta elinden çıkan her detay, müziğin ruhuna dokunur
          </p>
        </div>

        {/* Service cards — 1 col mobile, 2 cols md, 4 cols lg */}
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {services.map(({ title, description, Icon }) => (
            <li key={title}>
              <article className="flex h-full flex-col rounded-lg bg-card p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg md:p-8">
                <Icon className="h-12 w-12 text-accent" aria-hidden="true" />

                <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {description}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
