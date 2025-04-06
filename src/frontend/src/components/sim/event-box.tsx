import { useAppSelector } from '@/store';
import { ShopCreateStyles } from '@/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { WithEmpty } from '../common';

interface SimulationEventBoxProps {}

export const SimulationEventBox: React.FC<SimulationEventBoxProps> = ({}) => {
  const { eventCollector } = useAppSelector((x) => x.animConfig.state);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={clsx(
        ShopCreateStyles.optionsRightWrapper,
        isOpen && ShopCreateStyles.open
      )}
    >
      <button
        className={clsx(
          ShopCreateStyles.rightSlider,
          isOpen && ShopCreateStyles.open
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src='/admin-side-arrow.svg' alt='' />
      </button>
      <WithEmpty condition={eventCollector.length === 0} useImage={false}>
        {eventCollector.map(({ name }) => (
          <div key={name}>{name}</div>
        ))}
      </WithEmpty>
    </section>
  );
};
