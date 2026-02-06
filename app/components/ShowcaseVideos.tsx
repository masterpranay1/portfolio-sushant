"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type VideoType = "mobile" | "landscape";

interface VideoItem {
  id: number;
  src: string;
  type: VideoType;
  title?: string;
}

const MOBILE_VIDEOS: VideoItem[] = [
  {
    id: 1,
    src: "/showcase-videos/mobile/video1.mp4",
    type: "mobile",
    title: "Vertical Story 1",
  },
  {
    id: 2,
    src: "/showcase-videos/mobile/video2.mp4",
    type: "mobile",
    title: "Vertical Story 2",
  },
  {
    id: 3,
    src: "/showcase-videos/mobile/video6.mp4",
    type: "mobile",
    title: "Vertical Story 3",
  },
];

const LANDSCAPE_VIDEOS: VideoItem[] = [
  {
    id: 4,
    src: "/showcase-videos/landscape/video4.mp4",
    type: "landscape",
    title: "Cinematic Journey 1",
  },
  {
    id: 5,
    src: "/showcase-videos/landscape/video5.mp4",
    type: "landscape",
    title: "Cinematic Journey 2",
  },
  {
    id: 6,
    src: "/showcase-videos/landscape/video6.mp4",
    type: "landscape",
    title: "Cinematic Journey 3",
  },
];

export default function ShowcaseVideos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMobileVideoId, setActiveMobileVideoId] = useState<number | null>(
    null,
  );

  useGSAP(
    () => {
      // Animate Mobile Section
      const mobileVideos = gsap.utils.toArray(".mobile-video-item");
      mobileVideos.forEach((video: any, i) => {
        gsap.from(video, {
          scrollTrigger: {
            trigger: video,
            start: "top 85%",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1,
        });
      });

      // Animate Section Headers
      gsap.from(".section-header", {
        scrollTrigger: {
          trigger: ".mobile-grid",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
      });
    },
    { scope: containerRef },
  );

  const handleMobileToggle = (id: number) => {
    setActiveMobileVideoId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] text-[#ededed] py-24 px-4 md:px-8 flex flex-col items-center gap-32"
    >
      {/* MOBILE SECTION (GRID) */}
      <div className="max-w-7xl w-full mobile-grid">
        <header className="mb-16 text-center section-header">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#ffb703] mb-4">
            SHORTS & STORIES
          </h2>
          <p className="text-sm md:text-lg opacity-60 font-light tracking-wide max-w-xl mx-auto">
            Vertical moments captured in time.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {MOBILE_VIDEOS.map((video) => (
            <div key={video.id} className="w-full max-w-sm">
              <VideoCard
                video={video}
                activeVideoId={activeMobileVideoId}
                onToggle={() => handleMobileToggle(video.id)}
                className="mobile-video-item"
              />
            </div>
          ))}
        </div>
      </div>

      {/* LANDSCAPE SECTION (CAROUSEL) */}
      <div className="w-full">
        <header className="mb-16 text-center section-header">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#ffb703] mb-4">
            CINEMATIC WORKS
          </h2>
          <p className="text-sm md:text-lg opacity-60 font-light tracking-wide max-w-xl mx-auto">
            Immersive landscapes and storytelling in widescreen.
          </p>
        </header>

        <LandscapeCarousel videos={LANDSCAPE_VIDEOS} />
      </div>
    </section>
  );
}

// ---------------------------
// MOBILE VIDEO CARD COMPONENT
// ---------------------------
function VideoCard({
  video,
  activeVideoId,
  onToggle,
  className = "",
}: {
  video: VideoItem;
  activeVideoId: number | null;
  onToggle: () => void;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFocused = activeVideoId === video.id;

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (activeVideoId !== null && !isFocused) {
      videoEl.pause();
      return;
    }

    if (isFocused) {
      videoEl.play().catch(() => {});
      videoEl.muted = false;
    } else {
      videoEl.muted = true;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (activeVideoId !== null && !isFocused) return;
          if (entry.isIntersecting) {
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.5 },
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [activeVideoId, isFocused]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-9/16 bg-[#111] rounded-2xl overflow-hidden shadow-2xl group border border-white/5 transition-all duration-500 ${isFocused ? "border-[#ffb703] ring-1 ring-[#ffb703]/50 scale-[1.02]" : "hover:border-[#ffb703]/30 hover:-translate-y-2"} ${className}`}
    >
      <video
        ref={videoRef}
        src={video.src}
        muted={!isFocused}
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 pointer-events-none transition-opacity duration-500 ${isFocused ? "opacity-40" : "opacity-100"}`}
      />

      {/* Play/Sound Toggle */}
      <button
        onClick={onToggle}
        className={`absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${isFocused ? "bg-[#ffb703] text-black shadow-[0_0_20px_rgba(255,183,3,0.4)]" : "bg-black/40 text-white hover:bg-[#ffb703] hover:text-black"}`}
      >
        {isFocused ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}

// ---------------------------
// LANDSCAPE CAROUSEL COMPONENT
// ---------------------------
function LandscapeCarousel({ videos }: { videos: VideoItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Controls if the main carousel video is unmuted/focused
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  // Autoplay effect when slide changes
  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((v) => v?.pause());

    // Play current video (muted initially unless explicit play state)
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
      currentVideo.muted = !isPlaying;
    }
  }, [currentIndex, isPlaying]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".carousel-content",
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      );
    },
    { scope: containerRef, dependencies: [currentIndex] },
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[90rem] mx-auto h-[50vh] md:h-[70vh] group perspective-1000"
    >
      {/* Main Display */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/5 mx-auto transition-all duration-700">
        {/* Videos Stacked (Only visible one plays) */}
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <video
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              src={video.src}
              loop
              playsInline
              muted={!isPlaying} // Only unmuted if user opted in
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="carousel-content absolute bottom-0 left-0 p-8 md:p-16 z-20 w-full md:w-2/3">
          <div className="overflow-hidden">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
              {videos[currentIndex].title}
            </h3>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${isPlaying ? "bg-[#ffb703] text-black" : "bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20"}`}
            >
              {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
              <span>{isPlaying ? "Sound On" : "Sound Off"}</span>
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#ffb703] hover:text-black hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[-20px] group-hover:translate-x-0"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#ffb703] hover:text-black hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-[20px] group-hover:translate-x-0"
        >
          <ChevronRight size={28} />
        </button>

        {/* Progress Indicators */}
        <div className="absolute top-8 right-8 z-30 flex items-center gap-2">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-12 bg-[#ffb703]" : "w-4 bg-white/30 hover:bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
