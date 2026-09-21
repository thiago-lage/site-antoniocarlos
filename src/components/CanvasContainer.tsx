import React from 'react';
import { Canvas } from '@react-three/fiber';
import { BubbleGraphic } from './BubbleGraphic';

export const CanvasContainer: React.FC<{ eventSource?: React.RefObject<HTMLElement> }> = ({ eventSource }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      eventSource={eventSource}
      eventPrefix="client"
      className="w-full h-full"
    >
      <BubbleGraphic />
    </Canvas>
  );
};
