import { API_SERVER_URL } from '@/config';
import {
  isShopCashbox,
  isShopShelf,
  isStartPoint,
  SceneCashbox,
  SceneShelf,
  SceneStartPoint,
  Shop,
  ShopCreate,
  ShopList,
} from '@/entities';
import { sceneEntitiesActions } from '@/store/slices/scene-entities';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QueryKeys } from './keys';

export const useFetchShopList = () => {
  return useQuery({
    queryKey: [QueryKeys.shopList],
    queryFn: async () =>
      await axios
        .get<ShopList[]>(`${API_SERVER_URL}/shop`)
        .then(({ data }) => data)
        .catch(
          () =>
            [
              {
                id: 'asdf',
                close_at: 'asdf',
                open_at: 'asdf',
                is_generated: true,
                name: 'asdf',
              },
            ] as ShopList[]
        ),
  });
};

export const useFetchShopDetails = (id: string) => {
  const d = useDispatch();

  return useQuery({
    queryKey: [QueryKeys.shopDetails, id],
    queryFn: async () => {
      const shop = await axios
        .get<Shop>(`${API_SERVER_URL}/shop/${id}`)
        .then(({ data }) => data);

      let startPoint: SceneStartPoint | null = null;
      let cashboxes: SceneCashbox[] = [];
      let shelves: SceneShelf[] = [];

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const value = shop.data.scene[i][j];

          if (value === null) continue;

          if (isStartPoint(value)) {
            startPoint = {
              color: 'green',
              name: value,
              nx: i,
              ny: j,
              nz: 0.5,
              x: i - 4.5,
              y: j - 4.5,
              z: 0.5,
            };
            continue;
          }

          if (isShopCashbox(value) && Object.keys(value).length > 0) {
            cashboxes.push({
              color: 'red',
              name: Object.keys(value)[0],
              nx: i,
              ny: j,
              nz: 0.5,
              x: i - 4.5,
              y: j - 4.5,
              z: 0.5,
            });
            continue;
          }

          if (isShopShelf(value) && Object.keys(value).length > 0) {
            shelves.push({
              color: 'blue',
              name: Object.keys(value)[0],
              nx: i,
              ny: j,
              nz: 0.5,
              x: i - 4.5,
              y: j - 4.5,
              z: 0.5,
            });
            continue;
          }
        }
      }

      if (startPoint === null) {
        throw new Error('Scene validation error!');
      }

      d(sceneEntitiesActions.setStartPoint(startPoint));
      d(sceneEntitiesActions.setCashboxes(cashboxes));
      d(sceneEntitiesActions.setShelves(shelves));

      return shop;
    },
  });
};

export const useCreateShopMutation = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: async (data: ShopCreate) => {
      const payload = await axios.post<{ id: string }>(
        `${API_SERVER_URL}/shop`,
        data
      );
      return await axios.get(`${API_SERVER_URL}/shop/play/${payload.data.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.shopList],
        exact: false,
      });
      toast.success('Успешно!');
      nav('/admin');
    },
  });
};

export const useDeleteShopMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) =>
      await axios.delete(`${API_SERVER_URL}/shop?id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.shopList],
        exact: false,
      });
      toast.success('Успешно!');
    },
  });
};
