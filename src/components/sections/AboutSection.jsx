
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Lightbulb } from 'lucide-react';

const AboutSection = () => {
  const textVariants = {
    hidden: { opacity: 0, x: 0 }, // Adjusted for full width
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.4, 
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="section-padding bg-background" id="about">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-1 gap-12 items-center"> {/* Changed to md:grid-cols-1 */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-archivo font-bold mb-6 text-center md:text-left"> {/* Added text-center for mobile, md:text-left for larger */}
              Partnering for <span className="gradient-text">Your Success</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Wysh AI, we believe in the transformative power of artificial intelligence for small and medium-sized businesses. We're not just developers; we're your dedicated partners in innovation.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our mission is to understand your unique challenges and opportunities, then craft bespoke AI agents that integrate seamlessly into your operations, driving efficiency, growth, and a better bottom line.
            </p>
            <div className="space-y-6 max-w-2xl mx-auto md:mx-0"> {/* Added max-w and mx-auto for centering on mobile */}
              <motion.div custom={0} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-archivo font-semibold text-primary-foreground mb-1">Client-Centric Approach</h3>
                  <p className="text-muted-foreground">We prioritize your needs, working collaboratively to ensure our AI solutions perfectly align with your business goals.</p>
                </div>
              </motion.div>
              <motion.div custom={1} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-archivo font-semibold text-primary-foreground mb-1">Custom-Built Solutions</h3>
                  <p className="text-muted-foreground">No off-the-shelf products. Every AI agent is designed and built specifically for your unique requirements.</p>
                </div>
              </motion.div>
              <motion.div custom={2} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                  <Lightbulb className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-archivo font-semibold text-primary-foreground mb-1">Innovation & Expertise</h3>
                  <p className="text-muted-foreground">Leveraging the latest AI advancements and deep industry knowledge to deliver impactful results.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
          {/* Image div removed */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
