import { motion, useReducedMotion } from "motion/react";
import { Crosshair, Layers, CheckCircle } from "lucide-react";
import { FadeIn } from "../../components/motion/FadeIn";

const STEPS = [
  {
    number: "1",
    icon: Crosshair,
    title: "Identify",
    desc: "Every project starts with clarity. We understand how your business actually works — where time is being lost, what slows things down, and why problems pile up. From there, we find the exact pain worth solving.",
    color: "#ff7043",
  },
  {
    number: "2",
    icon: Layers,
    title: "Develop",
    desc: "Once we know what matters, we move fast. We design and build software that fits seamlessly into how your business runs — built the right way from day one, so it works exactly as it should.",
    color: "#8b5cf6",
  },
  {
    number: "3",
    icon: CheckCircle,
    title: "Adopt",
    desc: "Then we make it real. We work alongside your team — fine-tuning and making sure the solution actually sticks. By the time we step back, it's not a project anymore — it's just how work gets done.",
    color: "#0ea5e9",
  },
] as const;

export function HowWeWork() {
  const reduce = useReducedMotion();

  return (
    <section id="how-we-work" className="py-24 bg-[var(--brand-navy)] scroll-mt-24 relative overflow-hidden">
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 0.5px, transparent 0.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        className="absolute top-[-80px] right-[-60px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #ff704318 0%, transparent 70%)" }}
        animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        <FadeIn className="text-center mb-16">
          <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-orange)] uppercase tracking-widest mb-3">
            Our approach
          </p>
          <h2
            className="font-['Figtree',sans-serif] font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
          >
            We don't guess. We go deep.
          </h2>
          <p className="font-['Figtree',sans-serif] text-[17px] text-white/50 leading-relaxed max-w-xl mx-auto">
            Every Polaris product starts with the same obsession — understanding a business niche completely before writing a single line of code.
          </p>
        </FadeIn>

        {/* Stacked card rows — large number left, icon + content right */}
        <div className="flex flex-col gap-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-4 md:gap-10 rounded-2xl border border-white/8 bg-white/[0.03] p-5 md:p-9 hover:bg-white/[0.06] hover:border-white/15 transition-all duration-400"
              >
                {/* Giant step number */}
                <div
                  className="hidden sm:flex shrink-0 w-12 md:w-20 items-center justify-center select-none"
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "clamp(40px, 6vw, 88px)",
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  <span className="group-hover:opacity-60 transition-opacity duration-300" style={{ color: step.color, opacity: 0.2 }}>
                    {step.number}
                  </span>
                </div>

                {/* Icon box */}
                <div
                  className="shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundColor: `${step.color}14`,
                    border: `1px solid ${step.color}28`,
                  }}
                >
                  <Icon size={22} style={{ color: step.color }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-['Figtree',sans-serif] font-black text-white leading-tight"
                      style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}>
                      {step.title}
                    </h3>
                    <span
                      className="hidden md:block h-px flex-1 max-w-[80px] rounded-full opacity-20"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                  <p className="font-['Figtree',sans-serif] text-[14px] text-white/50 leading-relaxed max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
