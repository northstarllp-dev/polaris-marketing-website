"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURE_STORIES } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";

gsap.registerPlugin(ScrollTrigger);

const QUOTE_STEPS = ["Customer", "Products", "Pricing", "GST", "Total"];
const PROD_STEPS = ["Pending", "Cutting", "Printing", "Fabrication", "Installation"];

function DemoPanel({ demo }: { demo: (typeof FEATURE_STORIES)[number]["demo"] }) {
  if (demo === "crm") {
    return (
      <div className="space-y-3">
        {["Phoenix Mall LED", "Metro Banners", "IT Park Wrap"].map((j, i) => (
          <motion.div
            key={j}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex justify-between items-center rounded-xl bg-white/5 border border-white/10 px-4 py-3"
          >
            <span className="font-['Figtree',sans-serif] text-[13px] text-white/80">{j}</span>
            <span className="font-['Figtree',sans-serif] text-[12px] text-[var(--brand-orange)] font-bold">
              {[3, 7, 12][i]} jobs
            </span>
          </motion.div>
        ))}
      </div>
    );
  }
  if (demo === "quote") {
    return (
      <div className="space-y-2">
        {QUOTE_STEPS.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, width: "40%" }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="rounded-lg bg-white/8 border border-white/10 px-4 py-2.5 font-['Figtree',sans-serif] text-[13px] text-white/70"
          >
            {s}
            {s === "Total" && (
              <span className="float-right font-bold text-[var(--brand-orange)]">₹4,05,000</span>
            )}
          </motion.div>
        ))}
      </div>
    );
  }
  if (demo === "approve") {
    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <motion.button
          type="button"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(16,185,129,0.4)",
              "0 0 0 16px rgba(16,185,129,0)",
              "0 0 0 0 rgba(16,185,129,0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="px-10 py-3.5 rounded-full bg-[#10b981] text-white font-['Figtree',sans-serif] font-bold text-[15px]"
        >
          Approve
        </motion.button>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-['Figtree',sans-serif] text-[13px] text-[#10b981] font-semibold"
        >
          Status → Approved
        </motion.p>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      {PROD_STEPS.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: i < 3 ? 1 : 0.45 }}
          transition={{ delay: i * 0.2 }}
          className="flex items-center gap-3 rounded-lg px-3 py-2 border border-white/10"
          style={{ background: i === 2 ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.04)" }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: i <= 2 ? "#3b82f6" : "rgba(255,255,255,0.2)" }}
          />
          <span className="font-['Figtree',sans-serif] text-[13px] text-white/80">{s}</span>
        </motion.div>
      ))}
    </div>
  );
}

/** Feature stories — scroll-synced demos (GSAP + Motion) */
export function FeatureStories() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-feature-card]");

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const story = FEATURE_STORIES[active];

  return (
    <section ref={ref} className="py-24 bg-[var(--brand-navy)] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="sticky top-[80px] z-20 bg-[var(--brand-navy)] pt-8 pb-4 mb-8">
          <FadeIn className="max-w-2xl">
            <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-orange)] uppercase tracking-widest mb-3">
              Product deep dive
            </p>
            <h2
              className="font-['Figtree',sans-serif] font-black leading-tight"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Each feature is a story
            </h2>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative pb-[20vh] flex flex-col">
            {FEATURE_STORIES.map((f, i) => (
              <div key={f.id} className="contents">
                <div 
                  className="sticky z-10 bg-[var(--brand-navy)] pt-2 pb-4 w-full max-w-md"
                  style={{ top: `${200 + i * 80}px` }}
                >
                  <div
                    className="w-12 h-1 rounded-full mb-4"
                    style={{ background: f.color }}
                  />
                  <h3 className="font-['Figtree',sans-serif] font-black text-[28px] leading-none">
                    {f.title}
                  </h3>
                </div>
                <div data-feature-card className="mt-4 mb-40 lg:mb-56 min-h-[25vh]">
                  <p className="font-['Figtree',sans-serif] text-[16px] text-white/55 max-w-md leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-64 h-fit">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="font-['Figtree',sans-serif] text-[11px] uppercase tracking-widest text-white/40 mb-5">
                    {story.title} demo
                  </p>
                  <DemoPanel demo={story.demo} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
