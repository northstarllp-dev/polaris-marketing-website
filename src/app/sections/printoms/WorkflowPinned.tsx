"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WORKFLOW_STAGES } from "../../content/printoms";
import { ProductMockup } from "../../components/ProductMockup";

gsap.registerPlugin(ScrollTrigger);

const TAB_FOR_STAGE = [0, 1, 2, 4, 4, 3, 3, 5];

/**
 * Centerpiece: pinned workflow — growing line, stage lights, synced mockup.
 * GSAP ScrollTrigger storytelling.
 */
export function WorkflowPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${WORKFLOW_STAGES.length * 70}%`,
        pin: true,
        scrub: 0.65,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(line, { scaleY: p });
          const idx = Math.min(
            WORKFLOW_STAGES.length - 1,
            Math.floor(p * WORKFLOW_STAGES.length)
          );
          setActive(idx);
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const stage = WORKFLOW_STAGES[active];
  const tab = TAB_FOR_STAGE[active] ?? 0;

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative bg-[var(--brand-navy)] text-white min-h-screen flex items-center scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6 w-full py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-orange)] uppercase tracking-widest mb-3">
            The complete workflow
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black leading-tight mb-10"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Enquiry to completed — one timeline
          </h2>

          <div className="relative pl-8">
            <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                ref={lineRef}
                className="w-full h-full bg-gradient-to-b from-[var(--brand-orange)] to-[#10b981]"
              />
            </div>

            <ul className="space-y-3">
              {WORKFLOW_STAGES.map((s, i) => {
                const on = i <= active;
                const current = i === active;
                return (
                  <li
                    key={s.id}
                    className="relative flex items-start gap-4 transition-opacity duration-300"
                    style={{ opacity: on ? 1 : 0.35 }}
                  >
                    <span
                      className="absolute -left-8 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300"
                      style={{
                        borderColor: on ? s.color : "rgba(255,255,255,0.25)",
                        background: current ? s.color : "transparent",
                        boxShadow: current ? `0 0 16px ${s.color}` : "none",
                      }}
                    />
                    <div>
                      <p
                        className="font-['Figtree',sans-serif] font-bold text-[15px]"
                        style={{ color: current ? s.color : "inherit" }}
                      >
                        {s.title}
                      </p>
                      {current && (
                        <p className="font-['Figtree',sans-serif] text-[13px] text-white/50 mt-1 max-w-sm">
                          {s.desc}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="relative">
          <p className="font-['Figtree',sans-serif] text-[11px] uppercase tracking-widest text-white/40 mb-3 text-center">
            {stage?.title} · live view
          </p>
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <ProductMockup activeTab={tab} />
          </div>
        </div>
      </div>
    </section>
  );
}
