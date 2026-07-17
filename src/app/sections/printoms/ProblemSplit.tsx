"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROBLEM_CHAOS } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";

/** Split: chaos list → brag video that zooms out on scroll */
export function ProblemSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Zoomed-in → settled frame as you scroll through the section
  const scale = useTransform(scrollYProgress, [0.05, 0.75], [1.42, 1]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.12], [0.55, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const captionY = useTransform(scrollYProgress, [0.45, 0.7], [16, 0]);
  const chaosOpacity = useTransform(scrollYProgress, [0.2, 0.55], [1, 0.25]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    void el.play().catch(() => {
      /* autoplay may be blocked until interaction */
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--brand-surface)] overflow-hidden"
    >
      {/* Tall track so scroll can scrub the zoom */}
      <div className="h-[165vh]">
        <div className="sticky top-0 min-h-screen flex flex-col justify-center py-20">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <FadeIn className="text-center mb-12">
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
              <motion.ul style={{ opacity: chaosOpacity }} className="space-y-4">
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
              </motion.ul>

              <div className="relative flex flex-col items-center">
                <div className="w-full overflow-hidden rounded-2xl">
                  <motion.div
                    style={{ scale, opacity: videoOpacity }}
                    className="origin-center will-change-transform"
                  >
                    <div className="rounded-2xl overflow-hidden shadow-2xl border border-black/8 bg-[#0d0e24]">
                      {/* Window chrome — PrintOMS top-left */}
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6 bg-white/3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        <span className="ml-3 font-['Figtree',sans-serif] font-bold text-[11px] tracking-wide text-white/55">
                          PrintOMS
                        </span>
                      </div>
                      <div className="relative aspect-[16/10] bg-black">
                        <video
                          ref={videoRef}
                          src="/brag.mp4"
                          muted
                          loop
                          playsInline
                          autoPlay
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.p
                  style={{ opacity: captionOpacity, y: captionY }}
                  className="mt-4 text-center font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)]"
                >
                  One dashboard. Every job. End to end.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
