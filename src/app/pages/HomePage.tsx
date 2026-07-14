import { useHashScroll } from "../hooks/useHashScroll";
import { HomeHero } from "../sections/home/HomeHero";
import { Marquee } from "../sections/home/Marquee";
import { ProblemPlatform } from "../sections/home/ProblemPlatform";
import { ProductSpotlight } from "../sections/home/ProductSpotlight";
import { EcosystemTeaser } from "../sections/home/EcosystemTeaser";
import { WhyPolaris } from "../sections/home/WhyPolaris";
import { FinalCTA } from "../sections/shared/FinalCTA";

export function HomePage() {
  useHashScroll();

  return (
    <>
      <HomeHero />
      <Marquee />
      <ProblemPlatform />
      <ProductSpotlight />
      <EcosystemTeaser />
      <WhyPolaris />
      <FinalCTA />
    </>
  );
}
