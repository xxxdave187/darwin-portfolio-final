import { ArrowUp } from "lucide-react";
import { nav, site } from "../config";
import ScrollPull from "../components/ScrollPull";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      <ScrollPull strength={40}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 py-12 md:flex-row md:px-10">
          <div className="flex items-center gap-3">
            <span className="font-jp grid h-9 w-9 place-items-center border border-[#c1171c] bg-[#c1171c]/10 text-lg font-black text-[#c1171c]">
              侍
            </span>
            <div>
              <p className="font-display text-sm tracking-[0.3em] text-white">{site.handle}</p>
              <p className="font-mono2 text-[10px] tracking-[0.2em] text-white/40">
                {site.name} — {site.role}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-mono2 text-[11px] tracking-[0.25em] text-white/50 transition-colors hover:text-[#c1171c]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#home"
            className="group flex items-center gap-2 border border-white/15 px-4 py-2 transition-colors hover:border-[#c1171c]"
            aria-label="Back to top"
          >
            <span className="font-mono2 text-[10px] tracking-[0.3em] text-white/60 group-hover:text-white">
              TOP 上
            </span>
            <ArrowUp size={14} className="text-[#c1171c] transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </ScrollPull>

      <p className="font-mono2 border-t border-white/10 py-4 text-center text-[10px] tracking-[0.25em] text-white/30">
        © {new Date().getFullYear()} {site.name} — CRAFTED WITH DISCIPLINE 一期一会
      </p>
    </footer>
  );
}