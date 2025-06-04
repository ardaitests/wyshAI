
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { ArrowRight } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';

const HeroSection = () => {
  const { openChat } = useChatbot();

  const handleGetStarted = () => {
    openChat({ initialMessage: "I'm interested in getting started with wyshAI!", initialStep: 'getName' });
  };

  const handleLearnMore = () => {
     // Could scroll to a section or open chat with specific context
    const servicesSection = document.getElementById('services-overview'); // Assuming ServicesSection has this ID
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      openChat({ initialMessage: "I'd like to learn more about wyshAI's capabilities.", initialStep: 'getMoreInfo' });
    }
  };


  return (
    <section className="bg-primary-light text-foreground pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-archivo font-extrabold mb-6 text-primary-foreground">
            Empower Your Business with AI Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 text-primary-foreground/80">
            Unlock the potential of artificial intelligence to drive growth and efficiency in your small business. Let WyshAI guide you on your journey to success.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" variant="default" onClick={handleGetStarted} className="shadow-lg">
              Get Started 
            </Button>
            <Button size="lg" variant="outline" onClick={handleLearnMore} className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="w-full max-w-md lg:max-w-lg aspect-square rounded-xl shadow-2xl overflow-hidden">
            <img 
              className="w-full h-full object-cover"
              alt="Cafe owner using a laptop with AI technology"
              src="/images/20250604-1120-Cafe Owner-Digital-Bliss.png" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
