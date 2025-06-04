
import React from 'react';
import HeroSection from '@/components/sections/HeroSection.jsx';
import ServicesSection from '@/components/sections/ServicesSection.jsx';
import AboutSection from '@/components/sections/AboutSection.jsx';
import ContactSection from '@/components/sections/ContactSection.jsx';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <motion.div initial="hidden" animate="visible" variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
    }}>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
        <HeroSection />
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
        <ServicesSection />
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
        <AboutSection />
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
        <ContactSection />
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
