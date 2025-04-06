import { ShopCreateStyles } from '@/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

interface SimulationOptionsBoxProps {
  open_at?: string;
  close_at?: string;
  userPerDay?: number;
}

export const SimulationOptionsBox: React.FC<SimulationOptionsBoxProps> = ({
  close_at,
  open_at,
  userPerDay,
}) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <span>{open_at}</span>
      </label>
      <label className={ShopCreateStyles.label}>
        <span className={ShopCreateStyles.inputLabel}>Закрывается в:</span>
        <span>{close_at}</span>
      </label>
      <label className={ShopCreateStyles.label}>
        <span className={ShopCreateStyles.inputLabel}>
          Среднее кол-во покупателей:
        </span>
        <span>{userPerDay}</span>
      </label>
    </section>
  );
};
