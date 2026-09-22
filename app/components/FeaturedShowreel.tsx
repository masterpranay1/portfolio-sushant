"use client";

import { useRef, useState } from "react"; // native hooks
import { Volume2, VolumeX } from "lucide-react";
import { FEATURED_VIDEOS } from "../data/videos"; // data (segregated)
import type { VideoItem } from "../data/videos";
import AuroraBackground from "./AuroraBackground";

/**
 * FeaturedShowreel — showcases the featured videos right after the hero.
 * Renders a duo side-by-side on desktop (stacked on mobile); each card
 * keeps its native orientation (portrait or landscape). Both autoplay
 * muted; clicking one card's unmute unmutes it and mutes the other, so
 * only one plays audio at a time. Featured clips are configurable via
 * FEATURED_VIDEOS in videos.ts.
 */
export default function FeaturedShowreel() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleToggle = (id: string) =>
    setPlayingId((prev) => (prev === id ? null : id));

  return (
    <section
      id="featured"
      className="relative w-full overflow-hidden bg-[#0a0a0f] py-24 px-4 md:px-8"
    >
      <AuroraBackground src="/aurora/aurora-1.png" imageOpacity={0.3} overlayOpacity={0.75} />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10">
        <div className="text-center">
          <span className="block text-xs font-semibold tracking-[0.3em] uppercase text-aurora-soft mb-3">
            Featured Work
          </span>
          <h2 className="text-3xl font-bold tracking-tighter text-white md:text-5xl">
            Selected Edits
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 items-center gap-6 md:grid-cols-2">
          {FEATURED_VIDEOS.map((video) => (
            <FeaturedCard
              key={video.id}
              video={video}
              isPlaying={playingId === video.id}
              onToggle={() => handleToggle(video.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * FeaturedCard — a single featured video tile. Adapts its frame to the
 * clip's native orientation. Autoplay muted; unmutes on click.
 */
function FeaturedCard({
  video,
  isPlaying,
  onToggle,
}: {
  video: VideoItem;
  isPlaying: boolean;
  onToggle: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVertical = video.orientation === "vertical";

  return (
    <div
      className={`relative ${
        isVertical
          ? "aspect-9/16 w-full max-w-[320px] mx-auto"
          : "aspect-video w-full"
      } overflow-hidden rounded-3xl glass-card aurora-ring`}
    >
      <video
        ref={videoRef}
        src={video.src}
        muted={!isPlaying}
        loop
        playsInline
        autoPlay
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-5 left-5 z-20">
        <span className="text-sm font-semibold tracking-wide text-white/90">
          {video.title}
        </span>
      </div>

      <button
        onClick={onToggle}
        aria-label={isPlaying ? "Mute" : "Unmute"}
        className={`absolute bottom-5 right-5 z-20 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? "bg-aurora-soft text-black shadow-[0_0_20px_rgba(167,139,250,0.4)]"
            : "bg-black/40 text-white hover:bg-aurora-soft hover:text-black"
        }`}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
