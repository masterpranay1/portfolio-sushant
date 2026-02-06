"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomCursor from "./components/CustomCursor";
import AboutSection from "./components/AboutSection";
import MyWorksSection from "./components/MyWorksSection";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Safe to useGSAP in client component
      const tl = gsap.timeline();

      tl.from(imageRef.current, {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      })
        .from(
          titleRef.current,
          {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=1",
        )
        .from(
          contactRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        );

      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        if (titleRef.current) {
          gsap.to(titleRef.current, {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: "power1.out",
          });
        }
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            x: -xPos * 0.5,
            y: -yPos * 0.5,
            duration: 1,
            ease: "power1.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: containerRef },
  ); // Scope animations to container

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden bg-[#050505] text-[#ededed] font-[family-name:var(--font-outfit)] selection:bg-[#ffb703] selection:text-black"
      >
        <CustomCursor />

        {/* Hero Image Background */}
        <div
          ref={imageRef}
          className="absolute inset-0 z-0 flex items-center justify-center opacity-80"
        >
          <div className="relative w-[80%] h-[80%] max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl brightness-75">
            <Image
              src="/hero/hero.webp"
              alt="Cinematic Portfolio Background"
              fill
              className="object-cover"
              priority
            />
            {/* Film grain or overlay effect could be added here */}
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center justify-center h-full w-full pointer-events-none">
          <h1
            ref={titleRef}
            className="text-[12vw] font-bold leading-none tracking-tighter text-[#ffb703] drop-shadow-2xl mix-blend-difference pointer-events-auto cursor-default"
          >
            PORTFOLIO
          </h1>
        </main>

        {/* Contact Info */}
        <div
          ref={contactRef}
          className="absolute bottom-8 left-8 z-20 flex flex-col gap-2 text-sm md:text-base font-medium tracking-wide"
        >
          <div>
            <span className="opacity-50 block text-xs mb-1">EMAIL</span>
            <a
              href="mailto:sushant730181@gmail.com"
              className="hover:text-[#ffb703] transition-colors duration-300"
            >
              sushant730181@gmail.com
            </a>
          </div>

          <div className="mt-4">
            <span className="opacity-50 block text-xs mb-1">FOLLOW ME</span>
            <a
              href="https://www.instagram.com/aarambh_0/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#ffb703] hover:underline decoration-2 underline-offset-4 decoration-white hover:decoration-[#ffb703] transition-all duration-300"
            >
              @aarambh_0
            </a>
            <div className="mt-4">
              <span className="opacity-50 block text-xs mb-1">NAVIGATION</span>
              <button
                onClick={() => {
                  document
                    .getElementById("my-works")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[#ffb703] hover:underline decoration-2 underline-offset-4 decoration-white hover:decoration-[#ffb703] transition-all duration-300 text-left uppercase font-bold tracking-wider"
              >
                View Works
              </button>
            </div>
          </div>
        </div>

        {/* Decor text */}
        <div className="absolute top-8 left-8 z-20 text-xs font-bold tracking-[0.2em] opacity-50 uppercase vertically-text hidden md:block">
          Designer & Editor
        </div>
        <div className="absolute top-8 right-8 z-20 text-xs font-bold tracking-[0.2em] opacity-50 uppercase hidden md:block">
          2026 / Portfolio
        </div>
      </div>
      <AboutSection />
      <MyWorksSection />
    </>
  );
}
