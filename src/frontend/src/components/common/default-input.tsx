import { DefaultStyle } from '@/styles';
import { ErrorMessage } from '@hookform/error-message';
import clsx, { ClassValue } from 'clsx';
import React, { JSX, useState } from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import { MessageError } from '..';

type DefaultInputProps = JSX.IntrinsicElements['input'] & {
  name: string;
  registerOptions: RegisterOptions;
  placeholder?: string;
  className?: ClassValue;
};

export const DefaultInput: React.FC<DefaultInputProps> = ({
  name,
  registerOptions,
  type,
  placeholder,
}) => {
  const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
  const {
    formState: { errors },
    register,
  } = useFormContext();

  return (
    <div className={clsx(DefaultStyle.defaultInput)}>
      <input
        {...register(name, registerOptions)}
        className={clsx(
          DefaultStyle.input,
          isActiveInput ? DefaultStyle.active : '',
          Object.keys(errors).length > 0 && errors[name]
            ? DefaultStyle.error
            : ''
        )}
        type={type}
        onFocus={() => {
          setIsActiveInput(true);
        }}
        onBlur={(e) => {
          setIsActiveInput(false || e.target.value !== '');
        }}
      />
      <span
        className={clsx(
          DefaultStyle.defaultInputPlaceholder,
          isActiveInput ? DefaultStyle.active : '',
          Object.keys(errors).length > 0 && errors[name]
            ? DefaultStyle.error
            : ''
        )}
      >
        {placeholder ?? name}
      </span>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <MessageError message={message} />}
      />
    </div>
  );
};
