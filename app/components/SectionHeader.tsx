"use client";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

/**
 * SectionHeader — reusable aurora-gradient heading block.
 * Renders an eyebrow label, gradient title, and optional subtitle.
 * Used by every showcase category section for visual consistency.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <header className={`mb-16 max-w-2xl ${alignment}`}>
      {eyebrow && (
        <span className="block text-xs font-semibold tracking-[0.25em] uppercase text-aurora-soft mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-lg opacity-60 font-light tracking-wide">
          {subtitle}
        </p>
      )}
    </header>
  );
}
