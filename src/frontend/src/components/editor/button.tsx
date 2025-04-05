import { ShopCreateStyles } from '@/styles';
import React, { ReactNode } from 'react';

interface EditorButtonProps {
  action?: () => unknown;
  children?: ReactNode;
  size?: number;
}

export const EditorButton: React.FC<EditorButtonProps> = ({
  action,
  children,
  size,
}) => {
  return (
    <button
      type='button'
      onClick={action}
      style={size ? { height: size, width: size } : undefined}
      className={ShopCreateStyles.editorButton}
    >
      {children}
    </button>
  );
};
