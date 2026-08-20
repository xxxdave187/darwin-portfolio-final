import { Download } from "lucide-react";
import Reveal from "../components/Reveal";
import { about, site } from "../config";
import ScrollPull from "../components/ScrollPull";
import Parallax from "../components/Parallax";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      {/* base layer: dimmed background gif */}
      <img
        src="/cherry-blossom.gif"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-05 brightness-[.45] saturate-[.7]"
      />
      {/* dark veil so text stays readable */}
      <div className="absolute inset-0 bg-[#070707]/80" />
      {/* highlight layer: same gif, blended so only bright blossoms pop */}
      <img
        src="/cherry-blossom.gif"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen saturate-150 contrast-125"
      />

      <div className="dot-bg dot-drift absolute inset-x-0 top-0 h-40 opacity-30" />
      <Parallax speed={0.35}>
        <div className="mist-band absolute -left-1/4 top-10 h-[40vh] w-[60vw]" />
      </Parallax>
      <Parallax speed={0.55}>
        <div className="mist-band-red absolute -right-1/4 bottom-0 h-[45vh] w-[55vw]" />
      </Parallax>
      <div className="scanline" style={{ animationDelay: "2.5s" }} />
      <Parallax speed={0.45}>
        <span className="font-jp kanji-float pointer-events-none absolute -right-8 top-24 select-none text-[14rem] font-black leading-none text-white/[0.03]">
          道
        </span>
      </Parallax>

      <ScrollPull strength={70}>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          {/* section header */}
          <Reveal>
            <div className="mb-16 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono2 mb-2 text-[11px] tracking-[0.4em] text-[#c1171c]">
                   {about.kanji}
                </p>
                <h2 className="font-display text-4xl text-white sm:text-6xl">
                  {about.heading}
                </h2>
              </div>
              <span className="font-jp hidden select-none text-7xl font-black text-white/[0.06] md:block">
                {about.kanji}
              </span>
            </div>
          </Reveal>
          <div className="brush-line mb-16" />

          <div className="grid gap-14 lg:grid-cols-5">
            {/* portrait placeholder */}
            <Reveal className="lg:col-span-2">
              <div className="relative border border-white/15 bg-[#0c0c0c] p-2">
                <div className="grid-bg relative flex aspect-[3/4] items-center justify-center overflow-hidden border border-white/10 bg-[#0c0c0c]">
                  {/* lantern background, sits behind the photo */}
                  <img
                    src="/lantern-bg.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* dark veil so the photo stays the clear focal point */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* your transparent photo cutout, on top */}
                  <img
                    src="/my-photo.png"
                    alt="Darwin Consigo"
                    className="relative z-10 h-full w-full object-contain object-bottom"
                  />
                </div>
                <div className="flex items-center justify-between px-2 py-3">
                  <span className="font-mono2 text-[10px] tracking-[0.3em] text-white/50">
                    {site.name}
                  </span>
                  <span className="font-jp text-sm text-[#c1171c]">開発者</span>
                </div>
              </div>
            </Reveal>

            {/* bio + stats + resume */}
            <div className="lg:col-span-3">
              <Reveal delay={100}>
                <h3 className="font-display mb-6 text-xl tracking-[0.15em] text-white sm:text-2xl">
                  THE WAY OF THE <span className="text-[#c1171c]">CODE</span>
                  <span className="font-jp ml-3 text-base text-white/40">コードの道</span>
                </h3>
                {about.bio.map((p, i) => (
                  <p key={i} className="mb-5 leading-relaxed text-white/60">
                    {p}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-10 grid grid-cols-3 divide-x divide-white/10 border border-white/10">
                  {about.stats.map((s) => (
                    <div key={s.label} className="px-4 py-6 text-center">
                      <p className="font-display text-3xl text-[#c1171c] sm:text-4xl">{s.value}</p>
                      <p className="font-mono2 mt-2 text-[9px] tracking-[0.25em] text-white/50 sm:text-[10px]">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={300}>
                <a
                  href={about.resumeFile}
                  download
                  className="font-mono2 group mt-10 inline-flex items-center gap-3 border border-[#c1171c] bg-[#c1171c] px-8 py-4 text-xs tracking-[0.3em] text-white transition-colors hover:bg-transparent hover:text-[#c1171c]"
                >
                  <Download size={15} className="transition-transform group-hover:translate-y-0.5" />
                  DOWNLOAD RESUME
                </a>
                <p className="font-mono2 mt-3 text-[10px] tracking-[0.2em] text-white/35">
                  
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </ScrollPull>
    </section>
  );
}