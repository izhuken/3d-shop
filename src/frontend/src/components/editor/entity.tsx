import { ShopCreateStyles } from '@/styles';
import React from 'react';
import { EditorButton } from './button';

interface EditorEntityBoxProps {}

export const EditorEntityBox: React.FC<EditorEntityBoxProps> = () => {
  return (
    <section className={ShopCreateStyles.entityWrapper}>
      <EditorButton size={40}>
        <img src='/shelf.svg' alt='' />
      </EditorButton>
      <EditorButton size={40}>
        <img src='/cashbox.png' alt='' />
      </EditorButton>
      <EditorButton size={40}>
        <img src='/start.svg' alt='' />
      </EditorButton>
      <EditorButton size={40}>
        <img src='/sale.png' alt='' />
      </EditorButton>
      <EditorButton size={40}>
        <img src='/add-event.svg' alt='' />
      </EditorButton>
    </section>
  );
};
