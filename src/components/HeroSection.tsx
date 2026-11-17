import { useEffect, useState } from "react";
import { Download, Send, TerminalSquare } from "lucide-react";
import { hero, links } from "@/data/profile";

interface HeroSectionProps {
  onContactClick: () => void;
  onShellClick: () => void;
}

const BOOT_LOG = [
  "[    0.000000] Linux version 6.17.0-shubham (kumar@northeastern) #2026 SMP",
  "[    0.000000] Command line: BOOT_IMAGE=/portfolio ro quiet phosphor=on",
  "[    0.004112] BIOS-e820: usable memory 640K (ought to be enough for anybody)",
  "[    0.118020] loading module vit_btech.ko: B.Tech Computer Science",
  "[    0.231877] loading module bajaj_finance.ko: data engineering, 3 years",
  "[    0.402113] loading module northeastern_mscs.ko: MS Computer Science",
  "[    0.588402] loading module lg_es_vertech.ko: software engineer co-op",
  "[  OK  ] Mounted /home/shubham",
  "[  OK  ] Started portfolio.service",
  "[  OK  ] Reached target graphical.target",
];

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
  const [shown, setShown] = useState(() => (alreadyBooted() ? BOOT_LOG.length : 0));
  const booted = shown >= BOOT_LOG.length;

  useEffect(() => {
    if (booted) {
      try {
        sessionStorage.setItem(BOOT_KEY, "1");
      } catch {
        /* storage blocked: boot plays again next visit, harmless */
      }
      return;
    }
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 300 : 110);
    return () => clearTimeout(t);
  }, [shown, booted]);

  // Any key or click skips the boot log.
  useEffect(() => {
    if (booted) return;
    const skip = () => setShown(BOOT_LOG.length);
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
        <div className="text-sm sm:text-base text-gray-400 space-y-0.5" aria-live="polite">
          {BOOT_LOG.slice(0, shown).map((line) => (
            <p key={line} className="whitespace-pre-wrap break-words">
              {line.startsWith("[  OK  ]") ? (
                <>
                  [  <span className="text-green-400">OK</span>  ]{line.slice(8)}
                </>
              ) : (
                line
              )}
            </p>
          ))}
          <p className="pt-4 text-green-700 text-sm">press any key to skip</p>
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
                <span className="text-green-500">&gt; </span>
                {l}
              </p>
            ))}
            <p className="text-green-500 cursor pt-1" aria-hidden="true">$</p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-10">
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
        </div>
      )}
    </div>
  );
};

const btn =
  "inline-flex items-center justify-center gap-2 border border-green-500 px-4 py-2 text-green-400 hover:bg-green-500 hover:text-black transition-colors";

export default HeroSection;
