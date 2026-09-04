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
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getSiteData } from "@/lib/gestorApi";

export default async function Home() {
  const site = await getSiteData();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: site.gym.name || "Mi Gimnasio",
    image: "https://gym-repositorie.vercel.app/opengraph-image",
    url: "https://gym-repositorie.vercel.app",
    telephone: site.gym.phone ?? undefined,
    email: site.gym.email ?? undefined,
    address: site.gym.address
      ? { "@type": "PostalAddress", streetAddress: site.gym.address, addressLocality: "Buenos Aires", addressCountry: "AR" }
      : undefined,
    sameAs: ["https://www.instagram.com/tugimnasio"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:00", closes: "23:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
    ],
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
        classesEnabled={site.classesEnabled}
        horariosEnabled={showSchedule}
        planesEnabled={site.planesEnabled}
      />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        {site.classesEnabled && <Classes cards={site.classCards} />}
        <WhyUs />
        {site.planesEnabled && <Pricing plans={site.plans} />}
        <Trainers trainers={site.trainers} />
        <Gallery photos={site.gallery} />
        <Testimonials />
        {showSchedule && <Schedule blocks={site.scheduleBlocks} />}
        <Contact
          address={site.gym.address ?? undefined}
          phone={site.gym.phone ?? undefined}
          email={site.gym.email ?? undefined}
        />
      </main>
      <Footer
        gymName={site.gym.name}
        address={site.gym.address ?? undefined}
        classesEnabled={site.classesEnabled}
        horariosEnabled={showSchedule}
        planesEnabled={site.planesEnabled}
      />
    </>
  );
}
