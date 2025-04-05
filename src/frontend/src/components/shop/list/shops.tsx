import { WithEmpty, WithLoader } from '@/components/common';
import { useFetchShopList } from '@/lib';
import { ShopListStyles } from '@/styles';
import React from 'react';

interface AdminShopsProps {}

export const AdminShops: React.FC<AdminShopsProps> = () => {
  const { data: shops, isLoading } = useFetchShopList();

  return (
    <section>
      <WithLoader isLoading={isLoading}>
        <WithEmpty condition={!shops || shops.length === 0}>
          {shops?.map(({ name }) => (
            <div className={ShopListStyles.card}>
              <img src={'/shop.png'} />
              <div>{name}</div>
            </div>
          ))}
        </WithEmpty>
      </WithLoader>
    </section>
  );
};
