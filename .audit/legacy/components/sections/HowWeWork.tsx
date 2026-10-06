import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";
import { PROCESS_STEPS } from "@/data/site";

export function HowWeWork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative z-10">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Heading */}
        <div className="py-32 lg:py-48">
          <Reveal>
            <SectionLabel num="04" label="HOW ICE WORKS" />
          </Reveal>
          <div className="mt-12 max-w-5xl">
            <MaskReveal>
              <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight text-white-frost">
                How we solve
              </h2>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight ice-gradient-cyan">
                complex problems.
              </h2>
            </MaskReveal>
          </div>
        </div>

        {/* Sticky storytelling */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left sticky */}
          <div className="lg:sticky lg:top-32 lg:h-screen lg:flex lg:flex-col lg:justify-center">
            <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-ice/40">
              ICE / METHODOLOGY
            </div>
            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-white-dim/40">
              5 PHASES / END-TO-END DELIVERY
            </div>
            <div className="mt-12 space-y-4">
              <div className="font-display text-7xl font-bold uppercase leading-none tracking-tighter text-white-frost/[0.03] sm:text-8xl">
                PROCESS
              </div>
              <div className="font-display text-7xl font-bold uppercase leading-none tracking-tighter text-white-frost/[0.03] sm:text-8xl">
                PIPELINE
              </div>
            </div>
            {/* Animated connecting line */}
            <div className="mt-12 h-32 w-px bg-gradient-to-b from-cyan-ice/40 to-transparent" />
            <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-cyan-ice/30">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-electric" />
              <span className="ml-2">FLOW ACTIVE</span>
            </div>
          </div>

          {/* Right scrolling content */}
          <div className="relative pb-32">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-cyan-ice/10 lg:left-0">
              <motion.div
                style={{ height: lineHeight }}
                className="absolute left-0 top-0 w-px bg-gradient-to-b from-cyan-ice to-cyan-deep"
              />
            </div>

            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative mb-24 pl-16 lg:pl-20"
              >
                {/* Node */}
                <div className="absolute left-0 top-2 hidden lg:block">
                  <div className="h-8 w-8 border border-cyan-ice/30 bg-ice-black" />
                  <div className="absolute left-1.5 top-1.5 h-5 w-5 border border-cyan-ice/20" />
                </div>
                {/* Mobile node */}
                <div className="absolute left-0 top-2 h-6 w-6 border border-cyan-ice/30 bg-ice-black lg:hidden">
                  <div className="absolute left-1 top-1 h-4 w-4 border border-cyan-ice/20" />
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm font-medium tracking-widest text-cyan-ice">
                    {step.num}
                  </span>
                  <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white-frost sm:text-5xl lg:text-6xl">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-6 max-w-md text-base leading-relaxed text-white-dim">
                  {step.description}
                </p>
                <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-cyan-ice/30">
                  PHASE.{step.num} / ICE.METHOD
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
