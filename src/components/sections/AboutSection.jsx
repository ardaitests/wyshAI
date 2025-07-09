import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, CheckCircle, ThumbsUp } from 'lucide-react';
import officeCollabImage from '@/assets/office-collaboration-in-color.png';

const AboutSection = () => {
  const features = [
    {
      icon: <TrendingDown className="h-6 w-6 text-primary" />,
      text: <><strong>Save time and money</strong> — reduce effort and waste by streamlining your processes and eliminating tasks.</>,
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-primary" />,
      text: <><strong>Grow faster</strong> — impress your audiences and improve customer satisfaction with personalized experiences and content.</>,
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      text: <><strong>Gain an edge</strong> — lead the way or simplify how your business works with modern AI-powered assistants and features.</>,
    },
  ];

  return (
    <section 
      className="relative text-foreground py-24 md:py-32 overflow-hidden bg-gradient-to-br from-swiss-coffee-lightest via-swiss-coffee-lighter to-swiss-coffee-lightest bg-[length:200%_200%] animate-gradient"
      id="about"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-foreground/5 to-foreground/10 mix-blend-overlay pointer-events-none"></div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center justify-items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-6 text-foreground">
            Let AI work for you.
            </h2>
            <h2 className="text-2xl md:text-2xl font-montserrat font-medium mb-6 text-foreground">
              <i>It's smarter, faster, and cheaper.</i>
            </h2>
            <p className="text-lg text-muted-foreground-darker mb-8">
            Wysh AI uses the latest no-code platforms and AI technologies to create AI tools and helpers tailored to your specific business needs.
            </p>
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                  className="flex items-start space-x-4"
                >
                  <span className="flex-shrink-0 mt-1">{feature.icon}</span>
                  <span className="text-foreground -mt-1">{feature.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative flex justify-center md:justify-start"
          >
            <div className="w-full max-w-md lg:max-w-lg">
              <img 
                className="w-full h-auto rounded-xl shadow-xl"
                alt="Diverse team of professionals collaborating around a table in a modern office, discussing a project with digital devices and documents"
                src={officeCollabImage}
                aria-label="Team collaboration in a professional office setting"
                onError={(e) => {
                  console.error('About image failed to load, using fallback');
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Team+Collaboration';
                  e.target.alt = 'Placeholder image showing a team collaborating in an office';
                  e.target.setAttribute('aria-label', 'Placeholder for team collaboration image');
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
