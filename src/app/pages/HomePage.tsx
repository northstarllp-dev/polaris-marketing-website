import { useHashScroll } from "../hooks/useHashScroll";
import { HomeHero } from "../sections/home/HomeHero";
import { Marquee } from "../sections/home/Marquee";
import { ProductSpotlight } from "../sections/home/ProductSpotlight";
import { HowWeWork } from "../sections/home/HowWeWork";
import { ProblemStatement } from "../sections/home/ProblemStatement";
import { EcosystemTeaser } from "../sections/home/EcosystemTeaser";
import { WhyPolaris } from "../sections/home/WhyPolaris";
import { AboutFounders } from "../sections/home/AboutFounders";
import { FinalCTA } from "../sections/shared/FinalCTA";

export function HomePage() {
  useHashScroll();

  return (
    <>
      <HomeHero />
      <Marquee />
      <ProblemStatement />
      <HowWeWork />
      <ProductSpotlight />
      <EcosystemTeaser />
      <WhyPolaris />
      <AboutFounders />
      <FinalCTA />
    </>
  );
}
