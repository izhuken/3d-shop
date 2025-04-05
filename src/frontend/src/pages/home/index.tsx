import { DefaultButton, Header } from '@/components';
import { HomepageStyles } from '@/styles';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router';

interface HomepageProps {}

export const Homepage: React.FC<HomepageProps> = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Домашная страница | DevLab</title>
      </Helmet>
      <Header />
      <div className={HomepageStyles.homapageContainer}>
        <div className={HomepageStyles.homapageText}>
          <p className={HomepageStyles.homapageTitle}>
            Место, где идеи становятся реальностью
          </p>
          <p className={HomepageStyles.homapageContent}>
            Наш подход к работе основан на глубоком понимании потребностей
            клиента, тщательном анализе рынка и создании уникальных решений,
            которые помогут достичь поставленных целей.
          </p>
          <DefaultButton onClick={() => navigate('/login')}>
            Перейти
          </DefaultButton>
        </div>
        <div className={HomepageStyles.imageContainer}>
          <img src='/homepage-preview.png' alt='' />
        </div>
      </div>
    </>
  );
};
