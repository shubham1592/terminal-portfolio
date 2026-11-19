import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { about, education, experience, links, plain, projects, skills, hero } from "@/data/profile";
import MatrixRain, { STATIC_RAIN } from "./MatrixRain";
import { cowsay, top, uptime } from "./shellFun";

export const SECTIONS = ["about", "experience", "projects", "stack", "beyond", "contact"] as const;

interface ShellProps {
  onClose: () => void;
  onGoto: (section: string) => void;
  setCrt: (on: boolean) => void;
}

type Line = { kind: "in" | "out"; text: ReactNode };

const HELP = `available commands:
  whoami            who is this
  about             short bio
  education         degrees
  experience        work history       (alias: work)
  projects          things I've built
  skills            tech stack
  contact           how to reach me
  resume            download my resume
  cd <section>      jump to a section on the page
                    sections: ${SECTIONS.join(" ")}
  crt on|off        toggle scanlines and glow
  clear             clear the screen
  exit              back to the page          (or press Esc)

just for fun:
  matrix · cowsay <text> · top · uptime · play chess`;

const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 text-green-300 hover:text-status">
    {children}
  </a>
);

const Shell = ({ onClose, onGoto, setCrt }: ShellProps) => {
  const [lines, setLines] = useState<Line[]>([
    { kind: "out", text: `shubham-os 2026.11 tty2\nType "help" to see what you can do here, or try "matrix".` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const [raining, setRaining] = useState(false);
  const stopRain = useCallback(() => setRaining(false), []);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const run = (raw: string): ReactNode | null => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ").toLowerCase();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    switch (cmd?.toLowerCase()) {
      case "":
      case undefined:
        return "";
      case "help":
      case "?":
        return HELP;
      case "whoami":
        return [hero.name, ...hero.lines].join("\n");
      case "about":
        return about.map(plain).join("\n");
      case "education":
        return education.map((e) => `${e.degree}\n  ${e.school}, ${e.date}`).join("\n");
      case "experience":
      case "work":
        return experience
          .map((r) => `${r.title} @ ${r.company} (${r.date})\n${r.items.map((i) => `  - ${plain(i)}`).join("\n")}`)
          .join("\n\n");
      case "projects":
      case "ls":
        return (
          <>
            {projects.map((p) => (
              <div key={p.name} className="mb-3">
                <span className="text-green-300">{p.name}</span>
                {p.date && <span className="text-gray-400"> ({p.date})</span>}
                {"\n  "}
                {p.description}
                {"\n  "}
                <span className="text-gray-400">{p.tech.join(" / ")}</span>
                {p.code && (
                  <>
                    {"\n  "}
                    <A href={p.code}>{p.code}</A>
                  </>
                )}
              </div>
            ))}
          </>
        );
      case "skills":
        return skills.map((c) => `${c.title}:\n  ${c.items.map((s) => s.name).join(", ")}`).join("\n");
      case "contact":
        return (
          <>
            email     <A href={`mailto:${links.email}`}>{links.email}</A>
            {"\n"}linkedin  <A href={links.linkedin}>{links.linkedin}</A>
            {"\n"}github    <A href={links.github}>{links.github}</A>
            {"\n"}or "cd contact" to use the form.
          </>
        );
      case "resume":
        window.open(links.resume, "_blank", "noopener");
        return "opening resume...";
      case "cd":
        if (arg === "" || arg === "~") return "usage: cd <section>";
        if (!(SECTIONS as readonly string[]).includes(arg)) return `cd: no such section: ${arg}`;
        onGoto(arg);
        return null;
      case "crt":
        if (arg !== "on" && arg !== "off") return "usage: crt on|off";
        setCrt(arg === "on");
        return `crt effects ${arg}`;
      case "exit":
      case "logout":
        onClose();
        return null;
      case "matrix":
        if (reducedMotion) return STATIC_RAIN;
        setRaining(true);
        return "wake up, guest... (press any key to stop)";
      case "play":
        if (arg !== "chess") return "usage: play chess";
        window.open(links.lichess, "_blank", "noopener");
        return "opening lichess... good luck.";
      case "cowsay":
        return cowsay(args.join(" "));
      case "top":
        return top();
      case "uptime":
        return uptime();
      case "sudo":
        return "guest is not in the sudoers file. This incident will be reported.";
      default:
        return `${cmd}: command not found. Type "help" for the list (there are a few hidden ones too).`;
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input;
    setInput("");
    setHIdx(-1);
    if (cmd.trim()) setHistory((h) => [cmd, ...h]);
    if (cmd.trim().toLowerCase() === "clear") return setLines([]);
    const out = run(cmd);
    setLines((ls) => [...ls, { kind: "in", text: cmd }, ...(out === null || out === "" ? [] : [{ kind: "out" as const, text: out }])]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    e.preventDefault();
    const next = Math.max(-1, Math.min(history.length - 1, hIdx + (e.key === "ArrowUp" ? 1 : -1)));
    setHIdx(next);
    setInput(next === -1 ? "" : history[next]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive shell"
      className="fixed inset-0 z-[60] bg-black overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 pb-24 text-sm sm:text-base">
        <div className="flex justify-between text-gray-400 border-b border-green-900 pb-2 mb-4">
          <span>guest@shubham-os: ~</span>
          <button onClick={onClose} className="hover:text-status">
            [ exit ]
          </button>
        </div>
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words mb-1">
            {l.kind === "in" ? (
              <>
                <span className="text-green-500">guest@shubham-os:~$ </span>
                <span className="text-white">{l.text}</span>
              </>
            ) : (
              <div className="text-gray-300 mb-2">{l.text}</div>
            )}
          </div>
        ))}
        <form onSubmit={submit} className="flex gap-2">
          <label htmlFor="shell-input" className="text-green-500 shrink-0">
            guest@shubham-os:~$
          </label>
          <input
            id="shell-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent text-white outline-none caret-green-400 focus-visible:outline-none"
          />
        </form>
        <div ref={endRef} />
      </div>
      {raining && <MatrixRain onDone={stopRain} />}
    </div>
  );
};

export default Shell;
