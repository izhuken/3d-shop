import { Goods, NewSaleForm } from '@/entities';
import { useFetchGoodsList, useModalContext } from '@/lib';
import { GoodsStyles } from '@/styles';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { DefaultButton, DefaultInput } from '../common';
import { FormBaseLayout } from '../form-base-layout';

interface SaleCreateFormProps {}

export const SaleCreateForm: React.FC<SaleCreateFormProps> = () => {
  const { data: goods, isLoading } = useFetchGoodsList();
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
          <DefaultInput
            name='size'
            type='number'
            placeholder='Размер скидки'
            min={0}
            max={1}
            registerOptions={{
              required: 'Обязательное поле',
              valueAsNumber: true,
            }}
          />
          <DefaultButton isLoading={isLoading}>Добавить</DefaultButton>
        </FormBaseLayout>
      </div>
    </div>
  );
};
