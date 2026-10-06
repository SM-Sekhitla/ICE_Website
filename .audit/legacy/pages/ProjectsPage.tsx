import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";
import { PROJECTS, PROJECT_FILTERS } from "@/data/site";

export function ProjectsPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="relative z-10 pt-32">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <SectionLabel num="00" label="PROJECTS" />
          </Reveal>
          <div className="mt-12 max-w-6xl">
            <MaskReveal>
              <h1 className="font-display text-display font-bold uppercase leading-[0.9] tracking-tighter text-white-frost">
                Selected
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h1 className="font-display text-display font-bold uppercase leading-[0.9] tracking-tighter ice-gradient-text">
                work.
              </h1>
            </MaskReveal>
          </div>
          <Reveal delay={0.3} className="mt-12 max-w-2xl">
            <p className="text-lg leading-relaxed text-white-dim">
              A portfolio of technology engineered for real-world impact across
              government, enterprise and infrastructure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 ice-glass border-y border-cyan-ice/10 py-4">
        <div className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-6 hide-scrollbar lg:px-12">
          <span className="mr-4 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-cyan-ice/40">
            FILTER /
          </span>
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                filter === f
                  ? "text-cyan-glow"
                  : "text-white-dim/50 hover:text-white-frost"
              }`}
              data-cursor="hover"
            >
              {f}
              {filter === f && (
                <motion.span
                  layoutId="filter-active"
                  className="absolute mt-1 h-px w-full bg-cyan-ice"
                />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  className="group relative cursor-pointer overflow-hidden"
                  data-cursor="view"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ice-black via-ice-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-cyan-deep/10 transition-opacity duration-500 group-hover:opacity-0" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-cyan-ice/60">
                      {project.num} / {project.client}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white-frost transition-colors group-hover:text-cyan-glow">
                      {project.title}
                    </h3>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-white-dim/50">
                      {project.technology} / {project.year}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 border border-cyan-ice/0 transition-all duration-500 group-hover:border-cyan-ice/30" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
