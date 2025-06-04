import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card.jsx';
import { 
  Calendar, 
  Globe, 
  Target, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Heart,
  Zap,
  Shield
} from 'lucide-react';
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

const statsData = [
  {
    icon: <Calendar className="h-8 w-8 text-primary" />,
    title: "Founded in 2022",
    description: "Delivering AI-powered and low-code solutions for businesses worldwide."
  },
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: "Global Client Base",
    description: "Serving businesses across the UK, Europe, USA, Middle East and beyond, from startups to established enterprises."
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "100% Success Rate",
    description: "Every project delivered on time, meeting or exceeding client expectations with top-quality solutions."
  }
];

const valuesData = [
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Innovation with Purpose",
    description: "We believe technology should empower businesses, not complicate them. Every solution we create serves a meaningful purpose."
  },
  {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Collaborative Partnership",
    description: "We work alongside you as trusted partners, listening, adapting, and ensuring our solutions fit your unique needs."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Practical Problem-Solving",
    description: "We cut through complexity to deliver solutions that are simple, scalable, and effective for real-world application."
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Proven Excellence",
    description: "Our track record speaks for itself - delivering transformative solutions that drive measurable results for every client."
  }
];

const AboutPage = () => {
  const { openChat } = useChatbot();

  const handleGetStarted = () => {
    openChat({ 
      initialMessage: "I'd like to learn more about working with wyshAI!", 
      initialStep: 'getName' 
    });
  };

  const handlePartnership = () => {
    openChat({ 
      initialMessage: "I'm interested in partnering with wyshAI for my business needs.", 
      initialStep: 'getPartnershipDetails' 
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
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-primary-light overflow-hidden"
      >
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-extrabold mb-6 text-primary-foreground">
              About wyshAI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-primary-foreground/80">
              Innovating with purpose, driven by experience
            </p>
            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
              wyshAI was founded on a simple yet powerful idea: technology should empower businesses, not complicate them. 
              We bridge the gap between technical innovation and real-world application, helping organizations unlock new opportunities.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="initial"
                whileInView="in"
                viewport={{ once: true, amount: 0.2 }}
                className="text-center"
              >
                <Card className="bg-gray-50 border-none h-full">
                  <CardHeader className="items-center pt-8 pb-4">
                    <div className="mb-4">{stat.icon}</div>
                    <CardTitle className="text-xl font-montserrat font-bold text-gray-800">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {stat.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative flex justify-center md:justify-start"
            >
              <div className="w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-xl shadow-xl overflow-hidden">
                <img  
                  className="w-full h-full object-cover"
                  alt="Professional team working on AI solutions in modern office"
                 src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa" />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-archivo font-bold mb-6 text-gray-800">
                Our Journey & Mission
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  What started as a one-person mission has grown into a dynamic team of problem-solvers, 
                  united by a shared vision: to create meaningful, impactful solutions that make a tangible difference.
                </p>
                <p>
                  At wyshAI, we understand that businesses don't need technology for technology's sake—they need 
                  tools and strategies that address their unique challenges and deliver measurable results.
                </p>
                <p>
                  Our team combines deep expertise in AI and low-code technologies with a commitment to practical 
                  problem-solving. Whether we're automating workflows, designing intelligent applications, or building 
                  seamless integrations, every solution we craft is tailored to fit your business and drive sustainable growth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-gray-800">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-gray-600">
              Our approach combines innovation with practicality, ensuring every solution we deliver 
              is both cutting-edge and immediately valuable to your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {valuesData.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="initial"
                whileInView="in"
                viewport={{ once: true, amount: 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 mt-1">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-semibold mb-2 text-gray-800">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-archivo font-bold mb-6 text-gray-800">
                Our Collaborative Approach
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  We pride ourselves on being both innovative and approachable, cutting through complexity 
                  to deliver solutions that are simple, scalable, and effective.
                </p>
                <p>
                  Collaboration is at the heart of what we do—we listen, we adapt, and we work alongside 
                  you as trusted partners. We take the time to understand your organisation's goals, 
                  ensuring that our work isn't just functional but transformative.
                </p>
              </div>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Deep understanding of your business goals</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Tailored solutions that drive sustainable growth</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Ongoing partnership and support</span>
                </div>
              </div>
            </motion.div>

            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="relative flex justify-center md:justify-end"
            >
              <div className="w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-xl shadow-xl overflow-hidden">
                <img  
                  className="w-full h-full object-cover"
                  alt="Business consultation meeting with AI technology discussion"
                 src="https://images.unsplash.com/photo-1703270070919-7c91aac8c335" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-archivo font-bold mb-6 text-gray-800">
              Looking Forward
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              As we continue to grow, our mission remains the same: to help businesses thrive by delivering 
              intelligent, scalable solutions that simplify operations and accelerate progress. We're not just 
              about technology; we're about what technology can do for you.
            </p>
            <p className="text-xl font-semibold text-primary mb-8">
              Ready to transform your business with AI?
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        variants={itemVariants}
        className="section-padding bg-footer-background text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <Users className="h-12 w-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-4">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
            Join the growing number of businesses that trust wyshAI to deliver intelligent solutions 
            that make a real difference. Let's discuss how we can help your business thrive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              onClick={handleGetStarted}
              className="bg-white text-primary hover:bg-gray-100"
              data-analytics-id="about-cta-get-started"
            >
              Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={handlePartnership}
              className="border-white text-white hover:bg-white/10"
              data-analytics-id="about-cta-discuss-partnership"
            >
              Discuss Partnership
            </Button>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;