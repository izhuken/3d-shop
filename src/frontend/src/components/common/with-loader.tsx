import { DefaultStyle } from '@/styles';
import React, { ReactNode } from 'react';
import { Loader } from './loader';

interface WithLoaderProps {
  isLoading: boolean;
  children?: ReactNode;
}

export const WithLoader: React.FC<WithLoaderProps> = ({
  isLoading,
  children,
}) => {
  return (
    <>
      {isLoading ? (
        <div className={DefaultStyle.loaderWrapper}>
          <Loader size={30} />
        </div>
      ) : (
        children
      )}
    </>
  );
};
