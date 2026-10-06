import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";

const STAGES = [
  {
    label: "DATA",
    num: "01",
    description: "Raw signals collected from systems, sensors and sources.",
  },
  {
    label: "ANALYSIS",
    num: "02",
    description: "Data processed, structured and examined for patterns.",
  },
  {
    label: "INTELLIGENCE",
    num: "03",
    description: "Patterns become insight. Insight becomes understanding.",
  },
  {
    label: "DECISION",
    num: "04",
    description: "Understanding drives confident, evidence-based decisions.",
  },
  {
    label: "IMPACT",
    num: "05",
    description: "Decisions translate into measurable organisational outcomes.",
  },
];

export function EngineeringPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32 lg:py-48">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal>
          <SectionLabel num="03" label="ENGINEERING VISUAL" />
        </Reveal>

        <div className="mt-12 max-w-5xl">
          <MaskReveal>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight text-white-frost">
              From data
            </h2>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight ice-gradient-cyan">
              to decision.
            </h2>
          </MaskReveal>
        </div>

        {/* Pipeline */}
        <div className="mt-24 grid grid-cols-1 gap-0 lg:grid-cols-[1fr_2px_1fr]">
          {/* Stages */}
          <div className="relative flex flex-col gap-16 lg:gap-24">
            {STAGES.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative pl-0 lg:pl-12"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-medium tracking-widest text-cyan-ice/50">
                    {stage.num}
                  </span>
                  <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white-frost sm:text-5xl lg:text-6xl">
                    {stage.label}
                  </h3>
                </div>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white-dim">
                  {stage.description}
                </p>
                {/* Animated dots near each stage */}
                <motion.div
                  className="absolute -left-2 top-2 hidden lg:block"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                >
                  <div className="h-2 w-2 rounded-full bg-cyan-electric" />
                  <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-cyan-electric/50" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Animated connection line */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 w-px bg-cyan-ice/10" />
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-cyan-ice via-cyan-electric to-cyan-deep"
            />
            {/* Data flow particles */}
            {[0, 0.25, 0.5, 0.75].map((delay, i) => (
              <motion.div
                key={i}
                className="absolute left-0 h-1 w-px bg-cyan-glow"
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          {/* Right side — technical labels */}
          <div className="mt-16 hidden flex-col justify-between lg:mt-0 lg:flex">
            {STAGES.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex flex-col items-end font-mono text-[10px] uppercase tracking-widest text-cyan-ice/30"
              >
                <span>STAGE.{stage.num}</span>
                <span className="mt-1 text-white-dim/30">
                  {stage.label}.NODE
                </span>
                <span className="mt-1 text-white-dim/20">STATUS / ACTIVE</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
