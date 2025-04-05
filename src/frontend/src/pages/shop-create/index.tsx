import {
  EditorEntityBox,
  EditorOptionsBox,
  EditorTitleBox,
  ShopCreateScene,
} from '@/components';
import { FormBaseLayout } from '@/components/form-base-layout';
import { NewShopForm } from '@/entities';
import { useShopCreate } from '@/lib/api/shop-create';
import { ShopCreateStyles } from '@/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

interface ShopCreateProps {}

export const ShopCreate: React.FC<ShopCreateProps> = () => {
  const methods = useForm<NewShopForm>({
    values: {
      name: 'Новый магазин',
      user_per_day: 50,
      open_at: '09:00',
      close_at: '21:00',
      events: [],
      sales: [],
      cashboxes: [],
      shelves: [],
    },
  });

  const submitter = useShopCreate();

  return (
    <>
      <Helmet>
        <title>Создание магазина | Dev Lab</title>
      </Helmet>

      <FormBaseLayout methods={methods} onSub={submitter}>
        <main className={ShopCreateStyles.mainCanvas}>
          <EditorTitleBox />
          <EditorOptionsBox />
          <EditorEntityBox />
          <ShopCreateScene />
        </main>
      </FormBaseLayout>
    </>
  );
};
