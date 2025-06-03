import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import ServicesPage from '@/pages/ServicesPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import Layout from '@/components/layout/Layout.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import Chatbot from '@/components/chatbot/Chatbot.jsx';
import { ChatbotProvider } from '@/contexts/ChatbotContext.jsx';

function App() {
  // Removed document.documentElement.classList.add('dark'); to default to light theme

  const location = useLocation();

  return (
    <ChatbotProvider>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AnimatePresence>
      </Layout>
      <Chatbot />
      <Toaster />
    </ChatbotProvider>
  );
}

export default App;