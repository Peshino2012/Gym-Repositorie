import { ImageResponse } from "next/og";

export const alt = "PULSO GYM — Entrenamiento serio, resultados medibles";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
            fontSize: 168,
            lineHeight: 0.9,
            color: "#f5f5f5",
            letterSpacing: -2,
          }}
        >
          PULSO
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 168,
            lineHeight: 0.9,
            color: "#ff3b2e",
            letterSpacing: -2,
            marginBottom: 40,
          }}
        >
          GYM
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
