import { FC, ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};
