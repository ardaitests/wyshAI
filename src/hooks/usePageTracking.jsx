import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Tracks page views with Google Analytics and updates the document title
 * @param {string} [pageTitle] - Optional custom title to use instead of document.title
 */
const usePageTracking = (pageTitle) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title if pageTitle is provided
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
