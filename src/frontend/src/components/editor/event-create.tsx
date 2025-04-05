import { NewSaleForm } from '@/entities';
import { useModalContext } from '@/lib';
import { GoodsStyles } from '@/styles';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { DefaultButton } from '../common';
import { FormBaseLayout } from '../form-base-layout';

interface EventCreateFormProps {}

export const EventCreateForm: React.FC<EventCreateFormProps> = () => {
  const { reject, resolve } = useModalContext();
  const methods = useForm<NewSaleForm>();

  return (
    <div
      className={GoodsStyles.modalWrapper}
      onClick={(e) => e.currentTarget == e.target && reject()}
    >
      <div className={GoodsStyles.createForm}>
        <FormBaseLayout
          methods={methods}
          onSub={(data) => {
            resolve({ goods_type: data.goods_type.value, size: data.size });
          }}
        >
          <h1>Новая скидка</h1>

          <Controller
            name='goods_type'
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Тип товара'
                value={value}
                onChange={onChange}
                options={(goods ?? ([] as Goods[])).map(({ goods_type }) => ({
                  value: goods_type,
                  label: goods_type,
                }))}
              />
            )}
          />

          <DefaultButton>Добавить</DefaultButton>
        </FormBaseLayout>
      </div>
    </div>
  );
};
