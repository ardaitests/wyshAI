
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.jsx';
import { BrainCircuit, Settings2, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Link } from 'react-router-dom';

const servicesOverview = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary mb-3" />,
    title: "Automate Tasks",
    description: "Leverage advanced AI algorithms to gain actionable insights that drive growth.",
    link: "/services#ai-task-automation" 
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary mb-3" />,
    title: "Personalized Recommendations",
    description: "Receive customized suggestions that align with your unique business objectives.",
    link: "/services#personalized-customer-experiences"
  },
  {
    icon: <Zap className="h-8 w-8 text-primary mb-3" />,
    title: "Seamless Integration",
    description: "Easily connect WyshAI with your current systems for a smooth transition.",
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
          <h2 className="text-3xl md:text-4xl font-archivo font-bold mb-4 text-gray-800">
            Unlock AI Insights for Smarter Business Decisions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-gray-600">
            Explore how our AI-driven solutions can simplify complexities and enhance your decision-making process.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesOverview.map((service, index) => (
            <motion.custom
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="h-full"
            >
              <Card className="bg-white h-full flex flex-col text-center items-center hover:shadow-lg transition-shadow duration-300 p-2">
                <CardHeader className="items-center pt-6 pb-2">
                  {service.icon}
                  <CardTitle className="text-xl font-archivo font-semibold text-gray-700">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow pb-2">
                  <CardDescription className="text-gray-500 text-sm">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <div className="p-4 pt-0">
                  <Link to={service.link || '/services'} className="text-sm font-medium text-primary hover:text-primary/80 flex items-center justify-center">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </motion.custom>
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
