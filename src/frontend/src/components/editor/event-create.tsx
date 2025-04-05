import { NewEventFormData } from '@/entities';
import { useModalContext } from '@/lib';
import { GoodsStyles } from '@/styles';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { DefaultButton, DefaultInput } from '../common';
import { FormBaseLayout } from '../form-base-layout';

interface EventCreateFormProps {}

export const EventCreateForm: React.FC<EventCreateFormProps> = () => {
  const { reject, resolve, payload } = useModalContext<
    NewEventFormData,
    {
      cashboxes: string[];
    }
  >();
  const methods = useForm<NewEventFormData>();
  const event_type = methods.watch('type');

  return (
    <div
      className={GoodsStyles.modalWrapper}
      onClick={(e) => e.currentTarget == e.target && reject()}
    >
      <div className={GoodsStyles.createForm}>
        <FormBaseLayout
          methods={methods}
          onSub={(data) => {
            resolve({
              ...data,
              type: data.type.value,
              ...(data.cashbox && { cashbox: data.cashbox.value }),
              ...(data.self_type && { self_type: data.self_type.value }),
            });
          }}
        >
          <h1>Новое событие</h1>

          <DefaultInput name='name' placeholder='Имя' registerOptions={{}} />
          <DefaultInput
            name='rate'
            placeholder='Влияние'
            type='number'
            min={0.5}
            max={2}
            registerOptions={{ valueAsNumber: true }}
          />

          <div style={{ marginTop: 20 }}>
            <Controller
              name='type'
              control={methods.control}
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder='Тип товара'
                  value={value}
                  onChange={onChange}
                  options={[
                    { value: 'traffic_surge', label: 'Всплекс трафика' },
                    { value: 'broke_cashbox', label: 'Поломка кассы' },
                    { value: 'ban_shelf', label: 'Блокировка стеллажа' },
                  ]}
                />
              )}
            />
          </div>
          {/* vsplesk */}
          {event_type?.value == 'traffic_surge' && (
            <DefaultInput
              name='people'
              type='number'
              placeholder='Кол-во человек в день'
              min={10}
              max={50}
              registerOptions={{ valueAsNumber: true }}
            />
          )}

          {event_type?.value == 'broke_cashbox' && (
            <>
              <div style={{ marginTop: 20 }}>
                <Controller
                  name='cashbox'
                  control={methods.control}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder='Касса'
                      value={value}
                      onChange={onChange}
                      options={payload?.cashboxes.map((_, index) => ({
                        value: `cashbox_${index}`,
                        label: `Касса ${index + 1}`,
                      }))}
                    />
                  )}
                />
              </div>

              <DefaultInput
                name='start_date'
                type='date'
                placeholder='Начало поломки'
                registerOptions={{ valueAsDate: true }}
              />

              <DefaultInput
                name='end_date'
                type='date'
                placeholder='Конец поломки'
                registerOptions={{ valueAsDate: true }}
              />
            </>
          )}

          {/* ban shelf */}
          {event_type?.value == 'ban_shelf' && (
            <div style={{ marginTop: 20 }}>
              <Controller
                name='self_type'
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
            </div>
          )}

          <DefaultButton>Добавить</DefaultButton>
        </FormBaseLayout>
      </div>
    </div>
  );
};
