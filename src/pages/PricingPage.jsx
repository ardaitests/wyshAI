import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Check, Zap, Settings, Code, Wrench, Smartphone, Database, Cpu, MessageCircle, ArrowRight } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';

// Sparkles component for background effect
const Sparkles = ({ count = 30 }) => {
  // Use React.useMemo to prevent unnecessary re-renders
  const sparkles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1, // Smaller (1-5px)
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
  }, [count]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ contentVisibility: 'auto' }}
      aria-hidden="true"
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white animate-sparkle will-change-transform"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.posX}%`,
            top: `${sparkle.posY}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            boxShadow: '0 0 15px 3px rgba(255, 255, 255, 0.95)',
            opacity: 0,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            filter: 'brightness(1.5)'
          }}
        />
      ))}
    </div>
  );
};

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1 
    } 
  },
  out: { 
    opacity: 0, 
    y: -20, 
    transition: { duration: 0.3 } 
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pricingPlans = [
  {
    id: 'personalized-ai',
    title: 'Personalized AI Agent',
    price: '$999',
    description: 'A custom AI assistant tailored to your specific needs and workflows.',
    features: [
      'Custom-branded AI assistant chatbot',
      'Basic workflow automation tailored to your needs',
      'Website or app integration',
      'Includes 1 year of shared cloud hosting²',
      'Email and phone support',
    ],
    optionalFeatures: [
      'Custom reporting options available for additional fee'
    ],
    icon: <Cpu className="h-8 w-8 text-primary" />,
    buttonText: 'Get Started',
    popular: false,
  },
  {
    id: 'custom-solution',
    title: 'Custom AI Solution',
    price: 'Contact us for a quote',
    description: 'Tailored AI-powered solutions designed specifically for your business needs.',
    features: [
      'Custom AI tools development',
      'Advanced workflow automation',
      'Cross-platform integration',
      'Custom dashboard & analytics',
      'Priority support',
      'Custom training & onboarding',
    ],
    icon: <Settings className="h-8 w-8 text-primary" />,
    buttonText: 'Contact Us',
    popular: true,
  },
];

const PricingPage = () => {
  const { openChat } = useChatbot();

  const handleContactClick = (plan) => {
    let message = '';
    
    if (plan.id === 'personalized-ai') {
      message = "I understand you're interested in our Personalized AI Agent plan. I'd be happy to help you set up your custom AI assistant. Could you tell me a bit about your business needs?";
    } else if (plan.id === 'custom-solution') {
      message = "Thank you for your interest in our Custom AI Solutions. I'm here to help you explore the possibilities for your business. Could you share more about what challenges you're looking to address?";
    } else {
      message = `Thank you for your interest in our ${plan.title} plan. I'd be happy to provide more information. What specific aspects of this plan would you like to learn more about?`;
    }
    
    openChat({ 
      initialMessage: message,
      initialStep: 'getStarted'
    });
  };

  return (
    <>
      <motion.div
        className="container mx-auto px-4 py-16 md:py-24"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
      {/* Hero Section */}
      <motion.div 
        className="text-center max-w-3xl mx-auto mb-16"
        variants={itemVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-relaxed">Straightforward or specialized, it's your choice.</h1>
        <p className="text-xl text-gray-600 mb-8">
          Choose the plan that works best for your business and customers.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div 
        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        variants={itemVariants}
      >
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.id}
            className="relative bg-swiss-coffee-lightest rounded-2xl shadow-lg overflow-hidden"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            variants={itemVariants}
          >
            {plan.id === 'personalized-ai' && (
              <div className="bg-swiss-coffee-darker text-white text-sm font-medium py-1.5 text-center">
                Go live in 1 week
              </div>
            )}
            {plan.popular && (
              <div className="bg-primary text-white text-sm font-medium py-1.5 text-center">
                Most Popular
              </div>
            )}
            
            <div className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 p-2 rounded-lg mr-4">
                  {plan.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.id === 'personalized-ai' && (
                    <span className="ml-2 text-gray-500">/ agent<span className="relative inline-block align-top text-[0.7em] leading-none top-[-0.05em] mr-0.2">1</span></span>
                  )}
                </div>
                <p className="text-gray-600 mt-4">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={`feature-${index}`} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {plan.optionalFeatures && plan.optionalFeatures.length > 0 && (
                <ul className="space-y-3 mb-8 border-t border-gray-200 pt-4">
                  {plan.optionalFeatures.map((feature, index) => (
                    <li key={`optional-${index}`} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600 italic">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              {plan.id === 'custom-solution' && <div className="h-6"></div>}
              
              <Button 
                className={`w-full py-6 text-lg mb-8 ${plan.popular ? 'bg-primary hover:bg-primary/90' : 'bg-gray-900 hover:bg-gray-800'}`}
                onClick={() => handleContactClick(plan)}
                data-analytics-id={`pricing-${plan.id}-cta`}
              >
                {plan.buttonText}
              </Button>
              
              {plan.id === 'personalized-ai' && (
                <p className="text-center text-gray-600 text-sm mb-4">
                  30-day money-back guarantee
                </p>
              )}
              
              {plan.id === 'personalized-ai' && (
                <div className="space-y-2">
                  <p className="text-xs text-center text-gray-500">
                    <span className="relative inline-block align-top text-[0.7em] leading-none top-[-0.05em] mr-0.2">1</span> Agent types include customer relationship management, data-driven insights, and customer support
                  </p>
                  <p className="text-xs text-center text-gray-500">
                    <span className="relative inline-block align-top text-[0.7em] leading-none top-[-0.05em] mr-0.2">2</span> First year of hosting included. $30/month thereafter.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      </motion.div>

      {/* Spacing between cards and CTA */}
      <div className="pt-12 md:pt-20"></div>
      
      {/* CTA Section with Sparkles */}
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-r from-primary-light to-primary/80 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Sparkles count={30} />
        </div>
        <motion.section
          variants={itemVariants}
          className="py-20 md:py-28 relative w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary/80 animate-gradient bg-[length:200%_200%] w-full" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Zap className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-montserrat font-light mb-4 text-white">
              Ready to Get Started with Your AI Solution?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your needs or contact us for a custom solution. Our team is here to help you implement AI that works for your business.
            </p>
            <Button
              size="lg"
              variant="default"
              className="bg-white text-primary hover:bg-gray-50 shadow-lg mx-auto"
              onClick={() => handleContactClick(pricingPlans[0])}
              data-analytics-id="pricing-cta-get-started"
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.section>
      </div>

      {/* FAQ Section - Commented Out
      <motion.div 
        variants={itemVariants}
        className="container mx-auto px-4 mt-16 md:mt-24"
      >
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {[
            {
              question: "What kind of support do you offer?",
              answer: "All plans include email support. Higher tier plans include priority support and a dedicated account manager."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </motion.div>
      */}
    </>
  );
};

export default PricingPage;
