import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FadeIn } from "./FadeIn";

export type StickyStep = {
  id: string;
  title: string;
  desc: string;
  color: string;
};

type StickyStepsProps = {
  eyebrow?: string;
  heading: string;
  sub?: string;
  steps: readonly StickyStep[];
};

export function StickySteps({ eyebrow, heading, sub, steps }: StickyStepsProps) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  const current = steps[active] ?? steps[0];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-2xl mb-14">
          {eyebrow && (
            <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
              {eyebrow}
            </p>
          )}
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            {heading}
          </h2>
          {sub && (
            <p className="font-['Figtree',sans-serif] text-[16px] text-[var(--brand-muted)] leading-relaxed">
              {sub}
            </p>
          )}
        </FadeIn>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          <div className="space-y-6 lg:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="lg:min-h-[45vh] flex items-center py-4 lg:py-0"
              >
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="w-full text-left border rounded-2xl p-6 transition-all duration-300"
                  style={{
                    borderColor:
                      active === i ? `${step.color}55` : "rgba(0,0,0,0.07)",
                    background:
                      active === i ? `${step.color}08` : "transparent",
                    boxShadow:
                      active === i ? `0 12px 40px ${step.color}18` : "none",
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-['Figtree',sans-serif] text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: step.color }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-['Figtree',sans-serif] font-black text-[18px] text-[var(--brand-ink)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-['Figtree',sans-serif] text-[14px] text-[var(--brand-muted)] leading-relaxed">
                    {step.desc}
                  </p>
                </button>
              </div>
            ))}
          </div>

          <div className="hidden lg:block sticky top-28">
            <motion.div
              key={current.id}
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-[rgba(0,0,0,0.08)] overflow-hidden shadow-xl bg-[var(--brand-navy)] text-white min-h-[380px] p-10 flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-2xl mb-8"
                  style={{ backgroundColor: `${current.color}33` }}
                >
                  <div
                    className="w-full h-full rounded-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${current.color}, transparent)`,
                      opacity: 0.85,
                    }}
                  />
                </div>
                <p
                  className="font-['Figtree',sans-serif] text-[12px] font-bold uppercase tracking-widest mb-3"
                  style={{ color: current.color }}
                >
                  Stage {active + 1} of {steps.length}
                </p>
                <h3
                  className="font-['Figtree',sans-serif] font-black leading-tight mb-4"
                  style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
                >
                  {current.title}
                </h3>
                <p className="font-['Figtree',sans-serif] text-[16px] text-white/60 leading-relaxed max-w-md">
                  {current.desc}
                </p>
              </div>
              <div className="flex gap-1.5 mt-10">
                {steps.map((s, i) => (
                  <div
                    key={s.id}
                    className="h-1 flex-1 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor: i <= active ? current.color : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
