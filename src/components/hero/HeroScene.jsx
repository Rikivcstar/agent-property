import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Torus, Box, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

function FloatingCore() {
  const sphereRef = useRef();
  const torusRef = useRef();
  const torus2Ref = useRef();
  const boxRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.2;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.4;
      torusRef.current.rotation.y = t * 0.2;
    }
    if (torus2Ref.current) {
      torus2Ref.current.rotation.x = -t * 0.3;
      torus2Ref.current.rotation.z = t * 0.4;
    }
    if (boxRef.current) {
      boxRef.current.rotation.x = t * 0.5;
      boxRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group>
      {/* Central distorted sphere */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere ref={sphereRef} args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#1e40af"
            attach="material"
            distort={0.45}
            speed={2}
            roughness={0}
            metalness={0.8}
            emissive="#1d4ed8"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      {/* Outer ring 1 */}
      <Torus ref={torusRef} args={[2.2, 0.06, 16, 100]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#3b82f6"
          emissiveIntensity={1}
          metalness={1}
          roughness={0.1}
        />
      </Torus>

      {/* Outer ring 2 */}
      <Torus ref={torus2Ref} args={[1.7, 0.04, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0.1}
        />
      </Torus>

      {/* Floating boxes */}
      <Float speed={3} floatIntensity={1.5} rotationIntensity={1}>
        <Box ref={boxRef} args={[0.3, 0.3, 0.3]} position={[2.5, 0.5, 0]}>
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#d97706"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
      </Float>

      <Float speed={2.5} floatIntensity={1.2} rotationIntensity={0.8}>
        <Box args={[0.2, 0.2, 0.2]} position={[-2.8, -0.8, 0]}>
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#2563eb"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
      </Float>

      <Float speed={1.8} floatIntensity={1} rotationIntensity={1.2}>
        <Sphere args={[0.15, 16, 16]} position={[1.8, -2, 0.5]}>
          <meshStandardMaterial
            color="#60a5fa"
            emissive="#60a5fa"
            emissiveIntensity={1.5}
            metalness={1}
            roughness={0}
          />
        </Sphere>
      </Float>

      <Float speed={2.2} floatIntensity={0.8}>
        <Sphere args={[0.1, 16, 16]} position={[-1.5, 2.2, 0.3]}>
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#f59e0b"
            emissiveIntensity={2}
            metalness={1}
            roughness={0}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#3b82f6" />
      <pointLight position={[-5, -5, -5]} intensity={1.5} color="#f59e0b" />
      <pointLight position={[0, 5, -5]} intensity={1} color="#ffffff" />
      <Suspense fallback={null}>
        <FloatingCore />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
