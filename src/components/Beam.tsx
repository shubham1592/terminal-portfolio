import { useEffect, useRef } from "react";

/**
 * Electron-beam glow: a soft phosphor bloom that eases after the cursor and gently lifts the
 * text and scanlines beneath it (screen blend). Lives on the overlay layer, never takes clicks.
 * Per frame it only writes a transform; the loop stops once the glow has caught up.
 * Touch: lights up where you tap, then fades. Reduced motion: rests, unmoving, at screen centre.
 */

const EASE = 0.14; // fraction of the remaining distance covered per frame
const IDLE_MS = 2500; // fade out after the cursor stays still this long
const TAP_MS = 700; // how long a tap stays lit

const Beam = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.dataset.mode = "static";
      return;
    }

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let raf = 0;
    let idle = 0;

    const place = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const step = () => {
      x += (tx - x) * EASE;
      y += (ty - y) * EASE;
      place();
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(step) : 0;
    };
    const show = (ms: number) => {
      el.dataset.on = "1";
      clearTimeout(idle);
      idle = window.setTimeout(() => delete el.dataset.on, ms);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(step);
      show(IDLE_MS);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      // taps jump straight to the finger: there is no cursor path to follow
      x = tx = e.clientX;
      y = ty = e.clientY;
      place();
      show(TAP_MS);
    };
    const onLeave = () => {
      clearTimeout(idle);
      delete el.dataset.on;
    };

    place();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idle);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div ref={ref} className="beam" aria-hidden="true" />;
};

export default Beam;
