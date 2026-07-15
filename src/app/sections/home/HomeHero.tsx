"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { LivePulse } from "../../components/motion/CountOrPulse";

const HEADLINE_TOP = ["We", "map", "your", "chaos."];
const HEADLINE_BOTTOM = ["Then", "we", "build", "the"];
const HEADLINE_ACCENT = ["software", "to", "end", "it."];

function WordReveal({
  words,
  delay = 0,
  className = "",
  accent = false,
}: {
  words: string[];
  delay?: number;
  className?: string;
  accent?: boolean;
}) {
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={`inline-block mr-[0.28em] last:mr-0 ${accent ? "text-brand-gradient" : ""}`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: delay + i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const orbYSlow = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.35]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--brand-navy)] overflow-hidden pt-28 pb-24 min-h-screen flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse, #ff7043 0%, transparent 70%)",
            y: orbY,
          }}
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[180px] left-[-80px] w-[420px] h-[420px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse, #64748b 0%, transparent 70%)",
            y: orbYSlow,
          }}
          animate={{ x: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[-60px] w-[380px] h-[380px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(ellipse, #0ea5e9 0%, transparent 70%)",
            y: orbY,
          }}
          animate={{ scale: [1, 1.12, 1] }}
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

      <motion.div
        className="max-w-5xl mx-auto px-6 text-center relative w-full"
        style={
          { y: contentY, opacity: contentOpacity }
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-white/15 text-white/70 text-[12px] font-['Figtree',sans-serif] font-semibold px-4 py-1.5 rounded-full mb-8 bg-white/5 backdrop-blur-sm"
        >
          <LivePulse />
          PrintOMS is live - the first Polaris product
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-['Instrument_Serif',serif] italic text-white/90 mb-4 tracking-tight"
          style={{ fontSize: "clamp(42px, 8vw, 88px)", lineHeight: 1.05 }}
        >
          Polaris
        </motion.p>

        <h1
          className="font-['Figtree',sans-serif] font-black text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontSize: "clamp(28px, 4.5vw, 48px)" }}
        >
          <WordReveal words={HEADLINE_TOP} delay={0.16} />
          <br />
          <WordReveal words={HEADLINE_BOTTOM} delay={0.4} />{" "}
          <WordReveal words={HEADLINE_ACCENT} delay={0.64} accent />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.9 }}
          className="font-['Figtree',sans-serif] font-normal text-white/55 max-w-xl mx-auto leading-relaxed mb-10"
          style={{ fontSize: "clamp(15px, 1.8vw, 18px)" }}
        >
          Polaris digs deep into how real businesses run - then ships purpose-built
          software that actually fits. Starting with PrintOMS for signage shops.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.05 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/products/printoms"
              className="font-['Figtree',sans-serif] font-bold text-[15px] bg-brand-gradient text-white px-8 py-3.5 rounded-lg hover:brightness-110 transition-colors inline-flex items-center gap-2 shadow-lg shadow-orange-500/30"
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
      </motion.div>
    </section>
  );
}
