import { PAIN_POINTS } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

export function PainPoints() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-2xl mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[#ef4444] uppercase tracking-widest mb-3">
            Why shops switch
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Signage work breaks generic software.
          </h2>
        </FadeIn>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PAIN_POINTS.map((p) => (
            <StaggerItem key={p.title}>
              <div className="h-full border border-[rgba(0,0,0,0.07)] rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-[var(--brand-surface)]/50">
                <h3 className="font-['Figtree',sans-serif] font-black text-[18px] text-[var(--brand-ink)] mb-2">
                  {p.title}
                </h3>
                <p className="font-['Figtree',sans-serif] text-[15px] text-[var(--brand-muted)] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
