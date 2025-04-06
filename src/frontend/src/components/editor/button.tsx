import { ShopCreateStyles } from '@/styles';
import React, { ReactNode } from 'react';

interface EditorButtonProps {
  action?: () => unknown;
  children?: ReactNode;
  size?: number;
  type?: 'submit' | 'button';
  id?: string;
  disabled?: boolean;
}

export const EditorButton: React.FC<EditorButtonProps> = ({
  action,
  children,
  size,
  type = 'button',
  id,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      id={id}
      onClick={action}
      disabled={disabled}
      style={size ? { height: size, width: size } : undefined}
      className={ShopCreateStyles.editorButton}
    >
      {children}
    </button>
  );
};
