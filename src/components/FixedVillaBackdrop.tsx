import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import villaInteriorTour from "@/assets/villa-interior-tour.mp4";

/**
 * Full-page video backdrop, *scroll-scrubbed*.
 *
 *  • position: fixed, z-0 — covers the viewport for the whole page
 *  • the video does NOT autoplay/loop. Its `currentTime` is driven
 *    directly by `window.scrollYProgress` so the visitor genuinely
 *    "moves through" the property as they scroll: forward when they
 *    descend, backward when they go back up.
 *  • a sun-drenched warm grade is applied via CSS filter, with
 *    only a soft bottom dim so the rest of the page reads.
 *
 * Note on scrub fluidity: the bundled mp4 is encoded with default
 * keyframe spacing, so seeking has slight latency between keyframes
 * — acceptable on modern browsers, ultra smooth on Chrome/Edge.
 */
export const FixedVillaBackdrop = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readyRef = useRef(false);
  const { scrollYProgress } = useScroll();

  // Pause autoplay attempts and prep the video for manual seeking.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      readyRef.current = true;
      v.pause();
    };
    v.addEventListener("loadedmetadata", onMeta);
    // Some browsers refuse to seek before any play() — kick it once.
    void v.play().then(() => v.pause()).catch(() => undefined);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // Sync currentTime to scroll progress. Throttled inside requestAnimationFrame
  // via framer-motion's motion-value subscription.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const v = videoRef.current;
    if (!v || !readyRef.current || !Number.isFinite(v.duration)) return;
    const target = latest * v.duration;
    // Only seek if the delta is large enough — avoids spamming the decoder.
    if (Math.abs(v.currentTime - target) > 0.04) {
      try {
        v.currentTime = target;
      } catch {
        /* seek can throw mid-load; ignored */
      }
    }
  });

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        // No autoplay, no loop — the scroll drives the timeline
        className="w-full h-full object-cover"
        style={{
          // Sun-drenched Provence: warmer, more saturated, only slightly dimmed
          filter:
            "saturate(1.22) brightness(0.94) contrast(1.06) hue-rotate(-3deg)",
        }}
      >
        <source src={villaInteriorTour} type="video/mp4" />
      </video>

      {/* Warm Provence wash */}
      <div className="absolute inset-0 bg-[hsl(35,55%,55%)]/12 mix-blend-soft-light" />
      {/* Subtle bottom dim only — keeps the centre bright & sunny */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(222,35%,12%)]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(8,12,24,0.35)_100%)]" />
    </div>
  );
};

export default FixedVillaBackdrop;
