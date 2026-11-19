// Easter-egg output for the shell: cowsay, top, uptime. Pure functions over profile.ts data.
import { education, experience, projects } from "@/data/profile";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

/** "July 2022" -> Date(2022, 6, 1). Hand-rolled because Date() parsing of "Month YYYY" differs between browsers. */
export const parseMonthYear = (s: string) => {
  const [m, y] = s.trim().toLowerCase().split(/\s+/);
  return new Date(Number(y), MONTHS.indexOf(m), 1);
};

export const cowsay = (text: string, width = 40) => {
  const words = (text.trim() || "moo").split(/\s+/);
  const rows: string[] = [];
  for (const w of words) {
    const last = rows[rows.length - 1];
    if (last !== undefined && (last + " " + w).length <= width) rows[rows.length - 1] = last + " " + w;
    else rows.push(w.slice(0, width));
  }
  const len = Math.max(...rows.map((r) => r.length));
  const pad = (r: string) => r + " ".repeat(len - r.length);
  const body =
    rows.length === 1
      ? [`< ${pad(rows[0])} >`]
      : rows.map((r, i) => {
          const [l, rt] = i === 0 ? ["/", "\\"] : i === rows.length - 1 ? ["\\", "/"] : ["|", "|"];
          return `${l} ${pad(r)} ${rt}`;
        });
  return [
    " " + "_".repeat(len + 2),
    ...body,
    " " + "-".repeat(len + 2),
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\n");
};

const loadedAt = Date.now();

const span = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
};

/** Career "uptime" since the first engineering job in profile.ts, plus how long this page has been open. */
export const uptime = (now = new Date()) => {
  const first = experience[experience.length - 1];
  const startLabel = first.date.split("–")[0].trim();
  const start = parseMonthYear(startLabel);
  const months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  const clock = now.toTimeString().slice(0, 8);
  return `${clock} up ${Math.floor(months / 12)} years, ${months % 12} months (engineering since ${startLabel}, ${first.company}),  1 user,  this page up ${span(now.getTime() - loadedAt)}`;
};

/** A fake `top`, built from real profile data. */
export const top = (now = new Date()) => {
  const job = experience[0];
  const school = education[0];
  const procs: [number, string, number, string][] = [
    [101, "R", 41.3, `build-backend --at "${job.company}"`],
    [102, "R", 24.8, `study --degree "${school.degree}" --until "${school.date.replace(/^Expected\s+/, "")}"`],
    [103, "S", 11.6, `ship-projects --count ${projects.length}`],
    [104, "S", 9.2, "chess --site lichess --daily 2h"],
    [105, "S", 7.4, "guitar --practice"],
    [106, "S", 3.9, "blog --platform medium"],
    [1, "S", 0.1, "init"],
  ];
  const rows = procs.map(([pid, st, cpu, cmd]) => `${String(pid).padStart(5)} shubham  ${st}  ${cpu.toFixed(1).padStart(5)}  ${cmd}`);
  return [
    `top - ${now.toTimeString().slice(0, 8)}  ${procs.length} tasks, 2 running, ${procs.length - 2} sleeping   load average: 0.42 0.37 0.31`,
    "",
    "  PID USER     S   %CPU  COMMAND",
    ...rows,
  ].join("\n");
};

// Self-checks
console.assert(parseMonthYear("July 2022").getTime() === new Date(2022, 6, 1).getTime(), "parseMonthYear");
console.assert(cowsay("hi").split("\n")[1] === "< hi >", "cowsay single line");
console.assert(cowsay("a ".repeat(30), 10).split("\n")[1].startsWith("/ "), "cowsay wraps");
