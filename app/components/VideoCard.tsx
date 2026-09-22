"use client";

import { useRef } from "react"; // native hooks
import { Volume2, VolumeX } from "lucide-react";
import { useVideoAutoplay } from "../hooks/useVideoAutoplay"; // custom hook (segregated)
import type { VideoItem } from "../data/videos"; // data (segregated)

interface VideoCardProps {
  video: VideoItem;
  activeVideoId: string | null;
  onToggle: () => void;
  className?: string;
}

/**
 * VideoCard — reusable autoplaying video tile for grid layouts.
 * Adapts its aspect ratio to the video's native orientation and uses
 * the shared useVideoAutoplay hook for play/pause/mute behaviour.
 * Aurora focus ring replaces the old flat yellow border.
 */
export default function VideoCard({
  video,
  activeVideoId,
  onToggle,
  className = "",
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isFocused = activeVideoId === video.id;
  const hasActivePeer = activeVideoId !== null && !isFocused;

  useVideoAutoplay({ videoRef, containerRef, isFocused, hasActivePeer });

  const aspectClass =
    video.orientation === "vertical" ? "aspect-9/16" : "aspect-video";

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${aspectClass} rounded-2xl overflow-hidden glass-card group transition-all duration-500 ${
        isFocused
          ? "aurora-ring scale-[1.02]"
          : "hover:-translate-y-2 hover:border-aurora-soft/30"
      } ${className}`}
    >
      <video
        ref={videoRef}
        src={video.src}
        muted={!isFocused}
        loop
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 pointer-events-none transition-opacity duration-500 ${
          isFocused ? "opacity-40" : "opacity-100"
        }`}
      />

      {/* Title */}
      <div className="absolute bottom-6 left-6 z-20">
        <span className="text-sm font-medium tracking-wide text-white/90">
          {video.title}
        </span>
      </div>

      {/* Sound toggle */}
      <button
        onClick={onToggle}
        aria-label={isFocused ? "Mute video" : "Unmute video"}
        className={`absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
          isFocused
            ? "bg-aurora-soft text-black shadow-[0_0_20px_rgba(167,139,250,0.4)]"
            : "bg-black/40 text-white hover:bg-aurora-soft hover:text-black"
        }`}
      >
        {isFocused ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}
