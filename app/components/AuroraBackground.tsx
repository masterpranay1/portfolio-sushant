"use client";

import Image from "next/image";

interface AuroraBackgroundProps {
  /** Path to an aurora image in /public, e.g. "/aurora/aurora-1.png". */
  src: string;
  /** Opacity of the aurora image layer (default 0.35). */
  imageOpacity?: number;
  /** Opacity of the dark overlay stacked above the image (default 0.7). */
  overlayOpacity?: number;
}

/**
 * AuroraBackground — full-bleed aurora image layer with a dark overlay.
 * Mount as the first child inside a `relative` section so content can
 * sit above it with `relative z-10`. Keeps text readable over imagery.
 */
export default function AuroraBackground({
  src,
  imageOpacity = 0.35,
  overlayOpacity = 0.7,
}: AuroraBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        className="object-cover"
        style={{ opacity: imageOpacity }}
      />
      <div
        className="absolute inset-0 bg-[#0a0a0f]"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
