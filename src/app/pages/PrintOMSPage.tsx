"use client";

import { useHashScroll } from "../hooks/useHashScroll";
import { PrintOMSHero } from "../sections/printoms/PrintOMSHero";
import { TrustedBy } from "../sections/printoms/TrustedBy";
import { ProblemSplit } from "../sections/printoms/ProblemSplit";
import { Outcomes } from "../sections/printoms/Outcomes";
import { QuantifiedImpact } from "../sections/printoms/QuantifiedImpact";
import { FeatureStories } from "../sections/printoms/FeatureStories";
import { Teams } from "../sections/printoms/Teams";
import { CustomerPortal } from "../sections/printoms/CustomerPortal";
import { Reporting } from "../sections/printoms/Reporting";
import { Testimonials } from "../sections/printoms/Testimonials";
import { Pricing } from "../sections/printoms/Pricing";
import { FAQ } from "../sections/printoms/FAQ";
import { PrintOMSFinalCTA } from "../sections/printoms/PrintOMSFinalCTA";

export function PrintOMSPage() {
  useHashScroll();

  return (
    <>
      <PrintOMSHero />
      <TrustedBy />
      <ProblemSplit />
      <Outcomes />
      <QuantifiedImpact />
      <FeatureStories />
      <Teams />
      <CustomerPortal />
      <Reporting />
      <Testimonials />
      <Pricing />
      <FAQ />
      <PrintOMSFinalCTA />
    </>
  );
}
