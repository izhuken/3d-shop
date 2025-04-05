import { ShopListStyles } from '@/styles';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface AdminNavProps {}

export const AdminNav: React.FC<AdminNavProps> = () => {
  return (
    <nav className={ShopListStyles.nav}>
      <section className={ShopListStyles.navLogo}>
        <img src='/logo.svg' />
        <span>DevLab</span>
      </section>
      <section className={ShopListStyles.navLinkWrapper}>
        <div className={ShopListStyles.navLinkContainer}>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              clsx(ShopListStyles.navLink, isActive && ShopListStyles.active)
            }
          >
            <img src='/home.svg' />
            <span>Домой</span>
          </NavLink>
          <NavLink
            to={'/admin'}
            end={true}
            className={({ isActive }) =>
              clsx(ShopListStyles.navLink, isActive && ShopListStyles.active)
            }
          >
            <img src='/store.svg' />
            <span>Магазины</span>
          </NavLink>
          <NavLink
            to={'/admin/goods'}
            className={({ isActive }) =>
              clsx(ShopListStyles.navLink, isActive && ShopListStyles.active)
            }
          >
            <img src='/box.svg' />
            <span>Товары</span>
          </NavLink>
        </div>
      </section>
    </nav>
  );
};
