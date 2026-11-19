import { useEffect, useState } from "react";

/**
 * Barrel distortion for the CRT screen: an SVG feDisplacementMap whose map is drawn on a canvas.
 * Each output pixel at normalized (u, v) samples the page at (u, v) * (1 + k * r²), so content
 * bulges toward the viewer and the corners bend inward. k comes from the --crt-curve CSS variable.
 * Applied with `filter: url(#crt-warp)` on .screen.warp (see index.css).
 */

// A small map stretched to the viewport. Measured in Chrome: a viewport-sized data-URL map made
// every scroll frame ~60ms; a 256px blob-URL map scrolls as fast as no filter at all.
const MAP_SIZE = 256;

export function buildBarrelMap(w: number, h: number, k: number, nx = MAP_SIZE, ny = MAP_SIZE) {
  // Largest displacement is at the corners (r² = 2).
  const maxD = Math.max(k * w, k * h, 1e-6);
  const scale = 2 * maxD; // feDisplacementMap: P(x + scale * (R - 0.5), ...)
  const data = new Uint8ClampedArray(nx * ny * 4);
  for (let j = 0; j < ny; j++) {
    const v = ((j + 0.5) / ny) * 2 - 1;
    for (let i = 0; i < nx; i++) {
      const u = ((i + 0.5) / nx) * 2 - 1;
      const r2 = u * u + v * v;
      const dx = u * k * r2 * (w / 2);
      const dy = v * k * r2 * (h / 2);
      const o = (j * nx + i) * 4;
      data[o] = Math.round((0.5 + dx / scale) * 255);
      data[o + 1] = Math.round((0.5 + dy / scale) * 255);
      data[o + 2] = 128;
      data[o + 3] = 255;
    }
  }
  return { data, scale };
}

/**
 * Tube mask: opaque black outside the warped screen, with a ~1.5px anti-aliased edge.
 * The displacement filter itself leaves a stair-stepped, aliased edge (it moves whole pixels), and the
 * overlays (glare, beam, scanlines) would otherwise light up the black outside the tube. Same barrel
 * formula as the map, so it traces the screen's edge exactly and is symmetric by construction.
 */
export function buildTubeMask(w: number, h: number, k: number, nx: number, ny: number) {
  const data = new Uint8ClampedArray(nx * ny * 4);
  for (let j = 0; j < ny; j++) {
    const v = ((j + 0.5) / ny) * 2 - 1;
    for (let i = 0; i < nx; i++) {
      const u = ((i + 0.5) / nx) * 2 - 1;
      const f = 1 + k * (u * u + v * v);
      // how far (in CSS px) this point's source sample lies outside the page; negative = inside
      const d = Math.max((Math.abs(u) * f - 1) * (w / 2), (Math.abs(v) * f - 1) * (h / 2));
      data[(j * nx + i) * 4 + 3] = Math.round(Math.min(1, Math.max(0, d / 1.5 + 0.5)) * 255);
    }
  }
  return data;
}

const toBlobUrl = (data: Uint8ClampedArray, nx: number, ny: number) =>
  new Promise<string>((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = nx;
    canvas.height = ny;
    canvas.getContext("2d")!.putImageData(new ImageData(data, nx, ny), 0, 0);
    canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : ""));
  });

// Self-check: centre pixel has no displacement, corners displace outward along both axes.
{
  const { data } = buildBarrelMap(4, 4, 0.1, 4, 4);
  const px = (i: number, j: number) => [data[(j * 4 + i) * 4], data[(j * 4 + i) * 4 + 1]];
  const [r0, g0] = px(0, 0);
  const [r3, g3] = px(3, 3);
  console.assert(r0 < 128 && g0 < 128 && r3 > 128 && g3 > 128, "barrel map direction is wrong");
  // mask: centre transparent, corner opaque, and left/right mirror images
  const m = buildTubeMask(100, 100, 0.1, 10, 10);
  const a = (i: number, j: number) => m[(j * 10 + i) * 4 + 3];
  console.assert(a(5, 5) === 0 && a(0, 0) === 255 && a(0, 7) === a(9, 7) && a(2, 9) === a(7, 9), "tube mask");
}

const CrtWarp = ({ enabled }: { enabled: boolean }) => {
  const [map, setMap] = useState<{ href: string; mask: string; scale: number; w: number; h: number } | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let urls: string[] = [];
    const draw = async () => {
      const w = Math.round(window.innerWidth);
      const h = Math.round(window.innerHeight);
      const k = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--crt-curve")) || 0;
      const { data, scale } = buildBarrelMap(w, h, k);
      // mask at half resolution: it is a smooth shape, CSS scaling keeps the edge soft
      const mw = Math.ceil(w / 2);
      const mh = Math.ceil(h / 2);
      const next = await Promise.all([
        toBlobUrl(data, MAP_SIZE, MAP_SIZE),
        toBlobUrl(buildTubeMask(w, h, k, mw, mh), mw, mh),
      ]);
      if (next.some((u) => !u)) return;
      urls.forEach(URL.revokeObjectURL);
      urls = next;
      setMap({ href: next[0], mask: next[1], scale, w, h });
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      urls.forEach(URL.revokeObjectURL);
      setMap(null); // never re-render with a revoked URL
    };
  }, [enabled]);

  if (!enabled || !map) return null;
  return (
    <>
    <div className="tube-mask" style={{ backgroundImage: `url(${map.mask})` }} aria-hidden="true" />
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      {/* sRGB so the map's channel values are read as-is, not gamma-converted */}
      <filter
        id="crt-warp"
        filterUnits="userSpaceOnUse"
        x="0"
        y="0"
        width={map.w}
        height={map.h}
        colorInterpolationFilters="sRGB"
      >
        <feImage href={map.href} x="0" y="0" width={map.w} height={map.h} preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={map.scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
    </>
  );
};

export default CrtWarp;
