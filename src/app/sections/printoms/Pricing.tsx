"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { PRICING_TIERS } from "../../content/printoms";
import { BookDemoButton } from "../../components/BookDemoButton";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

/** Three pricing cards — hover lift / glow / recommended emphasis */
export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--brand-surface)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Simple, transparent pricing
          </h2>
        </FadeIn>

        <Stagger className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_TIERS.map((tier) => (
            <StaggerItem key={tier.id}>
              <motion.div
                whileHover={{
                  y: -10,
                  boxShadow: tier.popular
                    ? "0 24px 48px rgba(255,112,67,0.35)"
                    : "0 20px 40px rgba(15,16,53,0.12)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className={`rounded-2xl border p-7 flex flex-col h-full relative ${
                  tier.popular
                    ? "bg-[var(--brand-navy)] border-[var(--brand-orange)]/40 scale-[1.03] z-10 shadow-xl"
                    : "bg-white border-[rgba(0,0,0,0.08)]"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--brand-orange)] text-white font-['Figtree',sans-serif] font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                <h3
                  className={`font-['Figtree',sans-serif] font-black text-[20px] mb-1 ${
                    tier.popular ? "text-white" : "text-[var(--brand-ink)]"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`font-['Figtree',sans-serif] text-[13px] mb-5 ${
                    tier.popular ? "text-white/55" : "text-[var(--brand-muted)]"
                  }`}
                >
                  {tier.blurb}
                </p>
                <p
                  className={`font-['Figtree',sans-serif] font-black text-[32px] leading-none mb-1 ${
                    tier.popular ? "text-white" : "text-[var(--brand-ink)]"
                  }`}
                >
                  {tier.price}
                </p>
                <p
                  className={`font-['Figtree',sans-serif] text-[13px] mb-6 ${
                    tier.popular ? "text-white/50" : "text-[var(--brand-muted)]"
                  }`}
                >
                  {tier.period}
                </p>
                <BookDemoButton
                  className={`w-full text-center font-['Figtree',sans-serif] font-bold text-[14px] py-3 rounded-lg mb-6 transition-all ${
                    tier.popular
                      ? "bg-brand-gradient text-white animate-pulse"
                      : "bg-[var(--brand-surface)] text-[var(--brand-navy)] hover:bg-[#e8e8f0]"
                  }`}
                >
                  Book a Demo
                </BookDemoButton>
                <ul className="flex flex-col gap-2.5 mt-auto">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className={`flex items-center gap-2 font-['Figtree',sans-serif] text-[13px] ${
                        tier.popular ? "text-white/75" : "text-[#555]"
                      }`}
                    >
                      <Check size={14} className="text-[#10b981] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
