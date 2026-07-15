"use client";

import { useHashScroll } from "../hooks/useHashScroll";
import { PrintOMSHero } from "../sections/printoms/PrintOMSHero";
import { ProblemPlatform } from "../sections/home/ProblemPlatform";
import { PainPoints } from "../sections/printoms/PainPoints";
import { Roles } from "../sections/printoms/Roles";
// import { Pricing } from "../sections/printoms/Pricing";
import { FAQ } from "../sections/printoms/FAQ";
import { FinalCTA } from "../sections/shared/FinalCTA";
import { StickySteps } from "../components/motion/StickySteps";
import { CAPABILITIES } from "../content/printoms";

export function PrintOMSPage() {
  useHashScroll();

  return (
    <>
      <PrintOMSHero />
      <ProblemPlatform />
      <PainPoints />
      <div id="workflow" className="scroll-mt-24">
        <StickySteps
          eyebrow="Capabilities"
          heading="Everything your shop needs in one place"
          sub="All the tools to run your signage business, connected in PrintOMS."
          steps={CAPABILITIES}
        />
      </div>
      <Roles />
      {/* Temporarily hidden
      <Pricing />
      */}
      <FAQ />
      <FinalCTA
        heading={
          <>
            Ready to run your shop
            <br />
            on PrintOMS?
          </>
        }
        sub="Book a demo. See enquiry to install in one workspace."
      />
    </>
  );
}

