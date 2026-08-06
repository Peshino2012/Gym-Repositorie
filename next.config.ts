import type { NextConfig } from "next";

// Photos (trainers, gallery) come from GestorGym. On GestorGym's local/VPS
// setup they're served from its own /uploads path (derived below from the
// same env var used to fetch the public site data — see gestorApi.ts); on
// the Vercel+Blob setup they come from Vercel Blob's own domain instead.
const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "https",
    hostname: "*.public.blob.vercel-storage.com",
    pathname: "/**",
  },
];
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
