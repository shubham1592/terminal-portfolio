import { useCallback, useEffect, useState, type ReactNode } from "react";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import TechStackSection from "./TechStackSection";
import ContactSection from "./ContactSection";
import BeyondCodeSection from "./BeyondCodeSection";
import ExperienceSection from "./ExperienceSection";
import Shell from "./Shell";
import CrtWarp from "./CrtWarp";
import Beam from "./Beam";
import Rich from "./Rich";
import { about, education } from "@/data/profile";

const DESKTOP = "(min-width: 768px) and (pointer: fine)";

// Remembered per visitor; falls back to defaults when storage is blocked.
const read = (k: string, d: string) => {
  try {
    return localStorage.getItem(k) ?? d;
  } catch {
    return d;
  }
};
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
};

// The green/amber theme toggle was removed; drop the preference it used to store.
try {
  localStorage.removeItem("phosphor");
} catch {
  /* storage blocked */
}

const NAV = [
  { id: "hero", label: "home" },
  { id: "about", label: "about" },
  { id: "experience", label: "work" },
  { id: "projects", label: "projects" },
  { id: "stack", label: "stack" },
  { id: "beyond", label: "beyond" },
  { id: "contact", label: "contact" },
];

const Section = ({ id, cmd, children }: { id: string; cmd: string; children: ReactNode }) => (
  <section id={id} className="wrap py-16 scroll-mt-4">
    <h2 className="accent font-display text-3xl sm:text-4xl mb-8 border-b border-green-900 pb-2">
      <span className="opacity-60">$ </span>
      {cmd}
    </h2>
    {children}
  </section>
);

const Home = () => {
  const [crt, setCrtState] = useState(() => read("crt", "on") !== "off");
  const [shellOpen, setShellOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [clock, setClock] = useState(() => new Date());
  // Warp only on desktop pointers: on phones it costs battery and shrinks already-small text.
  const [desktop, setDesktop] = useState(() => window.matchMedia(DESKTOP).matches);
  const warp = crt && desktop;

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const on = () => setDesktop(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const setCrt = useCallback((on: boolean) => {
    setCrtState(on);
    write("crt", on ? "on" : "off");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.crt = crt ? "on" : "off";
  }, [crt]);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Highlight the section in view, like tmux marks the active window.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // On narrow screens the tab list scrolls sideways; keep the active tab visible.
  useEffect(() => {
    document.querySelector(".statusbar [aria-current]")?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  const goto = useCallback((id: string) => {
    setShellOpen(false);
    // wait a frame so the page is visible again before scrolling
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);
  const closeShell = useCallback(() => setShellOpen(false), []);

  return (
    // Full-bleed CRT: the warped screen holds the page and the shell; the status bar and
    // overlays sit outside the warp so the bar's click targets line up exactly with what you see.
    <div className="crt-root">
      <div className={`screen text-white ${warp ? "warp" : ""}`}>
      <div className="screen-scroll">
      <main aria-hidden={shellOpen}>
        <section id="hero" className="min-h-[100dvh] flex items-center">
          <HeroSection onContactClick={() => goto("contact")} onShellClick={() => setShellOpen(true)} />
        </section>

        <Section id="about" cmd="cat about.txt">
          <div className="measure space-y-3 text-lg">
            {about.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <h3 className="accent subhead mt-10">
            <span className="opacity-60">$ </span>cat education.log
          </h3>
          <ul className="measure space-y-2">
            {education.map((e) => (
              <li key={e.degree}>
                <span className="text-white">{e.degree}</span>
                <span className="text-gray-400">, {e.school}</span>
                <span className="text-green-700"> // {e.date}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" cmd="history | grep work">
          <ExperienceSection />
        </Section>

        <Section id="projects" cmd="ls -la ~/projects">
          <ProjectsSection />
        </Section>

        <Section id="stack" cmd="lsmod | grep skills">
          <TechStackSection />
        </Section>

        <Section id="beyond" cmd="cat /proc/life">
          <BeyondCodeSection />
        </Section>

        <Section id="contact" cmd="mail shubham">
          <ContactSection />
        </Section>

        <footer className="py-8 pb-16 px-4 text-center text-sm text-gray-400 border-t border-green-900">
          <p>© {new Date().getFullYear()} Shubham Kumar</p>
          <p className="mt-1">
            Prefer typing? <button onClick={() => setShellOpen(true)} className="inline-block py-3 underline underline-offset-4 text-green-400 hover:text-status">Open the shell</button>
          </p>
        </footer>
      </main>
      </div>

      {shellOpen && <Shell onClose={closeShell} onGoto={goto} setCrt={setCrt} />}
      </div>

      {/* tmux-style status bar */}
      <nav aria-label="Sections" className="statusbar">
        <span className="sb-label shrink-0 hidden lg:block">[shubham]</span>
        <ul className="flex overflow-x-auto flex-1 min-w-0 [scrollbar-width:none]">
          {NAV.map(({ id, label }, i) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goto(id);
                }}
                aria-current={active === id ? "location" : undefined}
                className="sb-item"
              >
                {i}:{label}
                {active === id ? "*" : ""}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0">
          <button onClick={() => setCrt(!crt)} className="sb-item" title="Toggle CRT effects" aria-pressed={crt}>
            [crt<span className="hidden sm:inline">:{crt ? "on" : "off"}</span>]
          </button>
          <button
            onClick={() => setShellOpen((o) => !o)}
            className="sb-item"
            aria-pressed={shellOpen}
          >
            [{shellOpen ? "page" : "shell"}]
          </button>
          <span className="sb-label sb-clock hidden lg:block">
            {clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </nav>

      <div className="crt" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Beam />
      <CrtWarp enabled={warp} />
    </div>
  );
};

export default Home;
