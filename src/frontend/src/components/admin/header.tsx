import { ShopListStyles } from '@/styles';
import React from 'react';

interface AdminHeaderProps {
  header: string;
  actionDescription: string;
  action?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  header,
  action,
  actionDescription,
}) => {
  return (
    <section className={ShopListStyles.header}>
      <h1>{header}</h1>
      <button onClick={action} className={ShopListStyles.addShopButton}>
        <img src='/plus.svg' /> <span>{actionDescription}</span>
      </button>
    </section>
  );
};
