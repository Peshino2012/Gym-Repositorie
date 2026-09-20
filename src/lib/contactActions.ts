"use server";

import { Resend } from "resend";
import { headers } from "next/headers";

// Unauthenticated by nature (it's a public contact form) — without a limit,
// anyone can script submissions to flood the gym owner's inbox or burn
// through the Resend account's sending quota.
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 10 * 60_000;
const attemptsByIp = new Map<string, { count: number; windowStart: number }>();

async function isRateLimited(): Promise<boolean> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const now = Date.now();
  const state = attemptsByIp.get(ip);

  if (!state || now - state.windowStart > WINDOW_MS) {
    attemptsByIp.set(ip, { count: 1, windowStart: now });
    return false;
  }

  state.count += 1;
  return state.count > MAX_ATTEMPTS;
}

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
  if (await isRateLimited()) return;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Cauccen <onboarding@resend.dev>",
      to: data.toEmail,
      subject: `Nueva consulta de ${data.name}`,
      text: `Nombre: ${data.name}\nTeléfono: ${data.phone}\n\nMensaje:\n${data.message || "(sin mensaje)"}`,
    });
  } catch {
    // swallow — see comment above
  }
}
