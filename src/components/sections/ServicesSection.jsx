
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.jsx';
import { BrainCircuit, Zap, MessageCircle, Settings2, BarChart3, Users } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


const services = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary mb-4" />,
    title: "AI Task Automation",
    description: "Automate repetitive tasks and complex workflows, freeing up valuable time for your team to focus on strategic growth.",
  },
  {
    icon: <Settings2 className="h-10 w-10 text-primary mb-4" />,
    title: "Data & System Integration",
    description: "Connect disparate data sources and systems seamlessly, enabling unified insights and streamlined operations.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary mb-4" />,
    title: "Marketing Content Generation",
    description: "Generate engaging and high-quality marketing copy, social media posts, and more with AI-powered content creation.",
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-primary mb-4" />,
    title: "Enhanced Customer Service",
    description: "Improve customer support with AI chatbots that provide instant responses and resolve queries efficiently 24/7.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary mb-4" />,
    title: "Personalized Customer Experiences",
    description: "Deliver tailored experiences by leveraging AI to understand customer preferences and behavior.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary mb-4" />,
    title: "Business Process Optimization",
    description: "Identify bottlenecks and optimize your business processes using AI-driven analytics and insights for peak efficiency.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const ServicesSection = () => {
  return (
    <section className="section-padding bg-slate-900" id="services">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-archivo font-bold mb-4">
            AI Solutions to <span className="gradient-text">Elevate Your Business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how Wysh AI's custom-built agents can revolutionize your operations and drive significant growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.custom
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-full"
            >
              <Card className="glassmorphic-card h-full flex flex-col hover:border-primary/70 transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader className="items-center text-center">
                  {service.icon}
                  <CardTitle className="text-2xl font-archivo font-semibold text-primary-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-center text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.custom>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity transform hover:scale-105 rounded-full px-8 py-3">
            <Link to="/services">
              Explore All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
