
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { BrainCircuit, Zap, MessageCircle, Settings2, BarChart3, Users, ArrowRight, CheckCircle, Lightbulb, Target } from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  out: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const servicesData = [
  {
    id: "ai-task-automation",
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI Task Automation",
    shortDescription: "Streamline your operations by automating repetitive tasks and complex workflows.",
    detailedDescription: "Our AI agents can handle data entry, scheduling, report generation, and much more, freeing up your team to focus on high-value activities that drive business growth. We analyze your current processes to identify automation opportunities and build custom solutions that integrate seamlessly.",
    benefits: ["Increased efficiency and productivity", "Reduced operational costs", "Minimized human error", "Improved employee satisfaction"],
    imageElement: <img  className="w-full h-full object-cover rounded-lg" alt="AI Task Automation" src="https://images.unsplash.com/photo-1697564265161-647d73c3fdf9" />
  },
  {
    id: "data-system-integration",
    icon: <Settings2 className="h-10 w-10 text-primary" />,
    title: "Data & System Integration",
    shortDescription: "Unify your data sources and systems for a holistic view of your business.",
    detailedDescription: "wyshAI connects your disparate software, databases, and platforms (CRMs, ERPs, marketing tools) into a cohesive ecosystem. This enables real-time data flow, comprehensive analytics, and eliminates data silos, providing you with actionable insights.",
    benefits: ["Single source of truth for data", "Enhanced decision-making capabilities", "Streamlined cross-departmental workflows", "Improved data accuracy and consistency"],
    imageElement: <img  className="w-full h-full object-cover rounded-lg" alt="Data & System Integration" src="https://images.unsplash.com/photo-1697564265161-647d73c3fdf9" />
  },
  {
    id: "marketing-content-generation",
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Marketing Content Generation",
    shortDescription: "Create compelling, high-quality marketing content at scale with AI.",
    detailedDescription: "From blog posts and social media updates to email campaigns and product descriptions, our AI agents can generate creative and engaging content tailored to your brand voice and target audience. Speed up your content pipeline and maintain a consistent online presence.",
    benefits: ["Faster content creation cycles", "Consistent brand messaging", "Increased engagement and reach", "SEO-optimized content"],
    imageElement: <img  className="w-full h-full object-cover rounded-lg" alt="Marketing Content Generation" src="https://images.unsplash.com/photo-1623641695192-6415ad0f8ae1" />
  },
  {
    id: "enhanced-customer-service",
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    title: "Enhanced Customer Service",
    shortDescription: "Deliver exceptional customer support 24/7 with intelligent AI chatbots.",
    detailedDescription: "Our AI-powered chatbots can handle a large volume of customer inquiries, provide instant answers to common questions, guide users through processes, and escalate complex issues to human agents when necessary. Improve customer satisfaction and reduce support costs.",
    benefits: ["24/7 customer availability", "Instant response times", "Reduced support agent workload", "Personalized customer interactions"],
    imageElement: <img  className="w-full h-full object-cover rounded-lg" alt="Enhanced Customer Service" src="https://images.unsplash.com/photo-1675023035272-3426884896f8" />
  },
  {
    id: "personalized-customer-experiences",
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Personalized Customer Experiences",
    shortDescription: "Tailor interactions and offerings to individual customer needs and preferences.",
    detailedDescription: "By analyzing customer data and behavior, our AI agents help you understand your customers on a deeper level. This allows for personalized product recommendations, targeted marketing messages, and customized user journeys, leading to increased loyalty and conversions.",
    benefits: ["Higher customer engagement and retention", "Increased conversion rates", "Improved customer lifetime value", "Deeper understanding of customer segments"],
    imageElement: <img  className="w-full h-full object-cover rounded-lg" alt="Personalized Customer Experiences" src="https://images.unsplash.com/photo-1634243785116-ea16f4dfc744" />
  },
  {
    id: "business-process-optimization",
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Business Process Optimization",
    shortDescription: "Leverage AI-driven analytics to identify inefficiencies and optimize your core business processes.",
    detailedDescription: "wyshAI helps you analyze your existing workflows, identify bottlenecks, and implement AI solutions to streamline operations. From supply chain management to internal communications, we find ways to make your business run smoother and more efficiently.",
    benefits: ["Data-driven process improvements", "Reduced waste and inefficiencies", "Enhanced operational agility", "Better resource allocation"],
    imageElement: <img  className="w-full h-full object-cover rounded-lg" alt="Business Process Optimization" src="https://images.unsplash.com/photo-1634864481356-f7db7e601075" />
  },
];

const ServicesPage = () => {
  const { openChat } = useChatbot();

  const handleConsultationClick = () => {
    openChat({
      initialMessage: "Interested in our services? Let's discuss your needs! First, what's your name?",
      initialStep: 'getName'
    });
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="bg-white text-foreground"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 text-center bg-primary-light overflow-hidden"
      >
        <div className="relative z-10 container mx-auto px-4">
          <Lightbulb className="h-14 w-14 text-primary mx-auto mb-5" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-archivo font-extrabold mb-6 text-primary-foreground">
            Our AI Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-primary-foreground/80">
            Empowering your business with bespoke AI solutions designed for growth, efficiency, and innovation.
          </p>
          <Button
            size="lg"
            variant="default"
            className="shadow-lg"
            onClick={handleConsultationClick}
          >
            Discuss Your Project <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </motion.section>

      {/* Services Details Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          {servicesData.map((service, index) => (
            <motion.div
              id={service.id}
              key={service.title}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-center gap-10 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mb-16 md:mb-24`}
            >
              <motion.div 
                className="md:w-1/2 w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                <div className="aspect-video rounded-lg shadow-xl overflow-hidden border border-gray-200">
                  {service.imageElement}
                </div>
              </motion.div>
              <div className="md:w-1/2">
                <div className="mb-3 flex items-center gap-3">
                  {service.icon}
                  <h2 className="text-2xl md:text-3xl font-archivo font-bold text-gray-800">{service.title}</h2>
                </div>
                <p className="text-md text-muted-foreground mb-3 text-gray-600">{service.shortDescription}</p>
                <p className="text-sm text-gray-500 mb-5">{service.detailedDescription}</p>
                <h4 className="text-lg font-archivo font-semibold mb-2 text-primary">Key Benefits:</h4>
                <ul className="space-y-1.5 mb-5">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline"
                  onClick={handleConsultationClick}
                >
                  Learn More & Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        variants={itemVariants}
        className="section-padding bg-gray-50"
      >
        <div className="container mx-auto text-center px-4">
          <Target className="h-12 w-12 text-primary mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-archivo font-bold mb-4 text-gray-800">
            Ready to Elevate Your Business with AI?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 text-gray-600">
            Partner with wyshAI to unlock the full potential of artificial intelligence. Let's build custom solutions that drive real results for your business.
          </p>
          <Button
            size="lg"
            variant="default"
            className="shadow-lg"
            onClick={handleConsultationClick}
          >
            Schedule Your Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ServicesPage;
