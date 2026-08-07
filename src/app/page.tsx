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
    name: site.gym.name || "PULSO Gym",
    image: "https://gym-repositorie.vercel.app/opengraph-image",
    url: "https://gym-repositorie.vercel.app",
    telephone: site.gym.phone ?? undefined,
    email: site.gym.email ?? undefined,
    address: site.gym.address
      ? { "@type": "PostalAddress", streetAddress: site.gym.address, addressLocality: "Buenos Aires", addressCountry: "AR" }
      : undefined,
    sameAs: ["https://www.instagram.com/pulsogym"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "06:00", closes: "23:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "13:00" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Classes />
        <WhyUs />
        <Pricing plans={site.plans} />
        <Trainers trainers={site.trainers} />
        <Gallery photos={site.gallery} />
        <Testimonials />
        {site.classesEnabled && site.scheduleBlocks.length > 0 && (
          <Schedule blocks={site.scheduleBlocks} />
        )}
        <Contact
          address={site.gym.address ?? undefined}
          phone={site.gym.phone ?? undefined}
          email={site.gym.email ?? undefined}
        />
      </main>
      <Footer address={site.gym.address ?? undefined} />
    </>
  );
}
