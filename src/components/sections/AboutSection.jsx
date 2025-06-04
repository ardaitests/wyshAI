
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Lightbulb } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
      text: "Streamline operations for improved productivity and cost savings.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      text: "Gain insights that drive informed business decisions.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      text: "Stay ahead of competitors with innovative AI solutions.",
    },
  ];

  return (
    <section className="bg-white text-foreground section-padding" id="about">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6 text-gray-800">
              Unlock Your Business Potential with the Power of AI Technology
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-gray-600">
              Integrating AI into your business strategy can significantly enhance growth and efficiency. By automating routine tasks and providing data-driven insights, AI empowers you to stay competitive in today's fast-paced market.
            </p>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                  className="flex items-start space-x-3"
                >
                  <span className="flex-shrink-0 mt-1">{feature.icon}</span>
                  <span className="text-gray-700">{feature.text}</span>
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
                src="/images/Office-Collaboration in-Color.png" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
