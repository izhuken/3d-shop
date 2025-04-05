import { API_SERVER_URL } from '@/config';
import { Goods, GoodsForm } from '@/entities';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { QueryKeys } from './keys';

export const useFetchGoodsList = () => {
  return useQuery({
    queryKey: [QueryKeys.goodsList],
    queryFn: async () =>
      await axios
        .get<Goods[]>(`${API_SERVER_URL}/goods`)
        .then(({ data }) => data)
        .catch(() => [] as Goods[]),
  });
};

export const useCreateGoods = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (goods: GoodsForm) =>
      await axios.post(`${API_SERVER_URL}/goods`, goods),
    onError: () => toast.error('Ошибка создания товара!'),
    onSuccess: () => {
      toast.success('Товар успешно создан!');
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.goodsList],
        exact: false,
      });
    },
  });
};
