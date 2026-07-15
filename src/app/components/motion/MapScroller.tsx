"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { FadeIn } from "./FadeIn";
import type { StickyStep } from "./StickySteps";
import { Check } from "lucide-react";

type MapScrollerProps = {
  eyebrow?: string;
  heading: string;
  sub?: string;
  steps: readonly StickyStep[];
};

export function MapScroller({ eyebrow, heading, sub, steps }: MapScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // The scroll progress of the entire 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate active step based on scroll progress (divide by number of steps)
  const activeIndex = useTransform(scrollYProgress, (v) => {
    // Math.min prevents out of bounds at 1.0 progress
    const idx = Math.floor(v * steps.length);
    return Math.min(idx, steps.length - 1);
  });

  // Map nodes positions (x, y percentages)
  const nodes = [
    { x: 50, y: 5 },
    { x: 85, y: 20 },
    { x: 15, y: 35 },
    { x: 85, y: 50 },
    { x: 15, y: 65 },
    { x: 85, y: 80 },
    { x: 50, y: 95 },
  ];

  // SVG path connecting these nodes. Using a cubic bezier curve to make it curvy.
  const pathData = `M 50 5 
    C 50 12, 85 12, 85 20 
    C 85 28, 15 28, 15 35 
    C 15 42, 85 42, 85 50 
    C 85 58, 15 58, 15 65 
    C 15 72, 85 72, 85 80 
    C 85 88, 50 88, 50 95`;

  return (
    <section ref={containerRef} className="relative bg-[var(--brand-surface)] lg:min-h-[300vh]">
      {/* Sticky container that stays in view on desktop */}
      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center overflow-hidden py-12 lg:py-24">
        <div className="max-w-7xl w-full mx-auto px-6 h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column: Content */}
          <div className="flex-1 w-full h-full flex flex-col justify-center max-w-xl">
            <FadeIn className="mb-10">
              {eyebrow && (
                <p className="font-['Figtree',sans-serif] text-[12px] font-bold text-[var(--brand-accent)] uppercase tracking-widest mb-3">
                  {eyebrow}
                </p>
              )}
              <h2
                className="font-['Figtree',sans-serif] font-black text-[var(--brand-ink)] leading-tight mb-4"
                style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
              >
                {heading}
              </h2>
              {sub && (
                <p className="font-['Figtree',sans-serif] text-[16px] text-[var(--brand-muted)] leading-relaxed">
                  {sub}
                </p>
              )}
            </FadeIn>

            {/* Tightly stacked boxes */}
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <AnimatedStackedBox
                  key={step.id}
                  step={step}
                  index={i}
                  total={steps.length}
                  scrollYProgress={scrollYProgress}
                  activeIndex={activeIndex}
                />
              ))}
            </div>
          </div>

          {/* Right Column: The Map */}
          <div className="flex-1 w-full h-full max-h-[80vh] relative hidden lg:block">
            <div className="absolute inset-0 w-full h-full">
              {/* SVG Map Path */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="w-full h-full absolute inset-0 overflow-visible"
              >
                {/* Background faint path */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Foreground animated path */}
                <motion.path
                  d={pathData}
                  fill="none"
                  stroke="var(--brand-orange)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ pathLength: scrollYProgress }}
                />
              </svg>

              {/* Nodes on the map */}
              {steps.map((step, i) => {
                const pos = nodes[i];
                if (!pos) return null;
                return (
                  <MapNode
                    key={step.id}
                    step={step}
                    index={i}
                    pos={pos}
                    activeIndex={activeIndex}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Helper component to subscribe to activeIndex and highlight the box
function ActiveBox({ highlightColor, activeIndex, index }: { highlightColor: string, activeIndex: any, index: number }) {
  // Keep the highlight active for current AND past stages (so it doesn't fade when done)
  const opacity = useTransform(activeIndex, (v: number) => (v >= index ? 0.08 : 0));
  
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{ backgroundColor: highlightColor, opacity }}
    />
  );
}

// Helper component for the nodes on the SVG map
function MapNode({ step, index, pos, activeIndex }: { step: StickyStep, index: number, pos: {x: number, y: number}, activeIndex: any }) {
  
  const isActive = useTransform(activeIndex, (v) => v >= index);
  const isCurrent = useTransform(activeIndex, (v) => v === index);

  const scale = useTransform(isActive, (active) => (active ? 1.1 : 0.8));
  const opacity = useTransform(isActive, (active) => (active ? 1 : 0.5));
  
  const ringScale = useTransform(isCurrent, (current) => (current ? 1.5 : 1));
  const ringOpacity = useTransform(isCurrent, (current) => (current ? 0.3 : 0));

  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        scale,
        opacity,
      }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: step.color, scale: ringScale, opacity: ringOpacity }}
        />
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg relative z-10"
          style={{ backgroundColor: step.color }}
        >
          <Check size={20} strokeWidth={3} />
        </div>
      </div>
      
      <div className="absolute top-full mt-2 w-32 text-center">
        <span className="font-['Figtree',sans-serif] text-[12px] font-bold uppercase tracking-wider text-[var(--brand-ink)] bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-black/5">
          {step.title}
        </span>
      </div>
    </motion.div>
  );
}

function AnimatedStackedBox({
  step,
  index,
  total,
  scrollYProgress,
  activeIndex,
}: {
  step: StickyStep;
  index: number;
  total: number;
  scrollYProgress: any;
  activeIndex: any;
}) {
  const start = Math.max(0, (index - 0.5) / total);
  const end = Math.min(1, index / total);

  const y = useTransform(scrollYProgress, (v) => {
    if (index === 0) return 0;
    if (v < start) return 150;
    if (v > end) return 0;
    return 150 - ((v - start) / (end - start)) * 150;
  });

  const opacity = useTransform(scrollYProgress, (v) => {
    if (index === 0) return 1;
    if (v < start) return 0;
    if (v > end) return 1;
    return (v - start) / (end - start);
  });

  return (
    <motion.div
      className="rounded-2xl p-4 relative overflow-hidden"
      style={{
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.06)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        y,
        opacity,
      }}
    >
      <ActiveBox highlightColor={step.color} activeIndex={activeIndex} index={index} />

      <div className="relative z-10 flex items-start gap-4">
        <div
          className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center font-bold text-[12px] mt-1 text-white shadow-md"
          style={{ backgroundColor: step.color }}
        >
          {index + 1}
        </div>
        <div>
          <h3 className="font-['Figtree',sans-serif] font-bold text-[17px] text-[var(--brand-ink)] mb-1">
            {step.title}
          </h3>
          <p className="font-['Figtree',sans-serif] text-[13px] text-[var(--brand-muted)] leading-relaxed">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
