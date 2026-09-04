import { ImageResponse } from "next/og";
import { getSiteData } from "@/lib/gestorApi";

// Next requires `alt` as a static string export — can't compute it from the
// same fetch the image itself uses below, so it stays generic.
export const alt = "Entrenamiento serio, resultados medibles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const site = await getSiteData();
  const gymName = site.gym.name;
  // A long real gym name wrapping across two 168px lines (the old fixed
  // "MI" / "GIMNASIO" split) reads fine for a short name but overflows or
  // looks broken for a longer one — one line, sized to the name, is safe
  // for any gym.
  const fontSize = gymName.length > 14 ? 96 : 168;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0d0d0e",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(255,59,46,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(214,255,64,0.18), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#ff3b2e",
            }}
          />
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              color: "#a3a3a3",
              textTransform: "uppercase",
            }}
          >
            Villa Devoto · CABA
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize,
            lineHeight: 0.9,
            color: "#ff3b2e",
            letterSpacing: -2,
            marginBottom: 40,
            textTransform: "uppercase",
          }}
        >
          {gymName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#d4d4d4",
            fontWeight: 300,
          }}
        >
          Entrenás con todo. Progreso que se mide.
        </div>
      </div>
    ),
    { ...size }
  );
}
