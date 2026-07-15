import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { User } from "lucide-react";
import { FadeIn } from "../../components/motion/FadeIn";
import { Tilt3D } from "../../components/motion/Tilt3D";
import { SlidingNumber } from "../../components/motion/SlidingNumber";
import { Stagger, StaggerItem } from "../../components/motion/Stagger";

const STATS = [
  { label: "Niche markets", value: 4, suffix: "+" },
  { label: "Customers", value: 3, suffix: "+" },
  { label: "Live products", value: 1, suffix: "" },
] as const;

function CountUpStat({
  value,
  label,
  suffix,
}: {
  value: number;
  label: string;
  suffix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setN(value);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center px-4">
      <div className="font-['Figtree',sans-serif] font-black text-[36px] text-[var(--brand-ink)] flex items-center justify-center gap-0.5">
        <SlidingNumber value={n} />
        {suffix}
      </div>
      <p className="font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)] mt-1">
        {label}
      </p>
    </div>
  );
}

export function AboutFounders() {
  return (
    <section id="about" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
              About Our Founders
            </p>
            <h2
              className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight mb-6"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              Passionate about solving real-world problems
            </h2>
            <p className="font-['Figtree',sans-serif] text-[18px] text-[var(--brand-muted)] leading-relaxed mb-12">
              We are NIT Trichy alumni dedicated to building technology that simplifies complex workflows and brings order to chaos.
            </p>

            <div className="flex flex-wrap items-start justify-center gap-8 sm:gap-16 mt-16 mb-4">
              <div className="flex flex-col items-center">
                <Tilt3D className="mb-6" max={14}>
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl bg-gray-100 shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center relative rotate-[-2deg]"
                  >
                    <User size={56} className="text-gray-400" />
                  </motion.div>
                </Tilt3D>
                <p className="font-['Figtree',sans-serif] font-bold text-[18px] sm:text-[22px] text-[var(--brand-ink)]">
                  Akshay Kumar
                </p>
                <p className="font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)] uppercase tracking-widest mt-1">
                  Co-Founder
                </p>
              </div>

              <div className="flex flex-col items-center">
                <Tilt3D className="mb-6 mt-4 sm:mt-6" max={14}>
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl bg-gray-100 shadow-2xl border-4 border-white overflow-hidden flex items-center justify-center relative rotate-[3deg]"
                  >
                    <User size={56} className="text-gray-400" />
                  </motion.div>
                </Tilt3D>
                <p className="font-['Figtree',sans-serif] font-bold text-[18px] sm:text-[22px] text-[var(--brand-ink)]">
                  Hari Hara Sudhan
                </p>
                <p className="font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)] uppercase tracking-widest mt-1">
                  Co-Founder
                </p>
              </div>
            </div>
          </FadeIn>

          <Stagger className="mt-16 flex flex-wrap items-center justify-center gap-8 border-t border-[rgba(0,0,0,0.06)] pt-12">
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <CountUpStat value={s.value} label={s.label} suffix={s.suffix} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
