"use client";

import { useRef, useEffect, useState } from "react";
import { BookDemoButton } from "../../components/BookDemoButton";

const LINES = [
  { text: "You tried the software. Adapted your workflow to fit it.", size: "md", accent: false, bold: false },
  { text: "But months later - jobs still slip. Quotes go unanswered. Nothing changed.", size: "lg", accent: false, bold: false },
  { text: "The tools weren't built for how your business actually runs.", size: "lg", accent: false, bold: false },
] as const;

const SIZE_CLASS = {
  md: "text-[clamp(18px,2.2vw,24px)]",
  lg: "text-[clamp(26px,3.8vw,46px)] leading-[1.15]",
  xl: "text-[clamp(30px,4.8vw,56px)] leading-[1.1]",
};

const N = LINES.length + 1;

// Each line's center point in [0, 1] scroll progress
function getLineTransform(progress: number, i: number, customTravel?: number) {
  const center = i / (N - 1); // 0, 0.25, 0.5, 0.75, 1.0
  const dist = (progress - center) * (N - 1); // signed distance from this line's center

  // Only show lines within 1 band of center
  if (Math.abs(dist) >= 1) return { opacity: 0, dist: -Math.sign(dist), customTravel };

  // Cosine curve: opacity = 1 at dist=0, smoothly drops to 0 at |dist|=1
  const opacity = Math.max(0, Math.cos((dist * Math.PI) / 2));

  return { opacity, dist, customTravel };
}

export function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    /* Tall container , creates scroll distance */
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-[var(--brand-navy)] via-[#151642] to-[var(--brand-navy)]"
      style={{ minHeight: `${N * 150}vh` }}
    >
      {/* Sticky panel , stays locked in viewport */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 0.5px, transparent 0.5px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,112,67,0.07) 0%, transparent 70%)" }}
        />

        {/* All lines stacked at center , each positioned absolutely */}
        <div className="relative w-full max-w-4xl mx-auto px-6 text-center" style={{ height: "clamp(350px, 50vw, 450px)" }}>
          {LINES.map((line, i) => {
            const { opacity, dist: distVal, customTravel: cTravel } = getLineTransform(progress, i);
            const travelExpr = cTravel !== undefined ? `${cTravel}px` : `min(45vw, 200px)`;
            const yExpr = `calc(${-distVal} * ${travelExpr})`;
            return (
              <p
                key={i}
                className={`absolute left-0 right-0 px-8 font-['Figtree',sans-serif] ${SIZE_CLASS[line.size]} ${line.bold ? "font-black" : "font-light"
                  } ${line.accent ? "text-brand-gradient" : "text-white"
                  }`}
                style={{
                  opacity,
                  top: "50%",
                  transform: `translateY(calc(-50% + ${yExpr}))`,
                  // no CSS transition , scroll drives it frame-by-frame
                  pointerEvents: "none",
                }}
              >
                {line.text}
              </p>
            );
          })}

          {/* Final block */}
          {(() => {
            const { opacity, dist: distVal, customTravel: cTravel } = getLineTransform(progress, LINES.length, 600);
            const travelExpr = cTravel !== undefined ? `${cTravel}px` : `min(45vw, 200px)`;
            const yExpr = `calc(${-distVal} * ${travelExpr})`;
            return (
              <div
                className="absolute left-0 right-0 px-6 flex flex-col items-center justify-center font-['Figtree',sans-serif]"
                style={{
                  opacity,
                  top: "50%",
                  transform: `translateY(calc(-50% + ${yExpr}))`,
                  pointerEvents: progress > 0.8 ? "auto" : "none",
                }}
              >
                <h2 className="text-[clamp(30px,4.8vw,56px)] leading-[1.1] font-light text-white mb-8">
                  That's why we built{" "}
                  <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-orange)] to-[#ffb74d]">
                    Polaris.
                  </span>
                </h2>

                <p className="text-[clamp(18px,2.2vw,24px)] font-bold text-white mb-8">
                  AI that actually moves the needle.
                </p>

                <p className="text-[clamp(16px,2vw,20px)] text-white/80 max-w-2xl mx-auto text-center mb-8 leading-relaxed">
                  Polaris defines what's worth building, builds it for you, then trains your people to make it stick.
                </p>

                <p className="text-[clamp(16px,2vw,20px)] text-white/80 mb-10">
                  Stop paying to experiment. <span className="font-bold text-white">Start paying for results.</span>
                </p>
                <BookDemoButton className="inline-block px-8 py-3 bg-brand-gradient text-white font-bold text-sm tracking-widest uppercase hover:brightness-110 transition-colors shadow-lg shadow-orange-500/30 rounded-lg">
                  Book Demo &gt;
                </BookDemoButton>
              </div>
            );
          })()}
        </div>

        {/* Scroll progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: N }).map((_, i) => {
            const center = i / (N - 1);
            const active = Math.abs(progress - center) < 0.12;
            return (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: active ? "20px" : "6px",
                  height: "6px",
                  backgroundColor: active ? "#ff7043" : "rgba(255,255,255,0.2)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

