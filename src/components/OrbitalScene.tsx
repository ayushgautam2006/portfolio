"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

// ─── Orbital Ring ───────────────────────────────────────

function OrbitRing({
  radius,
  speed,
  color,
  opacity = 0.12,
}: {
  radius: number;
  speed: number;
  color: string;
  opacity?: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed;
    }
  });

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
      );
    }
    return pts;
  }, [radius]);

  return (
    <group ref={ref}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(points.flatMap((p) => [p.x, p.y, p.z])), 3]}
            count={points.length}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </line>
    </group>
  );
}

// ─── Orbiting Marker ────────────────────────────────────

function OrbitalMarker({
  radius,
  speed,
  size = 0.06,
  color,
  offset = 0,
}: {
  radius: number;
  speed: number;
  size?: number;
  color: string;
  offset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime() * speed + offset;
      ref.current.position.x = Math.cos(t) * radius;
      ref.current.position.y = Math.sin(t) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

// ─── Floating Particles ─────────────────────────────────

function Particles({ count = 80 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF5A00"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Center Glow ────────────────────────────────────────

function CenterGlow() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      ref.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={ref}>
      <circleGeometry args={[0.15, 32]} />
      <meshBasicMaterial color="#FF5A00" transparent opacity={0.6} />
    </mesh>
  );
}

// ─── Scene Content ──────────────────────────────────────

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
      groupRef.current.rotation.y =
        Math.cos(clock.getElapsedTime() * 0.08) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center dot */}
      <CenterGlow />

      {/* Concentric orbit rings */}
      <OrbitRing radius={0.8} speed={0.15} color="#FF5A00" opacity={0.15} />
      <OrbitRing radius={1.4} speed={-0.08} color="#FF5A00" opacity={0.1} />
      <OrbitRing radius={2.0} speed={0.05} color="#FF5A00" opacity={0.07} />
      <OrbitRing radius={2.8} speed={-0.03} color="#FF5A00" opacity={0.05} />

      {/* Orbiting markers */}
      <OrbitalMarker radius={0.8} speed={0.4} size={0.05} color="#FF5A00" offset={0} />
      <OrbitalMarker radius={1.4} speed={-0.25} size={0.07} color="#FF8C42" offset={2} />
      <OrbitalMarker radius={2.0} speed={0.18} size={0.04} color="#FF5A00" offset={4} />
      <OrbitalMarker radius={2.0} speed={0.18} size={0.03} color="#C2410C" offset={1} />
      <OrbitalMarker radius={2.8} speed={-0.1} size={0.06} color="#FF6B2C" offset={3} />

      {/* Crosshair lines */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([-3.5, 0, 0, 3.5, 0, 0]), 3]}
            count={2}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FF5A00" transparent opacity={0.04} />
      </line>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([0, -3.5, 0, 0, 3.5, 0]), 3]}
            count={2}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FF5A00" transparent opacity={0.04} />
      </line>

      {/* Floating particles */}
      <Particles count={60} />
    </group>
  );
}

// ─── Exported Canvas ────────────────────────────────────

export default function OrbitalScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <Scene />
      </Canvas>
    </div>
  );
}
