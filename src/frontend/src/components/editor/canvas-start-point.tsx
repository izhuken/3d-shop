import { NewShopForm, StartPoint } from '@/entities';
import { useDragController } from '@/lib';
import { DragControls, Outlines } from '@react-three/drei';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as THREE from 'three';

interface CanvasStartPointProps {
  entity: StartPoint;
}

function calculate(x: number) {
  let tx = x < 0 ? Math.round(x) + 0.5 : Math.round(x) + 0.5;

  if (tx > 4.5) return 4.5;

  if (tx < -4.5) return -4.5;

  return tx;
}

export const CanvasStartPoint: React.FC<CanvasStartPointProps> = ({
  entity: { color, x, y, z, type },
}) => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const { setValue } = useFormContext<NewShopForm>();
  const { isDrag, setIsDrag } = useDragController();
  const [dragState, setDragState] = useState<'start' | 'end' | null>(null);
  const [position, setPosition] = useState({ x, y, z });

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

    if (vz !== -4.5 && vx !== -4.5 && vz !== 4.5 && vx !== 4.5) {
      toast.error('Вход не может находиться внутри заведения!');
    }

    meshRef.current?.translateY(
      worldPosition.y > 0 ? -worldPosition.y + 0.5 : worldPosition.y - 0.5
    );
    meshRef.current?.translateX(tx);
    meshRef.current?.translateZ(tz);

    setValue('startPoints', { color, type, y: vz, x: vx, z: 0.5 });
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
          <meshBasicMaterial color={color} />
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
