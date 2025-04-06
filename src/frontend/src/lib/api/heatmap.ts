import { API_SERVER_URL } from '@/config';
import { HeatmapResponse } from '@/entities/app/heatmap';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QueryKeys } from './keys';

export const useFetchHeatMap = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.heatmap, id],
    queryFn: async () =>
      await axios
        .get<HeatmapResponse>(`${API_SERVER_URL}/heat-map/${id}`)
        .then(({ data }) => JSON.parse(data.data) as number[][]),
  });
};
