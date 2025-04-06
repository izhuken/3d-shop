import { UserMove } from '@/entities/app/animations';
import { useAppSelector } from '@/store';
import { ShopCreateStyles } from '@/styles';
import { CameraControls, Grid } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useMemo } from 'react';
import { DoubleSide } from 'three';
import { Heatmap } from './heatmap';
import { SimulationShopObject } from './shop-object';
import { SimulationUser } from './user';

interface SimulationCanvasProps {}

export const SimulationCanvas: React.FC<SimulationCanvasProps> = () => {
  const { cashboxes, shelves, startPoint } = useAppSelector(
    (x) => x.sceneEntities.state
  );
  const {
    control: { keyframeIndex },
    keyframes,
  } = useAppSelector((x) => x.animConfig.state);

  const users = useMemo<UserMove[]>(() => {
    if (keyframeIndex === -1) {
      return [] as UserMove[];
    }

    const users = keyframes[keyframeIndex]?.users;

    if (!users) return [];

    console.log(users);

    return users;
  }, [keyframeIndex, keyframes]);

  return (
    <>
      <Canvas
        camera={{ position: [10, 10, 10] }}
        className={ShopCreateStyles.canvas}
      >
        <CameraControls />
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
        <Heatmap />
        {cashboxes.map((cashbox, index) => (
          <SimulationShopObject key={index} entity={cashbox} />
        ))}

        {shelves.map((shelf, index) => (
          <SimulationShopObject key={index} entity={shelf} />
        ))}

        {startPoint && <SimulationShopObject entity={startPoint} />}

        {users.map(({ stamp, name, color, x, y }) => (
          <SimulationUser key={`${name}-${stamp}`} color={color} x={x} y={y} />
        ))}
      </Canvas>
    </>
  );
};
//
