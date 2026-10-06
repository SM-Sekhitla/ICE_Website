import { motion, useScroll, useTransform } from "framer-motion";

export function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], ["0px", "-200px"]);
  const glowX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["10%", "60%", "20%"],
  );
  const glowY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["20%", "50%", "80%"],
  );
  const dotY = useTransform(scrollYProgress, [0, 1], ["0px", "-400px"]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ice-black via-ice-void to-ice-black" />

      {/* Animated grid */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 grid-bg opacity-40"
      />

      {/* Fine grid overlay */}
      <motion.div
        style={{ y: dotY }}
        className="absolute inset-0 dot-bg opacity-30"
      />

      {/* Large blurred gradient glow */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="absolute h-[600px] w-[600px] rounded-full bg-cyan-electric/10 blur-[120px]"
      />

      {/* Secondary glow */}
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-midnight/20 blur-[100px]" />

      {/* Subtle scan line */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-ice/30 to-transparent animate-scan" />
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
