"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check, MessageSquare } from "lucide-react";
import { PRINTOMS_SPOTLIGHT_FEATURES } from "../../content/polaris";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";
import { Tilt3D } from "../../components/motion/Tilt3D";

export function ProductSpotlight() {
  return (
    <section className="py-24 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Our first product
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            PrintOMS - built for signage shops
          </h2>
        </FadeIn>

        <FadeIn y={36}>
          <Tilt3D className="group" max={6} glare={false}>
            <div className="bg-white rounded-2xl border border-[rgba(0,0,0,0.08)] overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-[46%] p-7 md:p-14 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="font-['Figtree',sans-serif] font-bold text-[12px] text-[var(--brand-navy)] bg-[var(--brand-surface)] px-3 py-1 rounded">
                      PrintOMS
                    </span>
                    <span className="font-['Figtree',sans-serif] text-[10px] font-bold text-white bg-[#10b981] px-2.5 py-0.5 rounded uppercase tracking-wide">
                      Live
                    </span>
                  </div>
                  <h3
                    className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight mb-4"
                    style={{ fontSize: "clamp(22px, 2.5vw, 30px)" }}
                  >
                    The proof our approach works.
                  </h3>
                  <p className="font-['Figtree',sans-serif] font-normal text-[15px] text-[var(--brand-muted)] mb-8 leading-relaxed">
                    We spent months inside signage and fabrication businesses before writing a line of code.
                    PrintOMS is what came out - order management built around real operator workflows, from first enquiry to final install.
                  </p>
                  <Stagger className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8">
                    {PRINTOMS_SPOTLIGHT_FEATURES.map((label) => (
                      <StaggerItem key={label}>
                        <div className="flex items-center gap-2.5 text-[13px] font-['Figtree',sans-serif] font-semibold text-[#444]">
                          <Check size={14} className="text-brand-gradient shrink-0" />
                          {label}
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <Link
                    href="/products/printoms"
                    className="inline-flex items-center gap-2 font-['Figtree',sans-serif] font-bold text-[14px] bg-brand-gradient text-white px-7 py-3 rounded-lg hover:brightness-110 transition-colors self-start shadow-lg shadow-orange-500/30"
                  >
                    See PrintOMS <ArrowRight size={14} />
                  </Link>
                </div>
                <Link 
                  href="/products/printoms"
                  className="block w-full md:w-[54%] bg-black relative min-h-[240px] md:min-h-[320px] overflow-hidden flex items-center justify-center cursor-pointer group"
                >
                  <video
                    src="/brag.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </Link>
              </div>
            </div>
          </Tilt3D>
        </FadeIn>
      </div>
    </section>
  );
}
