import { useFetchHeatMap } from '@/lib/api/heatmap';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

interface HeatmapProps {}

function percentageToColor(percentage: number, maxHue = 100, minHue = 0) {
  const hue = percentage * (maxHue - minHue) + minHue;
  return `hsl(${hue}, 60%, 65%)`;
}

export const Heatmap: React.FC<HeatmapProps> = memo(() => {
  const { id } = useParams<{ id: string }>();
  const { data: matrix } = useFetchHeatMap(id ?? '');

  console.log(matrix);

  return (
    <>
      {(matrix ?? []).map((subMatrix, i) =>
        subMatrix.map((value, j) => (
          <mesh
            position={[i - 4.5, 0, j - 4.5]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color={percentageToColor(value / 100)} />
          </mesh>
        ))
      )}
    </>
  );
});
