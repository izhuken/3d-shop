import { ShopCreateStyles } from '@/styles';
import React, { ReactNode } from 'react';

interface EditorButtonProps {
  action?: () => unknown;
  children?: ReactNode;
  size?: number;
  type?: 'submit' | 'button';
  id?: string;
}

export const EditorButton: React.FC<EditorButtonProps> = ({
  action,
  children,
  size,
  type = 'button',
  id,
}) => {
  return (
    <button
      type={type}
      id={id}
      onClick={action}
      style={size ? { height: size, width: size } : undefined}
      className={ShopCreateStyles.editorButton}
    >
      {children}
    </button>
  );
};
