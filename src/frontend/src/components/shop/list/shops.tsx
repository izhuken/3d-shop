import { WithEmpty, WithLoader } from '@/components/common';
import { useDeleteShopMutation, useFetchShopList } from '@/lib';
import { GoodsStyles, ShopListStyles } from '@/styles';
import React from 'react';
import { Link } from 'react-router-dom';

interface AdminShopsProps {}

export const AdminShops: React.FC<AdminShopsProps> = () => {
  const { data: shops, isLoading } = useFetchShopList();
  const { mutate, isPending } = useDeleteShopMutation();

  return (
    <section className={GoodsStyles.container}>
      <WithLoader isLoading={isLoading || isPending}>
        <WithEmpty useImage={true} condition={!shops || shops.length === 0}>
          {shops?.map(({ id, name }) => (
            <Link to={`/admin/${id}`} className={ShopListStyles.card}>
              <img src={'/shop.png'} />
              <button
                className={ShopListStyles.deleteButton}
                onClick={(e) => {
                  e.preventDefault();
                  mutate(id);
                }}
              >
                <img src={'/trash.svg'} />
              </button>
              <div>{name}</div>
            </Link>
          ))}
        </WithEmpty>
      </WithLoader>
    </section>
  );
};
