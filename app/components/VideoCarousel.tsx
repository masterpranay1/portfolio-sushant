"use client";

import { useEffect, useRef, useState } from "react"; // native hooks
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import type { VideoItem } from "../data/videos"; // data (segregated)

interface VideoCarouselProps {
  videos: VideoItem[];
}

/**
 * VideoCarousel — reusable slide carousel for a category's videos.
 * Handles mixed orientations via object-contain in a fixed-height stage
 * (vertical and landscape clips both fit without cropping). Plays only
 * the current slide; aurora-themed controls and progress indicators.
 */
export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setIsPlaying(false);
    setCurrentIndex(index);
  };
  const nextSlide = () => goTo((currentIndex + 1) % videos.length);
  const prevSlide = () => goTo((currentIndex - 1 + videos.length) % videos.length);

  // Play current slide, pause the rest.
  useEffect(() => {
    videoRefs.current.forEach((v) => v?.pause());
    const current = videoRefs.current[currentIndex];
    if (current) {
      current.currentTime = 0;
      current.muted = !isPlaying;
      current.play().catch(() => {});
    }
  }, [currentIndex, isPlaying]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".carousel-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
      );
    },
    { scope: containerRef, dependencies: [currentIndex] },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto h-[60vh] md:h-[72vh] group"
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={video.src}
              loop
              playsInline
              muted={!isPlaying}
              className="w-full h-full object-contain bg-black/40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="carousel-content absolute bottom-0 left-0 p-8 md:p-16 z-20 w-full md:w-2/3">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
            {videos[currentIndex].title}
          </h3>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isPlaying
                ? "bg-aurora-soft text-black"
                : "bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20"
            }`}
          >
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span>{isPlaying ? "Sound On" : "Sound Off"}</span>
          </button>
        </div>

        {/* Nav buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous"
          className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full glass-card flex items-center justify-center text-white hover:bg-aurora-soft hover:text-black hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next"
          className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full glass-card flex items-center justify-center text-white hover:bg-aurora-soft hover:text-black hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={28} />
        </button>

        {/* Progress indicators */}
        <div className="absolute top-8 right-8 z-30 flex items-center gap-2">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-12 bg-aurora-soft"
                  : "w-4 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
