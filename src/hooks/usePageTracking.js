import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when the pathname changes
    const pagePath = location.pathname + location.search + location.hash;
    const pageTitle = document.title || window.location.pathname;
    
    trackPageView(pagePath, pageTitle);
    
    // For SPAs, also send a page_view event to GA4
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle,
        page_location: window.location.href
      });
    }
  }, [location]);
};

export default usePageTracking;
