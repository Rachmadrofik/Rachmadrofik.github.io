import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// --- EFFECT 1: NEURAL NETWORK (Original) ---
const NeuralNetwork = ({ count = 120, connectionsDistance = 1.5 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, [count]);

  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxConnections = count * count;
    const positions = new Float32Array(maxConnections * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;
    const positionsAttribute = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      if (positions[i3] > 5 || positions[i3] < -5) velocities[i3] *= -1;
      if (positions[i3 + 1] > 5 || positions[i3 + 1] < -5) velocities[i3 + 1] *= -1;
      if (positions[i3 + 2] > 2 || positions[i3 + 2] < -2) velocities[i3 + 2] *= -1;
      
      positionsAttribute.setXYZ(i, positions[i3], positions[i3 + 1], positions[i3 + 2]);
    }
    positionsAttribute.needsUpdate = true;

    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionsDistance) {
          linePositions[lineIndex++] = positions[i * 3];
          linePositions[lineIndex++] = positions[i * 3 + 1];
          linePositions[lineIndex++] = positions[i * 3 + 2];
          linePositions[lineIndex++] = positions[j * 3];
          linePositions[lineIndex++] = positions[j * 3 + 1];
          linePositions[lineIndex++] = positions[j * 3 + 2];
        }
      }
    }
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00d4ff" size={0.03} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
      </Points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#667eea" transparent opacity={0.15} depthWrite={false} />
      </lineSegments>
    </group>
  );
};

// --- EFFECT 2: STARFIELD (Space) ---
const StarField = () => {
  const ref = useRef<any>();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
};

// --- EFFECT 3: MATRIX RAIN (Digital) ---
const MatrixRain = ({ count = 100 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5; // z
      spd[i] = Math.random() * 0.05 + 0.02;
    }
    return [pos, spd];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positionsAttribute = pointsRef.current.geometry.attributes.position;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] -= speeds[i]; // Fall down
      
      if (positions[i3 + 1] < -5) {
        positions[i3 + 1] = 5; // Reset to top
        positions[i3] = (Math.random() - 0.5) * 10; // Random X
      }
      
      positionsAttribute.setXYZ(i, positions[i3], positions[i3 + 1], positions[i3 + 2]);
    }
    positionsAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
       <PointMaterial transparent color="#00ff41" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
    </Points>
  );
};

// --- MAIN SCENE MANAGER ---
const HeroScene: React.FC = () => {
  const [effectIndex, setEffectIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEffectIndex((prev) => (prev + 1) % 3);
    }, 15000); // Switch every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        {effectIndex === 0 && <NeuralNetwork />}
        {effectIndex === 1 && <StarField />}
        {effectIndex === 2 && <MatrixRain />}
      </Canvas>
      
      {/* Effect Label Indicator */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500 font-mono pointer-events-none opacity-50">
        System Mode: {effectIndex === 0 ? 'NEURAL_NET' : effectIndex === 1 ? 'DEEP_SPACE' : 'MATRIX_DATA'}
      </div>
    </div>
  );
};

export default HeroScene;
