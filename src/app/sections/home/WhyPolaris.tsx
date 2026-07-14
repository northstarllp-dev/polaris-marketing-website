import { Layers, Shield, Zap } from "lucide-react";
import { WHY_PILLARS } from "../../content/polaris";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

const ICONS = {
  purpose: Layers,
  modern: Zap,
  enterprise: Shield,
} as const;

export function WhyPolaris() {
  return (
    <section id="why" className="py-24 bg-[var(--brand-surface)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Why Polaris
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Not a SaaS shop. A problem studio.
          </h2>
        </FadeIn>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WHY_PILLARS.map(({ id, title, points }) => {
            const Icon = ICONS[id];
            return (
              <StaggerItem key={id}>
                <div className="text-center p-8 rounded-2xl border border-[rgba(0,0,0,0.07)] bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="w-14 h-14 bg-[var(--brand-surface)] rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Icon size={26} className="text-[var(--brand-orange)]" />
                  </div>
                  <h3 className="font-['Figtree',sans-serif] font-black text-[20px] text-[var(--brand-ink)] mb-4">
                    {title}
                  </h3>
                  <div className="flex flex-col gap-1.5">
                    {points.map((p) => (
                      <p
                        key={p}
                        className="font-['Figtree',sans-serif] font-normal text-[15px] text-[var(--brand-muted)]"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
