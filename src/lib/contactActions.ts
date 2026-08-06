"use server";

import { Resend } from "resend";

// Best-effort email copy of a contact submission. WhatsApp (handled
// client-side) is the primary channel — this silently no-ops if the gym
// hasn't set up Resend yet or hasn't configured a contact email, so a
// missing/broken email setup never blocks the form.
export async function sendContactEmail(data: {
  name: string;
  phone: string;
  message: string;
  toEmail: string | null;
}) {
  if (!process.env.RESEND_API_KEY || !data.toEmail) return;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "PULSO <onboarding@resend.dev>",
      to: data.toEmail,
      subject: `Nueva consulta de ${data.name}`,
      text: `Nombre: ${data.name}\nTeléfono: ${data.phone}\n\nMensaje:\n${data.message || "(sin mensaje)"}`,
    });
  } catch {
    // swallow — see comment above
  }
}
