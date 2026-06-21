import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n, type Lang } from "@/i18n";
import logo from "@/assets/logo.svg";

const NAV: Array<{ to: string; key: keyof ReturnType<typeof useI18n>["t"]["nav"] }> = [
  { to: "/band", key: "band" },
  { to: "/music", key: "music" },
  { to: "/shows", key: "shows" },
  { to: "/videos", key: "videos" },
  { to: "/gallery", key: "gallery" },
  { to: "/press", key: "press" },
  { to: "/contact", key: "contact" },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper/15 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Napalm Cobras" width={44} height={44} className="invert" />
          <span className="font-display text-2xl tracking-wide text-paper">NAPALM COBRAS</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2 font-mono text-xs uppercase tracking-widest text-paper/80 transition-colors hover:text-blood"
              activeProps={{ className: "px-3 py-2 font-mono text-xs uppercase tracking-widest text-blood" }}
            >
              {t.nav[item.key]}
            </Link>
          ))}
          <LangSwitch lang={lang} setLang={setLang} />
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer p-2 text-paper lg:hidden"
          aria-label="menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-paper/15 lg:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-paper/10 py-3 font-display text-2xl uppercase text-paper hover:text-blood"
                >
                  {t.nav[item.key]}
                </Link>
              ))}
              <div className="pt-4">
                <LangSwitch lang={lang} setLang={setLang} />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const langs: Lang[] = ["pt", "en", "es"];
  return (
    <div className="ml-2 flex gap-1 border border-paper/20 p-0.5">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`cursor-pointer px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
            lang === l ? "bg-blood text-paper" : "text-paper/60 hover:text-paper"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
