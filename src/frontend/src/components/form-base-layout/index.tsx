import { FC, ReactNode } from 'react';
import { FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

interface FormBaseLayoutProps {
  children?: ReactNode;
  methods: UseFormReturn<any, unknown, undefined>;

  onSub: SubmitHandler<any>;
}

export const FormBaseLayout: FC<FormBaseLayoutProps> = ({
  onSub,
  children,
  methods,
}) => {
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSub)}
        style={{ width: '100%', maxWidth: 400 }}
      >
        {children}
      </form>
    </FormProvider>
  );
};
