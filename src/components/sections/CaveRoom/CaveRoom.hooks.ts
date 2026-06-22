import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function useCaveRoomParallax() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.06, 0]);

  return { sectionRef, backgroundY, backgroundOpacity };
}
