
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.jsx"; // Assuming accordion is created
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';

// Create Accordion component if it doesn't exist
// For now, I'll assume it will be created or use a simplified structure.
// If Accordion component isn't available, this part needs its own implementation or simplification.

const faqsData = [
  {
    question: "What is wyshAI?",
    answer: "wyshAI is a platform designed to empower small and medium-sized businesses with AI-driven solutions. We provide tools that streamline operations, enhance customer engagement, and drive growth. Our goal is to make AI accessible and beneficial for every business.",
  },
  {
    question: "How does it work?",
    answer: "Our platform utilizes advanced algorithms to analyze data and generate actionable insights. By integrating seamlessly with your existing systems, wyshAI automates tasks and enhances decision-making. This allows you to focus on what matters most—growing your business.",
  },
  {
    question: "Who can benefit?",
    answer: "Any small or medium-sized business looking to leverage technology can benefit from wyshAI. Our solutions cater to various industries, helping you optimize processes and improve customer experiences. Whether you're in retail, services, or manufacturing, we have something for you.",
  },
  {
    question: "Is there a trial?",
    answer: "Yes, we offer a free trial for new users to explore our features. This allows you to experience the benefits of wyshAI without any commitment. Sign up today and see how we can transform your business.",
  }
];


const ContactSection = () => {
  const { openChat } = useChatbot();

  const handleContact = () => {
    openChat({ initialMessage: "I'd like to discuss my project or get a demo.", initialStep: 'getContactDetails' });
  };
  
  const handleDemo = () => {
    openChat({ initialMessage: "I'm interested in a demo of wyshAI.", initialStep: 'scheduleDemo' });
  };

  return (
    <>
      {/* CTA Section */}
      <section className="section-padding bg-footer-background text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
              Unlock Your AI Potential
            </h2>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              Discover how wyshAI can transform your business. Get in touch or request a demo today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" onClick={handleContact} className="bg-white text-primary hover:bg-gray-100">
                Contact Us
              </Button>
              <Button size="lg" variant="outline" onClick={handleDemo} className="border-white text-white hover:bg-white/10">
                Request a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-white text-foreground" id="faq">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-3 text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto text-gray-600">
              Discover the answers to your most pressing questions about wyshAI and our innovative services.
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
                  <AccordionTrigger className="text-left hover:no-underline text-base md:text-lg font-medium text-gray-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-sm md:text-base">
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
                Still have questions? Send us a message <MessageSquare className="ml-2 h-5 w-5"/>
            </Button>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default ContactSection;
