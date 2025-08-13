
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx";
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import officePortraitImage from '@/assets/Office-Portrait-with-Depth.webp';

// Create Accordion component if it doesn't exist
// For now, I'll assume it will be created or use a simplified structure.
// If Accordion component isn't available, this part needs its own implementation or simplification.

const faqsData = [
  {
    question: "What is Wysh AI?",
    answer: "Wysh AI provides creates and connects intelligent automated workflows and AI agents that reduce or eliminate manual tasks, integrate data and systems, generate marketing content, improve customer service, and provide your customers with better digital experiences. Our goal is to make AI simple, accessible, and valuable for every business.",
  },
  {
    question: "How does it work?",
    answer: (
      <>
        Our digital experience design and development capabilities enable us to create custom AI tools and agents that are tailored to your specific needs. <br /><br />
        First, we meet with you to understand your business goals, needs, and challenges. We start with <em>why AI is right for you.</em> <br /><br />
        Then, working closely with you, we use human-centered design principles to envision and create apps, tools, and agents that meet your specific needs. <br /><br />
        Finally, we set up platforms, connect data and systems, and develop users experiences you, and your customers, will love. We provide training and ongoing support to ensure you feel great about working with us.
      </>
    ),
  },
  {
    question: "Who can benefit?",
    answer: "Any small or medium-sized business owner or manager interested in adopting AI technology to help them save effort and time, reduce costs, simplify processes, offer better customer experiences, and focus on what matters most – improving their business.",
  },
  {
    question: "Do I have to customize?",
    answer: "No, we have pre-built AI tools and agents that are ready to use. By updating a few settings, you can be up and running in 24 hours.",
  }
];


const ContactSection = () => {
  const { openChat } = useChatbot();

  const handleContact = (e) => {
    e.preventDefault();
    openChat({ initialMessage: "I'd like to discuss my project or get a demo.", initialStep: 'getContactDetails' });
  };
  
  const handleDemo = (e) => {
    e.preventDefault();
    openChat({ initialMessage: "I'm interested in a demo of how Wysh AI can help me.", initialStep: 'scheduleDemo' });
  };

  return (
    <>
      {/* CTA Section */}
      <section 
        className="py-24 md:py-32 text-white relative overflow-hidden"
        style={{
          background: 'linear-gradient(-40deg, hsl(24 4% 30%) 0%, hsl(24 4% 25%) 50%, hsl(24 4% 15%) 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient 15s ease infinite'
        }}
      >
        {/* Animated gradient overlay - pointer-events-none allows clicks to pass through */}
        <div className="absolute inset-0 bg-gradient-to-br from-foreground-darker/30 via-foreground-darker/10 to-foreground-darker/30 mix-blend-overlay pointer-events-none"></div>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image on the left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-2 md:order-1"
            >
              <img 
                src={officePortraitImage} 
                alt="Modern professional office space with clean design, workstations, and meeting areas" 
                aria-label="Professional office environment with modern workspace design"
                className="rounded-lg shadow-xl w-full h-auto max-w-lg mx-auto"
                onError={(e) => {
                  console.error('Office portrait image failed to load, using fallback');
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/1a1a2e/e6e6e6?text=Professional+Office';
                  e.target.alt = 'Placeholder image of a professional office workspace';
                  e.target.setAttribute('aria-label', 'Placeholder for professional office environment');
                }}
              />
            </motion.div>

            {/* Text content on the right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="order-1 md:order-2 text-center md:text-left"
            >
              <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-6 text-white">
                Get started with AI. <br />It's easier than you think.
              </h2>
              <p className="text-lg text-slate-300 max-w-xl mx-auto md:mx-0 mb-8">
                Get in touch or request a demo to see how quickly AI can begin working for you!
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" onClick={handleContact} className="bg-swiss-coffee-lightest text-primary hover:bg-gray-100">
                  Contact Us
                </Button>
                <Button size="lg" variant="outline" onClick={handleDemo} className="border-white text-white hover:bg-swiss-coffee-lightest/10">
                  Request a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-swiss-coffee-lightest text-foreground" id="faq">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-3 text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground-darker max-w-xl mx-auto">
              Common questions and answers about <span className="whitespace-nowrap">Wysh AI</span> and our services.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqsData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline text-base md:text-lg font-medium text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground-darker text-sm md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button variant="subtle" size="lg" onClick={handleContact}>
                Still have questions? Message us <MessageSquare className="ml-2 h-5 w-5"/>
            </Button>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default ContactSection;
