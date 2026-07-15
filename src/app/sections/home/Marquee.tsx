"use client";

import { useState } from "react";
import { MARQUEE_CLIENTS } from "../../content/polaris";
import { FadeIn } from "../../components/motion/FadeIn";

/** Repeat enough times so the strip fills wide viewports and loops seamlessly. */
const LOOP = Array.from({ length: 8 }, () => MARQUEE_CLIENTS).flat();

export function Marquee() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="bg-white border-y border-[rgba(0,0,0,0.06)] py-6 overflow-hidden">
      <FadeIn>
        <p className="font-['Figtree',sans-serif] text-[11px] font-semibold text-[#bbb] text-center uppercase tracking-widest mb-5">
          Trusted by signage businesses
        </p>
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white to-transparent"
            aria-hidden
          />
          {/* Inline animation , not gated by prefers-reduced-motion (content carousel, not decorative) */}
          <div
            className="flex gap-16 items-center w-max will-change-transform"
            style={{
              animation: `polaris-marquee ${hovered ? 12 : 28}s linear infinite`,
            }}
          >
            {[...LOOP, ...LOOP].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-['Figtree',sans-serif] font-black text-[18px] md:text-[20px] text-[#c8c8d0] hover:text-[var(--brand-ink)] transition-colors whitespace-nowrap cursor-default tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

