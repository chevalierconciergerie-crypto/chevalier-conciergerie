import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/**
 * Money-shot 3D rotating gold key — placed as its own cinematic section
 * near the end of the page. As the visitor scrolls into the section,
 * the key zooms in from far away, holds full-size in the middle, then
 * zooms back out — a deliberate "reveal" beat that turns the key
 * (the literal symbol of a conciergerie) into the brand statement.
 */

function KeyMesh() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.55;
    group.current.rotation.x = Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={group} scale={1.05}>
      {/* Bow (round head of the key) */}
      <mesh position={[0, 1.2, 0]}>
        <torusGeometry args={[0.55, 0.13, 24, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.18}
          emissive="#a8842a"
          emissiveIntensity={0.18}
        />
      </mesh>
      {/* Heraldic cross inside the bow */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.7, 0.06, 0.06]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.06, 0.7, 0.06]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
      </mesh>

      {/* Collar */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.16, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.18} />
      </mesh>

      {/* Shaft */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.085, 0.085, 1.4, 24]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
      </mesh>

      {/* Bit / blade */}
      <mesh position={[0.18, -0.85, 0]}>
        <boxGeometry args={[0.36, 0.42, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.22} />
      </mesh>
      {/* Teeth */}
      <mesh position={[0.32, -0.7, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[0.32, -0.92, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.22} />
      </mesh>

      {/* Inner emissive jewel */}
      <mesh position={[0, 1.2, 0.05]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#fff5d6" emissive="#ffd97a" emissiveIntensity={2.4} />
      </mesh>
    </group>
  );
}

export const RotatingGoldKey = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Zoom-in / hold / zoom-out across the section
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.6, 1], [0.35, 1.1, 1.1, 0.55]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 0.65, 1, 0.65, 0.25]);
  // Subtle reveal of the kicker text
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.25, 0.45], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "180vh" }}
      aria-label="La clé d'une conciergerie d'exception"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Soft radial glow behind the key */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--gold)/0.12)_0%,transparent_55%)] pointer-events-none" />

        {/* The key itself, scaling on scroll */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ scale, opacity }}
        >
          <div className="w-[480px] h-[680px] max-w-[80vw] max-h-[80vh]">
            <Canvas
              camera={{ position: [0, 0, 4.5], fov: 35 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              dpr={[1, 2]}
            >
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1.4} color="#fff5d6" />
              <directionalLight position={[-3, -2, 2]} intensity={0.45} color="#ffd97a" />
              <pointLight position={[0, 0, 3]} intensity={0.7} color="#ffd97a" />
              <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.5}>
                <KeyMesh />
              </Float>
              <Sparkles count={50} scale={4} size={2} speed={0.3} color="#f5d27a" opacity={0.6} />
              <Environment preset="sunset" />
            </Canvas>
          </div>
        </motion.div>

        {/* Editorial caption */}
        <motion.div
          className="absolute inset-x-0 bottom-[10%] flex flex-col items-center text-center pointer-events-none"
          style={{ opacity: textOpacity, y: textY }}
        >
          <div className="w-12 h-px bg-gold/60 mb-6" />
          <span className="font-sans text-[10px] md:text-xs tracking-[0.5em] uppercase text-gold/85 mb-5">
            Vous nous confiez
          </span>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-primary-foreground tracking-wide max-w-3xl px-6 [text-wrap:balance]">
            une seule chose,
            <br />
            <em className="text-gold not-italic">le reste suit.</em>
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default RotatingGoldKey;
