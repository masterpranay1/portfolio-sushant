"use client";

import { useEffect, type RefObject } from "react";

interface UseVideoAutoplayOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLElement | null>;
  isFocused: boolean;
  /** True when another card in the grid is the focused one. */
  hasActivePeer?: boolean;
  /** Intersection ratio that triggers play (default 0.5). */
  threshold?: number;
}

/**
 * useVideoAutoplay — manages autoplay/pause/mute for a single video card
 * based on viewport intersection and focus state within a grid of videos.
 *
 * - Plays when scrolled into view (unless a peer is focused).
 * - Pauses when scrolled out of view.
 * - Unmutes when this card is focused; mutes otherwise.
 * - Pauses immediately if another card in the grid is focused.
 */
export function useVideoAutoplay({
  videoRef,
  containerRef,
  isFocused,
  hasActivePeer = false,
  threshold = 0.5,
}: UseVideoAutoplayOptions): void {
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // Another card is focused — pause this one and stop observing.
    if (hasActivePeer && !isFocused) {
      videoEl.pause();
      return;
    }

    // Mute/unmute based on focus; kick off playback if focused.
    videoEl.muted = !isFocused;
    if (isFocused) videoEl.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (hasActivePeer && !isFocused) return;
          if (entry.isIntersecting) videoEl.play().catch(() => {});
          else videoEl.pause();
        });
      },
      { threshold },
    );

    const container = containerRef.current;
    if (container) observer.observe(container);
    return () => {
      if (container) observer.unobserve(container);
    };
  }, [isFocused, hasActivePeer, threshold, videoRef, containerRef]);
}
