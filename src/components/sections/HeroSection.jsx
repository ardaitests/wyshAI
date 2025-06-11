import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { ArrowDown } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import { scrollToElement } from '@/utils/smoothScroll';
import cafeImage from '@/assets/20250604-1120-cafe-owner-digital-bliss.png';

const HeroSection = () => {
  const { openChat } = useChatbot();

  const handleGetStarted = () => {
    openChat({ initialMessage: "I'm interested in getting started with Wysh AI!", initialStep: 'getName' });
  };

  const handleLearnMore = () => {
    // Use the smooth scroll utility to scroll to services section
    const scrolled = scrollToElement('#services-overview');
    
    // If the element wasn't found, open the chat
    if (!scrolled) {
      openChat({ 
        initialMessage: "I'd like to learn more about Wysh AI's capabilities.", 
        initialStep: 'getMoreInfo' 
      });
    }
  };


  return (
    <section 
      className="text-foreground pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-primary-lighter via-primary-light to-primary-medium bg-[length:200%_200%] animate-gradient"
      style={{
        backgroundImage: 'linear-gradient(-40deg, hsl(256 92% 92%) 0%, hsl(256 84% 72%) 50%, hsl(256 60% 60%) 100%)'
      }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column - Headline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col justify-center pr-0 md:pr-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-semibold text-primary-foreground leading-[1.3]">
              Unlock the power of AI for your small business
            </h1>
          </motion.div>

          {/* Right Column - Body and Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="flex flex-col justify-center pl-0 md:pl-4"
          >
            <p className="text-lg md:text-xl text-primary-foreground mb-4">
              Wysh AI works with small businesses to design and build custom AI tools and agents for real results, fast.
            </p>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
              Save time, delight customers, and reduce costs with artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" variant="default" onClick={handleGetStarted} className="shadow-lg">
                Get Started 
              </Button>
              <Button size="lg" variant="outline" onClick={handleLearnMore} className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                Learn More <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Full Width Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-6xl mx-auto mt-16"
        >
          <div className="w-full aspect-video rounded-xl shadow-2xl overflow-hidden">
            <img 
              className="w-full h-full object-cover"
              alt="Cafe owner using a tablet to manage orders with AI assistance, showcasing modern business technology in action"
              src={cafeImage}
              aria-label="Cafe owner utilizing AI technology for business operations"
              onError={(e) => {
                console.error('Hero image failed to load, using fallback');
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/1200x675/1a1a2e/e6e6e6?text=AI+Business+Solutions';
                e.target.alt = 'Placeholder image showing AI business solutions in action';
                e.target.setAttribute('aria-label', 'Placeholder for hero image showing business technology');
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
