"use client";

import { useRef, useState } from "react"; // native hooks
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeader from "./SectionHeader";
import VideoCard from "./VideoCard";
import VideoCarousel from "./VideoCarousel";
import AuroraBackground from "./AuroraBackground";
import {
  CATEGORY_ORDER,
  CATEGORY_META,
  getVideosByCategory,
} from "../data/videos"; // data (segregated)
import type { VideoCategory } from "../data/videos";

gsap.registerPlugin(ScrollTrigger);

/**
 * ShowcaseVideos — thin orchestrator for all showcase categories.
 * Maps over CATEGORY_ORDER and delegates each category to the right
 * layout (grid of VideoCards or a VideoCarousel). Cinematography is
 * special-cased: its vertical clips go in a grid, landscapes in a carousel.
 */
export default function ShowcaseVideos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from(".section-header", {
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
      gsap.utils.toArray<HTMLElement>(".video-item").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
        });
      });
    },
    { scope: containerRef },
  );

  const handleToggle = (id: string) =>
    setActiveVideoId((prev) => (prev === id ? null : id));

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="relative w-full bg-[#0a0a0f] text-[#f5f5f7] py-24 px-4 md:px-8 flex flex-col items-center gap-32 overflow-hidden"
    >
      {CATEGORY_ORDER.map((category, i) => (
        <div key={category} className="relative w-full">
          <AuroraBackground
            src={i % 2 === 0 ? "/aurora/aurora-1.png" : "/aurora/aurora-2.png"}
            imageOpacity={0.25}
            overlayOpacity={0.78}
          />
          <CategorySection
            category={category}
            activeVideoId={activeVideoId}
            onToggle={handleToggle}
          />
        </div>
      ))}
    </section>
  );
}

/**
 * CategorySection — picks the right layout for a single category.
 * - cinematography: vertical grid + landscape carousel (split by orientation)
 * - motion-graphics: uniform landscape grid
 * - explainer / ads: carousel (mixed orientations)
 */
function CategorySection({
  category,
  activeVideoId,
  onToggle,
}: {
  category: VideoCategory;
  activeVideoId: string | null;
  onToggle: (id: string) => void;
}) {
  const meta = CATEGORY_META[category];
  const videos = getVideosByCategory(category);

  if (category === "cinematography") {
    const vertical = videos.filter((v) => v.orientation === "vertical");
    const landscape = videos.filter((v) => v.orientation === "landscape");
    return (
      <div className="relative z-10 max-w-7xl w-full flex flex-col gap-16">
        <div className="section-header">
          <SectionHeader {...meta} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {vertical.map((v) => (
            <div key={v.id} className="w-full max-w-sm video-item">
              <VideoCard
                video={v}
                activeVideoId={activeVideoId}
                onToggle={() => onToggle(v.id)}
              />
            </div>
          ))}
        </div>
        <VideoCarousel videos={landscape} />
      </div>
    );
  }

  if (category === "motion-graphics") {
    return (
      <div className="relative z-10 max-w-7xl w-full flex flex-col gap-16">
        <div className="section-header">
          <SectionHeader {...meta} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((v) => (
            <div key={v.id} className="video-item">
              <VideoCard
                video={v}
                activeVideoId={activeVideoId}
                onToggle={() => onToggle(v.id)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // explainer & ads: mixed orientations → carousel
  return (
    <div className="relative z-10 w-full flex flex-col gap-16">
      <div className="section-header">
        <SectionHeader {...meta} />
      </div>
      <VideoCarousel videos={videos} />
    </div>
  );
}
