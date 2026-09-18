// Per-deployment overrides, set as env vars on each client's Vercel project
// (this same codebase is deployed once per client, plus a shared demo).
// Every field defaults to the original generic/demo copy so a deployment
// that doesn't set these env vars — the demo site — renders exactly as
// before.
export const siteConfig = {
  // HSL triplet ("145 65% 42%", no hsl()/commas) overriding --primary.
  // Undefined keeps the default red/orange "power" theme.
  themeColor: process.env.NEXT_PUBLIC_THEME_COLOR,

  // Marketing/demo filler (fabricated stats, testimonials, trainer names)
  // is fine on the sales demo but must never appear on a real client's
  // site — set to "false" on a real client's project.
  showPlaceholderContent: process.env.NEXT_PUBLIC_PLACEHOLDER_CONTENT !== "false",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://gym-repositorie.vercel.app",

  // Instagram handle without the @, e.g. "vo2_gimnasio". Undefined hides
  // every Instagram reference instead of showing a fake handle.
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE,

  hero: {
    titleLine1: process.env.NEXT_PUBLIC_HERO_TITLE_1,
    titleLine2: process.env.NEXT_PUBLIC_HERO_TITLE_2,
    subtitle: process.env.NEXT_PUBLIC_HERO_SUBTITLE,
    description: process.env.NEXT_PUBLIC_HERO_DESCRIPTION,
    // Optional trailing line (location, member count). Omit rather than
    // guess — showing a fabricated address/member count is worse than
    // showing nothing.
    tagline: process.env.NEXT_PUBLIC_HERO_TAGLINE,
  },
};
