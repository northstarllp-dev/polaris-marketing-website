import { motion, useReducedMotion } from "motion/react";

export function LivePulse({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full bg-[var(--brand-orange)]"
          animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-orange)]" />
    </span>
  );
}

type Product = {
  name: string;
  status: "live" | "soon";
  color: string;
  angle: number; // degrees
  radius: number; // px from center
  floatDuration: number;
  floatDelay: number;
};

const PRODUCTS: Product[] = [
  {
    name: "PrintOMS",
    status: "live",
    color: "#10b981",
    angle: 315,
    radius: 155,
    floatDuration: 4.2,
    floatDelay: 0,
  },
  {
    name: "PrintFloww",
    status: "soon",
    color: "#f97316",
    angle: 45,
    radius: 155,
    floatDuration: 5.0,
    floatDelay: 0.8,
  },
  {
    name: "StayFloww",
    status: "soon",
    color: "#8b5cf6",
    angle: 135,
    radius: 165,
    floatDuration: 4.6,
    floatDelay: 1.4,
  },
  {
    name: "LogisticOS",
    status: "soon",
    color: "#3b82f6",
    angle: 225,
    radius: 160,
    floatDuration: 5.4,
    floatDelay: 0.4,
  },
];

function getPosition(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

export function SoftOrbit({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const size = 420;
  const center = size / 2;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Rotating ring decorations */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[var(--brand-orange)]/15"
          style={{
            width: 100 + i * 64,
            height: 100 + i * 64,
            left: center - (100 + i * 64) / 2,
            top: center - (100 + i * 64) / 2,
          }}
          animate={
            reduce
              ? undefined
              : {
                  rotate: i % 2 === 0 ? 360 : -360,
                  opacity: [0.2, 0.45, 0.2],
                }
          }
          transition={{
            rotate: { duration: 20 + i * 8, repeat: Infinity, ease: "linear" },
            opacity: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      {/* Outer dashed orbit ring */}
      <div
        className="absolute rounded-full border border-dashed border-[var(--brand-orange)]/10"
        style={{
          width: 340,
          height: 340,
          left: center - 170,
          top: center - 170,
        }}
      />

      {/* Center Polaris logo */}
      <motion.div
        className="absolute z-10 w-20 h-20 rounded-2xl bg-[var(--brand-navy)] flex flex-col items-center justify-center shadow-2xl"
        style={{ left: center - 40, top: center - 40 }}
        animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-['Figtree',sans-serif] font-black text-white text-2xl leading-none">
          P
        </span>
        <span className="font-['Figtree',sans-serif] font-bold text-white/40 text-[9px] tracking-widest mt-0.5">
          POLARIS
        </span>
      </motion.div>

      {/* Floating product chips */}
      {PRODUCTS.map((product) => {
        const pos = getPosition(product.angle, product.radius);
        return (
          <div
            key={`wrapper-${product.name}`}
            className="absolute z-20 pointer-events-none"
            style={{
              left: center + pos.x,
              top: center + pos.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              key={product.name}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-lg border border-gray-100 cursor-default select-none pointer-events-auto"
              style={{ transformStyle: "preserve-3d" }}
              initial={reduce ? false : { opacity: 0, scale: 0.7 }}
              animate={
                reduce
                  ? undefined
                  : {
                      opacity: 1,
                      scale: 1,
                      y: [0, -10, -4, -12, 0, -6, 0],
                      x: [0, 3, -4, 2, -3, 5, 0],
                      rotateZ: [-2, 2, -2],
                      rotateY: [-4, 4, -4],
                    }
              }
              transition={{
                opacity: { duration: 0.5, delay: product.floatDelay + 0.3 },
                scale: { duration: 0.5, delay: product.floatDelay + 0.3 },
                y: {
                  duration: product.floatDuration,
                  delay: product.floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                x: {
                  duration: product.floatDuration * 1.3,
                  delay: product.floatDelay + 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateZ: {
                  duration: product.floatDuration * 1.1,
                  delay: product.floatDelay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateY: {
                  duration: product.floatDuration * 1.4,
                  delay: product.floatDelay + 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={
                reduce
                  ? undefined
                  : {
                      scale: 1.12,
                      rotateY: 18,
                      rotateX: -8,
                      transition: { type: "spring", stiffness: 280, damping: 14 },
                    }
              }
            >
              {/* Colored dot */}
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ background: product.color }}
              />
              <span className="font-['Figtree',sans-serif] font-semibold text-[13px] text-[var(--brand-ink)] whitespace-nowrap">
                {product.name}
              </span>
              <span
                className="font-['Figtree',sans-serif] font-bold text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wide"
                style={{
                  color: product.status === "live" ? product.color : "#999",
                  background:
                    product.status === "live"
                      ? `${product.color}18`
                      : "#f3f4f6",
                }}
              >
                {product.status === "live" ? "Live" : "Soon"}
              </span>
            </motion.div>
          </div>
        );
      })}

      {/* Connector lines from center to each chip */}
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ width: size, height: size }}
      >
        {PRODUCTS.map((product) => {
          const pos = getPosition(product.angle, product.radius);
          const innerPos = getPosition(product.angle, 48);
          return (
            <motion.line
              key={`line-${product.name}`}
              x1={center + innerPos.x}
              y1={center + innerPos.y}
              x2={center + pos.x}
              y2={center + pos.y}
              stroke={product.color}
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.8, delay: product.floatDelay + 0.1 }}
            />
          );
        })}
      </svg>
    </div>
  );
}
