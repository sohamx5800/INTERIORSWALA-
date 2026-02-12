import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Float, 
  Sparkles,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
  BakeShadows
} from '@react-three/drei';
import * as THREE from 'this-package-does-not-exist-using-global-instead';

const Mesh = 'mesh' as any;
const BoxGeometry = 'boxGeometry' as any;
const CylinderGeometry = 'cylinderGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const Group = 'group' as any;
const PointLight = 'pointLight' as any;
const MeshStandardMaterial = 'meshStandardMaterial' as any;
const PlaneGeometry = 'planeGeometry' as any;

const InteriorScene = () => {
  const groupRef = useRef<any>(null!);
  const tvRef = useRef<any>(null!);
  const { mouse } = useThree();

  // High-end Obsidian Black Material (maintained for contrast)
  const obsidianMaterial = useMemo(() => ({
    color: "#080808",
    metalness: 0.95,
    roughness: 0.05,
  }), []);

  const accentMaterial = useMemo(() => ({
    color: "#1FAE9B",
    metalness: 1,
    roughness: 0.05,
  }), []);

  useFrame((state) => {
    const scrollY = window.scrollY;
    const totalHeight = (document.body.scrollHeight - window.innerHeight) || 1;
    const scrollFactor = scrollY / totalHeight;
    
    if (groupRef.current) {
      // Smoother rotation following scroll and mouse
      const targetY = (mouse.x * 0.15) + (scrollFactor * Math.PI * 0.4);
      const targetX = (mouse.y * 0.08);
      
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
      
      // Vertical movement based on scroll - keeping it in view longer
      groupRef.current.position.y = -2.5 - (scrollFactor * 2.5);
    }

    if (tvRef.current) {
      tvRef.current.rotation.z = mouse.x * 0.02;
    }
  });

  return (
    <Group ref={groupRef} scale={1.5}>
      {/* --- ALMOST TRANSPARENT FLOOR --- */}
      <Mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <PlaneGeometry args={[60, 60]} />
        <MeshStandardMaterial 
          color="#000000" 
          transparent 
          opacity={0.08} 
          metalness={0.1} 
          roughness={1}
        />
      </Mesh>

      {/* --- PREMIUM FURNITURE MODELS (SOFA) --- */}
      <Group position={[0, 0, 0]}>
        <Mesh position={[0, 0.4, 0]}>
          <BoxGeometry args={[8, 0.8, 3.2]} />
          <MeshStandardMaterial {...obsidianMaterial} />
        </Mesh>
        <Mesh position={[0, 1.5, -1.3]}>
          <BoxGeometry args={[8, 1.7, 0.6]} />
          <MeshStandardMaterial {...obsidianMaterial} />
        </Mesh>
        {[-3.7, 3.7].map((x) => (
          <Mesh key={x} position={[x, 0.9, 0]}>
            <BoxGeometry args={[0.6, 1.3, 3.2]} />
            <MeshStandardMaterial {...obsidianMaterial} />
          </Mesh>
        ))}
        {/* Teal Accent Strip */}
        <Mesh position={[0, 0.02, 0]}>
           <BoxGeometry args={[8.2, 0.05, 3.3]} />
           <MeshStandardMaterial {...accentMaterial} />
        </Mesh>
      </Group>

      {/* --- MINIMALIST MEDIA UNIT --- */}
      <Group position={[0, 5, -5]} ref={tvRef}>
        <Mesh>
          <BoxGeometry args={[11, 6.2, 0.3]} />
          <MeshStandardMaterial color="#000000" metalness={0.5} roughness={0.8} />
        </Mesh>
        <Mesh position={[0, 0, 0.2]}>
          <BoxGeometry args={[10.8, 5.9, 0.01]} />
          <MeshStandardMaterial 
            color="#050505" 
            metalness={1} 
            roughness={0.01} 
            envMapIntensity={8} 
          />
        </Mesh>
      </Group>

      {/* --- DESIGNER DESK --- */}
      <Group position={[-6, 0, 2]}>
        <Mesh position={[0, 1.3, 0]}>
          <BoxGeometry args={[4, 0.1, 2.5]} />
          <MeshStandardMaterial {...obsidianMaterial} metalness={1} />
        </Mesh>
        {[-1.8, 1.8].map((x) => (
          <Mesh key={x} position={[x, 0.65, 0]}>
            <CylinderGeometry args={[0.03, 0.03, 1.3]} />
            <MeshStandardMaterial color="#1a1a1a" metalness={1} />
          </Mesh>
        ))}
      </Group>

      {/* --- STUDIO LAMP --- */}
      <Group position={[6, 0, 2]}>
        <Mesh position={[0, 2.5, 0]}>
          <CylinderGeometry args={[0.05, 0.05, 5, 8]} />
          <MeshStandardMaterial color="#111111" metalness={1} />
        </Mesh>
        <Mesh position={[0, 5, 0]}>
          <CylinderGeometry args={[0.9, 1.3, 1.8, 20]} />
          <MeshStandardMaterial color="#000000" roughness={0.9} />
        </Mesh>
      </Group>
    </Group>
  );
};

const Scene3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
      <Canvas 
        shadows={false}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 22]} fov={30} />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <BakeShadows />
        
        <AmbientLight intensity={4.5} />
        <PointLight position={[20, 25, 20]} intensity={12} color="#ffffff" />
        <PointLight position={[-20, 15, 5]} intensity={6} color="#1FAE9B" />
        
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.02}>
            <InteriorScene />
          </Float>
          <Sparkles 
            count={30}
            scale={45} 
            size={1.8} 
            speed={0.4} 
            color="#1FAE9B" 
            opacity={0.2} 
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;