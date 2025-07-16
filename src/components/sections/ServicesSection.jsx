
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.jsx';
import { BrainCircuit, Bot, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';

const servicesOverview = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary mb-3" />,
    title: "Task Automation",
    description: <>Eliminate repetitive and manual tasks with AI-powered automations that help you do more, <em>or less</em>.</>,
    link: "/services#ai-task-automation",
    linkText: "See Task Automation Services"
  },
  {
    icon: <Bot className="h-8 w-8 text-primary mb-3" />,
    title: "Customer Assistants",
    description: "AI can handle customer questions, new appointments, or orders automatically, so you don't have to.",
    link: "/services#enhanced-customer-service",
    linkText: "See Customer Chat Services"
  },
  {
    icon: <Zap className="h-8 w-8 text-primary mb-3" />,
    title: "Seamless Integration",
    description: "Simply and securely connect your existing data and software for smart suggestions.",
    link: "/services#software-data-integration",
    linkText: "See Software & Data Services"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const ServicesSection = () => {
  return (
    <section className="section-padding bg-gray-50 text-foreground" id="services-overview">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-4 text-foreground">
            How does AI work to help my business?
          </h2>
          <p className="text-lg text-muted-foreground-darker max-w-2xl mx-auto">
          Think of AI as your new team of smart assistants that never sleep — handling busywork, delighting customers, and keeping your business running smoothly 24/7.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesOverview.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-full"
            >
              <Link 
                to={service.link || '/services'} 
                className="block h-full"
                aria-label={`${service.title} - ${service.linkText}`}
              >
                <Card className="bg-swiss-coffee-lightest h-full flex flex-col text-center items-center hover:shadow-lg transition-all duration-300 p-2 group hover:border-primary/30">
                  <CardHeader className="items-center pt-6 pb-2">
                    <div 
                      className="group-hover:scale-110 transition-transform duration-300"
                      aria-hidden="true"
                    >
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-montserrat font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow pb-4">
                    <CardDescription className="text-foreground-darker text-sm group-hover:text-foreground transition-colors duration-300">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  <div className="px-4 pb-4 pt-2">
                    <div className="text-sm font-medium text-primary group-hover:text-primary/80 flex items-center justify-center transition-colors duration-300">
                      <span>{service.linkText}</span>
                      <span className="sr-only">, {service.title} services</span>
                      <ArrowRight 
                        className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 md:mt-16"
        >
          <Button asChild size="lg" variant="default" className="shadow-md">
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
