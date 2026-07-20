"use client";

import { motion } from "motion/react";
import { OUTCOMES } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

/** Outcome cards — stagger + hover lift / slight rotate / glow */
export function Outcomes() {
  return (
    <section id="outcomes" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-2xl mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Why businesses switch
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Outcomes that move the needle
          </h2>
        </FadeIn>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {OUTCOMES.map((o) => (
            <StaggerItem key={o.title}>
              <motion.div
                whileHover={{
                  y: -8,
                  rotate: 1,
                  boxShadow: `0 20px 40px ${o.color}33`,
                  borderColor: `${o.color}55`,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="h-full rounded-2xl border border-[rgba(0,0,0,0.07)] bg-[var(--brand-surface)]/60 p-7 cursor-default"
              >
                <div
                  className="w-10 h-1 rounded-full mb-5"
                  style={{ background: o.color }}
                />
                <h3 className="font-['Figtree',sans-serif] font-black text-[20px] text-[var(--brand-ink)] mb-2">
                  {o.title}
                </h3>
                <p className="font-['Figtree',sans-serif] text-[15px] text-[var(--brand-muted)] leading-relaxed">
                  {o.desc}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
