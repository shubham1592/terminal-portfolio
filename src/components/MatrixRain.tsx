import { useEffect, useRef } from "react";

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0123456789ABCDEF<>{}[]=+*";
const DURATION_MS = 4500;
const FONT_PX = 16;

/** Brief green code rain over the shell. Ends by itself, or on any key or click. */
const MatrixRain = ({ onDone }: { onDone: () => void }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);
    const css = getComputedStyle(document.documentElement);
    const rgb = (v: string) => `rgb(${css.getPropertyValue(v).trim()})`;
    const head = rgb("--p-300");
    const tail = rgb("--p-500");
    const fade = `rgb(${css.getPropertyValue("--screen").trim()} / 0.12)`;
    const cols = Math.ceil(w / FONT_PX);
    const drops = Array.from({ length: cols }, () => Math.floor((Math.random() * -h) / FONT_PX));
    ctx.font = `${FONT_PX}px "IBM Plex Mono", monospace`;

    let raf = 0;
    let frame = 0;
    const started = performance.now();
    const draw = (t: number) => {
      if (t - started > DURATION_MS) return onDone();
      raf = requestAnimationFrame(draw);
      if (frame++ % 2) return; // ~30fps is plenty for rain and halves the cost
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < cols; i++) {
        const y = drops[i] * FONT_PX;
        ctx.fillStyle = Math.random() > 0.9 ? head : tail;
        ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], i * FONT_PX, y);
        drops[i] = y > h && Math.random() > 0.975 ? 0 : drops[i] + 1;
      }
    };
    raf = requestAnimationFrame(draw);

    const stop = () => onDone();
    window.addEventListener("keydown", stop);
    window.addEventListener("pointerdown", stop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
    };
  }, [onDone]);

  return <canvas ref={ref} className="fixed inset-0 z-10 pointer-events-none" aria-hidden="true" />;
};

/** What `matrix` prints instead when the visitor prefers reduced motion. */
export const STATIC_RAIN = [
  "ｱ 0 ｶ 7 ﾅ { 3 ｻ = ｷ 9 ｿ",
  "  ﾄ 1 ｴ > ﾆ 5 ｲ * ｸ 2 ｾ",
  "ｳ 8 ｹ [ ﾁ 4 ｺ + ﾉ 6 ｼ",
  "",
  "(the rain is paused: your system asks for reduced motion)",
].join("\n");

export default MatrixRain;
