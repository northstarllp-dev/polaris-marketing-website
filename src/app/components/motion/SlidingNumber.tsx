import { useEffect } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface SlidingNumberProps {
  value: number;
  padTo?: number;
  className?: string;
}

export function SlidingNumber({ value, padTo = 0, className = "" }: SlidingNumberProps) {
  const valString = Math.floor(Math.max(0, value)).toString().padStart(padTo, "0");
  const digits = valString.split("");

  return (
    <div
      className={`inline-flex overflow-hidden leading-none tabular-nums ${className}`}
      aria-label={valString}
    >
      {digits.map((digit, i) => (
        <Digit key={`${i}-${digits.length}`} target={Number(digit)} />
      ))}
    </div>
  );
}

function Digit({ target }: { target: number }) {
  // Animate in em so each step equals exactly one digit row height
  const spring = useSpring(0, {
    stiffness: 150,
    damping: 18,
    mass: 1,
  });

  useEffect(() => {
    spring.set(target);
  }, [target, spring]);

  const y = useTransform(spring, (val) => `${-val}em`);

  return (
    <span className="relative inline-block h-[1em] w-[0.65em] overflow-hidden align-baseline">
      <motion.span
        style={{ y }}
        className="absolute left-0 top-0 flex w-full flex-col will-change-transform"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <span
            key={num}
            className="flex h-[1em] w-full items-center justify-center"
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
