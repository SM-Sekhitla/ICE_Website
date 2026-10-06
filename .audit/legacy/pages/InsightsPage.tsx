import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Reveal,
  MaskReveal,
  Stagger,
  StaggerItem,
} from "@/components/animations/Reveal";
import { INSIGHTS } from "@/data/site";

const CATEGORIES = [
  "ENGINEERING",
  "DATA",
  "AI",
  "INFRASTRUCTURE",
  "RESEARCH",
  "DIGITAL TRANSFORMATION",
];

export function InsightsPage() {
  const featured = INSIGHTS[0];
  const rest = INSIGHTS.slice(1);

  return (
    <div className="relative z-10 pt-32">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <SectionLabel num="00" label="INSIGHTS" />
          </Reveal>
          <div className="mt-12 max-w-6xl">
            <MaskReveal>
              <h1 className="font-display text-display font-bold uppercase leading-[0.9] tracking-tighter text-white-frost">
                Technology
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h1 className="font-display text-display font-bold uppercase leading-[0.9] tracking-tighter ice-gradient-text">
                in print.
              </h1>
            </MaskReveal>
          </div>
          <Reveal delay={0.3} className="mt-12 max-w-2xl">
            <p className="text-lg leading-relaxed text-white-dim">
              Engineering, data, AI and infrastructure — explored by the people
              who build the systems. A technology publication from ICE.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-cyan-ice/10 py-6">
        <div className="mx-auto flex max-w-[1600px] items-center gap-1 overflow-x-auto px-6 hide-scrollbar lg:px-12">
          <span className="mr-4 flex-shrink-0 font-mono text-[10px] uppercase tracking-widest text-cyan-ice/40">
            CATEGORIES /
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className="flex-shrink-0 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white-dim/50 transition-colors hover:text-cyan-glow"
              data-cursor="hover"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured article */}
      <section className="py-20 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <div
              className="group relative cursor-pointer overflow-hidden"
              data-cursor="explore"
            >
              <div className="grid grid-cols-1 gap-0 lg:grid-cols-2">
                <div className="relative h-[300px] overflow-hidden lg:h-[500px]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ice-black/40 to-transparent" />
                </div>
                <div className="flex flex-col justify-center bg-ice-graphite p-8 lg:p-16">
                  <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-cyan-ice">
                    <span>{featured.num}</span>
                    <span className="h-px w-8 bg-cyan-ice/30" />
                    <span>{featured.category}</span>
                    <span className="text-white-dim/30">
                      / {featured.date} / {featured.readTime}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white-frost transition-colors group-hover:text-cyan-glow lg:text-5xl">
                    {featured.title}
                  </h2>
                  <p className="mt-6 max-w-md text-base leading-relaxed text-white-dim">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8">
                    <span className="group/link inline-flex items-center font-mono text-xs uppercase tracking-widest text-cyan-glow">
                      Read Article
                      <span className="ml-3 h-px w-8 bg-cyan-ice transition-all duration-300 group-hover/link:w-16" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 border border-cyan-ice/0 transition-all duration-500 group-hover:border-cyan-ice/20" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Article grid */}
      <section className="pb-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Stagger
            stagger={0.1}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {rest.map((article) => (
              <StaggerItem key={article.num}>
                <div className="group cursor-pointer" data-cursor="explore">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ice-black via-ice-black/20 to-transparent" />
                    <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-widest text-cyan-glow">
                      {article.category}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-white-dim/40">
                      {article.num} / {article.date} / {article.readTime}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-tight text-white-frost transition-colors group-hover:text-cyan-glow">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white-dim">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
