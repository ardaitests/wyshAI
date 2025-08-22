
import React, { Fragment, useEffect } from 'react';
import SEO from '@/components/seo/SEO';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import FadeInImage from '@/components/ui/FadeInImage';
import { BrainCircuit, Zap, MessageCircle, MessagesSquare, Settings2, BarChart3, Users, ArrowRight, Check, Lightbulb, Target, Code, Rocket, ThumbsUp, Megaphone, Cable, Bot } from 'lucide-react';
import usePageTracking from '@/hooks/usePageTracking.jsx';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import warmOfficeImg from '@/assets/Warm-Office-Collaboration-2.webp';
import mechanicOnPhoneImg from '@/assets/Mechanic-on-Phone-2.webp';
import aiChatOnPhoneImg from '@/assets/AI-Chat-on-iPhone-1.webp';
import landscaperTechMomentImg from '@/assets/Landscaper-Tech-Moment.webp';
import dentalOfficeTeamImg from '@/assets/Dental-Office-Team.webp';
import donutShopMonitoringImg from '@/assets/Donut-Shop-Monitoring.webp';
import gymOwnerInteractionImg from '@/assets/Gym-Owner-Interaction.webp';
import martialArtsBondingImg from '@/assets/Martial-Arts-Bonding.webp';
import WebAppDevImg from '@/assets/Web-App-Development-1.webp';

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
    shortDescription: "Automate the manual. Focus on the meaningful.",
    detailedDescription: "We streamline your operations by automating repetitive tasks and complex workflows. From data entry and scheduling to reporting and notifications, our automation solutions free up your team to focus on what drives your business forward.",
    benefits: ["Increased efficiency and productivity", "Reduced operational costs", "Fewer errors and less admin overhead", "Happier, more focused teams"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Gym owner interacting with a client while AI manages backend operations" 
      src={gymOwnerInteractionImg} 
      aria-label="AI managing gym operations in the background"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=AI+Task+Automation';
        e.target.alt = 'Placeholder for AI Task Automation';
      }}
    />
  },
  {
    id: "ai-agent-design",
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "AI Agent Design",
    shortDescription: "Your always-on digital team.",
    detailedDescription: "We design and deploy intelligent AI agents that handle follow-ups, customer service, appointment scheduling, product guidance, and more. These agents work around the clock to improve operations and customer interactions — no code required.",
    benefits: ["24/7 responsiveness", "Personalized, consistent communication", "Scalable support without adding headcount", "Increased lead conversion and retention"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Smartphone displaying an AI chatbot interface with conversation bubbles" 
      src={aiChatOnPhoneImg} 
      aria-label="AI chatbot interface on mobile device"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=AI+Agent+Design';
        e.target.alt = 'Placeholder for AI Agent Design';
      }}
    />
  },
  {
    id: "software-data-integration",
    icon: <Cable className="h-10 w-10 text-primary" />,
    title: "Software & Data Integration",
    shortDescription: "Connect tools to gain new insights and a holistic view.",
    detailedDescription: "We can bring your systems together — accounting, customer relationship management (CRM), project management, invoicing and billing, and more — into one cohesive, connected ecosystem. This enables real-time data flow, smarter decisions, and eliminates data silos across your business.",
    benefits: ["A single source of truth for business data", "Streamlined internal workflows", "Improved data accuracy", "Enhanced decision-making capabilities"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Donut shop owner monitoring multiple data dashboards on a tablet" 
      src={donutShopMonitoringImg} 
      aria-label="Business owner analyzing integrated data visualizations"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Data+Integration';
        e.target.alt = 'Placeholder for Software & Data Integration';
      }}
    />
  },
  {
    id: "marketing-content-generation",
    icon: <Megaphone className="h-10 w-10 text-primary" />,
    title: "Marketing Content Generation",
    shortDescription: "Create compelling content smarter, faster, and on-brand.",
    detailedDescription: "Our AI tools help you generate high-quality content at scale — from social posts and blog articles to product descriptions and email campaigns — all tailored to your brand voice and customer segments.",
    benefits: ["Faster content production cycles", "Consistent brand messaging", "SEO-optimized and engaging content", "Expanded reach and engagement"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Landscaper using a tablet to create digital content in the field" 
      src={landscaperTechMomentImg} 
      aria-label="Professional creating marketing content with mobile technology"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Marketing+Content';
        e.target.alt = 'Placeholder for Marketing Content Generation';
      }}
    />
  },
  {
    id: "enhanced-customer-service",
    icon: <MessagesSquare className="h-10 w-10 text-primary" />,
    title: "Enhanced Customer Service",
    shortDescription: "Support that never sleeps.",
    detailedDescription: "Deliver exceptional support with AI-powered chatbots and agents that answer questions, resolve issues, and guide customers 24/7. We also help you create smart escalation flows when human intervention is needed.",
    benefits: ["24/7 customer availability", "Instant response times", "Reduced support agent workload", "Personalized customer interactions"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Mechanic providing excellent customer service while on a phone call" 
      src={mechanicOnPhoneImg} 
      aria-label="Professional offering customer support via phone"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Customer+Service';
        e.target.alt = 'Placeholder for Enhanced Customer Service';
      }}
    />
  },
  {
    id: "personalized-customer-experiences",
    icon: <ThumbsUp className="h-10 w-10 text-primary" />,
    title: "Personalized Customer Experiences",
    shortDescription: "Give every customer what they actually want.",
    detailedDescription: "By analyzing customer data and behavior, our AI agents help you understand your customers on a deeper level. This allows for personalized product recommendations, targeted marketing messages, and customized user journeys, leading to increased loyalty and conversions.",
    benefits: ["Increased conversion and retention rates", "More valuable touchpoints and customer interactions", "Improved customer lifetime value", "Stronger brand relationships"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Martial arts instructor bonding with students in a personalized training session" 
      src={martialArtsBondingImg} 
      aria-label="Instructor creating personalized experiences for students"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Personalized+Experience';
        e.target.alt = 'Placeholder for Personalized Customer Experiences';
      }}
    />
  },
  {
    id: "web-app-development",
    icon: <Code className="h-10 w-10 text-primary" />,
    title: "Web & App Development",
    shortDescription: "Custom-built, AI-powered digital experiences.",
    detailedDescription: "We design and develop modern, responsive websites and web applications tailored to your business goals and your customers' needs. We bring together great UX, smart AI features, and the latest technology platforms to take your business to the next level.",
    benefits: ["Fast, user-friendly, mobile-ready web experiences", "Integrated AI features like chatbots, automation, and personalization", "Scalable platforms built with future growth in mind", "Improved engagement and customer satisfaction through human-centered design"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Developers collaborating on a modern web application with clean code" 
      src={WebAppDevImg} 
      aria-label="Development team working on web application"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Web+Development';
        e.target.alt = 'Placeholder for Web & App Development';
      }}
    />
  },
  {
    id: "business-process-optimization",
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Business Process Optimization",
    shortDescription: "Work smarter at every level.",
    detailedDescription: "Our AI-driven analysis identifies inefficiencies across your workflows — then we implement automation or agent-based solutions to improve speed, accuracy, and performance across operations.",
    benefits: ["Reduced waste and delays", "Data-backed decision-making", "Better use of time and talent", "Greater operational agility"],
    imageElement: <img 
      className="w-full h-full object-cover rounded-lg" 
      alt="Dental office team analyzing workflow processes and optimization opportunities" 
      src={dentalOfficeTeamImg} 
      aria-label="Healthcare professionals reviewing business processes"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Process+Optimization';
        e.target.alt = 'Placeholder for Business Process Optimization';
      }}
    />
  },
];

