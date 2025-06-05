
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
    description: "Eliminate repetitive and manual tasks with AI-powered automated workflows designed to optimize your time.",
    link: "/services#ai-task-automation" 
  },
  {
    icon: <Bot className="h-8 w-8 text-primary mb-3" />,
    title: "AI Agents",
    description: "Magically manage customer questions, new appointments, and orders with helpful AI agents.",
    link: "/services#ai-agents"
  },
  {
    icon: <Zap className="h-8 w-8 text-primary mb-3" />,
    title: "Seamless Integration",
    description: "Easily and securely connect new AI tools and agents with your existing data and software.",
    link: "/services#data-system-integration"
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
              <Card className="bg-swiss-coffee-lightest h-full flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300 p-2">
                <CardHeader className="items-center pt-6 pb-2">
                  {service.icon}
                  <CardTitle className="text-xl font-montserrat font-semibold text-foreground">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pb-4">
                  <CardDescription className="text-foreground-darker text-sm">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <div className="px-4 pb-4 pt-2">
                  <Link to={service.link || '/services'} className="text-sm font-medium text-primary hover:text-primary/80 flex items-center justify-center">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
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
