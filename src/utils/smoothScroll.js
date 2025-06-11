/**
 * Smooth scroll utility for anchor links
 * @param {string} selector - The selector for the target element
 * @param {number} offset - The offset from the top of the element (default: 80)
 */
export const scrollToElement = (selector, offset = 80) => {
  const element = document.querySelector(selector);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return true;
  }
  return false;
};

/**
 * Initialize smooth scrolling for all anchor links with href starting with '#'
 */
export const initSmoothScrolling = () => {
  // Handle clicks on anchor links
  const handleAnchorClick = (e) => {
    const target = e.target.closest('a[href^="#"]');
    if (target) {
      const href = target.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const targetId = href.substring(1);
        
        // First try to find the element by ID
        if (document.getElementById(targetId)) {
          scrollToElement(`#${targetId}`);
          // Update URL without triggering a page reload
          window.history.pushState(null, null, `#${targetId}`);
        } else {
          // Fallback to default behavior if element not found
          window.location.href = href;
        }
      }
    }
  };

  // Add event listener to the document
  document.addEventListener('click', handleAnchorClick);

  // Handle initial page load with hash in URL
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    if (document.getElementById(targetId)) {
      // Small timeout to ensure the page has fully rendered
      setTimeout(() => scrollToElement(`#${targetId}`), 100);
    }
  }

  // Cleanup function to remove event listener
  return () => {
    document.removeEventListener('click', handleAnchorClick);
  };
};
