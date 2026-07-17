"use client";

import { useRef, type MouseEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BookDemoButton } from "../../components/BookDemoButton";
import { FadeIn } from "../../components/motion/FadeIn";

function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  }

  function onLeave() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform duration-200 ease-out will-change-transform"
    >
      <div className={className}>{children}</div>
    </div>
  );
}

/** Final CTA — gradient motion + magnetic Book Demo */
export function PrintOMSFinalCTA() {
  return (
    <section
      id="contact"
      className="py-28 relative z-10 overflow-hidden bg-[var(--brand-navy)] scroll-mt-24 rounded-b-[2.5rem] shadow-[0_28px_80px_rgba(0,0,0,0.4)]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,112,67,0.3) 0%, transparent 65%)",
          }}
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <FadeIn className="max-w-3xl mx-auto px-6 text-center relative">
        <h2
          className="font-['Figtree',sans-serif] font-black text-white leading-tight mb-4"
          style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}
        >
          Ready to Run Your Entire Signage Business From One Dashboard?
        </h2>
        <p className="font-['Figtree',sans-serif] text-[16px] text-white/50 mb-10">
          Book a demo or start a conversation — we&apos;ll map your workflow in one call.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton>
            <BookDemoButton className="font-['Figtree',sans-serif] font-bold text-[15px] bg-brand-gradient text-white px-9 py-4 rounded-lg inline-flex items-center gap-2 shadow-xl shadow-orange-500/30">
              Book Demo <ArrowRight size={16} />
            </BookDemoButton>
          </MagneticButton>
          <MagneticButton>
            <a
              href="mailto:akshay@thepolarislabs.com?subject=PrintOMS%20Free%20Trial"
              className="font-['Figtree',sans-serif] font-semibold text-[15px] text-white/70 border border-white/25 px-9 py-4 rounded-lg hover:border-white/50 hover:text-white transition-all inline-block"
            >
              Start Free Trial
            </a>
          </MagneticButton>
        </div>
      </FadeIn>
    </section>
  );
}
