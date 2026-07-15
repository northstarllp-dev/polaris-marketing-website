import { CAPABILITIES } from "../../content/printoms";
import { FadeIn } from "../../components/motion/FadeIn";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";
import { Tilt3D } from "../../components/motion/Tilt3D";

export function Capabilities() {
  return (
    <section className="py-24 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-2xl mb-14">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
            Capabilities
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            Everything your shop needs in one place
          </h2>
        </FadeIn>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((c, i) => (
            <StaggerItem key={c.title}>
              <Tilt3D className="group h-full" max={10}>
                <div className="bg-white border border-[rgba(0,0,0,0.07)] rounded-2xl p-7 h-full hover:shadow-xl transition-shadow duration-300">
                  <span className="font-['Figtree',sans-serif] text-[11px] font-bold text-[var(--brand-orange)] uppercase tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-['Figtree',sans-serif] font-black text-[18px] text-[var(--brand-ink)] mt-2 mb-2">
                    {c.title}
                  </h3>
                  <p className="font-['Figtree',sans-serif] text-[14px] text-[var(--brand-muted)] leading-relaxed">
                    {c.desc}
                  </p>
                </div>
              </Tilt3D>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
