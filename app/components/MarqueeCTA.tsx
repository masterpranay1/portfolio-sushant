"use client";

import { useRef } from "react"; // native hooks
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AuroraBackground from "./AuroraBackground";

const MARQUEE_TEXT = "EDITING · MOTION · COLOR · STORY · RHYTHM · GRADE · ";

/**
 * MarqueeCTA — closing band: an aurora-gradient marquee scrolling behind a
 * "Let's work together" call-to-action with contact links. Replaces the old
 * MyWorksSection (showreel image now lives in FeaturedShowreel).
 */
export default function MarqueeCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 5,
          ease: "none",
          repeat: -1,
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0a0a0f] py-32 text-[#f5f5f7]"
    >
      <AuroraBackground src="/aurora/aurora-hero.png" imageOpacity={0.3} overlayOpacity={0.72} />

      {/* Scrolling marquee */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 select-none opacity-25 z-0 pointer-events-none -skew-y-3 scale-110">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-[16vw] md:text-[12vw] font-black leading-none text-aurora tracking-tighter"
        >
          <span className="shrink-0">{MARQUEE_TEXT.repeat(2)}</span>
          <span className="shrink-0">{MARQUEE_TEXT.repeat(2)}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
        <h2 className="text-4xl font-bold tracking-tighter text-white md:text-6xl">
          Let&apos;s work together
        </h2>
        <p className="max-w-md text-sm opacity-60 md:text-base">
          Have a video that needs editing, motion graphics, or a color grade?
          Let&apos;s make something that holds attention.
        </p>
        <a
          href="mailto:sushant730181@gmail.com"
          className="rounded-full bg-aurora-soft px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_rgba(167,139,250,0.5)]"
        >
          sushant730181@gmail.com
        </a>
        <a
          href="https://www.instagram.com/aarambh_0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-aurora-soft underline decoration-2 underline-offset-4 transition-colors hover:text-white"
        >
          @aarambh_0
        </a>
      </div>
    </section>
  );
}
