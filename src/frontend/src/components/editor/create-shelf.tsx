import { Goods } from '@/entities';
import { useFetchGoodsList, useModalContext } from '@/lib';
import { GoodsStyles } from '@/styles';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { DefaultButton } from '../common';
import { FormBaseLayout } from '../form-base-layout';

interface CreateShelfFormProps {}

export const CreateShelfForm: React.FC<CreateShelfFormProps> = () => {
  const { data: goods, isLoading } = useFetchGoodsList();
  const { reject, resolve } = useModalContext();
  const methods = useForm<{
    goods: Goods[];
    shelf_type: { value: string; label: string };
  }>();

  return (
    <div
      className={GoodsStyles.modalWrapper}
      onClick={(e) => e.currentTarget == e.target && reject()}
    >
      <div className={GoodsStyles.createForm}>
        <FormBaseLayout
          methods={methods}
          onSub={(data) => {
            resolve(data);
          }}
        >
          <h1>Новый стеллаж</h1>

          <Controller
            name='goods'
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Товары'
                isMulti={true}
                value={value}
                onChange={onChange}
                options={(goods ?? ([] as Goods[])).map(({ goods_type }) => ({
                  value: goods_type,
                  label: goods_type,
                }))}
              />
            )}
          />

          <Controller
            name='shelf_type'
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder='Тип стеллажа'
                value={value}
                onChange={onChange}
                options={[
                  { value: 'Молочка', label: 'Молочка' },
                  { value: 'Хлеб', label: 'Хлеб' },
                  { value: 'Снеки', label: 'Снеки' },
                ]}
              />
            )}
          />

          <DefaultButton isLoading={isLoading}>Добавить</DefaultButton>
        </FormBaseLayout>
      </div>
    </div>
  );
};
