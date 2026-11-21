import { useEffect, useRef, type ReactNode, type RefObject } from "react";

/**
 * ASCII self-portrait for the hero: chibi me with round glasses, typing on a laptop (Ubuntu logo on the lid).
 * Hand-drawn on a fixed 65-column grid. Markers: «…» = amber (glasses frames, Ubuntu logo), L / R = left / right pupil cell.
 * Rendered as real text so it gets the scanlines, warp and glow like everything else.
 * The eyes are the only live part: each lens interior is a 9-char span whose text is swapped.
 */
export const ART = [
  "                                             _......_",
  "                                    _..--_.-'-----.._'-. `",
  "                               _.-''                 '-.'",
  "                            _-' _.-''   _..-------    ._ -\\",
  "                          /-   '    _.-'                -.\\",
  "                        /        _-'                        \\",
  "                       /  /   / '          _.---'''''-._    \\\\",
  "                      |  /   /         .-''             '._ \\ \\",
  "                      |  |  /       --'                      ||",
  "                      |  |  |      /                         | |",
  "                      \\  |  /     /                         | |",
  "                       \\    \\_/\\   /\\_/\\   /\\__/\\   /\\_     | |",
  "                        \\  `=#==--..__        __..--==#=`  )",
  "                      \\|  «.-=======-.»    «.-=======-.»  ` \\\\/",
  "                       |«=((»  .---.  «))--((»  .---.  «))=====»(\\",
  "                       | «((»    L    «))»  «((»    R    «))»     ) )",
  "                       |  «'-=======-'»    «'-=======-'»     (_/",
  "                        \\    ///         .       ///     /",
  "                         \\_              .-.          _/",
  "                           `--.__               __.--'",
  "     .___________________________.  /-'`   ____     .._.",
  "    /                           /|  / ---''   :''--   :'--.   :",
  "   |                           | | /:   :   :   :   :   :  '\\   :",
  "   |           «_.--.»   «o»       | ||   :   :   :   :   :   :  \\:",
  "   |         «.'»                | || :   :   :   :   :   :   : \\ :",
  "   |        «/»         «\\»        | ||   :   :   :   :   :   /   :\\",
  "   |       «o»           «|»       | || :   :   :   :   :   :/  :   \\",
  "   |        «\\»         «/»        | | \\(\\\\\\\\     ////)   .-/ :   : |",
  "   |         «`.»                | |______________________:   :   :|",
  "   |           «`--'»   «o»        | /[][][][][][][][][][]/   :   :  |",
  "   '._________________________.' /[][][][][][][][][][]/ :   :   :|",
  "    ============================/_____________________/   :   :  |",
  "                                                        :   :   :|",
  "",
];

const LENS = 9; // lens interior width; the pupil sits at index 4 when centred

type Gaze = { dx: -1 | 0 | 1; dy: -1 | 0 | 1; closed: boolean };
const CENTRE: Gaze = { dx: 0, dy: 0, closed: false };

/** The 9 characters inside one lens for a gaze. Up/down change the pupil glyph, left/right move it. */
export const lens = ({ dx, dy, closed }: Gaze) => {
  if (closed) return "   ---   ";
  const cells = Array(LENS).fill(" ");
  cells[4 + dx * 3] = dy < 0 ? "°" : dy > 0 ? "." : "@";
  return cells.join("");
};
console.assert(lens(CENTRE) === "    @    " && lens({ dx: 1, dy: -1, closed: false }) === "       ° ", "lens");

/** 8 directions + centre from the vector eyes -> pointer. Within `dead` px the eyes look straight ahead. */
export const gazeToward = (vx: number, vy: number, dead = 70): Gaze => {
  const d = Math.hypot(vx, vy);
  if (d < dead) return CENTRE;
  const sx = vx / d;
  const sy = vy / d;
  const pick = (v: number) => (v > 0.33 ? 1 : v < -0.33 ? -1 : 0) as -1 | 0 | 1; // a little wider than 22.5° so diagonals read
  return { dx: pick(sx), dy: pick(sy), closed: false };
};
console.assert(gazeToward(500, 0).dx === 1 && gazeToward(0, -500).dy === -1 && gazeToward(10, 10) === CENTRE, "gaze");

// Split a line around the 9-char lens interiors (the cells around the L / R markers) so they can be live spans.
const renderLine = (line: string, refs: RefObject<HTMLSpanElement>[]): ReactNode[] => {
  const out: ReactNode[] = [];
  let rest = line;
  for (const [marker, ref] of [["L", refs[0]], ["R", refs[1]]] as const) {
    const at = rest.indexOf(marker);
    if (at < 0) continue;
    out.push(...colour(rest.slice(0, at - 4), out.length));
    out.push(<span key={marker} ref={ref}>{lens(CENTRE)}</span>);
    rest = rest.slice(at + 5);
  }
  out.push(...colour(rest, out.length));
  return out;
};
const colour = (text: string, base: number) =>
  text.split(/[«»]/).map((part, i) => (i % 2 ? <span key={base + i} className="text-status">{part}</span> : part));

const TYPING_MS = 1200; // after the last keystroke in the shell, go back to following the cursor

const HeroArt = ({ className = "" }: { className?: string }) => {
  const left = useRef<HTMLSpanElement>(null);
  const right = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // stays centred, no blinks
    let gaze: Gaze = CENTRE;
    let pointer: { x: number; y: number } | null = null;
    let typing = false;
    let blinking = false;
    let shown = "";
    let raf = 0;
    let blinkT = 0;
    let typingT = 0;

    const paint = () => {
      raf = 0;
      const l = left.current;
      const r = right.current;
      if (!l || !r) return;
      if (typing) gaze = { dx: 0, dy: 1, closed: false };
      else if (!pointer) gaze = CENTRE;
      else {
        const a = l.getBoundingClientRect();
        const b = r.getBoundingClientRect();
        gaze = gazeToward(pointer.x - (a.left + b.right) / 2, pointer.y - (a.top + a.bottom) / 2);
      }
      const text = lens({ ...gaze, closed: blinking });
      if (text === shown) return; // only touch the DOM when the eyes actually change
      shown = text;
      l.textContent = text;
      r.textContent = text;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY }; // touch: the last tap
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.id !== "shell-input") return;
      typing = true;
      clearTimeout(typingT);
      typingT = window.setTimeout(() => {
        typing = false;
        schedule();
      }, TYPING_MS);
      schedule();
    };
    const blink = () => {
      blinkT = window.setTimeout(() => {
        blinking = true;
        schedule();
        blinkT = window.setTimeout(() => {
          blinking = false;
          schedule();
          blink();
        }, 140);
      }, 3000 + Math.random() * 3000); // natural, irregular 3-6s
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("keydown", onKey);
    document.documentElement.addEventListener("mouseleave", onLeave);
    blink();
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(blinkT);
      clearTimeout(typingT);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("keydown", onKey);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className={className}>
      <span className="sr-only">
        ASCII drawing of Shubham as a cartoon: neat swept-up hair, big round glasses, focused expression, typing on a laptop with an Ubuntu logo.
      </span>
      <pre aria-hidden="true" className="hero-art text-green-500 select-none">
        {ART.map((line, i) => (
          <div key={i}>{renderLine(line, [left, right])}</div>
        ))}
      </pre>
    </div>
  );
};

export default HeroArt;
