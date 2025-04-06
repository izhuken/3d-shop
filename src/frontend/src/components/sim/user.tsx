import { useAppSelector } from '@/store';
import { Outlines } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { Mesh } from 'three';

interface SimulationUserProps {
  x: number;
  y: number;
  color: string;
}

export const SimulationUser: React.FC<SimulationUserProps> = ({
  x,
  y,
  color,
}) => {
  const { onRenderStop } = useAppSelector((x) => x.animConfig.state.control);
  const myMesh = useRef<Mesh | null>(null);
  const [counter, setCounter] = useState({ x: x - 4.5, y: y - 4.5 });

  useEffect(() => {
    // const t = setInterval(() => {
    //   setCounter((c) => ({ ...c, y: c.y - 0.1 }));
    // }, 25);
    // return () => clearInterval(t);
  }, [onRenderStop]);

  return (
    <>
      <mesh ref={myMesh} position={[counter.x, 0.5, counter.y]}>
        <sphereGeometry args={[0.5, 15, 15]} center={true} />
        <meshBasicMaterial color={color} />
        <Outlines color={'black'} thickness={4} />
      </mesh>
    </>
  );
};
