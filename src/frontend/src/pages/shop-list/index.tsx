import { AdminHeader, AdminNav, AdminShops } from '@/components';
import { ShopListStyles } from '@/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

interface ShopListProps {}

export const ShopList: React.FC<ShopListProps> = () => {
  const nav = useNavigate();

  return (
    <>
      <Helmet>
        <title>Список магазинов | Dev lav</title>
      </Helmet>

      <div className={ShopListStyles.wrapper}>
        <AdminNav />

        <main className={ShopListStyles.mainWrapper}>
          <AdminHeader
            header='Список магазинов'
            actionDescription='Добавить магазин'
            action={() => nav('/admin/create')}
          />
          <AdminShops />
        </main>
      </div>
    </>
  );
};
