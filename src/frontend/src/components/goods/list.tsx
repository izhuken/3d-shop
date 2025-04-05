import { useFetchGoodsList } from '@/lib';
import { GoodsStyles } from '@/styles';
import React from 'react';
import { WithEmpty, WithLoader } from '../common';

interface GoodsListProps {}

export const GoodsList: React.FC<GoodsListProps> = () => {
  const { data: goods, isLoading } = useFetchGoodsList();

  return (
    <section>
      <WithLoader isLoading={isLoading}>
        <WithEmpty condition={!goods || goods.length === 0}>
          {goods?.map(({ id, goods_type }) => (
            <div key={id} className={GoodsStyles.card}>
              <img src={'/goods.webp'} />
              <div>{goods_type}</div>
            </div>
          ))}
        </WithEmpty>
      </WithLoader>
    </section>
  );
};
