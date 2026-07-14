import { SoftOrbit } from "../../components/motion/CountOrPulse";
import { FadeIn } from "../../components/motion/FadeIn";

export function EcosystemTeaser() {
  return (
    <section id="ecosystem" className="py-24 bg-white overflow-hidden scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Ecosystem
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            A growing suite for operations
          </h2>
          <p className="font-['Figtree',sans-serif] text-[16px] text-[var(--brand-muted)] leading-relaxed max-w-xl mx-auto mb-14">
            PrintOMS is the first Polaris product. More tools for how modern
            businesses run are on the way — same platform, same standard.
          </p>
        </FadeIn>
        <FadeIn delay={0.1} className="flex justify-center py-8">
          <SoftOrbit className="w-[280px] h-[280px] flex items-center justify-center" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="font-['Figtree',sans-serif] text-[14px] font-semibold text-[var(--brand-muted)] tracking-wide">
            More Polaris products coming
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