const ServicesPage = () => {
  usePageTracking('AI Solutions & Services | Wysh AI');
  const { openChat } = useChatbot();

  // Handle scroll to section when page loads with a hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Remove the # from the hash
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      
      if (element) {
        // Small timeout to ensure the page has rendered
        setTimeout(() => {
          // Calculate the position to scroll to (element position - 80px for the navbar)
          const yOffset = -160;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          // Scroll to the position
          window.scrollTo({ top: y, behavior: 'smooth' });
          
          // Update URL without adding to history
          window.history.replaceState(null, null, ' ');
        }, 100);
      }
    }
  }, []);

  const handleConsultationClick = () => {
    openChat({
      initialMessage: "Interested in our services? Let's discuss your needs! First, what's your name?",
      initialStep: 'getName'
    });
  };

  return (
    <>
      <SEO 
        title="AI Solutions & Services | Wysh AI"
        description="Comprehensive AI solutions and services to transform your business. From custom AI agents to workflow automation, we have the tools you need to succeed."
        image="/images/og/og-wyshAI.jpg"
      />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        className="bg-swiss-coffee-lightest text-foreground"
      >
      {/* Hero Section */}
      <section className="relative py-40 md:py-48 lg:py-56 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FadeInImage 
            src={warmOfficeImg}
            alt="Warm office collaboration setting the scene for our services"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-foreground/60 z-0" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/30 to-primary/10 z-0" />
        <motion.div 
          className="relative z-10 container mx-auto px-4 text-center"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-semibold mb-8 text-primary-foreground">
            Our Services
          </h1>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="relative py-20 md:py-28 text-foreground overflow-hidden bg-swiss-coffee-light">
        {/* Subtle gradient animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-swiss-coffee-lighter/80 via-swiss-coffee-light/80 to-swiss-coffee-lighter/80 bg-[length:200%_200%] animate-gradient z-0" />
        <div className="relative z-10 container mx-auto px-4 max-w-4xl">
          <div className="prose mx-auto text-center">
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              Wysh AI helps small and medium-sized businesses harness the power of AI — not through one-size-fits-all software, but through custom-built tools and agents tailored to how your business actually works.
            </p>
            <br />
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              Our services make it easy to adopt AI with confidence, unlock meaningful time savings, reduce costs, and deliver standout experiences to your customers.
            </p>
          </div>
        </div>
      </section>

      {/* Services Details Section */}
      <section className="relative pt-16 pb-24 md:py-32 bg-swiss-coffee-lightest">
        <div className="container mx-auto px-4">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;
            const textOrder = isEven ? 'md:order-1' : 'md:order-2';
            const imageOrder = isEven ? 'md:order-2' : 'md:order-1';
            const textX = isEven ? -50 : 50;
            const imageX = isEven ? 50 : -50;
            
            return (
              <motion.div
                id={service.id}
                key={service.title}
                variants={itemVariants}
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center justify-items-center ${index > 0 ? 'mt-24 md:mt-32' : ''}`}
              >
                {/* Text Content */}
                <motion.div 
                  className={`w-full max-w-xl ${textOrder}`}
                  initial={{ opacity: 0, x: textX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    {service.icon}
                    <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-md text-muted-foreground-darker font-semibold mb-3">
                    {service.shortDescription}
                  </p>
                  <p className="text-foreground mb-5">
                    {service.detailedDescription}
                  </p>
                  <h4 className="text-lg font-montserrat font-semibold mb-2 text-primary">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-1.5 mb-5">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center">
                        <Check className="h-4 w-4 text-primary-light mr-2 flex-shrink-0" />
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline"
                    onClick={handleConsultationClick}
                    className="mt-4"
                  >
                    Learn More & Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                
                {/* Image */}
                <motion.div 
                  className={`w-full max-w-xl ${imageOrder}`}
                  initial={{ opacity: 0, x: imageX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <div className="aspect-video rounded-lg shadow-xl overflow-hidden border border-gray-200">
                    {service.imageElement}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        variants={itemVariants}
        className="py-24 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-lighter to-primary-lightest animate-gradient bg-[length:200%_200%]" />
        <div className="container mx-auto text-center px-4 relative z-10">
          <Rocket className="h-12 w-12 text-primary-medium mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-4 text-foreground">
            Ready to Elevate Your Business with AI?
          </h2>
          <p className="text-lg text-foreground/90 max-w-2xl mx-auto mb-8">
            Partner with Wysh AI to unlock the full potential of artificial intelligence — without the technical headaches. Let's work together on custom solutions that drive real results.
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
    </>
  );
};

export default ServicesPage;
