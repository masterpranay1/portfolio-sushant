"use client";

import { useRef } from "react"; // native hooks
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomCursor from "./CustomCursor";
import AuroraBackground from "./AuroraBackground";

/**
 * Hero — full-bleed aurora background, large gradient name, role title,
 * and two CTAs (View Work, Get in Touch). Keeps the GSAP parallax + custom
 * cursor from the original hero. Extracted from page.tsx for clarity.
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.from(nameRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
      }).from(
        subRef.current,
        { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

      // Subtle parallax on mouse move.
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 16;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 16;
        if (nameRef.current) {
          gsap.to(nameRef.current, {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power1.out",
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  );

  const scrollToWork = () =>
    document
      .getElementById("showcase")
      ?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0f] text-[#f5f5f7] font-[family-name:var(--font-outfit)] selection:bg-aurora-soft selection:text-black"
    >
      <CustomCursor />
      <AuroraBackground src="/aurora/aurora-hero.png" imageOpacity={0.5} overlayOpacity={0.55} />

      <main className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <p className="mb-5 text-xs font-semibold tracking-[0.3em] uppercase text-aurora-soft md:text-sm">
          Portfolio · 2026
        </p>
        <h1
          ref={nameRef}
          className="text-[14vw] font-bold leading-[0.9] tracking-tighter text-aurora drop-shadow-2xl md:text-[10vw]"
        >
          SUSHANT RAJ
        </h1>
        <div ref={subRef} className="mt-6 flex flex-col items-center gap-6">
          <p className="text-base font-light tracking-[0.2em] uppercase opacity-80 md:text-lg">
            Video Editor · Motion Designer · Colorist
          </p>
          <p className="max-w-xl text-sm opacity-60 md:text-base">
            I edit stories that move — motion graphics, explainers, ads, and
            cinematic color grades.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToWork}
              className="rounded-full bg-aurora-soft px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(167,139,250,0.5)]"
            >
              View Work
            </button>
            <a
              href="mailto:sushant730181@gmail.com"
              className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-aurora-soft hover:text-aurora-soft"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </main>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[0.6rem] font-semibold tracking-[0.3em] uppercase opacity-50">
        Scroll
      </div>
    </div>
  );
}
