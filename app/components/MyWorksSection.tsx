"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function MyWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reveal Video
      gsap.from(imageContainerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: "power3.out",
      });

      // Marquee Animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 5, // Slower speed
          ease: "none",
          repeat: -1,
        });
      }

      // Parallax Effect on Video
      gsap.to(imageContainerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -100,
        rotation: 0,
        scale: 1.1,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  const marqueeText =
    "CINEMATIC • STORYTELLING • VISUALS • MOTION • EDITING • COLOR • ";

  return (
    <section
      id="my-works"
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] text-[#ededed] py-16 overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background Marquee */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full select-none opacity-30 z-0 pointer-events-none transform -skew-y-3 scale-110">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-[18vw] md:text-[14vw] font-black leading-none text-[#ffb703] tracking-tighter"
        >
          {/* Duplicate text enough times to overflow and loop safely */}
          <span className="shrink-0">{marqueeText.repeat(2)}</span>
          <span className="shrink-0">{marqueeText.repeat(2)}</span>
        </div>
      </div>

      {/* Video Container */}
      <div
        ref={imageContainerRef}
        className="relative z-10 w-[80%] md:w-[70%] max-w-6xl aspect-9/16 md:aspect-video rounded-3xl overflow-hidden border-2 border-[#ffb703]/30 shadow-[0_0_50px_rgba(255,183,3,0.1)] group perspective-1000"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>

        <Image
          src="/my-works/works.webp"
          alt="My Works Showreel Desktop"
          fill
          unoptimized
          className="hidden md:block object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <Image
          src="/my-works/works-mobile.webp"
          alt="My Works Showreel Mobile"
          fill
          unoptimized
          className="block md:hidden object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />

        {/* Creative Label Overlay */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20 overflow-hidden">
          <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <span className="bg-[#ffb703] text-black text-xs md:text-sm font-bold px-4 py-2 uppercase tracking-widest">
              Selected Works
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
