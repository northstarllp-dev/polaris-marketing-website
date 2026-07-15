"use client";

import { Check } from "lucide-react";
import { PRICING_TIERS } from "../../content/printoms";
import { BookDemoButton } from "../../components/BookDemoButton";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--brand-surface)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            PrintOMS pricing
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Simple, transparent pricing.
          </h2>
        </FadeIn>
        <Stagger className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRICING_TIERS.map((tier) => (
            <StaggerItem key={tier.id}>
              <div
                className={`rounded-2xl border p-8 shadow-sm flex flex-col h-full relative overflow-hidden ${
                  tier.popular
                    ? "bg-[var(--brand-navy)] border-white/10 shadow-xl"
                    : "bg-white border-[rgba(0,0,0,0.08)]"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-brand-gradient text-white font-['Figtree',sans-serif] font-bold text-[10px] px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3
                  className={`font-['Figtree',sans-serif] font-black text-[22px] mb-2 ${
                    tier.popular ? "text-white" : "text-[var(--brand-ink)]"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`font-['Figtree',sans-serif] text-[14px] mb-6 ${
                    tier.popular ? "text-white/60" : "text-[var(--brand-muted)]"
                  }`}
                >
                  {tier.blurb}
                </p>
                <div className="mb-6 flex flex-col gap-0.5">
                  <span
                    className={`font-['Figtree',sans-serif] font-black text-[40px] leading-none ${
                      tier.popular ? "text-white" : "text-[var(--brand-ink)]"
                    }`}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`font-['Figtree',sans-serif] text-[14px] ${
                      tier.popular ? "text-white/60" : "text-[var(--brand-muted)]"
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>
                <BookDemoButton
                  className={`block w-full text-center font-['Figtree',sans-serif] font-bold text-[14px] py-3 rounded-lg transition-colors mb-8 ${
                    tier.popular
                      ? "bg-brand-gradient text-white hover:brightness-110"
                      : "bg-[var(--brand-surface)] text-[var(--brand-navy)] hover:bg-[#e8e8f0]"
                  }`}
                >
                  Book a Demo
                </BookDemoButton>
                <ul className="flex flex-col gap-3 mt-auto">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2.5 font-['Figtree',sans-serif] text-[14px] ${
                        tier.popular ? "text-white/80" : "text-[#555]"
                      }`}
                    >
                      <Check size={16} className="text-[#10b981] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
