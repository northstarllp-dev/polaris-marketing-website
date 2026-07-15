import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type RevealBlockProps = {
  children: React.ReactNode;
  dim?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  delay?: number;
};

function RevealBlock({ children, dim = false, size = "md", delay = 0 }: RevealBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const sizeClass = {
    sm: "text-[clamp(16px,2vw,20px)]",
    md: "text-[clamp(20px,3vw,30px)]",
    lg: "text-[clamp(26px,4vw,46px)]",
    xl: "text-[clamp(32px,5.5vw,68px)]",
  }[size];

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`font-['Figtree',sans-serif] leading-[1.25] text-center ${sizeClass} ${
        dim ? "text-white/30 font-normal" : "text-white font-black"
      }`}
    >
      {children}
    </motion.div>
  );
}

function DividerPulse() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-px w-16 mx-auto origin-left"
      style={{ background: "linear-gradient(90deg, #ff7043, transparent)" }}
    />
  );
}

export function PolarisManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax on background glow
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#080808] overflow-hidden"
    >
      {/* Ambient background glow */}
      {!reduce && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: glowY }}
        >
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(ellipse, #ff7043 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse, #8b5cf6 0%, transparent 70%)" }}
          />
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-6 py-36 flex flex-col gap-20">

        {/* Act 1 — The familiar pain */}
        <div className="flex flex-col gap-8">
          <RevealBlock dim size="md">
            You bought the tools. Hired someone to manage the spreadsheets.
            Set up the WhatsApp groups.
          </RevealBlock>
          <RevealBlock dim size="md" delay={0.1}>
            You watched the demos. Read the case studies. Ran the pilot.
          </RevealBlock>
        </div>

        <DividerPulse />

        {/* Act 2 — The gut punch */}
        <div className="flex flex-col gap-6">
          <RevealBlock size="lg">
            But months later, jobs are still slipping through the cracks.
          </RevealBlock>
          <RevealBlock size="lg" delay={0.1}>
            Quotes go unanswered. Production stalls.
            Nobody knows what's actually happening.
          </RevealBlock>
          <RevealBlock size="md" delay={0.2} dim>
            And the tools you bought? Still open in 12 different browser tabs - unused.
          </RevealBlock>
        </div>

        <DividerPulse />

        {/* Act 3 — The insight */}
        <div className="flex flex-col gap-6">
          <RevealBlock dim size="md">
            You're not doing it wrong.
          </RevealBlock>
          <RevealBlock size="lg">
            Generic software can't understand your workflow.
          </RevealBlock>
          <RevealBlock dim size="md" delay={0.1}>
            It was never built for how your business actually runs.
            You're the one doing the adapting.
          </RevealBlock>
        </div>

        <DividerPulse />

        {/* Act 4 — The resolution */}
        <div className="flex flex-col gap-6">
          <RevealBlock dim size="sm">
            That's why we started Polaris.
          </RevealBlock>
          <RevealBlock size="xl">
            Software that understands{" "}
            <span style={{ color: "#ff7043" }}>your</span> workflow.
          </RevealBlock>
          <RevealBlock dim size="md" delay={0.1}>
            We go deep into a business niche. Map every handoff, every tool, every workaround.
            Then we build software around that reality - not the other way around.
          </RevealBlock>
        </div>

        <DividerPulse />

        {/* Act 5 — The promise */}
        <div className="flex flex-col gap-5">
          <RevealBlock size="lg">
            Stop adapting your business to tools.
          </RevealBlock>
          <RevealBlock size="lg" delay={0.08}>
            Start using{" "}
            <span style={{ color: "#ff7043" }}>tools built for your business.</span>
          </RevealBlock>
        </div>

      </div>
    </section>
  );
}
