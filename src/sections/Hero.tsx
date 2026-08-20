import { ArrowDown, MapPin } from "lucide-react";
import EmberField from "../components/EmberField";
import Parallax from "../components/Parallax";
import { site } from "../config";

export default function Hero() {
  return (
    <section
      id="home"
      className="noise-veil relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* animated background layers */}
      <div className="grid-bg grid-drift absolute inset-0" />

      <Parallax speed={0.35}>
        <div className="mist-band absolute -left-1/4 top-1/4 h-[45vh] w-[70vw]" />
      </Parallax>
      <Parallax speed={0.55}>
        <div className="mist-band-red absolute -right-1/4 bottom-0 h-[50vh] w-[60vw]" />
      </Parallax>

      <EmberField density={34} />
      <div className="scanline" />

      {/* rising sun (breathing) */}
      <Parallax speed={0.3}>
        <div className="sun-disc absolute -right-32 top-1/2 h-[420px] w-[420px] rounded-full opacity-70 md:h-[560px] md:w-[560px]" />
      </Parallax>

      {/* giant vertical kanji (slowly floating) */}
      <Parallax speed={0.5}>
        <span className="font-jp kanji-float absolute left-2 top-24 select-none text-7xl font-black leading-none text-white/[0.05] [writing-mode:vertical-rl] md:left-10 md:text-9xl">
          武士道
        </span>
      </Parallax>

      {/* corner marks */}
      <div className="font-mono2 absolute left-5 top-20 text-[10px] tracking-[0.3em] text-white/40 md:left-10">
        
      </div>
      <div className="font-mono2 absolute right-5 top-20 text-[10px] tracking-[0.3em] text-white/40 md:right-10">
        {site.location.toUpperCase()}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-24 pt-32 md:px-10">
        <p className="font-mono2 mb-6 flex items-center gap-3 text-xs tracking-[0.35em] text-[#c1171c]">
          <span className="inline-block h-px w-12 bg-[#c1171c]" />

        </p>

        <h1 className="font-display text-5xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">
          {site.name}
          <span className="text-[#c1171c]">.</span>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <h2 className="font-display border-2 border-[#c1171c] bg-[#c1171c]/10 px-4 py-2 text-lg tracking-[0.12em] text-white sm:text-2xl lg:text-3xl">
            {site.role}
          </h2>
          <span className="font-jp text-2xl font-black text-[#c1171c] sm:text-3xl">
            {site.roleKanji}
          </span>
        </div>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#portfolio"
            className="font-mono2 group border border-[#c1171c] bg-[#c1171c] px-7 py-3 text-xs tracking-[0.3em] text-white transition-colors hover:bg-transparent hover:text-[#c1171c]"
          >
            VIEW MY WORK
          </a>
          <a
            href="#contact"
            className="font-mono2 border border-white/25 px-7 py-3 text-xs tracking-[0.3em] text-white/80 transition-colors hover:border-white hover:text-white"
          >
            CONTACT
          </a>
        </div>

        <div className="font-mono2 mt-12 flex items-center gap-2 text-[11px] tracking-[0.25em] text-white/40">
          <MapPin size={12} className="text-[#c1171c]" />
          {site.location.toUpperCase()}
        </div>
      </div>

      {/* scroll cue */}
      <div className="relative z-10 flex justify-center pb-8">
        <a href="#about" className="flex flex-col items-center gap-2 text-white/40 transition-colors hover:text-white">
          <span className="font-mono2 text-[10px] tracking-[0.4em]">SCROLL 下</span>
          <ArrowDown size={16} className="animate-bounce text-[#c1171c]" />
        </a>
      </div>
    </section>
  );
}