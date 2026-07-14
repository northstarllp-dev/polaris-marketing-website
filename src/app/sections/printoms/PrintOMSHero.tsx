import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LivePulse } from "../../components/motion/CountOrPulse";
import { ProductShowcase } from "../../components/ProductMockup";

export function PrintOMSHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[var(--brand-navy)] overflow-hidden pt-28 pb-0">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse, #ff7043 0%, transparent 70%)",
          }}
          animate={reduce ? undefined : { opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[160px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #0ea5e9 0%, transparent 70%)",
          }}
          animate={reduce ? undefined : { x: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative pt-6 pb-10">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 border border-white/15 text-white/70 text-[12px] font-['Figtree',sans-serif] font-semibold px-4 py-1.5 rounded-full mb-8 bg-white/5"
        >
          <LivePulse />
          A Polaris product · Live now
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="font-['Figtree',sans-serif] font-bold text-[var(--brand-orange)] text-[14px] tracking-wide uppercase mb-4"
        >
          PrintOMS
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="font-['Figtree',sans-serif] font-black text-white leading-[1.06] tracking-tight mb-6"
          style={{ fontSize: "clamp(36px, 6vw, 64px)" }}
        >
          Order management for
          <br />
          signage &amp; fabrication
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-['Figtree',sans-serif] text-white/55 max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.8vw, 18px)" }}
        >
          From enquiry and site visit to quote, design, production, and install —
          one system built for physical work, not generic CRM.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <a
            href="#contact"
            className="font-['Figtree',sans-serif] font-bold text-[15px] bg-[var(--brand-orange)] text-white px-8 py-3.5 rounded-lg hover:bg-[#f4622d] transition-all inline-flex items-center gap-2 shadow-lg shadow-[var(--brand-orange)]/30"
          >
            Book a Demo <ArrowRight size={16} />
          </a>
          <a
            href="#workflow"
            className="font-['Figtree',sans-serif] font-semibold text-[15px] text-white/70 border border-white/20 px-8 py-3.5 rounded-lg hover:border-white/40 hover:text-white transition-all"
          >
            See the workflow
          </a>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative pb-16">
        <p className="font-['Figtree',sans-serif] text-[12px] font-semibold text-white/40 text-center uppercase tracking-widest mb-4">
          See it in action
        </p>
        <ProductShowcase dark />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--brand-navy))",
          }}
        />
      </div>
    </section>
  );
}
