"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { PROBLEM_CHAOS } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";

/** Split: chaos list → brag video */
export function ProblemSplit() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-[var(--brand-surface)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[#ef4444] uppercase tracking-widest mb-3">
            The problem
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Chaos → organization
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <ul className="space-y-4">
            {PROBLEM_CHAOS.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 font-['Figtree',sans-serif] font-bold text-[20px] md:text-[24px] text-[var(--brand-ink)]"
              >
                <span className="text-[#ef4444] text-[22px]" aria-hidden>
                  ✕
                </span>
                {item}
              </motion.li>
            ))}
          </ul>

          <FadeIn y={24} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/8 bg-[#0d0e24]">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="ml-3 font-['Figtree',sans-serif] font-bold text-[11px] tracking-wide text-white/55">
                  PrintOMS
                </span>
              </div>
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  src="/brag.mp4"
                  muted
                  loop
                  playsInline
                  autoPlay
                  controls
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            </div>
            <p className="mt-4 text-center font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)]">
              One dashboard. Every job. End to end.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
