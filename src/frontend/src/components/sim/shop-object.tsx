import { BaseSceneEntity } from '@/entities';
import { Outlines } from '@react-three/drei';
import React from 'react';

interface SimulationShopObjectProps {
  entity: BaseSceneEntity;
}

export const SimulationShopObject: React.FC<SimulationShopObjectProps> = ({
  entity: { color, x, y, z },
}) => {
  return (
    <>
      <mesh position={[x, z, y]}>
        <boxGeometry args={[1, 1, 1]} center={true} />
        <meshBasicMaterial color={color} />
        <Outlines color={'black'} thickness={4} />
      </mesh>
    </>
  );
};
