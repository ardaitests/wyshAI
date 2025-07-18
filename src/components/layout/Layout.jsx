import React from 'react';
import Navbar from '@/components/layout/Navbar.jsx';
import Footer from '@/components/layout/Footer.jsx';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';


const Layout = ({ children }) => {
  const location = useLocation();
  const isPrivacyPage = location.pathname === '/privacy-policy';
  const isTermsPage = location.pathname === '/terms';
  const isLightPage = isPrivacyPage || isTermsPage;

  // Add a class to the body for global transitions
  React.useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-500');
    return () => {
      document.body.classList.remove('transition-colors', 'duration-500');
    };
  }, []);

  return (
    <div className={`flex flex-col min-h-screen ${isLightPage ? 'bg-swiss-coffee-lighter' : 'bg-primary-dark'} transition-colors duration-500`}>
      <Navbar />
      <main className={`flex-grow pt-20 ${isLightPage ? 'bg-swiss-coffee-lighter' : 'bg-primary-dark'} transition-colors duration-500`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;