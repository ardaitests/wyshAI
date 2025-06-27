// GA4 Utility Functions
export const trackPageView = (path, title) => {
  if (window.gtag) {
    gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: window.location.href
    });
  }
};

export const trackChatOpen = (sourcePage) => {
  if (window.gtag) {
    gtag('event', 'chat_open', {
      event_category: 'engagement',
      event_label: sourcePage,
      value: 1
    });
  }
};

export const trackButtonClick = (buttonName) => {
  if (window.gtag) {
    gtag('event', 'button_click', {
      event_category: 'engagement',
      event_label: buttonName,
      value: 1
    });
  }
};
