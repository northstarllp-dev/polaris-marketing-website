import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, MessageSquare } from "lucide-react";
import { PRINTOMS_SPOTLIGHT_FEATURES } from "../../content/polaris";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";
import { Tilt3D } from "../../components/motion/Tilt3D";

export function ProductSpotlight() {
  const reduce = useReducedMotion();

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
                          <Check size={14} className="text-[var(--brand-orange)] shrink-0" />
                          {label}
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <Link
                    to="/products/printoms"
                    className="inline-flex items-center gap-2 font-['Figtree',sans-serif] font-bold text-[14px] bg-[var(--brand-navy)] text-white px-7 py-3 rounded-lg hover:bg-[#1a1b4a] transition-colors self-start"
                  >
                    See PrintOMS <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="w-full md:w-[54%] bg-gradient-to-br from-[var(--brand-navy)] to-[#1a1b4a] p-6 md:p-8 flex items-center justify-center min-h-[240px] md:min-h-[320px]">
                  <motion.div
                    className="w-full max-w-sm space-y-3"
                    initial={reduce ? false : { opacity: 0, x: 40, rotateY: -8 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="bg-white/8 rounded-xl p-4 border border-white/6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/50 text-[11px] font-['Figtree',sans-serif]">
                          Incoming Enquiry
                        </span>
                        <span className="bg-[var(--brand-orange)] text-white text-[9px] font-['Figtree',sans-serif] font-bold px-2 py-0.5 rounded uppercase">
                          New
                        </span>
                      </div>
                      <div className="text-white font-['Figtree',sans-serif] font-bold text-[14px] mb-0.5">
                        Emirates Mall LED Signage
                      </div>
                      <div className="text-white/40 text-[11px] font-['Figtree',sans-serif]">
                        Al Futtaim Group · AED 48,500
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {["Enquiry", "Visit", "Quote", "Production", "Install"].map(
                        (s, i) => (
                          <div key={s} className="flex-1 text-center">
                            <div
                              className={`h-1 rounded-full mb-1 ${i <= 2 ? "bg-[var(--brand-orange)]" : "bg-white/10"}`}
                            />
                            <div className="text-[9px] font-['Figtree',sans-serif] text-white/30">
                              {s}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="bg-[#075e54]/50 rounded-xl p-3 border border-[#075e54]/30">
                      <div className="flex items-center gap-1.5 mb-2">
                        <MessageSquare size={11} className="text-[#25d366]" />
                        <span className="text-white/40 text-[10px] font-['Figtree',sans-serif] font-semibold">
                          WhatsApp - Sent automatically
                        </span>
                      </div>
                      <p className="text-white/70 text-[11px] font-['Figtree',sans-serif] leading-relaxed">
                        “Hi Ahmed, your design proof is ready. Tap to approve.”
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Tilt3D>
        </FadeIn>
      </div>
    </section>
  );
}
