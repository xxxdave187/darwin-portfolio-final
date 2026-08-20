import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "../config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-[#070707]/90 backdrop-blur-md" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#home" className="group flex items-center gap-3">
          <span className="font-jp grid h-9 w-9 place-items-center border border-[#c1171c] bg-[#c1171c]/10 text-lg font-black text-[#c1171c] transition-colors group-hover:bg-[#c1171c] group-hover:text-white">
            侍
          </span>
          <span className="font-display text-sm tracking-[0.3em] text-white">{site.handle}</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-baseline gap-1.5 text-xs tracking-[0.25em] text-white/60 transition-colors hover:text-white"
            >
              <span className="font-jp text-[#c1171c]">{item.kanji}</span>
              <span className="font-mono2">{item.label}</span>
              <span className="block h-px w-0 bg-[#c1171c] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <span className="font-mono2 flex items-center gap-2 border border-white/15 px-3 py-1.5 text-[10px] tracking-[0.2em] text-white/70">
            <span className="animate-soft-pulse h-1.5 w-1.5 rounded-full bg-[#c1171c]" />
            {site.availability}
          </span>
        </nav>

        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-[#070707] px-5 py-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-mono2 flex items-center gap-3 border-b border-white/5 py-3 text-sm tracking-[0.25em] text-white/70"
            >
              <span className="font-jp text-[#c1171c]">{item.kanji}</span>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
