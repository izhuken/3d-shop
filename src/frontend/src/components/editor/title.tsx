import { ShopCreateStyles } from '@/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EditorButton } from './button';
import { EditorInput } from './editor-input';

interface EditorTitleBoxProps {}

export const EditorTitleBox: React.FC<EditorTitleBoxProps> = () => {
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

      <EditorInput name='name' registerOptions={{ required: true }} />
    </section>
  );
};
