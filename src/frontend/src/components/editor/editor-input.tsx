import { ShopCreateStyles } from '@/styles';
import clsx, { ClassValue } from 'clsx';
import React, { JSX } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

type EditorInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  registerOptions?: RegisterOptions;
  placeholder?: string;
  className?: ClassValue;
};

export const EditorInput: React.FC<EditorInputProps> = ({
  name,
  registerOptions = {},
  type,
  placeholder,
  ...props
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <input
      {...register(name, registerOptions)}
      className={clsx(
        ShopCreateStyles.input,
        Object.keys(errors).length > 0 && errors[name]
          ? ShopCreateStyles.error
          : ''
      )}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
};
