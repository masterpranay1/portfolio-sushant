/**
 * videos.ts — single source of truth for all showcase video metadata.
 * Each item describes a clip, its category section, and native orientation
 * (which drives the card aspect ratio). Components never hardcode paths.
 */

export type VideoCategory =
  | "cinematography"
  | "motion-graphics"
  | "explainer"
  | "ads";

export type VideoOrientation = "vertical" | "landscape";

export interface VideoItem {
  id: string;
  src: string;
  title: string;
  category: VideoCategory;
  orientation: VideoOrientation;
}

export interface CategoryMeta {
  category: VideoCategory;
  eyebrow: string;
  title: string;
  subtitle: string;
}

/** Sections render in this order — new editing work first, cinematography last. */
export const CATEGORY_ORDER: VideoCategory[] = [
  "motion-graphics",
  "explainer",
  "ads",
  "cinematography",
];

export const CATEGORY_META: Record<VideoCategory, CategoryMeta> = {
  cinematography: {
    category: "cinematography",
    eyebrow: "Where it started",
    title: "Cinematography",
    subtitle: "Frames, motion, and light — the original craft.",
  },
  "motion-graphics": {
    category: "motion-graphics",
    eyebrow: "Designed in motion",
    title: "Motion Graphics",
    subtitle: "Type, shape, and rhythm animated into life.",
  },
  explainer: {
    category: "explainer",
    eyebrow: "Ideas made clear",
    title: "Explainer Videos",
    subtitle: "Complex stories told in simple, moving frames.",
  },
  ads: {
    category: "ads",
    eyebrow: "Built to convert",
    title: "Ads & Commercials",
    subtitle: "Scroll-stopping spots for brands and products.",
  },
};

/** Flat list of all showcase videos; orchestrator groups by `category`. */
export const VIDEOS: VideoItem[] = [
  // Cinematography (existing, kept)
  { id: "cine-1", src: "/showcase-videos/mobile/video1.mp4", title: "Vertical Story 1", category: "cinematography", orientation: "vertical" },
  { id: "cine-2", src: "/showcase-videos/mobile/video2.mp4", title: "Vertical Story 2", category: "cinematography", orientation: "vertical" },
  { id: "cine-3", src: "/showcase-videos/mobile/video6.mp4", title: "Vertical Story 3", category: "cinematography", orientation: "vertical" },
  { id: "cine-4", src: "/showcase-videos/landscape/video4.mp4", title: "Cinematic Journey 1", category: "cinematography", orientation: "landscape" },
  { id: "cine-5", src: "/showcase-videos/landscape/video5.mp4", title: "Cinematic Journey 2", category: "cinematography", orientation: "landscape" },
  { id: "cine-6", src: "/showcase-videos/landscape/video6.mp4", title: "Cinematic Journey 3", category: "cinematography", orientation: "landscape" },

  // Motion Graphics (new)
  { id: "mg-1", src: "/showcase-videos/edites/anim-420.mp4", title: "Anim 420", category: "motion-graphics", orientation: "landscape" },
  { id: "mg-2", src: "/showcase-videos/edites/glass-lq.mp4", title: "Glass", category: "motion-graphics", orientation: "landscape" },

  // Explainer Videos (new)
  { id: "exp-1", src: "/showcase-videos/edites/port-exp.mp4", title: "Portfolio Explainer", category: "explainer", orientation: "vertical" },
  { id: "exp-2", src: "/showcase-videos/edites/truth-of-life.mp4", title: "Truth of Life", category: "explainer", orientation: "vertical" },
  { id: "exp-3", src: "/showcase-videos/edites/seth-butler-aud.mp4", title: "Seth Butler", category: "explainer", orientation: "landscape" },

  // Ads & Commercials (new)
  { id: "ad-1", src: "/showcase-videos/edites/apple-commercial.mp4", title: "Apple Commercial", category: "ads", orientation: "landscape" },
  { id: "ad-2", src: "/showcase-videos/edites/netflix.mp4", title: "Netflix Style", category: "ads", orientation: "landscape" },
  { id: "ad-3", src: "/showcase-videos/edites/seedny.mp4", title: "Seedny", category: "ads", orientation: "vertical" },
];

/** Returns the subset of videos for a given category, preserving order. */
export function getVideosByCategory(category: VideoCategory): VideoItem[] {
  return VIDEOS.filter((video) => video.category === category);
}

/**
 * Featured showreel videos — shown large right after the hero to lead with new
 * editing work. Order matters (first is shown first). Change the ids to
 * feature different edits; orientations can mix (portrait + landscape).
 */
export const FEATURED_VIDEOS: VideoItem[] = ["ad-3", "ad-2"]
  .map((id) => VIDEOS.find((v) => v.id === id))
  .filter((v): v is VideoItem => Boolean(v));

/** True if a category mixes vertical and landscape orientations. */
export function isMixedOrientation(category: VideoCategory): boolean {
  const items = getVideosByCategory(category);
  return items.some((v) => v.orientation === "vertical") && items.some((v) => v.orientation === "landscape");
}
