import { HeaderStyles } from '@/styles';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {}

const HeaderFc: React.FC<HeaderProps> = () => {
  return (
    <header className={HeaderStyles.header}>
      <article className={HeaderStyles.icon}>
        <img src='/dev-lab-icon.svg' alt='icon' />
        <span>DevLab</span>
      </article>

      <article className={HeaderStyles.linkContainer}>
        <NavLink
          to='/'
          className={({ isActive }) =>
            clsx(HeaderStyles.link, isActive && HeaderStyles.active)
          }
        >
          Домой
        </NavLink>
        <NavLink
          to='/admin'
          className={({ isActive }) =>
            clsx(HeaderStyles.link, isActive && HeaderStyles.active)
          }
        >
          Админ
        </NavLink>
      </article>
    </header>
  );
};

export const Header = React.memo(HeaderFc);
