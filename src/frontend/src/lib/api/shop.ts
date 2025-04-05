import { API_SERVER_URL } from '@/config';
import { ShopCreate, ShopList } from '@/entities';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
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

export const useCreateShopMutation = () => {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return useMutation({
    mutationFn: async (data: ShopCreate) =>
      await axios.post(`${API_SERVER_URL}/shop`, data),
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
