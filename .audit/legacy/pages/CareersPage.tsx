import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Reveal,
  MaskReveal,
  Stagger,
  StaggerItem,
} from "@/components/animations/Reveal";
import { AnimatedButton } from "@/components/ui/TextLink";
import { IMAGES, CAREERS } from "@/data/site";

const LIFE_SECTIONS = [
  {
    num: "01",
    label: "LIFE AT ICE",
    title: "Engineering culture.",
    description:
      "We build in the open. We share knowledge. We take ownership. ICE is a place where engineers grow, innovate and deliver work that matters.",
  },
  {
    num: "02",
    label: "GRADUATE PROGRAMMES",
    title: "Start here.",
    description:
      "Our graduate programme gives young African technology professionals real projects, real mentorship and real responsibility from day one.",
  },
  {
    num: "03",
    label: "LEARNING",
    title: "Always learning.",
    description:
      "Technology moves fast. We move with it. Continuous learning is built into how we work — not an afterthought.",
  },
  {
    num: "04",
    label: "INNOVATION CULTURE",
    title: "Build what is next.",
    description:
      "We experiment. We prototype. We ship. Innovation is not a department — it is how every engineer at ICE approaches their craft.",
  },
];

export function CareersPage() {
  return (
    <div className="relative z-10 pt-32">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.devTeam}
            alt=""
            className="h-full w-full object-cover opacity-20"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ice-black/70 via-ice-black/80 to-ice-black" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <SectionLabel num="00" label="CAREERS" />
          </Reveal>
          <div className="mt-12 max-w-6xl">
            <MaskReveal>
              <h1 className="font-display text-display font-bold uppercase leading-[0.9] tracking-tighter text-white-frost">
                Build
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.1}>
              <h1 className="font-display text-display font-bold uppercase leading-[0.9] tracking-tighter ice-gradient-text">
                what matters.
              </h1>
            </MaskReveal>
          </div>
          <Reveal delay={0.3} className="mt-12 max-w-2xl">
            <p className="text-lg leading-relaxed text-white-dim">
              ICE is a place for engineers, developers, analysts, architects,
              graduates and innovators. If you want to build technology that
              shapes how organisations operate, this is where you belong.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Life at ICE sections */}
      {LIFE_SECTIONS.map((s, i) => (
        <section
          key={i}
          className={`py-24 lg:py-32 ${i % 2 === 1 ? "bg-ice-void/50" : ""}`}
        >
          <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <Reveal>
                  <SectionLabel num={s.num} label={s.label} />
                </Reveal>
                <MaskReveal className="mt-8">
                  <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight text-white-frost lg:text-6xl">
                    {s.title}
                  </h2>
                </MaskReveal>
              </div>
              <Reveal delay={0.2} className="flex items-center">
                <p className="text-lg leading-relaxed text-white-dim">
                  {s.description}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* African technology professionals section */}
      <section className="relative overflow-hidden py-32 lg:py-48">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="relative h-[400px] overflow-hidden lg:h-[500px]">
              <img
                src={IMAGES.devAfrican}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ice-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-cyan-glow">
                ICE.YOUNG.INNOVATORS / AFRICA
              </div>
            </div>
            <div>
              <Reveal>
                <SectionLabel num="05" label="YOUNG AFRICAN TALENT" />
              </Reveal>
              <MaskReveal className="mt-8">
                <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight text-white-frost lg:text-5xl">
                  The next
                  <br />
                  <span className="ice-gradient-cyan">generation.</span>
                </h2>
              </MaskReveal>
              <Reveal
                delay={0.2}
                className="mt-8 space-y-4 text-base leading-relaxed text-white-dim"
              >
                <p>
                  We are committed to developing young African technology
                  professionals. Our graduate programmes and mentorship
                  initiatives are designed to give emerging engineers,
                  developers and analysts the foundation they need to build
                  world-class careers.
                </p>
                <p>
                  If you are young, ambitious and technically curious — ICE is
                  where you can become the engineer you are meant to be.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-32 lg:py-48 border-t border-cyan-ice/10">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
          <Reveal>
            <SectionLabel num="06" label="OPEN OPPORTUNITIES" />
          </Reveal>
          <MaskReveal className="mt-8">
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight text-white-frost">
              Open
              <span className="ice-gradient-cyan"> positions.</span>
            </h2>
          </MaskReveal>

          <Stagger stagger={0.08} className="mt-16 border-t border-cyan-ice/10">
            {CAREERS.map((job) => (
              <StaggerItem key={job.title}>
                <div
                  className="group flex flex-col gap-4 border-b border-cyan-ice/10 py-6 transition-colors hover:bg-cyan-ice/5 sm:flex-row sm:items-center sm:justify-between sm:py-8"
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-ice/40">
                      {job.dept}
                    </span>
                    <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white-frost transition-colors group-hover:text-cyan-glow sm:text-2xl">
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-white-dim/50">
                    <span>{job.type}</span>
                    <span>{job.location}</span>
                    <span className="text-cyan-ice transition-all duration-300 group-hover:tracking-widest">
                      APPLY →
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.3} className="mt-16 text-center">
            <p className="mb-8 text-white-dim">
              Do not see your role? We are always looking for exceptional
              talent.
            </p>
            <AnimatedButton href="/contact">
              Start a Conversation
            </AnimatedButton>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
