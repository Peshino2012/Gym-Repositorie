import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import Classes from "@/components/Classes";
import WhyUs from "@/components/WhyUs";
import Pricing from "@/components/Pricing";
import Trainers from "@/components/Trainers";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Schedule from "@/components/Schedule";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/gestorApi";
import { siteConfig } from "@/lib/siteConfig";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const site = await getSiteData();
  const params = await searchParams;
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const utmSource = first(params.utm_source);
  const utmCampaign = first(params.utm_campaign);
  const leadSource = [utmSource, utmCampaign].filter(Boolean).join(" / ") || undefined;
  const instagramUrl = siteConfig.instagramHandle
    ? `https://www.instagram.com/${siteConfig.instagramHandle}`
    : undefined;
  const whatsappPhone = site.gym.phone?.replace(/\D/g, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: site.gym.name || "Mi Gimnasio",
    image: `${siteConfig.siteUrl}/opengraph-image`,
    url: siteConfig.siteUrl,
    telephone: site.gym.phone ?? undefined,
    email: site.gym.email ?? undefined,
    address: site.gym.address
      ? { "@type": "PostalAddress", streetAddress: site.gym.address, addressLocality: "Buenos Aires", addressCountry: "AR" }
      : undefined,
    sameAs: instagramUrl ? [instagramUrl] : undefined,
  };

  const showSchedule = site.horariosEnabled;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        gymName={site.gym.name}
        gymLogoUrl={site.gym.logoUrl}
        classesEnabled={site.classesEnabled}
        horariosEnabled={showSchedule}
        planesEnabled={site.planesEnabled}
      />
      <main>
        <Hero
          titleLine1={siteConfig.hero.titleLine1}
          titleLine2={siteConfig.hero.titleLine2}
          subtitle={siteConfig.hero.subtitle}
          description={siteConfig.hero.description}
          tagline={siteConfig.hero.tagline}
          whatsappPhone={whatsappPhone}
        />
        <Marquee />
        <Stats />
        {site.classesEnabled && <Classes cards={site.classCards} />}
        <WhyUs />
        {site.planesEnabled && <Pricing plans={site.plans} />}
        <Trainers trainers={site.trainers} />
        <Gallery photos={site.gallery} />
        <Testimonials />
        {showSchedule && <Schedule blocks={site.scheduleBlocks} />}
        <FAQ />
        <Contact
          address={site.gym.address ?? undefined}
          phone={site.gym.phone ?? undefined}
          email={site.gym.email ?? undefined}
          instagramHandle={siteConfig.instagramHandle}
          leadSource={leadSource}
        />
      </main>
      <Footer
        gymName={site.gym.name}
        address={site.gym.address ?? undefined}
        instagramUrl={instagramUrl}
        classesEnabled={site.classesEnabled}
        horariosEnabled={showSchedule}
        planesEnabled={site.planesEnabled}
      />
    </>
  );
}
