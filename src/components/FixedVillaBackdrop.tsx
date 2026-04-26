import { useEffect, useRef, useState } from "react";
import villaInteriorTour from "@/assets/villa-interior-tour.mp4";
import { LuxuryParticles } from "@/components/three/LuxuryParticles";

/**
 * Full-page video backdrop. Sits behind every immersive section so the
 * Mediterranean / Provençal interior keeps playing all the way down,
 * up to the point where an opaque section (Founder / Properties) takes
 * over visually.
 *
 * Implementation:
 *  • position: fixed, z-0 — always covers the viewport
 *  • the video pauses once the page has scrolled past `hideAfterRef`
 *    (an IntersectionObserver sentinel) so we don't burn CPU when the
 *    video is fully covered by opaque downstream sections.
 *  • cinematic colour grade, grain and gold dust live here too so that
 *    every immersive section gets the same look without duplicating
 *    overlays.
 */

interface FixedVillaBackdropProps {
  /** Element id of the first opaque section. The backdrop pauses once
   *  that element fully fills the viewport (saves CPU on long pages). */
  hideAfterId?: string;
}

export const FixedVillaBackdrop = ({ hideAfterId }: FixedVillaBackdropProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!hideAfterId || typeof window === "undefined") return;
    const target = document.getElementById(hideAfterId);
    if (!target) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Once the opaque section is filling most of the viewport,
          // pause the video; resume when it leaves.
          setPaused(e.intersectionRatio > 0.6);
        }
      },
      { threshold: [0, 0.6, 1] },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [hideAfterId]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else void v.play().catch(() => undefined);
  }, [paused]);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
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
          filter: "saturate(1.12) brightness(0.78) contrast(1.1)",
        }}
      >
        <source src={villaInteriorTour} type="video/mp4" />
      </video>

      {/* Cinematic dark + tone-mapping overlay */}
      <div className="absolute inset-0 bg-[hsl(222,35%,8%)]/55 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(222,35%,12%)]/40 via-transparent to-[hsl(222,35%,8%)]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,12,24,0.7)_100%)]" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>\")",
        }}
      />

      {/* Drifting gold dust */}
      <LuxuryParticles className="absolute inset-0" density="medium" />
    </div>
  );
};

export default FixedVillaBackdrop;
