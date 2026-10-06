import { useRef, type CSSProperties } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Stable decorative strings avoid random changes during renders and hydration.
const columns = Array.from({ length: 22 }, (_, column) =>
  Array.from({ length: 42 }, (_, row) =>
    ((row * 13 + column * 7 + Math.floor(row / 3)) % 2).toString(),
  ).join("\n"),
);

export function BinaryRain() {
  const frame = useRef<HTMLDivElement>(null);
  const visible = useInView(frame, { margin: "120px" });
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-65, 65]);
  return (
    <div
      ref={frame}
      className="binary-rain"
      aria-hidden="true"
      data-running={visible && !reduced}
    >
      <motion.div className="binary-rain-layer" style={{ y: reduced ? 0 : y }}>
        {columns.map((digits, index) => (
          <span
            key={index}
            className="binary-rain-column"
            style={
              {
                "--rain-duration": `${18 + (index % 7) * 3}s`,
                "--rain-delay": `${-index * 2.3}s`,
              } as CSSProperties
            }
          >{`${digits}\n${digits}\n${digits}`}</span>
        ))}
      </motion.div>
    </div>
  );
}
