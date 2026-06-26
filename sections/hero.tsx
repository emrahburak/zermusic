/**
 * Hero — full-height brand statement section for the Zer Müzik home page.
 *
 * Server Component (no client hooks needed). Renders the headline in the
 * Amatic SC heading font, two CTAs (primary gold + secondary outline), and
 * an atmospheric craft imagery placeholder built from a gradient surface
 * with a centered lucide-react Guitar icon as a decorative element.
 *
 * Entrance animation: fade-in-up on mount via a scoped CSS keyframe defined
 * inline in a <style> tag. `prefers-reduced-motion` is respected globally
 * in app/globals.css (animation-duration forced to ~0).
 */

import Link from "next/link";
import { Guitar } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Scoped keyframes for the hero entrance animation.
 * Kept inline so the section is self-contained and tree-shakeable.
 */
const heroAnimationStyles = `
@keyframes zer-hero-fade-in-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.zer-hero-animate {
  animation: zer-hero-fade-in-up 600ms cubic-bezier(0, 0, 0.2, 1) both;
}

/* Staggered children for a layered entrance feel */
.zer-hero-animate-delay-1 { animation-delay: 120ms; }
.zer-hero-animate-delay-2 { animation-delay: 240ms; }
.zer-hero-animate-delay-3 { animation-delay: 360ms; }
`;

export function Hero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: heroAnimationStyles }} />

      <section
        id="hero"
        aria-label="Hero — El Yapımı Enstrümanlar"
        className={cn(
          "relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center overflow-hidden",
          "bg-background py-20 md:py-32",
        )}
      >
        {/* Decorative radial gradient backdrop — ivory/cream atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(161, 98, 7, 0.08) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(245, 240, 232, 0.9) 0%, transparent 60%)",
          }}
        />

        <div className="container-page mx-auto flex flex-col items-center text-center">
          {/* Atmospheric craft imagery placeholder */}
          <div
            aria-hidden="true"
            className={cn(
              "zer-hero-animate mb-10 flex h-28 w-28 items-center justify-center rounded-full",
              "bg-gradient-to-br from-card to-muted shadow-md md:mb-12 md:h-32 md:w-32",
            )}
          >
            <Guitar
              className="h-14 w-14 text-accent md:h-16 md:w-16"
              strokeWidth={1.5}
            />
          </div>

          {/* Headline — Amatic SC heading font, large display sizes */}
          <h1
            className={cn(
              "zer-hero-animate zer-hero-animate-delay-1",
              "font-heading font-bold tracking-heading text-foreground",
              "text-5xl md:text-7xl lg:text-8xl",
            )}
          >
            El Yapımı Enstrümanlar
          </h1>

          {/* Subheadline */}
          <p
            className={cn(
              "zer-hero-animate zer-hero-animate-delay-2",
              "mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:mt-8 md:text-xl",
            )}
          >
            Gitar, keman ve parça üretimi — ustalıkla hazırlanmış
          </p>

          {/* CTA group */}
          <div
            className={cn(
              "zer-hero-animate zer-hero-animate-delay-3",
              "mt-10 flex flex-col items-center gap-4 sm:flex-row md:mt-12",
            )}
          >
            {/* Primary CTA — gold accent background, hover lift */}
            <Link
              href="/store"
              className={cn(
                "inline-flex h-12 cursor-pointer items-center justify-center rounded-lg",
                "bg-accent px-8 text-base font-semibold text-accent-foreground",
                "shadow-md transition-all duration-200 ease-out",
                "hover:-translate-y-0.5 hover:shadow-lg hover:opacity-90",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              )}
            >
              Mağazaya Git
            </Link>

            {/* Secondary CTA — outline style, primary border */}
            <Link
              href="/#services"
              className={cn(
                "inline-flex h-12 cursor-pointer items-center justify-center rounded-lg",
                "border-2 border-primary bg-transparent px-8 text-base font-semibold text-primary",
                "transition-all duration-200 ease-out",
                "hover:bg-primary hover:text-primary-foreground",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              )}
            >
              Hizmetlerimiz
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;