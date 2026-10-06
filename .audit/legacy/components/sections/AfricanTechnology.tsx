import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";
import { IMAGES } from "@/data/site";

const COORDS = [
  { label: "JOHANNESBURG", lat: "26.2041° S", lon: "28.0473° E" },
  { label: "CAPE TOWN", lat: "33.9249° S", lon: "18.4241° E" },
  { label: "NAIROBI", lat: "01.2921° S", lon: "36.8219° E" },
  { label: "LAGOS", lat: "06.5244° N", lon: "03.3792° E" },
];

export function AfricanTechnology() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section ref={ref} className="relative z-10 overflow-hidden py-32 lg:py-48">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal>
          <SectionLabel num="09" label="AFRICAN TECHNOLOGY" />
        </Reveal>

        <div className="mt-12 max-w-6xl">
          <MaskReveal>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight text-white-frost">
              Built in Africa.
            </h2>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight ice-gradient-cyan">
              Engineered for scale.
            </h2>
          </MaskReveal>
        </div>

        {/* Image with parallax */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="relative col-span-2 h-[500px] overflow-hidden lg:h-[600px]">
            <motion.img
              style={{ y: imgY, scale: imgScale }}
              src={IMAGES.devAfrican}
              alt="African developer engineering technology"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ice-black via-ice-black/20 to-transparent" />
            <div className="absolute inset-0 bg-cyan-deep/10" />

            {/* Coordinate label */}
            <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-cyan-glow">
              ICE.HQ / {COORDS[0].lat} / {COORDS[0].lon}
            </div>
            <div className="absolute right-6 top-6 font-mono text-[10px] uppercase tracking-widest text-white-frost/40">
              [ICE/09] / AFRICA.NODE.01
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-between gap-8">
            <Reveal>
              <p className="text-lg leading-relaxed text-white-dim">
                ICE is an African-owned technology organisation building
                world-class systems from the continent. We combine deep
                technical expertise with an understanding of the African context
                — engineering solutions that are relevant, resilient and
                scalable.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base leading-relaxed text-white-dim/70">
                Our teams work across government and enterprise, delivering
                technology that meets international standards while serving
                local needs. We are proof that world-class engineering is built
                in Africa.
              </p>
            </Reveal>

            {/* Coordinates grid */}
            <Reveal delay={0.3}>
              <div className="ice-border ice-glass p-6">
                <div className="mb-4 font-mono text-[10px] uppercase tracking-widest text-cyan-ice/50">
                  AFRICAN NODES / COORDINATES
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {COORDS.map((coord, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="border-l border-cyan-ice/15 pl-3"
                    >
                      <div className="font-mono text-[10px] font-medium uppercase tracking-widest text-white-frost">
                        {coord.label}
                      </div>
                      <div className="mt-1 font-mono text-[9px] tracking-widest text-cyan-ice/40">
                        {coord.lat}
                      </div>
                      <div className="font-mono text-[9px] tracking-widest text-cyan-ice/40">
                        {coord.lon}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
