import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Reveal,
  MaskReveal,
  Stagger,
  StaggerItem,
} from "@/components/animations/Reveal";
import { PROJECTS } from "@/data/site";

export function SelectedWork() {
  return (
    <section className="relative z-10 py-32 lg:py-48">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal>
          <SectionLabel num="06" label="SELECTED WORK" />
        </Reveal>

        <div className="mt-12 max-w-5xl">
          <MaskReveal>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight text-white-frost">
              Engineered for
            </h2>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight ice-gradient-cyan">
              real-world impact.
            </h2>
          </MaskReveal>
        </div>

        {/* Project grid */}
        <Stagger
          stagger={0.15}
          className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {PROJECTS.map((project) => (
            <StaggerItem key={project.num}>
              <div
                className="group relative cursor-pointer overflow-hidden"
                data-cursor="view"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ice-black via-ice-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-cyan-deep/10 transition-opacity duration-500 group-hover:opacity-0" />

                  {/* Project number */}
                  <div className="absolute left-5 top-5 font-mono text-xs font-medium tracking-widest text-cyan-glow">
                    {project.num}
                  </div>

                  {/* Category */}
                  <div className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-widest text-white-frost/60">
                    {project.category}
                  </div>
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-ice/60">
                    {project.client} / {project.year}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white-frost transition-colors group-hover:text-cyan-glow sm:text-3xl">
                    {project.title}
                  </h3>
                  <div className="mt-3 overflow-hidden">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      className="font-mono text-[10px] uppercase tracking-widest text-white-dim/60"
                    >
                      {project.technology}
                    </motion.div>
                  </div>
                </div>

                {/* Animated border on hover */}
                <div className="pointer-events-none absolute inset-0 border border-cyan-ice/0 transition-all duration-500 group-hover:border-cyan-ice/30" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* View all link */}
        <Reveal delay={0.3} className="mt-16">
          <a
            href="/projects"
            className="group inline-flex items-center font-mono text-xs uppercase tracking-widest text-cyan-glow transition-colors hover:text-white-frost"
            data-cursor="hover"
          >
            View All Projects
            <span className="ml-3 h-px w-8 bg-cyan-ice transition-all duration-300 group-hover:w-16" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
