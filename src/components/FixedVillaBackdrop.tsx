import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import villaInteriorTour from "@/assets/villa-interior-tour.mp4";

/**
 * Full-page video backdrop. The video plays naturally in autoplay+loop
 * (smooth, no scrubbing overhead), but the scroll progress drives a
 * Ken-Burns scale so it feels like you're "diving in" as you descend.
 *
 *  • position: fixed, z-0 — covers the whole viewport throughout
 *  • playbackRate slowed to 0.7 for a cinematic, contemplative pace
 *  • sun-drenched warm grade (saturate / slight hue shift), only soft
 *    bottom dim so the page reads
 *  • no in-canvas particles here — everything is GPU-cheap CSS
 */
export const FixedVillaBackdrop = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  // Slow the playback once metadata is loaded — gives a luxurious,
  // contemplative pace versus the slightly frantic 30 fps default.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onMeta = () => {
      v.playbackRate = 0.7;
    };
    v.addEventListener("loadedmetadata", onMeta);
    return () => v.removeEventListener("loadedmetadata", onMeta);
  }, []);

  // Ken-Burns: a gentle continuous zoom across the whole page scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.18]);
  const yShift = useTransform(scrollYProgress, [0, 1], ["0%", "-4%"]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale, y: yShift, transformOrigin: "50% 50%" }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{
            filter:
              "saturate(1.22) brightness(0.94) contrast(1.06) hue-rotate(-3deg)",
          }}
        >
          <source src={villaInteriorTour} type="video/mp4" />
        </video>
      </motion.div>

      {/* Warm Provence wash — keeps the centre bright */}
      <div className="absolute inset-0 bg-[hsl(35,55%,55%)]/12 mix-blend-soft-light" />
      {/* Subtle bottom dim only */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(222,35%,12%)]/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(8,12,24,0.35)_100%)]" />
    </div>
  );
};

export default FixedVillaBackdrop;
