import { ROLES } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

export function Roles() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Who it&apos;s for
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Built for every role on the job
          </h2>
        </FadeIn>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROLES.map((r) => (
            <StaggerItem key={r.title}>
              <div className="border border-[rgba(0,0,0,0.07)] rounded-2xl p-6 hover:border-[var(--brand-orange)]/40 hover:shadow-md transition-all duration-300 h-full">
                <h3 className="font-['Figtree',sans-serif] font-black text-[16px] text-[var(--brand-ink)] mb-2">
                  {r.title}
                </h3>
                <p className="font-['Figtree',sans-serif] text-[14px] text-[var(--brand-muted)] leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
