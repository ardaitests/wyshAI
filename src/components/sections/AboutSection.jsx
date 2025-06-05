
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, CheckCircle, ThumbsUp } from 'lucide-react';
import aboutImage from '@/assets/about-image.png';

const AboutSection = () => {
  const features = [
    {
      icon: <TrendingDown className="h-6 w-6 text-primary" />,
      text: "Save time and money — streamlining operations and reducing effort.",
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-primary" />,
      text: "Impress customers — improve customer satisfaction with personalized experiences.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      text: "Gain an edge — get ahead and stay ahead of competitors with modern AI solutions.",
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
            Wysh AI employs the latest no-code platforms and generative AI technologies to create AI tools and agents tailored to your specific business needs.
            </p>
            <ul className="space-y-6">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                  className="flex items-center space-x-4"
                >
                  <span className="flex-shrink-0">{feature.icon}</span>
                  <span className="text-foreground">{feature.text}</span>
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
                alt="Team collaborating in a modern office environment"
                src={aboutImage}
                onError={(e) => console.error('About image failed to load', e)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
