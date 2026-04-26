import { useRef, type ReactNode, type HTMLAttributes } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Max tilt in degrees on each axis */
  intensity?: number;
  /** When true, adds a subtle gold glare that follows the cursor */
  glare?: boolean;
}

/**
 * 3D-tilt card. Tracks pointer over the element and rotates on X/Y in CSS,
 * with a soft spring so it feels weighty rather than twitchy. Falls back to
 * a flat card when the user prefers reduced motion.
 */
export const TiltCard = ({
  children,
  intensity = 8,
  glare = true,
  className,
  ...rest
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={cn("relative will-change-transform", className)}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY] as never,
              ([gx, gy]: string[]) =>
                `radial-gradient(circle at ${gx} ${gy}, hsl(var(--gold) / 0.35), transparent 55%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
