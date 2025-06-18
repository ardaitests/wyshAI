import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import ServicesPage from '@/pages/ServicesPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import PrivacyPolicy from '@/pages/PrivacyPolicy.jsx';
import TermsOfService from '@/pages/TermsOfService.jsx';
import DemosPage from '@/pages/DemosPage.jsx';
import Layout from '@/components/layout/Layout.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from '@/components/chatbot/Chatbot.jsx';
import { ChatbotProvider } from '@/contexts/ChatbotContext.jsx';
import { initSmoothScrolling, scrollToElement } from '@/utils/smoothScroll';
import usePageTracking from '@/hooks/usePageTracking';

function App() {
  // Removed document.documentElement.classList.add('dark'); to default to light theme
  const location = useLocation();
  usePageTracking(); // Add this line to track page views

  // Initialize smooth scrolling
  useEffect(() => {
    // Initialize smooth scrolling for anchor links
    const cleanup = initSmoothScrolling();
    
    // Cleanup event listeners on unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Handle route changes and scroll to top
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // If there's a hash in the URL, scroll to that element
    if (location.hash) {
      // Small delay to ensure the page has rendered
      const timer = setTimeout(() => {
        scrollToElement(location.hash);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <ChatbotProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/demos" element={<DemosPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <Chatbot />
      <Toaster />
    </ChatbotProvider>
  );
}

export default App;