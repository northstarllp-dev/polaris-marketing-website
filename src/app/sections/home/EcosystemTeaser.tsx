"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SoftOrbit } from "../../components/motion/CountOrPulse";
import { FadeIn } from "../../components/motion/FadeIn";

export function EcosystemTeaser() {
  return (
    <section id="ecosystem" className="py-24 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            What's next
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Every niche deserves software built for it.
          </h2>
          <p className="font-['Figtree',sans-serif] text-[16px] text-[var(--brand-muted)] leading-relaxed max-w-xl mx-auto mb-14">
            We're already mapping the next business niche. PrintOMS is just the start.
            If you think your industry needs software built around how it actually runs - talk to us.
          </p>
        </FadeIn>
        <FadeIn delay={0.1} className="flex justify-center py-4">
          <SoftOrbit className="flex items-center justify-center" />
        </FadeIn>
        <FadeIn delay={0.2} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <p className="font-['Figtree',sans-serif] text-[14px] font-semibold text-[var(--brand-muted)] tracking-wide">
            More Polaris products coming
          </p>
          <Link
            href="/products/printoms#contact"
            className="inline-flex items-center gap-2 font-['Figtree',sans-serif] font-bold text-[14px] text-[var(--brand-orange)] hover:underline"
          >
            Talk to us <ArrowRight size={14} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

