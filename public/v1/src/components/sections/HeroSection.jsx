
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { ArrowRight, Zap } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';

const HeroSection = () => {
  const { openChat } = useChatbot();

  const handleLearnMoreClick = () => {
    openChat({
      initialMessage: "Interested in learning more? Great! To start, what's your name?",
      initialStep: 'getName'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-4 pt-20 md:pt-0 bg-gradient-to-br from-background via-slate-900 to-purple-900/30 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img  class="w-full h-full object-cover" alt="Abstract AI background" src="https://images.unsplash.com/photo-1678995635432-d9e89c7a8fc5" />
      </div>
      
      <motion.div 
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full filter blur-2xl animate-pulse-slow"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full filter blur-3xl animate-pulse-slow-reverse"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="relative z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <Zap className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl md:text-7xl font-archivo font-extrabold mb-6">
            Custom AI Agents for <span className="gradient-text">Your Business</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Wysh AI partners with business owners to design and build custom AI agents, unlocking more time and money through the power of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg px-10 py-6 rounded-full shadow-xl hover:opacity-90 transition-opacity transform hover:scale-105"
              onClick={handleLearnMoreClick}
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6 rounded-full border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-105">
              View Services
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </section>
  );
};

export default HeroSection;
