import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Default = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('defaultPage', '/articles');

    return () => {
      sessionStorage.removeItem('defaultPage');
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const defaultPage = sessionStorage.getItem('defaultPage');
      if (defaultPage) {
        navigate(defaultPage);
      }
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);
  return(
    <></>
  );
};
