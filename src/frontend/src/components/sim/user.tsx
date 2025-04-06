import { useAppSelector } from '@/store';
import { Outlines } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Mesh } from 'three';

interface SimulationUserProps {
  x: number;
  y: number;
}

export const SimulationUser: React.FC<SimulationUserProps> = ({ x, y }) => {
  const { onRenderStop } = useAppSelector((x) => x.animConfig.state.control);
  const myMesh = useRef<Mesh | null>(null);
  const [counter, setCounter] = useState({ x: x - 4.5, y: y - 4.5 });
  const color = useMemo(
    () => '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
    []
  );

  useEffect(() => {
    // const t = setInterval(() => {
    //   setCounter((c) => ({ ...c, y: c.y - 0.1 }));
    // }, 25);
    // return () => clearInterval(t);
    console.log(onRenderStop);
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
