
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.jsx';
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
    icon: <BrainCircuit className="h-12 w-12 text-primary" />,
    title: "AI Task Automation",
    shortDescription: "Streamline your operations by automating repetitive tasks and complex workflows.",
    detailedDescription: "Our AI agents can handle data entry, scheduling, report generation, and much more, freeing up your team to focus on high-value activities that drive business growth. We analyze your current processes to identify automation opportunities and build custom solutions that integrate seamlessly.",
    benefits: ["Increased efficiency and productivity", "Reduced operational costs", "Minimized human error", "Improved employee satisfaction"],
    imageUrl: "https://srv1999-files.hstgr.io/6e5942e6143854a2/files/images/marketing/Wysh%20AI%20task%20automation.png",
    imageAlt: "AI Task Automation"
  },
  {
    icon: <Settings2 className="h-12 w-12 text-primary" />,
    title: "Data & System Integration",
    shortDescription: "Unify your data sources and systems for a holistic view of your business.",
    detailedDescription: "Wysh AI connects your disparate software, databases, and platforms (CRMs, ERPs, marketing tools) into a cohesive ecosystem. This enables real-time data flow, comprehensive analytics, and eliminates data silos, providing you with actionable insights.",
    benefits: ["Single source of truth for data", "Enhanced decision-making capabilities", "Streamlined cross-departmental workflows", "Improved data accuracy and consistency"],
    imageUrl: "https://images.unsplash.com/photo-1611095562057-2e70d5bf3daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageAlt: "Abstract network of connected data points"
  },
  {
    icon: <Zap className="h-12 w-12 text-primary" />,
    title: "Marketing Content Generation",
    shortDescription: "Create compelling, high-quality marketing content at scale with AI.",
    detailedDescription: "From blog posts and social media updates to email campaigns and product descriptions, our AI agents can generate creative and engaging content tailored to your brand voice and target audience. Speed up your content pipeline and maintain a consistent online presence.",
    benefits: ["Faster content creation cycles", "Consistent brand messaging", "Increased engagement and reach", "SEO-optimized content"],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-2858200e9486?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageAlt: "AI generating creative marketing copy on a screen"
  },
  {
    icon: <MessageCircle className="h-12 w-12 text-primary" />,
    title: "Enhanced Customer Service",
    shortDescription: "Deliver exceptional customer support 24/7 with intelligent AI chatbots.",
    detailedDescription: "Our AI-powered chatbots can handle a large volume of customer inquiries, provide instant answers to common questions, guide users through processes, and escalate complex issues to human agents when necessary. Improve customer satisfaction and reduce support costs.",
    benefits: ["24/7 customer availability", "Instant response times", "Reduced support agent workload", "Personalized customer interactions"],
    imageUrl: "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageAlt: "Friendly chatbot interface helping a customer"
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Personalized Customer Experiences",
    shortDescription: "Tailor interactions and offerings to individual customer needs and preferences.",
    detailedDescription: "By analyzing customer data and behavior, our AI agents help you understand your customers on a deeper level. This allows for personalized product recommendations, targeted marketing messages, and customized user journeys, leading to increased loyalty and conversions.",
    benefits: ["Higher customer engagement and retention", "Increased conversion rates", "Improved customer lifetime value", "Deeper understanding of customer segments"],
    imageUrl: "https://images.unsplash.com/photo-1543286386-71314a00d697?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageAlt: "Customer journey map with personalized touchpoints"
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-primary" />,
    title: "Business Process Optimization",
    shortDescription: "Leverage AI-driven analytics to identify inefficiencies and optimize your core business processes.",
    detailedDescription: "Wysh AI helps you analyze your existing workflows, identify bottlenecks, and implement AI solutions to streamline operations. From supply chain management to internal communications, we find ways to make your business run smoother and more efficiently.",
    benefits: ["Data-driven process improvements", "Reduced waste and inefficiencies", "Enhanced operational agility", "Better resource allocation"],
    imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    imageAlt: "Flowchart showing an optimized business process"
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
      className="bg-background text-foreground"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="relative py-20 md:py-32 text-center bg-gradient-to-br from-background via-slate-900 to-purple-900/30 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1695335751363-90ea37f3416b" className="w-full h-full object-cover" alt="Abstract AI service background" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <Lightbulb className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h1 className="text-5xl md:text-7xl font-archivo font-extrabold mb-6">
            Our AI <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Empowering your business with bespoke AI solutions designed for growth, efficiency, and innovation.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg px-10 py-6 rounded-full shadow-xl hover:opacity-90 transition-opacity transform hover:scale-105"
            onClick={handleConsultationClick}
          >
            Discuss Your Project <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.section>

      {/* Services Details Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`flex flex-col md:flex-row items-center gap-8 lg:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} mb-20 md:mb-32`}
            >
              <motion.div 
                className="md:w-1/2 relative aspect-video md:aspect-square"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
              >
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 glassmorphic-card p-1">
                  <img src={service.imageUrl} className="w-full h-full object-cover rounded-lg" alt={service.imageAlt} />
                </div>
                 <div className={`absolute -bottom-4 ${index % 2 !== 0 ? '-left-4' : '-right-4'} w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-lg filter blur-lg opacity-50 animate-pulse`}></div>
              </motion.div>
              <div className="md:w-1/2">
                <div className="mb-4 flex items-center gap-4">
                  {service.icon}
                  <h2 className="text-3xl md:text-4xl font-archivo font-bold text-primary-foreground">{service.title}</h2>
                </div>
                <p className="text-lg text-muted-foreground mb-4">{service.shortDescription}</p>
                <p className="text-base text-foreground/80 mb-6">{service.detailedDescription}</p>
                <h4 className="text-xl font-archivo font-semibold mb-3 text-primary">Key Benefits:</h4>
                <ul className="space-y-2 mb-6">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-foreground/90">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
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
        className="section-padding bg-slate-900"
      >
        <div className="container mx-auto text-center px-4">
          <Target className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-glow" />
          <h2 className="text-4xl md:text-5xl font-archivo font-bold mb-6">
            Ready to <span className="gradient-text">Elevate Your Business with AI?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Partner with Wysh AI to unlock the full potential of artificial intelligence. Let's build custom solutions that drive real results for your business.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg px-10 py-6 rounded-full shadow-xl hover:opacity-90 transition-opacity transform hover:scale-105"
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
