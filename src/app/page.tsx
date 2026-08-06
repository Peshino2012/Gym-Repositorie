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

  return (
    <>
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
        <Schedule />
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
