import { NewShopForm } from '@/entities';
import { ShopCreateStyles } from '@/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { EditorInput } from './editor-input';
import { OptionHider } from './option-hider';

interface EditorOptionsBoxProps {}

export const EditorOptionsBox: React.FC<EditorOptionsBoxProps> = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { watch, control } = useFormContext<NewShopForm>();
  const { remove } = useFieldArray({
    name: 'sales',
    control: control,
  });

  const events = watch('events');
  const sales = watch('sales');

  return (
    <section
      className={clsx(
        ShopCreateStyles.optionsWrapper,
        isOpen && ShopCreateStyles.open
      )}
    >
      <button
        className={clsx(
          ShopCreateStyles.slider,
          isOpen && ShopCreateStyles.open
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src='/admin-side-arrow.svg' alt='' />
      </button>
      <label className={ShopCreateStyles.label}>
        <span className={ShopCreateStyles.inputLabel}>Открывается в:</span>
        <EditorInput name='open_at' type='time' style={{ width: '100%' }} />
      </label>
      <label className={ShopCreateStyles.label}>
        <span className={ShopCreateStyles.inputLabel}>Закрывается в:</span>
        <EditorInput name='close_at' type='time' style={{ width: '100%' }} />
      </label>
      <label className={ShopCreateStyles.label}>
        <span className={ShopCreateStyles.inputLabel}>
          Среднее кол-во покупателей:
        </span>
        <EditorInput
          name='user_per_day'
          type='number'
          registerOptions={{ valueAsNumber: true }}
        />
      </label>

      <OptionHider label='События'>
        {events?.map(({ name }, i) => (
          <li key={name}>{name}</li>
        ))}
      </OptionHider>
      <OptionHider label='Скидки'>
        {sales?.map(({ goods_type }, i) => (
          <li
            className={ShopCreateStyles.salesItem}
            key={goods_type}
            onClick={() => {
              remove(i);
            }}
          >
            {goods_type}
          </li>
        ))}
      </OptionHider>
    </section>
  );
};
