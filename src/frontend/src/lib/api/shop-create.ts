import { _events, NewShopForm, ShopCreate } from '@/entities';
import { useCallback } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useCreateShopMutation } from './shop';

function createArray(x: number, y: number) {
  return Array.apply(null, Array(x)).map(function (e) {
    return new Array(y).fill(null);
  });
}

export const useShopCreate = () => {
  const { mutate } = useCreateShopMutation();
  const cb = useCallback<SubmitHandler<NewShopForm>>((data, e) => {
    if (e?.nativeEvent.submitter?.id !== 'real-submitter') return;

    const events: _events = {};

    const payload: ShopCreate = {
      name: data.name,
      is_generated: false,
      open_at: data.open_at,
      close_at: data.close_at,
      data: {
        users_per_day: data.user_per_day,
        scene: [],
        events: events,
        sales: data.sales.map((sale) => ({
          ...sale,
          size: sale.size / 100,
          days: 3,
        })),
      },
    };

    data.events.forEach((event) => {
      for (const [ekey, evalue] of Object.entries(event)) {
        if (ekey === 'name') continue;
        if (
          (typeof evalue === 'number' && Number.isNaN(evalue)) ||
          evalue === '' ||
          evalue === undefined
        )
          continue;

        if (!events[event.name]) {
          events[event.name] = {};
        }

        if (ekey === 'rate') {
          events[event.name] = {
            ...events[event.name],
            [ekey]: evalue,
          };
          continue;
        }

        events[event.name] = {
          ...events[event.name],
          [ekey]: evalue,
        };
      }
    });

    const scene = createArray(10, 10);

    data.cashboxes.forEach((cashbox, i) => {
      scene[cashbox.x + 4.5][cashbox.y + 4.5] = { [`cashbox_${i}`]: 15 };
    });

    data.shelves.forEach((shelf, i) => {
      const goodses = {};

      shelf.goods.forEach((goods, i) => {
        goodses[`goods_${i}`] = {
          cost: Math.round(Math.random() * 100),
          goods_type: goods.value,
        };
      });

      scene[shelf.x + 4.5][shelf.y + 4.5] = {
        [`shelf_${i}`]: {
          goodses: [goodses],
          type_shelf: shelf.shelf_type,
          capatity: 100,
        },
      };
    });

    if (data.startPoints) {
      scene[data.startPoints.x + 4.5][data.startPoints.y + 4.5] = 'start_point';
    }

    payload.data.scene = scene;

    mutate(payload);
  }, []);

  return cb;
};
