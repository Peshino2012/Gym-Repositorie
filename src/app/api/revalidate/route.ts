import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// `===` short-circuits at the first differing byte, leaking via response
// time how much of the secret a guesser has right. Compare SHA-256 digests
// instead so the comparison always takes the same time.
async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  const enc = new TextEncoder();
  const [digestA, digestB] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(a)),
    crypto.subtle.digest("SHA-256", enc.encode(b)),
  ]);
  const bytesA = new Uint8Array(digestA);
  const bytesB = new Uint8Array(digestB);
  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) diff |= bytesA[i] ^ bytesB[i];
  return diff === 0;
}

// Called by GestorGym right after any admin action that changes public data
// (trainers, gallery, plans, horarios, class cards, gym settings), so the
// change shows up here in seconds instead of waiting out the 15s ISR window.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;
  if (!secret || !expected || !(await timingSafeEqual(secret, expected))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  revalidateTag("site-data", "max");
  return NextResponse.json({ revalidated: true });
}
