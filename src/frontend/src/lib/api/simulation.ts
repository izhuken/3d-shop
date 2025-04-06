import { API_SERVER_URL } from '@/config';
import {
  ActiveEvent,
  ActiveSales,
  EventCollectorEntity,
  KeyFrame,
  UserMove,
} from '@/entities/app/animations';
import { SimDetails } from '@/entities/app/animations-api';
import { useAppDispatch } from '@/store';
import { animConfigActions } from '@/store/slices/animation-entities';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QueryKeys } from './keys';

export const mocksim: SimDetails = {
  '2025-04-06 09:00:00.181925': {
    active_events: [],
    sales: [],
    users: [],
  },
  '2025-04-06 10:37:00.181925': {
    active_events: [{ name: 'Ивент 1' }],
    sales: [],
    users: [],
  },
  '2025-04-06 10:40:00.181925': {
    active_events: [{ name: 'Ивент 1' }],
    sales: [{ goods_type: 'Молоко', size: 0.15 }],
    users: [],
  },
  '2025-04-06 12:00:00.181925': {
    active_events: [{ name: 'Ивент 1' }],
    sales: [{ goods_type: 'Молоко', size: 0.15 }],
    users: [
      {
        name: 'тестовый',
        moves: [
          [4, 8],
          [4, 7],
          [4, 6],
          [3, 6],
          [2, 6],
          [1, 6],
          [2, 6],
          [2, 6],
          [3, 6],
          [4, 6],
          [5, 6],
          [6, 6],
          [7, 6],
          [6, 6],
          [5, 6],
          [4, 6],
          [4, 7],
          [4, 8],
        ],
      },
    ],
  },

  '2025-04-06 14:00:00.181925': {
    active_events: [],
    sales: [{ goods_type: 'Молоко', size: 0.15 }],
    users: [],
  },
  '2025-04-06 16:40:00.181925': {
    active_events: [],
    sales: [],
    users: [],
  },
  '2025-04-06 16:45:00.181925': {
    active_events: [],
    sales: [{ goods_type: 'Выпечка', size: 0.15 }],
    users: [],
  },
  '2025-04-06 21:00:00.181925': {
    active_events: [],
    sales: [],
    users: [],
  },
};

export const useFetchSimulation = (id: string) => {
  const d = useAppDispatch();

  return useQuery({
    queryKey: [QueryKeys.simulationDetails, id],
    queryFn: async () => {
      const sim = await axios
        .get<SimDetails>(`${API_SERVER_URL}/simulation/${id}`)
        .then(({ data }) => data);

      const keyframes: KeyFrame[] = [];
      const salesStore: ActiveSales[] = [];
      const events: ActiveEvent[] = [];

      const data = Array.from(Object.entries(sim.data));

      for (let i = 0; i < data.length; i++) {
        const [currentTime, currentPayload] = data[i];
        let { active_events, sales, users } = currentPayload;

        // create new events
        for (const event of active_events) {
          const founded = events.find(({ name }) => name === event.name);

          if (founded) continue;

          const _event = { name: event.name, start: currentTime };
          events.push(_event);
        }

        // sales

        for (const sale of sales) {
          const founded = salesStore.find(
            ({ name }) => `${sale.goods_type} ${sale.size}%` === name
          );

          if (founded) continue;

          const _sale = {
            name: `${sale.goods_type} ${sale.size}%`,
            start: currentTime,
          };
          salesStore.push(_sale);
        }

        //  with keyframes
        let kf = keyframes.find(({ stamp }) => stamp === currentTime);

        if (!kf) {
          kf = {
            users: [],
            stamp: currentTime,
          };
        }

        // with keyframes users
        for (const user of users) {
          let nextStamp = new Date(currentTime);

          for (const [x, y] of user.moves) {
            nextStamp.setSeconds(nextStamp.getSeconds() + 1);
            const userMove: UserMove = {
              stamp: nextStamp.toISOString(),
              x: y,
              y: x,
            };

            let founded = keyframes.find(
              ({ stamp }) => stamp === nextStamp.toISOString()
            );

            if (!founded) {
              founded = {
                users: [],
                stamp: nextStamp.toISOString(),
              };
              keyframes.push(founded);
            }
            founded.users.push(userMove);
          }
        }
        keyframes.push(kf);
      }

      d(
        animConfigActions.init({
          kf: keyframes,
          collector: [
            ...(salesStore as EventCollectorEntity[]),
            ...(events as EventCollectorEntity[]),
          ],
        })
      );
    },
  });
};
