import { DefaultStyle } from '@/styles';
import React, { ReactNode } from 'react';

interface WithEmptyProps {
  condition: boolean;
  children: ReactNode;
}

export const WithEmpty: React.FC<WithEmptyProps> = ({
  children,
  condition,
}) => {
  return (
    <>
      {condition ? (
        <div className={DefaultStyle.emptyWrapper}>
          <img src='/empty-box.jpg' />
          <div>Записи не найдены...</div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
