import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/utils/analytics';

/**
 * Tracks page views with Google Analytics
 * @param {string} [customTitle] - Optional custom title to use instead of document.title
 */
const usePageTracking = (customTitle) => {
  const location = useLocation();

  useEffect(() => {
    // Skip tracking for demo pages
    if (location.pathname.includes('/demo') || location.pathname.includes('/demos')) {
      return;
    }
    
    // Track page view when the pathname changes
    const pagePath = location.pathname + location.search + location.hash;
    const pageTitle = customTitle || document.title || window.location.pathname;
    
    trackPageView(pagePath, pageTitle);
    
    // For SPAs, also send a page_view event to GA4
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: pagePath,
        page_title: pageTitle,
        page_location: window.location.href
      });
    }
  }, [location, customTitle]); // Add customTitle as a dependency
};

export default usePageTracking;
