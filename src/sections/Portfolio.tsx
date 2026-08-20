import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import EmberField from "../components/EmberField";
import { projects, techStack } from "../config";
import ScrollPull from "../components/ScrollPull";
import Parallax from "../components/Parallax";

// normalize any name variant ("React.js", "REACT.JS", "react") to one key
function normalizeTechName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const techIconsBySlug: Record<string, string> = {
  html5: "html5",
  css3: "css3",
  javascript: "javascript",
  react: "react",
  reactjs: "react",
  tailwind: "tailwindcss",
  tailwindcss: "tailwindcss",
  nodejs: "nodedotjs",
  firebase: "firebase",
  nextjs: "nextdotjs",
  typescript: "typescript",
  trpc: "trpc",
  prisma: "prisma",
  postgresql: "postgresql",
  chartjs: "chartdotjs",
  php: "php",
  mysql: "mysql",
  laravel: "laravel",
};

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="stripes-move absolute inset-0" />
      <EmberField density={22} className="opacity-60" />
      <div className="scanline" style={{ animationDelay: "5s" }} />
      <Parallax speed={0.45}>
        <span className="font-jp kanji-float pointer-events-none absolute -left-10 bottom-24 select-none text-[14rem] font-black leading-none text-white/[0.03]" style={{ animationDelay: "3s" }}>
          匠
        </span>
      </Parallax>

      <ScrollPull strength={70}>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          {/* header */}
          <Reveal>
            <div className="mb-16 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono2 mb-2 text-[11px] tracking-[0.4em] text-[#c1171c]">
                
                </p>
                <h2 className="font-display text-4xl text-white sm:text-6xl">PORTFOLIO</h2>
              </div>
              <span className="font-jp hidden select-none text-7xl font-black text-white/[0.06] md:block">
                作品集
              </span>
            </div>
          </Reveal>
          <div className="brush-line mb-16" />

          {/* projects — alternating collage layout */}
          <div className="flex flex-col gap-28 md:gap-36">
            {projects.map((p, i) => {
              const reversed = i % 2 === 1;
              return (
                <Reveal key={p.id}>
                  <div
                    className={`flex flex-col gap-10 md:gap-16 ${
                      reversed ? "md:flex-row-reverse" : "md:flex-row"
                    } items-center`}
                  >
                    {/* image collage */}
                    <div className="relative w-full pb-10 pr-8 md:w-1/2">
                      {/* main screenshot */}
                      <div className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border border-white/15 bg-[#0c0c0c]">
                        <img
                          src={`/projects/project-${p.id}-1.jpg`}
                          alt={`${p.title} — main screenshot`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="font-mono2 absolute left-3 top-3 border border-white/20 bg-black/60 px-2 py-1 text-[10px] tracking-[0.3em] text-[#c1171c]">
                          {p.id}
                        </span>
                      </div>

                      {/* secondary screenshot */}
                      <div className="absolute -bottom-2 -right-2 flex aspect-square w-[38%] items-center justify-center overflow-hidden border-4 border-[#070707] bg-[#0c0c0c] shadow-xl">
                        <img
                          src={`/projects/project-${p.id}-2.jpg`}
                          alt={`${p.title} — screenshot 2`}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* tertiary screenshot */}
                      <div className="absolute -left-4 bottom-8 flex aspect-video w-[42%] items-center justify-center overflow-hidden border-4 border-[#070707] bg-[#0c0c0c] shadow-xl">
                        <img
                          src={`/projects/project-${p.id}-3.jpg`}
                          alt={`${p.title} — screenshot 3`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    {/* text side */}
                    <div className="w-full md:w-1/2">
                      <p className="font-mono2 mb-3 flex items-center gap-3 text-[11px] tracking-[0.4em] text-[#c1171c]">
                        <span className="inline-block h-px w-8 bg-[#c1171c]" />
                        {p.id} — {p.year}
                      </p>
                      <h3 className="font-display text-2xl leading-tight text-white sm:text-3xl">
                        {p.title}
                      </h3>

                      <div className="font-mono2 mt-5 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="border border-white/15 px-2.5 py-1 text-[10px] tracking-[0.15em] text-white/60"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-white/55">{p.description}</p>

                      <a
                        
  href={p.link}
  target="_blank"
  rel="noopener noreferrer"
  className="font-mono2 group mt-7 inline-flex items-center gap-3 border border-white/20 px-6 py-3 text-[11px] tracking-[0.3em] text-white/80 transition-colors hover:border-[#c1171c] hover:text-[#c1171c]"
>
  VIEW PROJECT
  <ArrowUpRight
    size={14}
    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
  />
</a>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* tech stack */}
          <Reveal>
            <div className="mt-24 mb-10 flex items-center gap-6">
              <h3 className="font-display text-2xl text-white sm:text-3xl">
                TECH STACK <span className="font-jp text-lg text-[#c1171c]"></span>
              </h3>
              <div className="brush-line flex-1" />
            </div>
          </Reveal>

          <div className="relative">
            <EmberField density={16} className="opacity-50" />
            <div className="scanline" style={{ animationDelay: "1.5s" }} />

            <div className="relative z-10 grid grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-5">
              {techStack.map((t, i) => {
                const iconSlug = techIconsBySlug[normalizeTechName(t.name)];
                return (
                  <Reveal key={t.name} delay={(i % 5) * 60}>
                    <div className="group relative flex flex-col items-center justify-center gap-3 border border-white/12 bg-[#0a0a0a] px-4 py-8 text-center transition-colors hover:border-[#c1171c]/60 hover:bg-[#100c0c]">
                      {/* oni mask — sits behind + slightly outside the icon, always visible */}
                      <img
                        src="/oni-mask.png"
                        alt=""
                        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] transition-opacity duration-500 group-hover:opacity-[0.18]"
                        style={{ imageRendering: "pixelated" }}
                      />

                      {iconSlug && (
                        <img
                          src={`/icons/${iconSlug}.png`}
                          alt={t.name}
                          className="relative z-10 h-12 w-12 transition-transform duration-300 group-hover:scale-110"
                          style={{ imageRendering: "pixelated" }}
                        />
                      )}
                      <span className="font-mono2 relative z-10 text-[11px] tracking-[0.15em] text-white/70 group-hover:text-white">
                        {t.name}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollPull>
    </section>
  );
}