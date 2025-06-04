
import React from 'react';
import HeroSection from '@/components/sections/HeroSection.jsx';
import AboutSection from '@/components/sections/AboutSection.jsx';
import ServicesSection from '@/components/sections/ServicesSection.jsx';
import ContactSection from '@/components/sections/ContactSection.jsx';
import { motion } from 'framer-motion';
// Import other sections as needed, e.g., TestimonialSection

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
  out: { opacity: 0, transition: { duration: 0.3 } }
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HomePage = () => {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="in" exit="out">
      <motion.div variants={sectionVariants}><HeroSection /></motion.div>
      <motion.div variants={sectionVariants}><AboutSection /></motion.div>
      <motion.div variants={sectionVariants}><ServicesSection /></motion.div>
      {/* <motion.div variants={sectionVariants}><TestimonialSection /></motion.div> */}
      <motion.div variants={sectionVariants}><ContactSection /></motion.div>
    </motion.div>
  );
};

export default HomePage;
