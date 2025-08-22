import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTracking = (pageTitle) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    if (pageTitle) {
      document.title = pageTitle;
    }

    // Track page view in Google Analytics if gtag is available
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash,
        page_title: pageTitle || document.title
      });
    }
  }, [location, pageTitle]);

  return null;
};

export default usePageTracking;
