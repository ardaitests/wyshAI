import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Cpu, Settings } from 'lucide-react';

const PricingCard = React.memo(({ 
  plan, 
  onContactClick,
  variants 
}) => {
  const isAIChatbot = plan.id === 'ai-chatbot';
  
  const optionalFeatures = useMemo(() => {
    if (!plan.optionalFeatures?.length) return null;
    
    return (
      <ul className="space-y-3 border-t border-gray-200 pt-4">
        {plan.optionalFeatures.map((feature, index) => (
          <li key={`optional-${index}`} className="flex items-start">
            <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-600 italic">{feature}</span>
          </li>
        ))}
      </ul>
    );
  }, [plan.optionalFeatures]);

  const features = useMemo(() => (
    <ul className="space-y-3 mb-4">
      {plan.features.map((feature, index) => (
        <li key={`feature-${index}`} className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
  ), [plan.features]);

  const iconComponent = useMemo(() => {
    switch (plan.icon) {
      case 'cpu':
        return <Cpu className="h-8 w-8 text-primary" />;
      case 'settings':
        return <Settings className="h-8 w-8 text-primary" />;
      default:
        return null;
    }
  }, [plan.icon]);

  const priceInfo = useMemo(() => {
    if (!isAIChatbot) return null;
    
    return (
      <div className="space-y-2">
        <p className="text-xs text-center text-gray-500">
          <span className="relative inline-block align-top text-[0.7em] leading-none top-[-0.05em] mx-0.5">1</span> 
          Agent chatbot types include customer relationship management, connected workflow automation, data insights, and customer support
        </p>
        <p className="text-xs text-center text-gray-500">
          <span className="relative inline-block align-top text-[0.7em] leading-none top-[-0.05em] mx-0.5">2</span> 
          First year of hosting included. $30/month thereafter.
        </p>
      </div>
    );
  }, [isAIChatbot]);

  return (
    <motion.div
      className="relative bg-swiss-coffee-lightest rounded-2xl shadow-lg overflow-hidden h-full flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      variants={variants}
      aria-labelledby={`${plan.id}-title`}
    >
      {isAIChatbot && (
        <div className="bg-swiss-coffee-darker text-white text-sm font-medium py-1.5 text-center">
          Go live in 1 week
        </div>
      )}
      {plan.popular && (
        <div className="bg-primary text-white text-sm font-medium py-1.5 text-center">
          Most Popular
        </div>
      )}
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex items-center mb-6">
          <div className="bg-primary/10 p-2 rounded-lg mr-4">
            {iconComponent}
          </div>
          <h2 id={`${plan.id}-title`} className="text-2xl font-bold text-gray-900">
            {plan.title}
          </h2>
        </div>
        
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
            {isAIChatbot && (
              <span className="ml-2 text-gray-500">
                / agent<span className="relative inline-block align-top text-[0.7em] leading-none top-[-0.05em] mx-0.5">1</span>
              </span>
            )}
          </div>
          <p className="text-gray-600 mt-4">{plan.description}</p> 
        </div>
        
        <div className="flex-grow">
          {features}
          {optionalFeatures}
          
          <div className={`${isAIChatbot ? 'mt-6' : 'mt-12'}`}>
            <Button 
              className={`w-full py-6 text-lg font-medium transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-purple-600 hover:to-primary shadow-lg hover:shadow-purple-500/30' 
                  : 'bg-gradient-to-r from-gray-900 to-gray-800 hover:from-purple-800 hover:to-purple-600 shadow-lg hover:shadow-purple-500/20'
              }`}
              onClick={() => onContactClick(plan)}
              data-analytics-id={`pricing-${plan.id}-cta`}
              aria-label={`Get started with ${plan.title} plan`}
            >
              {plan.buttonText}
            </Button>
            
            {isAIChatbot ? (
              <p className="text-center text-gray-600 text-sm mb-4 mt-4">
                30-day money-back guarantee
              </p>
            ) : (
              <p className="text-center text-gray-600 text-sm mb-4 mt-4">
                Or <a href="mailto:info@wyshai.com" className="text-primary hover:underline">email us</a> for more information
              </p>
            )}
            
            {isAIChatbot && priceInfo}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

PricingCard.displayName = 'PricingCard';

export default PricingCard;
