import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold progress bar at the top of the viewport.
 * Hugs scroll position with a spring for a luxe, weighty feel.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-transparent via-gold to-gold-light"
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
