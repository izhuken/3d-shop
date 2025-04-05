import {
  AdminHeader,
  AdminNav,
  CreateGoodsModal,
  GoodsList,
} from '@/components';
import { useModal } from '@/lib';
import { ShopListStyles } from '@/styles';
import React from 'react';
import { Helmet } from 'react-helmet';

interface GoodsListPageProps {}

export const GoodsListPage: React.FC<GoodsListPageProps> = () => {
  const { toggle, child } = useModal(<CreateGoodsModal />);

  return (
    <>
      <Helmet>
        <title>Список товаров | Dev lab</title>
      </Helmet>

      <div className={ShopListStyles.wrapper}>
        <AdminNav />

        <main className={ShopListStyles.mainWrapper}>
          <AdminHeader
            header='Список товаров'
            actionDescription='Добавить товар'
            action={toggle}
          />

          <GoodsList />
        </main>
      </div>
      {child}
    </>
  );
};
