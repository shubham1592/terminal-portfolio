import { useCallback, useEffect, useState, type ReactNode } from "react";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import TechStackSection from "./TechStackSection";
import ContactSection from "./ContactSection";
import BeyondCodeSection from "./BeyondCodeSection";
import ExperienceSection from "./ExperienceSection";
import Shell from "./Shell";
import Rich from "./Rich";
import { about, education } from "@/data/profile";

type Phosphor = "green" | "amber";

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
  <section id={id} className="py-16 px-4 sm:px-8 max-w-4xl mx-auto scroll-mt-4">
    <h2 className="font-display text-3xl sm:text-4xl text-green-400 mb-8 border-b border-green-900 pb-2">
      <span className="text-green-700">$ </span>
      {cmd}
    </h2>
    {children}
  </section>
);

const Home = () => {
  const [phosphor, setPhosphorState] = useState<Phosphor>(() => (read("phosphor", "green") === "amber" ? "amber" : "green"));
  const [crt, setCrtState] = useState(() => read("crt", "on") !== "off");
  const [shellOpen, setShellOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [clock, setClock] = useState(() => new Date());

  const setPhosphor = useCallback((p: Phosphor) => {
    setPhosphorState(p);
    write("phosphor", p);
  }, []);
  const setCrt = useCallback((on: boolean) => {
    setCrtState(on);
    write("crt", on ? "on" : "off");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.phosphor = phosphor;
    document.documentElement.dataset.crt = crt ? "on" : "off";
  }, [phosphor, crt]);

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

  const goto = useCallback((id: string) => {
    setShellOpen(false);
    // wait a frame so the page is visible again before scrolling
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);
  const closeShell = useCallback(() => setShellOpen(false), []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <main aria-hidden={shellOpen}>
        <section id="hero" className="min-h-screen flex items-center">
          <HeroSection onContactClick={() => goto("contact")} onShellClick={() => setShellOpen(true)} />
        </section>

        <Section id="about" cmd="cat about.txt">
          <div className="space-y-3 text-lg">
            {about.map((p) => (
              <p key={p}>
                <Rich text={p} />
              </p>
            ))}
          </div>
          <h3 className="mt-10 mb-3 text-green-400">
            <span className="text-green-700">$ </span>cat education.log
          </h3>
          <ul className="space-y-2">
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
            Prefer typing? <button onClick={() => setShellOpen(true)} className="underline underline-offset-4 text-green-400">Open the shell</button>
          </p>
        </footer>
      </main>

      {shellOpen && <Shell onClose={closeShell} onGoto={goto} setPhosphor={setPhosphor} setCrt={setCrt} />}

      {/* tmux-style status bar */}
      <nav
        aria-label="Sections"
        className="fixed bottom-0 inset-x-0 z-[65] bg-green-500 text-black text-sm flex items-stretch [text-shadow:none]"
      >
        <span className="px-3 py-1 bg-green-700 text-white shrink-0 hidden lg:block">[shubham]</span>
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
                className={`block px-2 py-1 hover:bg-green-300 ${active === id ? "bg-black text-green-400" : ""}`}
              >
                {i}:{label}
                {active === id ? "*" : ""}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0">
          <button
            onClick={() => setPhosphor(phosphor === "green" ? "amber" : "green")}
            className="px-2 py-1 hover:bg-green-300"
            title="Switch phosphor colour"
          >
            [{phosphor}]
          </button>
          <button onClick={() => setCrt(!crt)} className="px-2 py-1 hover:bg-green-300" title="Toggle scanlines and glow" aria-pressed={crt}>
            [crt:{crt ? "on" : "off"}]
          </button>
          <button
            onClick={() => setShellOpen((o) => !o)}
            className="px-2 py-1 hover:bg-green-300"
            aria-pressed={shellOpen}
          >
            [{shellOpen ? "page" : "shell"}]
          </button>
          <span className="px-3 py-1 bg-green-700 text-white hidden lg:block">
            {clock.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      </nav>

      <div className="crt" aria-hidden="true" />
    </div>
  );
};

export default Home;
