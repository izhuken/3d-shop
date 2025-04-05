import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RedirectNotFoundProps {}

export const RedirectNotFound: React.FC<RedirectNotFoundProps> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/not-found', {
      replace: true,
    });
  }, []);

  return <></>;
};
