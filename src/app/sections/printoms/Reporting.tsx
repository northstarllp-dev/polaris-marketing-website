"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { REPORT_METRICS } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";
import { SlidingNumber } from "../../components/motion/SlidingNumber";

function Metric({
  label,
  value,
  prefix,
  format,
}: (typeof REPORT_METRICS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setN(format === "currency" ? Math.round(value / 1000) : value);
  }, [inView, value, format]);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
      <p className="font-['Figtree',sans-serif] text-[12px] uppercase tracking-widest text-white/40 mb-3">
        {label}
      </p>
      <div className="font-['Figtree',sans-serif] font-black text-[36px] text-white flex items-center justify-center gap-0.5">
        {prefix}
        <SlidingNumber value={n} />
        {format === "currency" ? "k" : ""}
      </div>
    </div>
  );
}

/** Reporting — count-ups + simple chart bars */
export function Reporting() {
  const bars = [40, 55, 48, 62, 70, 58, 82, 75, 90, 85, 95, 100];

  return (
    <section className="py-24 bg-[var(--brand-navy)] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-orange)] uppercase tracking-widest mb-3">
            Reporting
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Numbers that update themselves
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {REPORT_METRICS.map((m) => (
            <Metric key={m.label} {...m} />
          ))}
        </div>

        <FadeIn>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
            <p className="font-['Figtree',sans-serif] text-[12px] text-white/40 mb-6 uppercase tracking-widest">
              Revenue trend
            </p>
            <div className="flex items-end gap-2 h-40">
              {bars.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm bg-[var(--brand-orange)]"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ opacity: 0.45 + (i / bars.length) * 0.55 }}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
