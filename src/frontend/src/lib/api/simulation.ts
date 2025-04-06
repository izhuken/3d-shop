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
          const color =
            '#' +
            ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');

          for (const [x, y] of user.moves) {
            nextStamp.setSeconds(nextStamp.getSeconds() + 1);
            const userMove: UserMove = {
              name: user.name,
              color: color,
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
