import Hero from "./components/Hero";
import FeaturedShowreel from "./components/FeaturedShowreel";
import AboutSection from "./components/AboutSection";
import ShowcaseVideos from "./components/ShowcaseVideos";
import MarqueeCTA from "./components/MarqueeCTA";

/**
 * Home — composes the portfolio sections in priority order:
 * hero → featured new edit → about → showcase (new work first, cinematography last) → contact CTA.
 * Section components are client-side; this page is a server component.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedShowreel />
      <AboutSection />
      <ShowcaseVideos />
      <MarqueeCTA />
    </>
  );
}
