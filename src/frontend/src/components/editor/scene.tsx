import { NewShopForm } from '@/entities';
import { DragControllerContext } from '@/lib';
import { ShopCreateStyles } from '@/styles';
import { CameraControls, Grid } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DoubleSide } from 'three';
import { CanvasEntity } from './canvas-entity';
import { CanvasStartPoint } from './canvas-start-point';

interface ShopCreateSceneProps {}

export const ShopCreateScene: React.FC<ShopCreateSceneProps> = () => {
  const [isDragging, setIsDrugging] = useState(false);
  const { watch } = useFormContext<NewShopForm>();

  const cashboxes = watch('cashboxes');
  const shelves = watch('shelves');
  const startPoint = watch('startPoints');
  console.log(cashboxes);

  return (
    <DragControllerContext.Provider
      value={{ isDrag: isDragging, setIsDrag: setIsDrugging }}
    >
      <Canvas
        camera={{ position: [10, 10, 10] }}
        className={ShopCreateStyles.canvas}
      >
        {!isDragging && <CameraControls />}
        <Grid
          args={[10, 10]}
          position={[0, 0, 0]}
          cellSize={1}
          followCamera={false}
          cellColor={'black'}
          sectionColor={'black'}
          side={DoubleSide}
          isMesh={true}
        />
        {isDragging && (
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color='yellow' side={DoubleSide} />
          </mesh>
        )}

        {cashboxes.map((cashbox, index) => (
          <CanvasEntity
            key={index}
            fieldType='cashboxes'
            index={index}
            entity={cashbox}
          />
        ))}

        {shelves.map((shelf, index) => (
          <CanvasEntity
            key={index}
            fieldType='shelves'
            index={index}
            entity={shelf}
          />
        ))}

        {startPoint && <CanvasStartPoint entity={startPoint} />}
      </Canvas>
    </DragControllerContext.Provider>
  );
};
