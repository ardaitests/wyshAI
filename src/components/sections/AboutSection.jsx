
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, CheckCircle, ThumbsUp } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <TrendingDown className="h-6 w-6 text-primary" />,
      text: "Streamline operations to save significant time and money.",
    },
    {
      icon: <ThumbsUp className="h-6 w-6 text-primary" />,
      text: "Improve customer satisfaction with impressive, personalized experiences.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      text: "Stay ahead of competitors with modern AI solutions.",
    },
  ];

  return (
    <section className="bg-swiss-coffee-lightest text-foreground py-24 md:py-32" id="about">
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
            wyshAI employs the latest no-code platforms and generative AI technologies to design, build, and deploy AI tools and agents tailored to your specific business needs.
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
            <div className="w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-xl shadow-xl overflow-hidden">
              <img 
                className="w-full h-full object-cover"
                alt="Team collaborating in a modern office environment"
                src="/images/office-collab.png"
                onError={(e) => { 
                  console.error('Failed to load image:', {
                    src: e.target.src,
                    complete: e.target.complete,
                    naturalWidth: e.target.naturalWidth,
                    naturalHeight: e.target.naturalHeight,
                    error: e.nativeEvent?.message || 'Unknown error'
                  });
                  e.target.style.display = 'none';
                }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
