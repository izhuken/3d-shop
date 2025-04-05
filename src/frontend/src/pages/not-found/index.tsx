import { DefaultButton } from '@/components';
import { NotFoundStyles } from '@/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NotFoundPageProps {}

const NotFoundPageFc: React.FC<NotFoundPageProps> = () => {
  const navigate = useNavigate();

  return (
    <section className={NotFoundStyles.pageLayOut}>
      <article className={NotFoundStyles.nfContainer}>
        <p className={NotFoundStyles.fuck}>Упс...</p>
        <p className={NotFoundStyles.FOF}>404</p>
        <p>Мы не смогли найти для вас этот контент</p>
        <DefaultButton style='d' onClick={() => navigate('/')}>
          Вернуться домой
        </DefaultButton>
      </article>
    </section>
  );
};

export const NotFoundPage = React.memo(NotFoundPageFc);
