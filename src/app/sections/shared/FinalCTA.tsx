"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { BookDemoButton } from "../../components/BookDemoButton";
import { FadeIn } from "../../components/motion/FadeIn";

export function FinalCTA({
  heading = (
    <>
      Ready to modernize
      <br />
      your business?
    </>
  ),
  sub = "Book a demo today. No credit card required.",
}: {
  heading?: ReactNode;
  sub?: string;
}) {
  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-[var(--brand-navy)] scroll-mt-24">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,112,67,0.25) 0%, transparent 65%)",
          }}
          animate={
            { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <FadeIn className="max-w-3xl mx-auto px-6 text-center relative">
        <h2
          className="font-['Figtree',sans-serif] font-black text-white leading-tight mb-4"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          {heading}
        </h2>
        <p className="font-['Figtree',sans-serif] font-normal text-[17px] text-white/50 mb-10">
          {sub}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <BookDemoButton className="font-['Figtree',sans-serif] font-bold text-[15px] bg-brand-gradient text-white px-9 py-4 rounded-lg hover:brightness-110 transition-colors inline-flex items-center gap-2 shadow-xl shadow-orange-500/30">
              Book a Demo <ArrowRight size={16} />
            </BookDemoButton>
          </motion.div>

        </div>
      </FadeIn>
    </section>
  );
}

