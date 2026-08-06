import type { NextConfig } from "next";

// Photos (trainers, gallery) come from GestorGym's own /uploads path, so
// next/image needs that origin allow-listed — derived from the same env
// var used to fetch the public site data (see src/lib/gestorApi.ts).
const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];
if (process.env.GESTOR_API_URL) {
  const url = new URL(process.env.GESTOR_API_URL);
  remotePatterns.push({
    protocol: url.protocol.replace(":", "") as "http" | "https",
    hostname: url.hostname,
    port: url.port,
    pathname: "/uploads/**",
  });
}

const nextConfig: NextConfig = {
  images: { remotePatterns },
};

export default nextConfig;
