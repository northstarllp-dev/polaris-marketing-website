import { useRef, useEffect, useState } from "react";

const LINES = [
  { text: "You tried the software. Adapted your workflow to fit it.", size: "md", accent: false, bold: false },
  { text: "But months later — jobs still slip. Quotes go unanswered. Nothing changed.", size: "lg", accent: false, bold: false },
  { text: "The tools weren't built for how your business actually runs.", size: "lg", accent: false, bold: false },
  { text: "That's why we built Polaris.", size: "md", accent: false, bold: true },
  { text: "We identify the real problem. Then we build the fix.", size: "xl", accent: true, bold: true },
] as const;

const SIZE_CLASS = {
  md: "text-[clamp(18px,2.2vw,24px)]",
  lg: "text-[clamp(26px,3.8vw,46px)] leading-[1.15]",
  xl: "text-[clamp(30px,4.8vw,56px)] leading-[1.1]",
};

const N = LINES.length;

// Each line's center point in [0, 1] scroll progress
function getLineTransform(progress: number, i: number): { opacity: number; y: number } {
  const center = i / (N - 1); // 0, 0.25, 0.5, 0.75, 1.0
  const dist = (progress - center) * (N - 1); // signed distance from this line's center

  // Only show lines within 1 band of center
  if (Math.abs(dist) >= 1) return { opacity: 0, y: -Math.sign(dist) * 160 };

  // Cosine curve: opacity = 1 at dist=0, smoothly drops to 0 at |dist|=1
  const opacity = Math.max(0, Math.cos((dist * Math.PI) / 2));

  // y offset scales with viewport — smaller on mobile
  const travel = typeof window !== "undefined" ? Math.min(window.innerWidth * 0.45, 200) : 180;
  const y = -dist * travel;

  return { opacity, y };
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
    /* Tall container — creates scroll distance */
    <div
      ref={containerRef}
      className="relative bg-[var(--brand-navy)]"
      style={{ minHeight: `${N * 150}vh` }}
    >
      {/* Sticky panel — stays locked in viewport */}
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

        {/* All lines stacked at center — each positioned absolutely */}
        <div className="relative w-full max-w-3xl mx-auto px-6 text-center" style={{ height: "clamp(220px, 40vw, 320px)" }}>
          {LINES.map((line, i) => {
            const { opacity, y } = getLineTransform(progress, i);
            return (
              <p
                key={i}
                className={`absolute left-0 right-0 px-8 font-['Figtree',sans-serif] ${SIZE_CLASS[line.size]} ${
                  line.bold ? "font-black" : "font-light"
                } ${
                  line.accent ? "text-[var(--brand-orange)]" : "text-white"
                }`}
                style={{
                  opacity,
                  top: "50%",
                  transform: `translateY(calc(-50% + ${y}px))`,
                  // no CSS transition — scroll drives it frame-by-frame
                }}
              >
                {line.text}
              </p>
            );
          })}
        </div>

        {/* Scroll progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          {LINES.map((_, i) => {
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
