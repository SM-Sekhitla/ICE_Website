import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/** Overscan keeps the image edges outside its clipping frame throughout the scroll. */
export function ParallaxImage({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  return (
    <div
      ref={frame}
      className={`parallax-backdrop ${className}`}
      aria-hidden="true"
    >
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        style={{ y: reduced ? 0 : y }}
      />
      <div className="parallax-overlay" />
      <div className="parallax-grid" />
    </div>
  );
}
