import { DefaultStyle } from '@/styles';
import React, { ReactNode } from 'react';

interface WithEmptyProps {
  condition: boolean;
  children: ReactNode;
  useImage: boolean;
}

export const WithEmpty: React.FC<WithEmptyProps> = ({
  children,
  condition,
  useImage = true,
}) => {
  return (
    <>
      {condition ? (
        <div className={DefaultStyle.emptyWrapper}>
          {useImage && <img src='/empty-box.jpg' />}
          <div>Записи не найдены...</div>
        </div>
      ) : (
        children
      )}
    </>
  );
};
