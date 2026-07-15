import { useRef, type MouseEvent, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

type Tilt3DProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees at the card edges */
  max?: number;
  /** Lift the card toward the viewer on hover (px) */
  lift?: number;
  glare?: boolean;
};

/**
 * Pointer-driven 3D tilt wrapper. Tracks the cursor over the element and
 * rotates it in perspective, with a spring for a natural settle.
 * Disabled under prefers-reduced-motion.
 */
export function Tilt3D({
  children,
  className,
  max = 12,
  lift = 6,
  glare = true,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 18,
  });

  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 45%)`
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 900 }}
      className={className}
      whileHover={{ z: lift }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * Continuous gentle 3D wobble for an icon tile, with a stronger pop on hover.
 * Wrap an icon (or small tile) — it rotates subtly in 3D on a loop.
 */
export function WobbleIcon({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d", perspective: 600 }}
      animate={{
        rotateZ: [-4, 4, -4],
        rotateY: [-6, 6, -6],
        y: [-2, 2, -2],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{
        rotateY: 16,
        rotateX: -8,
        scale: 1.12,
        transition: { type: "spring", stiffness: 300, damping: 12 },
      }}
    >
      {children}
    </motion.div>
  );
}
