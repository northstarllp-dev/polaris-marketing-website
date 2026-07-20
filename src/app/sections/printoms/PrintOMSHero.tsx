"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BookDemoButton } from "../../components/BookDemoButton";
import { LivePulse } from "../../components/motion/CountOrPulse";
import { ProductShowcase } from "../../components/ProductMockup";
import { SideScreenPanel } from "../../components/SideScreenPanel";

const blurUp = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/** Hero — Motion text sequence; existing dashboard mockup stays running */
export function PrintOMSHero() {
  return (
    <section className="relative bg-[var(--brand-navy)] overflow-hidden pt-28 pb-0">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse, #ff7043 0%, transparent 70%)",
          }}
          animate={{ opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative pt-6 pb-10">
        <motion.div
          {...blurUp}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 border border-white/15 text-white/70 text-[12px] font-['Figtree',sans-serif] font-semibold px-4 py-1.5 rounded-full mb-8 bg-white/5"
        >
          <LivePulse />
          PrintOMS · A Polaris product
        </motion.div>

        <motion.h1
          {...blurUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Figtree',sans-serif] font-black text-white leading-[1.06] tracking-tight mb-6"
          style={{ fontSize: "clamp(32px, 5.5vw, 56px)" }}
        >
          Stop Running Your Signage Business
          <br />
          on WhatsApp &amp; Excel.
        </motion.h1>

        <motion.p
          {...blurUp}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Figtree',sans-serif] text-white/55 max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.8vw, 18px)" }}
        >
          PrintOMS manages enquiries, quotations, approvals, production,
          installation and customer communication in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.36, type: "spring", stiffness: 260, damping: 18 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <BookDemoButton className="font-['Figtree',sans-serif] font-bold text-[15px] bg-brand-gradient text-white px-8 py-3.5 rounded-lg hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-lg shadow-orange-500/30">
            Book a Demo <ArrowRight size={16} />
          </BookDemoButton>
          <a
            href="#outcomes"
            className="font-['Figtree',sans-serif] font-semibold text-[15px] text-white/70 border border-white/20 px-8 py-3.5 rounded-lg hover:border-white/40 hover:text-white transition-all"
          >
            See the outcomes
          </a>
        </motion.div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-8 pb-0">
        <p className="font-['Figtree',sans-serif] text-[12px] font-semibold text-white/40 text-center uppercase tracking-widest mb-6">
          See it in action
        </p>
        <div className="relative flex items-end justify-center" style={{ perspective: "1200px" }}>
          <div className="hidden lg:block absolute left-0 bottom-0 w-[28%] opacity-70 scale-[0.85] origin-bottom-left -translate-x-[8%] translate-y-4">
            <SideScreenPanel variant="left" />
          </div>
          <div className="relative z-10 w-full max-w-4xl">
            <ProductShowcase dark />
          </div>
          <div className="hidden lg:block absolute right-0 bottom-0 w-[28%] opacity-70 scale-[0.85] origin-bottom-right translate-x-[8%] translate-y-4">
            <SideScreenPanel variant="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
