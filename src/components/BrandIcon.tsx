import type { CSSProperties } from "react";
import { brands, type Brand, type BrandName } from "@/lib/brands";

/**
 * A logo that rests in phosphor green and turns to its brand colour (with a matching glow) when
 * its nearest `.brand-host` ancestor is hovered, focused or tapped. Styles live in index.css.
 */
const BrandIcon = ({ name, className = "h-9 w-9" }: { name: BrandName; className?: string }) => {
  const brand: Brand = brands[name];
  return (
    <span
      className={`brand-icon ${brand.size ?? className} ${brand.bold ? "brand-bold" : ""}`}
      style={{ "--brand": brand.color } as CSSProperties}
      aria-hidden="true"
    >
      {brand.svg}
    </span>
  );
};

export default BrandIcon;
