
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Mail, Phone, Sparkles } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';

const ContactSection = () => {
  const { openChat } = useChatbot();

  const handleScheduleConsultationClick = () => {
    openChat({
      initialMessage: "Let's schedule your consultation! First, what's your name?",
      initialStep: 'getName'
    });
  };

  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 to-background">
      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="text-4xl md:text-5xl font-archivo font-bold mb-6">
            Ready to <span className="gradient-text">Transform Your Business?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Let's discuss how Wysh AI can build custom AI agents to help you achieve your business goals. Get in touch for a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg px-10 py-6 rounded-full shadow-xl hover:opacity-90 transition-opacity transform hover:scale-105"
              onClick={handleScheduleConsultationClick}
            >
              <Mail className="mr-3 h-6 w-6" /> Schedule a Consultation
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6 rounded-full border-primary text-primary hover:bg-primary/10 transition-colors transform hover:scale-105">
              <Phone className="mr-3 h-6 w-6" /> Call Us Today
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
