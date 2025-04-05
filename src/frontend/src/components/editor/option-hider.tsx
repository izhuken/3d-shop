import { ShopCreateStyles } from '@/styles';
import clsx from 'clsx';
import { useState } from 'react';

interface OptionHiderProps {
  label: string;
  children?: React.ReactNode;
}

export function OptionHider({ label, children }: OptionHiderProps) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <label className={ShopCreateStyles.label}>
      <button
        type='button'
        className={ShopCreateStyles.hideButton}
        onClick={() => setIsHidden(!isHidden)}
      >
        <span className={ShopCreateStyles.inputLabel}>{label}:</span>
        <img src='/admin-side-arrow.svg' alt='' />
      </button>
      <ul
        style={{ width: '100%' }}
        className={clsx(isHidden && ShopCreateStyles.hidden)}
      >
        {children}
      </ul>
    </label>
  );
}
