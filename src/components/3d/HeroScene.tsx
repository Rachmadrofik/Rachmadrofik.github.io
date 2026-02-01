import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NeuralNetwork = ({ count = 200, connectionsDistance = 1.2 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse, viewport } = useThree();

  // Generate random particles
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random position within view
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5; // Depth

      // Random velocity
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [pos, vel];
  }, [count]);

  // Buffer geometry for lines
  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxConnections = count * count; // Worst case
    const positions = new Float32Array(maxConnections * 3);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsAttribute = pointsRef.current.geometry.attributes.position;
    
    // Update particle positions based on velocity and mouse interaction
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Basic movement
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Mouse interaction (gentle attraction)
      const mx = (mouse.x * viewport.width) / 2;
      const my = (mouse.y * viewport.height) / 2;
      
      // Boundary check - bounce back
      if (positions[i3] > 5 || positions[i3] < -5) velocities[i3] *= -1;
      if (positions[i3 + 1] > 5 || positions[i3 + 1] < -5) velocities[i3 + 1] *= -1;
      if (positions[i3 + 2] > 2 || positions[i3 + 2] < -2) velocities[i3 + 2] *= -1;

      // Update geometry
      positionsAttribute.setXYZ(i, positions[i3], positions[i3 + 1], positions[i3 + 2]);
    }
    positionsAttribute.needsUpdate = true;

    // Create connections (lines)
    const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
    let lineIndex = 0;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionsDistance) {
          // Point A
          linePositions[lineIndex++] = positions[i * 3];
          linePositions[lineIndex++] = positions[i * 3 + 1];
          linePositions[lineIndex++] = positions[i * 3 + 2];
          
          // Point B
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
    <>
      {/* Particles */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00d4ff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

      {/* Connections */}
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#667eea" transparent opacity={0.15} depthWrite={false} />
      </lineSegments>
    </>
  );
};

const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
        <NeuralNetwork count={120} connectionsDistance={1.5} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
