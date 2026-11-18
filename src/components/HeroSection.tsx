import { useEffect, useState, type ReactNode } from "react";
import { Download, Send, TerminalSquare } from "lucide-react";
import { hero, links, projects } from "@/data/profile";

interface HeroSectionProps {
  onContactClick: () => void;
  onShellClick: () => void;
}

const host = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

type Boot = { label: string; status?: string; dim?: boolean };

// Every line is real: education, jobs, links, resume, project count.
const BOOT: Boot[] = [
  { label: "Probing education: vit_btech", status: "OK" },
  { label: "Loading module bajaj_finance.ko", status: "OK" },
  { label: "Loading module northeastern_mscs.ko", status: "ONLINE" },
  { label: "Loading module lg_es_vertech.ko", status: "ONLINE" },
  { label: `net0  ${host(links.github)}`, status: "LINK", dim: true },
  { label: `net1  ${host(links.linkedin)}`, status: "LINK", dim: true },
  { label: "dev0  /dev/resume", status: "READY", dim: true },
  { label: `proj  ${projects.length} projects indexed`, status: "OK", dim: true },
  { label: "Mounting /home/shubham → ROOT:", status: "OK" },
  { label: "Starting portfolio.service", status: "OK" },
];

const STATUS: Boot[] = [
  { label: "mount /dev/resume", status: "READY" },
  { label: `index ~/projects (${projects.length})`, status: "OK" },
  { label: "uplink github, linkedin", status: "LINK" },
];

const Line = ({ label, status, dim }: Boot) => (
  <p className={`flex ${dim ? "text-gray-400" : "text-white"}`}>
    <span className="whitespace-pre truncate">{label}</span>
    <span className="leader" aria-hidden="true" />
    <span className="text-status shrink-0">{status}</span>
  </p>
);

const Header = ({ children }: { children: ReactNode }) => (
  <div className="mb-5">
    <p className="text-green-400">
      SHUBHAM-OS <span className="text-white">v2026.11</span>
      <span className="text-gray-400">{"   "}(c) Shubham Kumar</span>
    </p>
    <p className="text-gray-400">{children}</p>
  </div>
);

const BOOT_KEY = "booted";

const alreadyBooted = () => {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
};

const HeroSection = ({ onContactClick, onShellClick }: HeroSectionProps) => {
  const [shown, setShown] = useState(() => (alreadyBooted() ? BOOT.length + 1 : 0));
  const booted = shown > BOOT.length; // one extra tick to show "SYSTEM READY"

  useEffect(() => {
    if (booted) {
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        /* storage blocked: boot plays again next visit, harmless */
      }
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 400 : shown === BOOT.length ? 700 : 140);
    return () => clearTimeout(t);
  }, [shown, booted]);

  // Any key or click skips the boot log.
  useEffect(() => {
    if (booted) return;
    const skip = () => setShown(BOOT.length + 1);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [booted]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 py-16">
      {!booted ? (
        <div className="text-sm sm:text-base max-w-2xl" aria-live="polite">
          <Header>Boston node{"   "}tty1{"   "}Northeastern University</Header>
          {BOOT.slice(0, shown).map((b) => (
            <Line key={b.label} {...b} />
          ))}
          {shown >= BOOT.length && (
            <p className="mt-5">
              <span className="text-green-400">SYSTEM READY</span>{" "}
              <span className="text-green-300">guest session.</span>
            </p>
          )}
          <p className="pt-6 text-gray-400 text-sm">press any key to skip</p>
        </div>
      ) : (
        <div>
          <p className="text-gray-400 text-sm sm:text-base">
            shubham-os login: <span className="text-white">guest</span>
          </p>
          <p className="text-gray-400 text-sm sm:text-base mb-6">Last login: just now on tty1</p>

          <h1 className="font-display text-green-400 leading-none text-[clamp(3.5rem,13vw,8.5rem)]">
            {hero.name}
          </h1>

          <div className="mt-6 space-y-1 text-base sm:text-lg">
            {hero.lines.map((l) => (
              <p key={l} className="text-white">
                <span className="text-status">&gt; </span>
                {l}
              </p>
            ))}
          </div>

          <div className="mt-8 max-w-md text-sm sm:text-base">
            {STATUS.map((b) => (
              <Line key={b.label} {...b} dim />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-8">
            <a href={links.resume} download="Shubham_Kumar_Resume.pdf" className={btn}>
              <Download className="h-4 w-4" /> download-resume
            </a>
            <button onClick={onContactClick} className={btn}>
              <Send className="h-4 w-4" /> contact
            </button>
            <button onClick={onShellClick} className={btn}>
              <TerminalSquare className="h-4 w-4" /> open-shell
            </button>
          </div>
          <p className="mt-6 text-green-500 cursor" aria-hidden="true">guest@shubham-os:~$</p>
        </div>
      )}
    </div>
  );
};

const btn =
  "inline-flex items-center justify-center gap-2 border border-green-500 px-4 py-2 text-green-400 hover:border-status hover:text-status hover:bg-status/10 transition-colors";

export default HeroSection;
