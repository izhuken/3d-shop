import { GoodsForm } from '@/entities';
import { useCreateGoods, useModalContext } from '@/lib';
import { GoodsStyles } from '@/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DefaultButton, DefaultInput } from '../common';
import { FormBaseLayout } from '../form-base-layout';

interface CreateGoodsModalProps {}

export const CreateGoodsModal: React.FC<CreateGoodsModalProps> = () => {
  const { reject } = useModalContext();
  const methods = useForm<GoodsForm>();
  const { mutate } = useCreateGoods({ onSuccess: reject });

  return (
    <div
      className={GoodsStyles.modalWrapper}
      onClick={(e) => e.currentTarget == e.target && reject()}
    >
      <div className={GoodsStyles.createForm}>
        <FormBaseLayout methods={methods} onSub={(data) => mutate(data)}>
          <h1>Новый товар</h1>

          <DefaultInput
            name='goods_type'
            placeholder='Тип товара'
            registerOptions={{ required: 'Обязательное поле' }}
          />
          <DefaultInput
            name='cost'
            type='number'
            placeholder='Стоимость'
            registerOptions={{
              required: 'Обязательное поле',
              valueAsNumber: true,
            }}
          />
          <DefaultButton>Добавить</DefaultButton>
        </FormBaseLayout>
      </div>
    </div>
  );
};
