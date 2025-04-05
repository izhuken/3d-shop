import { API_SERVER_URL } from '@/config';
import { ShopList } from '@/entities';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
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
