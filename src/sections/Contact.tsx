import { useState, type FormEvent } from "react";
import { Github, Linkedin, Mail, MessageCircle, Send } from "lucide-react";
import Reveal from "../components/Reveal";
import EmberField from "../components/EmberField";
import { site, socials } from "../config";
import ScrollPull from "../components/ScrollPull";
import Parallax from "../components/Parallax";

const socialIcons: Record<string, typeof Mail> = {
  Messenger: MessageCircle,
  Gmail: Mail,
  LinkedIn: Linkedin,
  GitHub: Github,
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  /**
   * Placeholder submit: opens the visitor's mail client addressed to you.
   * To send directly to your Gmail without opening a mail app, wire this
   * up to EmailJS / Formspree / your own backend later.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    "w-full border border-white/15 bg-[#0c0c0c] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#c1171c] focus:outline-none transition-colors";

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10 py-24 md:py-32">
      <div className="dot-bg dot-drift absolute inset-x-0 bottom-0 h-40 opacity-30" />
      <Parallax speed={0.4}>
        <div className="mist-band-red absolute -left-1/4 top-0 h-[45vh] w-[60vw]" />
      </Parallax>
      <EmberField density={26} className="opacity-70" />
      <div className="scanline" style={{ animationDelay: "7s" }} />
      <Parallax speed={0.45}>
        <span className="font-jp kanji-float pointer-events-none absolute -right-6 bottom-16 select-none text-[13rem] font-black leading-none text-white/[0.03]" style={{ animationDelay: "6s" }}>
          絆
        </span>
      </Parallax>

      <ScrollPull strength={70}>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <div className="mb-16 flex items-end justify-between gap-6">
              <div>
                <p className="font-mono2 mb-2 text-[11px] tracking-[0.4em] text-[#c1171c]">
                  
                </p>
                <h2 className="font-display text-4xl text-white sm:text-6xl">CONTACT</h2>
              </div>
              <span className="font-jp hidden select-none text-7xl font-black text-white/[0.06] md:block">
                連絡
              </span>
            </div>
          </Reveal>
          <div className="brush-line mb-16" />

          <div className="grid gap-14 lg:grid-cols-2">
            {/* socials */}
            <div>
              <Reveal>
                <h3 className="font-display mb-3 text-xl tracking-[0.15em] text-white">
                  FIND ME <span className="font-jp text-base text-[#c1171c]"></span>
                </h3>
                <p className="mb-8 text-sm leading-relaxed text-white/55">
                  Have a project in mind, a role to fill, or just want to talk code? Reach me on any
                  of these. I usually reply within a day.
                </p>
              </Reveal>

              <div className="space-y-px border border-white/10 bg-white/10">
                {socials.map((s, i) => {
                  const Icon = socialIcons[s.label] ?? Mail;
                  return (
                    <Reveal key={s.label} delay={i * 80}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between bg-[#0a0a0a] px-5 py-4 transition-colors hover:bg-[#140e0e]"
                      >
                        <span className="flex items-center gap-4">
                          <span className="grid h-10 w-10 place-items-center border border-white/15 text-white/60 transition-colors group-hover:border-[#c1171c] group-hover:text-[#c1171c]">
                            <Icon size={17} />
                          </span>
                          <span>
                            <span className="font-display block text-sm tracking-[0.12em] text-white">
                              {s.label}
                            </span>
                            <span className="font-mono2 text-[11px] text-white/40">{s.handle}</span>
                          </span>
                        </span>
                        <span className="font-jp text-xl text-white/15 transition-colors group-hover:text-[#c1171c]">
                          {s.kanji}
                        </span>
                      </a>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* message form */}
            <Reveal delay={150}>
              <form
                onSubmit={handleSubmit}
                className="border border-white/15 bg-[#0c0c0c] p-6 md:p-8"
              >
                <h3 className="font-display mb-1 text-xl tracking-[0.15em] text-white">
                  SEND A MESSAGE <span className="font-jp text-base text-[#c1171c]"></span>
                </h3>
                <p className="font-mono2 mb-7 text-[10px] tracking-[0.2em] text-white/35">
                  DELIVERED STRAIGHT TO MY INBOX
                </p>

                <div className="mb-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="font-mono2 mb-2 block text-[10px] tracking-[0.3em] text-white/50">
                      YOUR NAME 名前
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Miyamoto Musashi"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="font-mono2 mb-2 block text-[10px] tracking-[0.3em] text-white/50">
                      YOUR EMAIL 返信先
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="mb-7">
                  <label className="font-mono2 mb-2 block text-[10px] tracking-[0.3em] text-white/50">
                    MESSAGE 内容
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project…"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="font-mono2 group flex w-full items-center justify-center gap-3 border border-[#c1171c] bg-[#c1171c] py-4 text-xs tracking-[0.35em] text-white transition-colors hover:bg-transparent hover:text-[#c1171c]"
                >
                  <Send size={14} className="transition-transform group-hover:translate-x-1" />
                  SEND
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </ScrollPull>
    </section>
  );
}