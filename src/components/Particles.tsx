import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from '../store';

const PARTICLE_COUNT = 10000;

export const Particles: React.FC = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-calculate target shapes for particles
  const { positionsHuman, positionsBrain, positionsDNA } = useMemo(() => {
    const human = new Float32Array(PARTICLE_COUNT * 3);
    const brain = new Float32Array(PARTICLE_COUNT * 3);
    const dna = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // 1. Human Silhouette
      const isHead = Math.random() > 0.85;
      if (isHead) {
        const rh = 1.2 * Math.cbrt(Math.random());
        const th = Math.random() * 2 * Math.PI;
        const ph = Math.acos(2 * Math.random() - 1);
        human[i3] = rh * Math.sin(ph) * Math.cos(th);
        human[i3 + 1] = 4 + rh * Math.cos(ph); // Head height
        human[i3 + 2] = rh * Math.sin(ph) * Math.sin(th);
      } else {
        const rt = 2.5 * Math.sqrt(Math.random());
        const tt = Math.random() * 2 * Math.PI;
        const yPos = (Math.random() - 0.5) * 6; 
        const taper = Math.max(0.1, 1 - Math.abs(yPos + 1) * 0.15); // Shoulders wider than waist
        human[i3] = rt * Math.cos(tt) * taper;
        human[i3 + 1] = yPos;
        human[i3 + 2] = (rt * Math.sin(tt)) * 0.5 * taper; // Flatter chest/back
      }

      // 2. Mind / Brain
      const rb = 3 * Math.cbrt(Math.random());
      const tb = Math.random() * 2 * Math.PI;
      const pb = Math.acos(2 * Math.random() - 1);
      let bx = rb * Math.sin(pb) * Math.cos(tb);
      let by = rb * Math.cos(pb) * 0.8; // flatten vertically
      let bz = rb * Math.sin(pb) * Math.sin(tb) * 1.2; // elongate front-to-back
      // create a gap between hemispheres (x axis)
      if (bx > 0) bx += 0.2; else bx -= 0.2;
      brain[i3] = bx;
      brain[i3 + 1] = by;
      brain[i3 + 2] = bz;

      // 3. DNA
      const isBridge = Math.random() > 0.7;
      const tDNA = Math.random() * Math.PI * 10; // 5 turns
      const radiusDNA = 2;
      const heightDNA = (tDNA / (Math.PI * 10)) * 14 - 7;
      
      if (isBridge) {
        // Particles between the two helices
        const bridgeX = (Math.random() * 2 - 1) * radiusDNA;
        dna[i3] = bridgeX * Math.cos(tDNA);
        dna[i3 + 1] = heightDNA;
        dna[i3 + 2] = bridgeX * Math.sin(tDNA);
      } else {
        // Main strands
        const strand = Math.random() > 0.5 ? 1 : -1;
        const offset = Math.random() * 0.3; // thickness of strand
        dna[i3] = (radiusDNA + offset) * Math.cos(tDNA + (strand === 1 ? 0 : Math.PI));
        dna[i3 + 1] = heightDNA + (Math.random() - 0.5) * 0.2;
        dna[i3 + 2] = (radiusDNA + offset) * Math.sin(tDNA + (strand === 1 ? 0 : Math.PI));
      }
    }
    return { positionsHuman: human, positionsBrain: brain, positionsDNA: dna };
  }, []);

  const currentPositions = useRef(new Float32Array(positionsHuman));

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const scene = scrollState.currentScene;
    const time = state.clock.getElapsedTime();

    let targetPositions = positionsHuman; // Scene 1, 2
    if (scene === 3 || scene === 4) targetPositions = positionsBrain; // Scene 3, 4
    else if (scene >= 5) targetPositions = positionsDNA; // Scene 5, 6

    // Smooth transition
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      // Noise
      const noiseX = Math.sin(time * 0.5 + i) * 0.05;
      const noiseY = Math.cos(time * 0.3 + i) * 0.05;
      const noiseZ = Math.sin(time * 0.4 + i) * 0.05;

      currentPositions.current[i3] = THREE.MathUtils.lerp(currentPositions.current[i3], targetPositions[i3], delta * 1.5);
      currentPositions.current[i3 + 1] = THREE.MathUtils.lerp(currentPositions.current[i3 + 1], targetPositions[i3 + 1], delta * 1.5);
      currentPositions.current[i3 + 2] = THREE.MathUtils.lerp(currentPositions.current[i3 + 2], targetPositions[i3 + 2], delta * 1.5);

      dummy.position.set(
        currentPositions.current[i3] + noiseX,
        currentPositions.current[i3 + 1] + noiseY,
        currentPositions.current[i3 + 2] + noiseZ
      );

      // Rotate DNA slightly based on time
      if (scene >= 5) {
        dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), time * 0.2);
      } else if (scene === 3 || scene === 4) {
        // Brain slight rotation
        dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.sin(time * 0.2) * 0.5);
      } else {
        // Human slight rotation
        dummy.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.sin(time * 0.3) * 0.3);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <circleGeometry args={[0.02, 4]} />
      {/* Changed back to Turquesa */}
      <meshBasicMaterial color="#009688" transparent opacity={0.7} />
    </instancedMesh>
  );
};
