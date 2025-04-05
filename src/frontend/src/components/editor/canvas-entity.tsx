import { SceneEntity } from '@/entities';
import { useDragController } from '@/lib';
import { DragControls, Outlines } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as THREE from 'three';

interface CanvasEntityProps {
  index: number;
  entity: SceneEntity;
  fieldType: 'cashboxes' | 'shelves' | 'startPoints';
}

function calculate(x: number) {
  let tx = x < 0 ? Math.round(x) + 0.5 : Math.round(x) + 0.5;

  if (tx > 4.5) return 4.5;

  if (tx < -4.5) return -4.5;

  return tx;
}

export const CanvasEntity: React.FC<CanvasEntityProps> = ({
  entity,
  fieldType,
  index,
}) => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { control } = useFormContext();
  const { update } = useFieldArray({ name: fieldType, control: control });
  const { isDrag, setIsDrag } = useDragController();
  const [dragState, setDragState] = useState<'start' | 'end' | null>(null);
  const [position, setPosition] = useState({
    x: entity.x,
    y: entity.y,
    z: entity.z,
  });

  useEffect(() => {
    if (dragState === 'start' || dragState == null) return;

    const worldPosition = meshRef.current?.getWorldPosition(
      new THREE.Vector3()
    );

    if (!worldPosition) return;

    const vx = calculate(worldPosition.x);
    const tx =
      worldPosition.x > vx ? worldPosition.x - vx : vx - worldPosition.x;
    const vz = calculate(worldPosition.z);
    const tz =
      worldPosition.z > vz ? worldPosition.z - vz : vz - worldPosition.z;

    meshRef.current?.translateY(
      worldPosition.y > 0 ? -worldPosition.y + 0.5 : worldPosition.y - 0.5
    );
    meshRef.current?.translateX(tx);
    meshRef.current?.translateZ(tz);
    update(index, { ...entity, x: vx, y: vz, z: 0.5 });
    setDragState(null);
  }, [isDrag]);
  return (
    <>
      <DragControls
        onDragStart={() => {
          setIsDrag(true);
          setDragState('start');
        }}
        onDragEnd={() => {
          setIsDrag(false);
          setDragState('end');
        }}
      >
        <mesh ref={meshRef} position={[position.x, position.z, position.y]}>
          <boxGeometry args={[1, 1, 1]} center={true} />
          <meshBasicMaterial color={entity.color} />
          <Outlines
            screenspace={isDrag}
            color={isDrag ? 'yellow' : 'black'}
            thickness={isDrag ? 0.1 : 4}
          />
        </mesh>
      </DragControls>
    </>
  );
};
