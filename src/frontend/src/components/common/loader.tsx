import { DefaultStyle } from '@/styles';
import clsx from 'clsx';
import { FC } from 'react';

interface LoaderProps {
  inverse?: boolean;
  size?: number;
}

export const Loader: FC<LoaderProps> = ({ inverse, size }) => {
  return (
    <span
      style={size ? { height: size, width: size } : undefined}
      className={clsx(DefaultStyle.loader, inverse ? DefaultStyle.white : '')}
    ></span>
  );
};
