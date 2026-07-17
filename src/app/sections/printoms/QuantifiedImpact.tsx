"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { IMPACT_METRICS } from "../../content/printoms";

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  delayMs = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // easeOutExpo for a nice snappy start and slow finish
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * value);

      if (ref.current) {
        ref.current.textContent = `${prefix}${current}${suffix}`;
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value, prefix, suffix, delayMs]);

  return (
    <span
      ref={ref}
      className="font-black text-[clamp(56px,6vw,80px)] leading-none text-white tracking-tight"
    >
      {prefix}0{suffix}
    </span>
  );
}

export function QuantifiedImpact() {
  return (
    <section className="py-32 bg-[var(--brand-navy)] text-white relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[#3b82f6]/10 via-[#10b981]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-orange)] uppercase tracking-widest mb-4"
          >
            The Bottom Line
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-['Figtree',sans-serif] font-black leading-tight text-[clamp(36px,5vw,56px)]"
          >
            Built for tangible growth
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMPACT_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors duration-500 overflow-hidden"
            >
              {/* Subtle hover gradient that matches the metric's color */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${metric.color}15, transparent 60%)`,
                }}
              />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <AnimatedNumber
                    value={metric.target}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    delayMs={i * 150}
                  />
                  <div
                    className="w-10 h-1 rounded-full mt-6 mb-5 transition-all duration-500 group-hover:w-16"
                    style={{ background: metric.color }}
                  />
                </div>
                <div>
                  <h3 className="font-['Figtree',sans-serif] font-bold text-[22px] mb-2 text-white">
                    {metric.label}
                  </h3>
                  <p className="font-['Figtree',sans-serif] text-[15px] text-white/60 leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
