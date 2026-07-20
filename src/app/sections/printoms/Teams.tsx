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
    <section id="teams" className="py-12 lg:py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-8 lg:mb-14">
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8 items-start">
          <Stagger className="lg:col-span-3 grid grid-cols-2 gap-2 sm:gap-4">
            {TEAM_ROLES.map((r, i) => (
              <StaggerItem key={r.title}>
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full text-left cursor-pointer rounded-xl border p-3 sm:p-4 transition-colors ${active === i
                      ? "border-[var(--brand-orange)]/50 bg-[var(--brand-surface)] shadow-md text-[var(--brand-ink)]"
                      : "border-[rgba(0,0,0,0.07)] bg-white text-[var(--brand-muted)] hover:border-[rgba(0,0,0,0.15)]"
                    }`}
                >
                  <h3 className="font-['Figtree',sans-serif] font-black text-[13px] sm:text-[16px] mb-0 truncate">
                    {r.title}
                  </h3>
                </motion.button>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="lg:col-span-2 rounded-2xl bg-[var(--brand-navy)] text-white p-6 sm:p-8 flex flex-col justify-center min-h-[200px] lg:min-h-[300px] shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={preview.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <p className="font-['Figtree',sans-serif] text-[11px] uppercase tracking-widest text-[var(--brand-orange)] mb-2 font-bold">
                  Role Capabilities
                </p>
                <p className="font-['Figtree',sans-serif] font-black text-[20px] lg:text-[24px] mb-2 lg:mb-3">
                  {preview.title}
                </p>
                <p className="font-['Figtree',sans-serif] text-[13px] lg:text-[15px] text-white/80 leading-relaxed mb-4 lg:mb-5">
                  {preview.desc}
                </p>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--brand-orange)] shadow-[0_0_8px_var(--brand-orange)]" />
                  <p className="font-['Figtree',sans-serif] text-[12px] lg:text-[13px] text-white/90 font-medium">
                    <span className="text-white/50 mr-1">Access:</span> {preview.preview}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <FadeIn delay={0.2} className="mt-6 lg:mt-10 max-w-3xl mx-auto text-center bg-[var(--brand-surface)] p-4 sm:p-6 rounded-2xl border border-[rgba(0,0,0,0.07)]">
          <p className="font-['Figtree',sans-serif] font-bold text-[14px] lg:text-[15px] text-[var(--brand-ink)] mb-1 sm:mb-2">
            Customizable Role Based Access Control (RBAC)
          </p>
          <p className="font-['Figtree',sans-serif] text-[12px] lg:text-[14px] text-[var(--brand-muted)] leading-relaxed">
            Role Based Access Control comes standard. Every team member gets exactly what they need no more, no less. Granular permissions allow you to customize views and actions for any role.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
