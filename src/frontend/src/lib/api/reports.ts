import { API_SERVER_URL } from '@/config';
import { ReportPayload, ReportRequest } from '@/entities/app/report';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QueryKeys } from './keys';

export const useFetchReport = (id: string) => {
  return useQuery({
    queryKey: [QueryKeys.report, id],
    queryFn: async () =>
      await axios
        .get<ReportRequest>(`${API_SERVER_URL}/report/${id}`)
        .then(({ data }) => {
          const payload = JSON.parse(data.data) as ReportPayload[];
          const config: ReportPayload = {};
          console.log(payload);

          for (const day of payload) {
            for (const [key, value] of Object.entries(day)) {
              if (!config[key]) {
                config[key] = value;
              } else {
                config[key] += value;
              }
            }
          }

          return config;
        }),
  });
};
