import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LivePulse } from "../../components/motion/CountOrPulse";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-[var(--brand-navy)] overflow-hidden pt-28 pb-24 min-h-screen flex items-center">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse, #ff7043 0%, transparent 70%)",
          }}
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[180px] left-[-80px] w-[420px] h-[420px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #64748b 0%, transparent 70%)",
          }}
          animate={reduce ? undefined : { x: [0, 30, 0], y: [0, -25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[-60px] w-[380px] h-[380px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #0ea5e9 0%, transparent 70%)",
          }}
          animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.5) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 text-center relative w-full">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-white/15 text-white/70 text-[12px] font-['Figtree',sans-serif] font-semibold px-4 py-1.5 rounded-full mb-8 bg-white/5 backdrop-blur-sm"
        >
          <LivePulse />
          PrintOMS is live — the first Polaris product
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-['Instrument_Serif',serif] italic text-white/90 mb-4 tracking-tight"
          style={{ fontSize: "clamp(42px, 8vw, 88px)", lineHeight: 1.05 }}
        >
          Polaris
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="font-['Figtree',sans-serif] font-black text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}
        >
          We map your chaos.
          <br />
          Then we build the <span className="text-[var(--brand-orange)]">software to end it.</span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="font-['Figtree',sans-serif] font-normal text-white/55 max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.8vw, 18px)" }}
        >
          Polaris digs deep into how real businesses run — then ships purpose-built
          software that actually fits. Starting with PrintOMS for signage shops.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
            <Link
              to="/products/printoms"
              className="font-['Figtree',sans-serif] font-bold text-[15px] bg-[var(--brand-orange)] text-white px-8 py-3.5 rounded-lg hover:bg-[#f4622d] transition-colors inline-flex items-center gap-2 shadow-lg shadow-[var(--brand-orange)]/30"
            >
              Explore PrintOMS <ArrowRight size={16} />
            </Link>
          </motion.div>
          <a
            href="#how-we-work"
            className="font-['Figtree',sans-serif] font-semibold text-[15px] text-white/70 border border-white/20 px-8 py-3.5 rounded-lg hover:border-white/40 hover:text-white transition-all"
          >
            See our approach
          </a>
        </motion.div>
      </div>
    </section>
  );
}
