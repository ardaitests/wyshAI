
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
      {/* Optional: Add another distinct section here if needed, based on image (e.g. the dark grey one) */}
      {/* Example:
      <motion.div variants={sectionVariants}>
        <section className="section-padding bg-gray-800 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Unlock Your Business Potential with AI</h2>
            <p className="max-w-2xl mx-auto mb-6">WyshAI transforms the way small and medium-sized businesses operate...</p>
            <img  alt="Team collaborating with AI" className="rounded-lg shadow-xl mx-auto max-w-lg" src="https://images.unsplash.com/photo-1580982333389-cca46f167381" />
          </div>
        </section>
      </motion.div>
      */}
      <motion.div variants={sectionVariants}><ServicesSection /></motion.div>
      {/* <motion.div variants={sectionVariants}><TestimonialSection /></motion.div> */}
      <motion.div variants={sectionVariants}><ContactSection /></motion.div>
    </motion.div>
  );
};

export default HomePage;
