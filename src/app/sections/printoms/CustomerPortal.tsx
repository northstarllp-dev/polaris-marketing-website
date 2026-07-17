"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTAL_STEPS } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";

gsap.registerPlugin(ScrollTrigger);

/** Customer portal — GSAP-driven lifecycle + progress */
export function CustomerPortal() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.min(
            PORTAL_STEPS.length - 1,
            Math.floor(self.progress * PORTAL_STEPS.length)
          );
          setStep(idx);
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const progress = ((step + 1) / PORTAL_STEPS.length) * 100;
  const current = PORTAL_STEPS[step];

  return (
    <section ref={ref} className="py-24 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Customer portal
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Orders that feel alive
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Phone mock */}
          <div className="mx-auto w-[260px] rounded-[2rem] border-4 border-[var(--brand-navy)] bg-[var(--brand-navy)] p-3 shadow-2xl">
            <div className="rounded-[1.5rem] bg-white overflow-hidden min-h-[420px] p-5">
              <p className="font-['Figtree',sans-serif] text-[11px] text-[var(--brand-muted)] mb-1">
                JOB-24018
              </p>
              <p className="font-['Figtree',sans-serif] font-black text-[16px] text-[var(--brand-ink)] mb-6">
                Phoenix Mall LED Sign
              </p>
              <div className="h-2 rounded-full bg-[var(--brand-surface)] mb-6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: current.color }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>
              <ul className="space-y-3">
                {PORTAL_STEPS.map((s, i) => (
                  <li
                    key={s.id}
                    className="flex items-center gap-3 font-['Figtree',sans-serif] text-[13px]"
                    style={{
                      color: i <= step ? s.color : "var(--brand-muted)",
                      fontWeight: i === step ? 700 : 500,
                    }}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: i <= step ? s.color : "#ddd",
                      }}
                    />
                    {s.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Desktop timeline */}
          <div className="rounded-2xl bg-[var(--brand-navy)] text-white p-8 shadow-xl">
            <p className="font-['Figtree',sans-serif] text-[11px] uppercase tracking-widest text-white/40 mb-6">
              Desktop dashboard
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {PORTAL_STEPS.map((s, i) => (
                <span
                  key={s.id}
                  className="px-3 py-1.5 rounded-full text-[12px] font-['Figtree',sans-serif] font-semibold border transition-all"
                  style={{
                    borderColor: i <= step ? s.color : "rgba(255,255,255,0.15)",
                    color: i <= step ? s.color : "rgba(255,255,255,0.4)",
                    background: i === step ? `${s.color}22` : "transparent",
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
            <p className="font-['Figtree',sans-serif] text-[18px] font-bold" style={{ color: current.color }}>
              Now: {current.label}
            </p>
            <p className="font-['Figtree',sans-serif] text-[14px] text-white/50 mt-2">
              Status updates sync to the customer portal in real time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
