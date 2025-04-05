import {
  EditorEntityBox,
  EditorOptionsBox,
  EditorTitleBox,
} from '@/components';
import { FormBaseLayout } from '@/components/form-base-layout';
import { ShopCreateStyles } from '@/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';

interface ShopCreateProps {}

export const ShopCreate: React.FC<ShopCreateProps> = () => {
  const methods = useForm({
    values: {
      name: 'Новый магазин',
      user_per_day: 50,
      open_at: '09:00',
      close_at: '21:00',
      events: [],
      sales: [],
    },
  });

  return (
    <>
      <Helmet>
        <title>Создание магазина | Dev Lab</title>
      </Helmet>

      <FormBaseLayout methods={methods} onSub={console.log}>
        <main className={ShopCreateStyles.mainCanvas}>
          <EditorTitleBox />
          <EditorOptionsBox />
          <EditorEntityBox />
        </main>
      </FormBaseLayout>
    </>
  );
};
