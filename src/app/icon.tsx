import { ImageResponse } from "next/og";
import { getSiteData } from "@/lib/gestorApi";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// The static favicon.ico this replaced was a generic placeholder (a black
// circle with a white triangle) — every client's browser tab showed that
// instead of their own gym. This shows the gym's real logo when they have
// one, or a plain neutral mark when they don't (an unsold demo slot, not a
// real client's site).
export default async function Icon() {
  const site = await getSiteData();

  if (site.gym.logoUrl) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            borderRadius: 12,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders its own JSX tree server-side, not the DOM */}
          <img src={site.gym.logoUrl} width={56} height={56} style={{ objectFit: "contain" }} alt="" />
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0d0d0e",
          color: "#ffffff",
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        {(site.gym.name || "G").charAt(0).toUpperCase()}
      </div>
    ),
    size
  );
}
