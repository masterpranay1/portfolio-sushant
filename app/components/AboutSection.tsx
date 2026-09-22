"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AuroraBackground from "./AuroraBackground";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Set initial states to avoid FOUC and ensure "from" logic is handled manually
      gsap.set([leftColRef.current, rightColRef.current], {
        opacity: 0,
        x: (index) => (index === 0 ? -50 : 50), // left col -50, right col +50
      });

      const listItems = rightColRef.current?.querySelectorAll("li");
      if (listItems && listItems.length > 0) {
        gsap.set(listItems, { opacity: 0, y: 20 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onLeave: () => {}, // Optional: ensure state persists
        },
      });

      tl.to(leftColRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }).to(
        rightColRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8",
      );

      if (listItems && listItems.length > 0) {
        tl.to(
          listItems,
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.5",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0a0f] text-[#f5f5f7] py-20 px-8 md:px-20 overflow-hidden flex items-center"
    >
      <AuroraBackground src="/aurora/aurora-2.png" imageOpacity={0.22} overlayOpacity={0.8} />
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {/* Left Column: Profile & Bio */}
        <div ref={leftColRef} className="flex flex-col gap-8">
          {/* Profile Image / Avatar Placeholder */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-aurora-soft/20 shadow-2xl">
            <Image
              src="/hero/hero.webp" // Using hero image as placeholder if no specific profile pic
              alt="Sushant Raj"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-aurora mb-2">
              Sushant Raj
            </h2>
            <h3 className="text-xl opacity-60 font-light tracking-widest uppercase">
              Video Editor · Motion Designer · Colorist
            </h3>
          </div>

          <p className="text-lg md:text-xl leading-relaxed opacity-80 max-w-md">
            &ldquo;I edit stories that move. From motion graphics and explainer
            videos to ads and cinematic color grades, I turn raw timelines into
            work that holds attention — frame by frame, beat by beat.&rdquo;
          </p>

          <div className="mt-4 space-y-2">
            <a
              href="mailto:sushant730181@gmail.com"
              className="block text-aurora-soft hover:underline decoration-1 underline-offset-4"
            >
              sushant730181@gmail.com
            </a>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/aarambh_0/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-aurora-soft hover:text-black transition-colors cursor-pointer"
              >
                IG
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Education, Skills, Expertise */}
        <div ref={rightColRef} className="flex flex-col justify-center gap-12">
          {/* Education */}
          <div className="space-y-4">
            <h4 className="text-2xl font-serif text-aurora italic">
              Education
            </h4>
            <div className="border-l-2 border-aurora-soft/30 pl-6 py-2">
              <h5 className="text-xl font-bold">MBA</h5>
              <p className="opacity-70">Chandigarh University</p>
              <span className="text-sm opacity-50 block mt-1">2026</span>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h4 className="text-2xl font-serif text-aurora italic">
              Skills
            </h4>
            <ul className="flex flex-wrap gap-3">
              {[
                "Premiere Pro",
                "After Effects",
                "DaVinci Resolve",
                "CapCut",
                "Photoshop",
                "Lightroom",
              ].map((skill) => (
                <li
                  key={skill}
                  className="px-4 py-2 border border-white/20 rounded-full hover:border-aurora-soft hover:text-aurora-soft transition-colors cursor-default text-sm tracking-wide"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div className="space-y-4">
            <h4 className="text-2xl font-serif text-aurora italic">
              Expertise
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {[
                "Video Editing",
                "Motion Graphics",
                "Color Grading",
                "Cinematography",
                "Photography",
              ].map((exp) => (
                <li
                  key={exp}
                  className="group flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <span className="w-2 h-2 bg-aurora-soft rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                  <span className="text-lg">{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
