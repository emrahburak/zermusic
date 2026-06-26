"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ContactForm — interactive, non-functional contact form.
 *
 * Client Component — uses useState to show a confirmation message on submit.
 * No backend: preventDefault stops navigation; a placeholder message is
 * displayed so the UX feels complete without server wiring.
 *
 * Accessibility:
 * - Every input has an associated <label> (htmlFor / id).
 * - aria-describedby wires each input to its helper/error text slot.
 * - Visible focus rings via Tailwind focus:ring utilities.
 */

/** Field configuration for the contact form. */
const fields = {
  name: {
    id: "contact-name",
    label: "Adınız Soyadınız",
    placeholder: "Adınız Soyadınız",
    type: "text",
    autoComplete: "name",
  },
  email: {
    id: "contact-email",
    label: "E-posta",
    placeholder: "e-posta@adresiniz.com",
    type: "email",
    autoComplete: "email",
  },
} as const;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-lg bg-card p-6 shadow-md md:p-8">
      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[320px] flex-col items-center justify-center text-center"
        >
          <Send className="h-12 w-12 text-accent" aria-hidden="true" />
          <p className="mt-4 font-heading text-2xl font-bold text-foreground">
            Mesajınız alındı
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 cursor-pointer rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none"
          >
            Yeni mesaj gönder
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <label
              htmlFor={fields.name.id}
              className="block text-sm font-medium text-foreground"
            >
              {fields.name.label}
            </label>
            <input
              id={fields.name.id}
              name="name"
              type={fields.name.type}
              autoComplete={fields.name.autoComplete}
              placeholder={fields.name.placeholder}
              aria-describedby={`${fields.name.id}-hint`}
              required
              className={cn(
                "w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground",
                "placeholder:text-muted-foreground/70",
                "transition-colors focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none",
              )}
            />
            <p id={`${fields.name.id}-hint`} className="text-xs text-muted-foreground">
              Adınız ve soyadınız.
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor={fields.email.id}
              className="block text-sm font-medium text-foreground"
            >
              {fields.email.label}
            </label>
            <input
              id={fields.email.id}
              name="email"
              type={fields.email.type}
              autoComplete={fields.email.autoComplete}
              placeholder={fields.email.placeholder}
              aria-describedby={`${fields.email.id}-hint`}
              required
              className={cn(
                "w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground",
                "placeholder:text-muted-foreground/70",
                "transition-colors focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none",
              )}
            />
            <p id={`${fields.email.id}-hint`} className="text-xs text-muted-foreground">
              Size dönüş yapabilmemiz için geçerli bir e-posta adresi.
            </p>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-foreground"
            >
              Mesajınız
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Mesajınız"
              aria-describedby="contact-message-hint"
              required
              className={cn(
                "w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground",
                "placeholder:text-muted-foreground/70",
                "transition-colors focus:border-accent focus:ring-2 focus:ring-accent/40 focus:outline-none",
              )}
            />
            <p id="contact-message-hint" className="text-xs text-muted-foreground">
              Sorularınız veya talepleriniz için mesajınızı buraya yazın.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={cn(
              "inline-flex w-full cursor-pointer items-center justify-center gap-2",
              "rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground",
              "transition-all hover:opacity-90 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:outline-none",
            )}
          >
            <Send className="h-5 w-5" aria-hidden="true" />
            Gönder
          </button>
        </form>
      )}
    </div>
  );
}