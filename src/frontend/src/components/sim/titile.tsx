import { ShopCreateStyles } from '@/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorButton } from '../editor';

interface SimulationTitleProps {
  title?: string;
}

export const SimulationTitle: React.FC<SimulationTitleProps> = ({ title }) => {
  const nav = useNavigate();

  return (
    <section className={ShopCreateStyles.titleWrapper}>
      <EditorButton action={() => nav('/admin')}>
        <img
          src='/admin-side-arrow.svg'
          className={ShopCreateStyles.backButtonImage}
          alt=''
        />
      </EditorButton>
      <span>{title}</span>
    </section>
  );
};
