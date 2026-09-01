import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Called by GestorGym right after any admin action that changes public data
// (trainers, gallery, plans, horarios, class cards, gym settings), so the
// change shows up here in seconds instead of waiting out the 15s ISR window.
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  revalidateTag("site-data", "max");
  return NextResponse.json({ revalidated: true });
}
