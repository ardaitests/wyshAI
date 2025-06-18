import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when the pathname changes
    if (window.gtag) {
      window.gtag('config', 'G-759L0RDEG8', {
        page_path: location.pathname + location.search + location.hash,
      });
    }
  }, [location]);
};

export default usePageTracking;
