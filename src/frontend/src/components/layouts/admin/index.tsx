import { FC, ReactNode } from 'react';

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div>
      <section>header</section>
      <nav>nav</nav>
      <main>main</main>
    </div>
  );
};
