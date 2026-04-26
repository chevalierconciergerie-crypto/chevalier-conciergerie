import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Drifting gold-dust particles for luxury sections.
 * Pure CSS-trigger free — runs on a fixed RAF loop and pauses when offscreen via IntersectionObserver outside.
 */
function ParticleField({
  count = 800,
  size = 0.015,
  color = "#d4af37",
  spread = 8,
}: {
  count?: number;
  size?: number;
  color?: string;
  spread?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  // Pre-compute positions and per-particle drift offsets once
  const { positions, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    return { positions, offsets };
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const geo = ref.current.geometry as THREE.BufferGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Vertical drift + slight horizontal sway
      arr[ix + 1] += Math.sin(t * 0.3 + offsets[i]) * 0.0015;
      arr[ix] += Math.cos(t * 0.2 + offsets[i]) * 0.0008;
      // Wrap when out of bounds so the field stays infinite
      if (arr[ix + 1] > spread) arr[ix + 1] = -spread;
      if (arr[ix + 1] < -spread) arr[ix + 1] = spread;
    }
    pos.needsUpdate = true;
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

interface LuxuryParticlesProps {
  className?: string;
  density?: "low" | "medium" | "high";
  /** When true, the canvas accepts pointer events. Default false (purely visual). */
  interactive?: boolean;
}

export const LuxuryParticles = ({
  className = "absolute inset-0 -z-0 pointer-events-none",
  density = "medium",
  interactive = false,
}: LuxuryParticlesProps) => {
  const count = density === "low" ? 400 : density === "high" ? 1500 : 800;
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ pointerEvents: interactive ? "auto" : "none" }}
      >
        <ParticleField count={count} />
        <ParticleField count={Math.floor(count / 3)} size={0.025} color="#f5d27a" spread={6} />
      </Canvas>
    </div>
  );
};

export default LuxuryParticles;
