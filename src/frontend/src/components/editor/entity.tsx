import {
  Goods,
  NewEventFormData,
  NewSalesShopValue,
  NewShopForm,
  SceneEntity,
} from '@/entities';
import { useModal } from '@/lib';
import { ShopCreateStyles } from '@/styles';
import React, { useCallback, useEffect } from 'react';
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { EditorButton } from './button';
import { CreateShelfForm } from './create-shelf';
import { EventCreateForm } from './event-create';
import { SaleCreateForm } from './sale-create';

interface EditorEntityBoxProps {}

export const EditorEntityBox: React.FC<EditorEntityBoxProps> = () => {
  const { child, modalPromise, toggle } = useModal<NewSalesShopValue>(
    <SaleCreateForm />
  );
  const {
    child: shelfChild,
    modalPromise: shelfPromise,
    toggle: shelfToggle,
  } = useModal<{
    goods: Goods[];
    shelf_type: { value: string; label: string };
  }>(<CreateShelfForm />);
  const {
    child: eventChild,
    modalPromise: eventPromise,
    toggle: eventToggle,
  } = useModal<NewEventFormData, { cashboxes: string[] }>(<EventCreateForm />);

  const { control } = useFormContext<NewShopForm>();
  const { cashboxes, startPoints, shelves } = useWatch({ control });
  const { append } = useFieldArray({ name: 'sales', control: control });
  const { append: addEvent } = useFieldArray({
    name: 'events',
    control: control,
  });

  const { append: addCashbox } = useFieldArray({
    name: 'cashboxes',
    control: control,
  });
  const { append: addShelf } = useFieldArray({
    name: 'shelves',
    control: control,
  });
  const addEntity = useCallback(
    (cb: (x: number, y: number) => unknown) => {
      let x = -4.5;
      let y = -4.5;
      const fields: SceneEntity[] = [
        ...(shelves as SceneEntity[]),
        ...(cashboxes as SceneEntity[]),
      ];

      while (true) {
        if (fields.length == 100) {
          toast.error('Магазин заполнен!');
          break;
        }

        if (startPoints?.x === x && startPoints?.y === y) {
          if (x != 4.5) {
            x += 1;
            if (y == 4.5 && x != 4.5) y = -4.5;
          } else if (y != 4.5) {
            y += 1;
            if (x == 4.5 && y != 4.5) x = -4.5;
          } else {
            toast.error('Магазин заполнен!');
            break;
          }

          continue;
        }

        const cashbox = fields.find((c) => c.x === x && c.y === y);

        if (!cashbox) {
          cb(x, y);
          break;
        }

        if (x != 4.5) {
          x += 1;
          if (y == 4.5 && x != 4.5) y = -4.5;
        } else if (y != 4.5) {
          y += 1;
          if (x == 4.5 && y != 4.5) x = -4.5;
        } else {
          toast.error('Магазин заполнен!');
          break;
        }
      }
    },
    [shelves, cashboxes, startPoints]
  );

  useEffect(() => {
    modalPromise?.then(append).catch();
  }, [modalPromise]);

  useEffect(() => {
    eventPromise?.then(addEvent).catch();
  }, [eventPromise]);

  useEffect(() => {
    shelfPromise
      ?.then(({ goods, shelf_type }) => {
        addEntity((x, y) =>
          addShelf({
            x,
            y,
            color: 'blue',
            type: 'shelf',
            z: 0.5,
            goods,
            shelf_type: shelf_type.label,
          })
        );
      })
      .catch();
  }, [shelfPromise]);

  return (
    <>
      <section className={ShopCreateStyles.entityWrapper}>
        <EditorButton size={40} action={shelfToggle}>
          <img src='/shelf.svg' alt='' />
        </EditorButton>
        <EditorButton
          size={40}
          action={() =>
            addEntity((x, y) =>
              addCashbox({
                x,
                y,
                color: 'red',
                type: 'cashbox',
                z: 0.5,
              })
            )
          }
        >
          <img src='/cashbox.png' alt='' />
        </EditorButton>
        <Controller
          name='startPoints'
          control={control}
          render={({ field: { value, onChange } }) => (
            <EditorButton
              size={40}
              action={() => {
                let x = -4.5;
                let y = -4.5;
                const fields: SceneEntity[] = [
                  ...(shelves as SceneEntity[]),
                  ...(cashboxes as SceneEntity[]),
                ];

                while (true) {
                  if (fields.length == 100) {
                    toast.error('Магазин заполнен!');
                    break;
                  }

                  if (value?.x !== undefined) {
                    toast.error('Вход уже добавлен!');
                    break;
                  }

                  const cashbox = fields.find((c) => c.x === x && c.y === y);

                  if (!cashbox) {
                    onChange({
                      type: 'start_point',
                      color: 'green',
                      x,
                      y,
                      z: 0.5,
                    });
                    break;
                  }

                  if (x != 4.5) {
                    x += 1;
                    if (y == 4.5 && x != 4.5) y = -4.5;
                  } else if (y != 4.5) {
                    y += 1;
                    if (x == 4.5 && y != 4.5) x = -4.5;
                  } else {
                    toast.error('Магазин заполнен!');
                    break;
                  }
                }
              }}
            >
              <img src='/start.svg' alt='' />
            </EditorButton>
          )}
        />

        <EditorButton size={40} action={toggle}>
          <img src='/sale.png' alt='' />
        </EditorButton>
        <EditorButton
          size={40}
          action={() => eventToggle({ cashboxes: cashboxes })}
        >
          <img src='/add-event.svg' alt='' />
        </EditorButton>
        <EditorButton size={40} type='submit' id='real-submitter'>
          <img src='/save.svg' alt='' />
        </EditorButton>
      </section>
      {child}
      {eventChild}
      {shelfChild}
    </>
  );
};
