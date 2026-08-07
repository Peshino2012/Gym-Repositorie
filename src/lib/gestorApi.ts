export type BillingCycle = "MONTHLY" | "QUARTERLY" | "ANNUAL";

export type SitePlan = {
  id: string;
  name: string;
  price: number;
  billingCycle: BillingCycle;
  features: string[];
};

export type SiteTrainer = {
  id: string;
  name: string;
  specialty: string | null;
  photoUrl: string | null;
};

export type SiteGalleryPhoto = {
  id: string;
  url: string;
  caption: string | null;
};

export type SiteScheduleEntry = {
  id: string;
  time: string;
  name: string;
};

export type SiteScheduleBlock = {
  id: string;
  title: string;
  hoursLabel: string;
  icon: string;
  entries: SiteScheduleEntry[];
};

export type SiteData = {
  gym: { name: string; address: string | null; phone: string | null; email: string | null };
  plans: SitePlan[];
  trainers: SiteTrainer[];
  gallery: SiteGalleryPhoto[];
  classesEnabled: boolean;
  scheduleBlocks: SiteScheduleBlock[];
};

const EMPTY_SITE_DATA: SiteData = {
  gym: { name: "PULSO Gym", address: null, phone: null, email: null },
  plans: [],
  trainers: [],
  gallery: [],
  classesEnabled: false,
  scheduleBlocks: [],
};

// PULSO is sold and hosted separately from GestorGym (the admin panel), so
// this fetch can legitimately fail — no panel deployed yet for this client,
// panel temporarily down, etc. Always fall back to empty data rather than
// let a broken connection take down the public site.
export async function getSiteData(): Promise<SiteData> {
  const base = process.env.GESTOR_API_URL;
  if (!base) return EMPTY_SITE_DATA;

  try {
    const res = await fetch(`${base}/api/public/site`, {
      next: { revalidate: 15 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return EMPTY_SITE_DATA;
    return (await res.json()) as SiteData;
  } catch {
    return EMPTY_SITE_DATA;
  }
}
