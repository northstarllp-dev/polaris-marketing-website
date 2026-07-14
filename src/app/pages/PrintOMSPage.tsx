import { useHashScroll } from "../hooks/useHashScroll";
import { PrintOMSHero } from "../sections/printoms/PrintOMSHero";
import { PainPoints } from "../sections/printoms/PainPoints";
import { Capabilities } from "../sections/printoms/Capabilities";
import { Roles } from "../sections/printoms/Roles";
import { Pricing } from "../sections/printoms/Pricing";
import { FAQ } from "../sections/printoms/FAQ";
import { FinalCTA } from "../sections/shared/FinalCTA";
import { StickySteps } from "../components/motion/StickySteps";
import { WORKFLOW_STAGES } from "../content/printoms";

export function PrintOMSPage() {
  useHashScroll();

  return (
    <>
      <PrintOMSHero />
      <PainPoints />
      <div id="workflow" className="scroll-mt-24">
        <StickySteps
          eyebrow="Workflow"
          heading="From enquiry to install — one pipeline"
          sub="Every stage your signage shop already runs, connected in PrintOMS."
          steps={WORKFLOW_STAGES}
        />
      </div>
      <Capabilities />
      <Roles />
      <Pricing />
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
