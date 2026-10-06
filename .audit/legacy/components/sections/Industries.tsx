import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";
import { INDUSTRIES } from "@/data/site";

export function Industries() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32 lg:py-48">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal>
          <SectionLabel num="07" label="INDUSTRIES" />
        </Reveal>

        <div className="mt-12 max-w-5xl">
          <MaskReveal>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight text-white-frost">
              Technology without
            </h2>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight ice-gradient-cyan">
              industry boundaries.
            </h2>
          </MaskReveal>
        </div>
      </div>

      {/* Horizontal scroll section */}
      <motion.div style={{ x }} className="mt-24 flex gap-6 px-6 lg:px-12">
        {INDUSTRIES.map((industry, i) => (
          <div
            key={i}
            className="group relative h-[420px] w-[80vw] flex-shrink-0 overflow-hidden sm:w-[60vw] lg:w-[40vw]"
            data-cursor="explore"
          >
            <img
              src={industry.image}
              alt={industry.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ice-black via-ice-black/50 to-transparent" />
            <div className="absolute inset-0 bg-cyan-deep/10 transition-opacity duration-500 group-hover:opacity-0" />

            {/* Number */}
            <div className="absolute left-6 top-6 font-mono text-xs font-medium tracking-widest text-cyan-glow">
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white-frost lg:text-5xl">
                {industry.name}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white-dim">
                {industry.description}
              </p>
            </div>

            {/* Animated border */}
            <div className="pointer-events-none absolute inset-0 border border-cyan-ice/0 transition-all duration-500 group-hover:border-cyan-ice/20" />
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <div className="mt-12 px-6 lg:px-12">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-cyan-ice/30">
          <span className="h-px w-12 bg-cyan-ice/20" />
          SCROLL TO EXPLORE / {INDUSTRIES.length} SECTORS
        </div>
      </div>
    </section>
  );
}
