"use client";

import { useState, FormEvent } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { InstagramIcon } from "./icons/SocialIcons";
import ScrollReveal from "./ScrollReveal";
import MagneticButton from "./MagneticButton";
import { sendContactEmail } from "@/lib/contactActions";

export default function Contact({
  address = "Av. Nazca 1234, Villa Devoto, CABA",
  phone = "+54 11 0000-0000",
  email = "hola@tugimnasio.com.ar",
}: {
  address?: string;
  phone?: string;
  email?: string;
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const visitorPhone = String(data.get("phone") ?? "");
    const message = String(data.get("message") ?? "");

    const gymDigits = phone.replace(/\D/g, "");
    if (gymDigits) {
      const text = `Hola! Soy ${name} (${visitorPhone}).${message ? ` ${message}` : ""}`;
      window.open(
        `https://wa.me/${gymDigits}?text=${encodeURIComponent(text)}`,
        "_blank"
      );
    }

    sendContactEmail({ name, phone: visitorPhone, message, toEmail: email });

    setSent(true);
  }

  return (
    <section id="contacto" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-power">
            Contacto
          </p>
          <h2 className="font-display mt-3 text-4xl leading-[0.95] sm:text-5xl">
            Tu primera clase{" "}
            <span className="text-gradient-power">es gratis.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Dejanos tus datos y te contactamos para coordinar tu clase de
            prueba, sin compromiso.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ScrollReveal className="space-y-4">
            <div className="group flex items-start gap-4 rounded-2xl border border-line bg-ink p-5 transition-colors duration-300 hover:border-power/50">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-power transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
              <div>
                <p className="text-sm font-bold text-white">Dirección</p>
                <p className="text-sm text-muted-foreground">{address}</p>
              </div>
            </div>
            <div className="group flex items-start gap-4 rounded-2xl border border-line bg-ink p-5 transition-colors duration-300 hover:border-power/50">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-power transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
              <div>
                <p className="text-sm font-bold text-white">Teléfono</p>
                <p className="text-sm text-muted-foreground">{phone}</p>
              </div>
            </div>
            <div className="group flex items-start gap-4 rounded-2xl border border-line bg-ink p-5 transition-colors duration-300 hover:border-power/50">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-power transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
              <div>
                <p className="text-sm font-bold text-white">Email</p>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>
            <div className="group flex items-start gap-4 rounded-2xl border border-line bg-ink p-5 transition-colors duration-300 hover:border-power/50">
              <InstagramIcon className="mt-0.5 h-5 w-5 shrink-0 text-power transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6" />
              <div>
                <p className="text-sm font-bold text-white">Instagram</p>
                <p className="text-sm text-muted-foreground">@tugimnasio</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {sent ? (
              <div className="flex h-full min-h-[22rem] flex-col items-center justify-center rounded-2xl border border-volt/30 bg-ink p-8 text-center">
                <CheckCircle2 className="h-10 w-10 animate-pop-in text-volt" />
                <p className="mt-4 font-display text-2xl">¡Listo!</p>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Te abrimos WhatsApp con tu mensaje ya escrito — solo tenés
                  que confirmar el envío.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-ink p-7"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-muted-2 focus:border-power focus:ring-2 focus:ring-power/25"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-muted-2 focus:border-power focus:ring-2 focus:ring-power/25"
                    placeholder="11 1234-5678"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
                  >
                    Mensaje (opcional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    className="w-full resize-none rounded-lg border border-line bg-surface px-4 py-3 text-sm text-white outline-none placeholder:text-muted-2 focus:border-power"
                    placeholder="Contanos qué buscás"
                  />
                </div>
                <MagneticButton className="mt-2 w-full">
                  <button
                    type="submit"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-power px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-power-2"
                  >
                    Quiero mi clase gratis
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </MagneticButton>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
