import React from 'react';
import Navbar from '@/components/layout/Navbar.jsx';
import Footer from '@/components/layout/Footer.jsx';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  // Add a class to the body for global transitions
  React.useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-500');
    return () => {
      document.body.classList.remove('transition-colors', 'duration-500');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-primary-dark transition-colors duration-500">
      <Navbar />
      <main className="flex-grow bg-primary-dark pt-20 transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;