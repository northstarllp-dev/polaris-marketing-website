"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TEAM_ROLES } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

/** Built for every team — hover grows card + preview swaps */
export function Teams() {
  const [active, setActive] = useState(0);
  const preview = TEAM_ROLES[active];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Built for every team
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            One system. Every role.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <Stagger className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEAM_ROLES.map((r, i) => (
              <StaggerItem key={r.title}>
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.04 }}
                  className={`w-full text-left rounded-2xl border p-5 transition-colors ${
                    active === i
                      ? "border-[var(--brand-orange)]/50 bg-[var(--brand-surface)] shadow-md"
                      : "border-[rgba(0,0,0,0.07)] bg-white"
                  }`}
                >
                  <h3 className="font-['Figtree',sans-serif] font-black text-[16px] text-[var(--brand-ink)] mb-1">
                    {r.title}
                  </h3>
                  <p className="font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)]">
                    {r.desc}
                  </p>
                </motion.button>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="lg:col-span-2 rounded-2xl bg-[var(--brand-navy)] text-white p-6 min-h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={preview.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="font-['Figtree',sans-serif] text-[11px] uppercase tracking-widest text-white/40 mb-2">
                  Preview
                </p>
                <p className="font-['Figtree',sans-serif] font-black text-[22px] mb-2">
                  {preview.title}
                </p>
                <p className="font-['Figtree',sans-serif] text-[14px] text-[var(--brand-orange)] font-semibold">
                  {preview.preview}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
