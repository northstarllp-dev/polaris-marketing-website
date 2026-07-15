import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface SlidingNumberProps {
  value: number;
  padTo?: number;
  className?: string;
}

export function SlidingNumber({ value, padTo = 0, className = "" }: SlidingNumberProps) {
  // Convert value to a padded string array of digits
  const valString = Math.floor(value).toString().padStart(padTo, "0");
  const digits = valString.split("");

  return (
    <div className={`flex overflow-hidden leading-none ${className}`}>
      {digits.map((digit, i) => (
        <Digit key={`${i}-${digits.length - i}`} target={parseInt(digit, 10)} />
      ))}
    </div>
  );
}

function Digit({ target }: { target: number }) {
  const [current, setCurrent] = useState(target);

  const spring = useSpring(current, {
    stiffness: 150,
    damping: 18,
    mass: 1,
  });

  useEffect(() => {
    spring.set(target);
    setCurrent(target);
  }, [target, spring]);

  const y = useTransform(spring, (val) => `${-val * 100}%`);

  return (
    <div className="relative h-[1em] w-[0.6em] overflow-hidden tabular-nums">
      <motion.div style={{ y }} className="absolute left-0 top-0 flex flex-col">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div
            key={num}
            className="flex h-[1em] items-center justify-center"
          >
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
