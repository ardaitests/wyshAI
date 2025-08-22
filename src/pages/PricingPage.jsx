import React, { useMemo, useCallback, Fragment } from 'react';
import SEO from '@/components/seo/SEO';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Zap, ArrowRight } from 'lucide-react';
import usePageTracking from '@/hooks/usePageTracking.jsx';
import { trackButtonClick } from '@/utils/analytics';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import PricingCard from '@/components/pricing/PricingCard';
// Temporarily removed Sparkles for debugging
// import Sparkles from '@/components/common/Sparkles';

// Animation variants
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

// Static data
const pricingPlans = [
  {
    id: 'ai-chatbot',
    title: 'AI Agent Chatbot',
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
    icon: 'cpu',
    buttonText: 'Buy Now',
    buttonUrl: 'https://link.waveapps.com/e73mqm-cwevfw',
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
    icon: 'settings',
    buttonText: 'Contact us via chat',
    popular: true,
  },
];

const PricingPage = () => {
  usePageTracking('Pricing & Plans | Wysh AI');
  const { openChat } = useChatbot();

  const handleContactClick = useCallback((plan) => {
    const messages = {
      'ai-chatbot': "I understand you're interested in our AI Agent chatbot plan. I'd be happy to help you set up your custom AI assistant. Could you tell me a bit about your business needs?",
      'custom-solution': "Thank you for your interest in our Custom AI Solutions. I'm here to help you explore the possibilities for your business. Could you share more about what challenges you're looking to address?"
    };

    openChat({ 
      initialMessage: messages[plan.id] || "Thank you for your interest in our plans. I'd be happy to provide more information. What would you like to learn more about?",
      initialStep: 'getStarted'
    });
  }, [openChat]);

  const handleCtaClick = useCallback(() => {
    trackButtonClick('pricing_main_cta');
    handleContactClick(pricingPlans[0]);
  }, [handleContactClick]);

  // Add smooth transition effect
  React.useEffect(() => {
    document.body.classList.add('transition-colors', 'duration-500');
    return () => {
      document.body.classList.remove('transition-colors', 'duration-500');
    };
  }, []);

  return (
    <>
      <SEO 
        title="Pricing & Plans | Wysh AI"
        description="Flexible pricing plans for our AI solutions. Choose the option that best fits your business needs and budget."
        image="/images/og/og-wyshAI.jpg"
      />
      <div className="min-h-screen bg-swiss-coffee-lighter transition-colors duration-500">
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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-relaxed">
            Straightforward or specialized, it's your choice.
          </h1>
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
            <PricingCard
              key={plan.id}
              plan={plan}
              onContactClick={handleContactClick}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.section
        variants={itemVariants}
        className="py-20 md:py-28 relative w-full bg-gradient-to-r from-primary-light to-primary/80"
        aria-labelledby="cta-heading"
      >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Zap className="h-12 w-12 text-white mx-auto mb-6" aria-hidden="true" />
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-montserrat font-light mb-4 text-white">
              Ready to Get Started with Your AI Solution?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your needs or contact us for a custom solution. Our team is here to help you implement AI that works for your business.
            </p>
            <Button
              size="lg"
              variant="default"
              className="bg-white text-primary hover:bg-gray-50 shadow-lg mx-auto"
              onClick={handleCtaClick}
              data-analytics-id="pricing-cta-get-started"
              aria-label="Get started with our AI solutions"
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
        </div>
      </motion.section>
    </div>
    </>
  );
};

export default React.memo(PricingPage);
