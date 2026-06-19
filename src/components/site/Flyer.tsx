import { motion } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

interface FlyerProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
  redShadow?: boolean;
  staples?: boolean;
  style?: CSSProperties;
}

/**
 * A xeroxed sheet of paper pasted to the wall — the core unit of the
 * 80s LA/NYC hardcore flyer aesthetic. Black ink on cream paper,
 * hard offset shadow, optional corner staples and xerox grain overlay.
 */
export function Flyer({
  children,
  className = "",
  rotate = 0,
  redShadow = false,
  staples = true,
  style,
}: FlyerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: rotate - 1 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ ...style, ["--r" as string]: `${rotate}deg` }}
      className={`${redShadow ? "flyer-red" : "flyer"} xerox overprint ${className}`}
    >
      {staples && (
        <>
          <span className="staple left-2 top-2" />
          <span className="staple right-3 top-2" style={{ transform: "rotate(14deg)" }} />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
