import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    // Add hover effect listeners
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (isHovering) {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(follower, {
        scale: 2,
        backgroundColor: "rgba(167, 139, 250, 0.15)",
        duration: 0.2,
      });
    } else {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        duration: 0.2,
      });
    }
  }, [isHovering]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-aurora-soft rounded-full pointer-events-none z-[9998]"
      />
    </>
  );
}
