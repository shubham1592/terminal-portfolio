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

// Self-check: centre pixel has no displacement, corners displace outward along both axes.
{
  const { data } = buildBarrelMap(4, 4, 0.1, 4, 4);
  const px = (i: number, j: number) => [data[(j * 4 + i) * 4], data[(j * 4 + i) * 4 + 1]];
  const [r0, g0] = px(0, 0);
  const [r3, g3] = px(3, 3);
  console.assert(r0 < 128 && g0 < 128 && r3 > 128 && g3 > 128, "barrel map direction is wrong");
}

const CrtWarp = ({ enabled }: { enabled: boolean }) => {
  const [map, setMap] = useState<{ href: string; scale: number; w: number; h: number } | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let url = "";
    const draw = () => {
      const w = Math.round(window.innerWidth);
      const h = Math.round(window.innerHeight);
      const k = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--crt-curve")) || 0;
      const { data, scale } = buildBarrelMap(w, h, k);
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = MAP_SIZE;
      canvas.getContext("2d")!.putImageData(new ImageData(data, MAP_SIZE, MAP_SIZE), 0, 0);
      canvas.toBlob((blob) => {
        if (!blob) return;
        if (url) URL.revokeObjectURL(url);
        url = URL.createObjectURL(blob);
        setMap({ href: url, scale, w, h });
      });
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
      if (url) URL.revokeObjectURL(url);
      setMap(null); // never re-render with a revoked URL
    };
  }, [enabled]);

  if (!enabled || !map) return null;
  return (
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
  );
};

export default CrtWarp;
