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
  Shield,
  HeartHandshake
} from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import vintageShopImage from '@/assets/Vintage-Shop-Collaboration-3.png';
import designTeamImg from '@/assets/Design-Team-Collaboration.png';

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
      initialMessage: "I'd like to learn more about working with Wysh AI!", 
      initialStep: 'getName' 
    });
  };


  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      className="bg-swiss-coffee-lightest text-foreground max-w-[100vw] overflow-x-hidden"
    >
      {/* Hero Section */}
      <motion.section 
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        className="relative py-32 md:py-40 lg:py-48 flex items-center justify-center overflow-hidden bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-swiss-coffee-dark via-swiss-coffee-darker to-swiss-coffee-dark bg-[length:200%_200%] animate-gradient z-0" />
        <div className="absolute inset-0 bg-foreground/30 z-0" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-semibold mb-6 text-primary-foreground">
              About Wysh AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-primary-foreground/80">
              AI made practical, personal, and powerful — <br className="hidden sm:block" />for small businesses that want real results, fast.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Stats Section - Hidden but keeping the code for potential future use
      <section className="section-padding bg-swiss-coffee-lightest">
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
                <Card className="bg-swiss-coffee-lightest border-none h-full">
                  <CardHeader className="items-center pt-8 pb-4">
                    <div className="mb-4">{stat.icon}</div>
                    <CardTitle className="text-xl font-montserrat font-bold text-foreground">
                      {stat.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <CardDescription className="text-muted-foreground-darker text-sm leading-relaxed">
                      {stat.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-swiss-coffee-lighter">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  alt="Vintage shop collaboration showing teamwork and creativity"
                  src={vintageShopImage}
                  onError={(e) => {
                    console.error('Vintage shop image failed to load, using fallback');
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Team+Collaboration';
                    e.target.alt = 'Placeholder image for team collaboration';
                  }} />
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
                Our Mission
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                At Wysh AI, our mission is to make advanced AI simple, accessible, and valuable for small and medium-sized businesses. We help you go beyond the hype by building intelligent tools and agents that actually do the work — from automating tasks and generating content to improving customer service and integrating your systems.
                </p>
                <p> 
                We believe AI should empower you, not overwhelm you. That’s why we use human-centered design to create custom solutions that fit the way you already work — no coding, no complexity.
                </p>
                <p>
                Whether you're ready to follow up with leads automatically, personalize your customer experience, or connect data across your business, we make it effortless to get started. When you're ready to unlock the power of AI, just Wysh for it.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-28 bg-swiss-coffee-lightest">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-archivo font-bold mb-6 text-gray-800">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  We started Wysh AI with a clear purpose: to make powerful AI accessible to the businesses that need it most — not just tech giants or startups with engineering teams, but everyday small business owners.
                </p>
                <p>
                  After years working in digital experience design and product innovation, we saw a growing gap: while AI tools were rapidly evolving, most small businesses were left behind — overwhelmed by complexity, unsure where to start, and underserved by off-the-shelf solutions.
                </p>
                <p>
                  We founded Wysh AI to close that gap — blending human-centered design, automation, and intelligent workflows to deliver AI that actually helps real businesses grow. No buzzwords. No black boxes. Just practical tools that save time, reduce busywork, and create better experiences for your customers.
                </p>
                <p>
                  Because we believe that when small businesses have access to the same intelligent tools as big ones, they can do amazing things. And we're here to make sure they can — one Wysh at a time.
                </p>
              </div>
            </motion.div>
            
            {/* Image Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
              className="order-1 md:order-2 relative flex justify-center md:justify-end"
            >
              <div className="w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-xl shadow-xl overflow-hidden">
                <img 
                  src={designTeamImg} 
                  alt="Wysh AI team collaborating on a project"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-28 bg-swiss-coffee-lighter">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-6 text-foreground">
              Our Approach
            </h2>
            <p className="text-xl text-muted-foreground-darker max-w-3xl mx-auto leading-relaxed">
              How we're different from the rest
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Value 1 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-primary/10 text-primary h-14 w-14 rounded-lg flex items-center justify-center text-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M12 2v4"></path>
                  <path d="m16.24 7.76 2.83-2.83"></path>
                  <path d="M18 12h4"></path>
                  <path d="m18 18 2.8 2.8"></path>
                  <path d="M12 18v4"></path>
                  <path d="M4.9 19.1 7.69 16.3"></path>
                  <path d="M2 12h4"></path>
                  <path d="M7.7 7.7 4.9 4.9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-3 text-foreground">
                We build real tools that do real work
              </h3>
              <p className="text-gray-700 leading-relaxed">
                While others talk about future potential, we focus on what AI can do for you right now — automating follow-ups, improving customer experiences, and saving hours of manual work each week.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-primary/10 text-primary h-14 w-14 rounded-lg flex items-center justify-center text-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-3 text-foreground">
                We design around people, not platforms
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We don't just "add AI" — we design thoughtful, easy-to-use tools that work the way you work. Every solution is tailored, intuitive, and grounded in human-centered design.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary/10 text-primary h-14 w-14 rounded-lg flex items-center justify-center text-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M17 6.1H3"></path>
                  <path d="M21 12.1H3"></path>
                  <path d="M15.1 18H3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-3 text-foreground">
                We speak your language
              </h3>
              <p className="text-gray-700 leading-relaxed">
                No buzzwords, no jargon. Just honest conversations about how we can help your business grow using simple, powerful AI solutions — no coding required.
              </p>
            </motion.div>

            {/* Value 4 */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-primary/10 text-primary h-14 w-14 rounded-lg flex items-center justify-center text-2xl mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-3 text-foreground">
                We're with you every step
              </h3>
              <p className="text-gray-700 leading-relaxed">
                From first meeting to launch and beyond, we partner closely with you. We train, support, and adapt your solution as your business evolves — because your success is our success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-semibold mb-4 text-foreground">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground-darker max-w-3xl mx-auto">
              Our proven process for delivering real results
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Step 1 */}
            <motion.div 
              className="grid md:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="md:col-span-4 lg:col-span-3">
                <div className="bg-primary/10 text-primary h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto md:mx-0">
                  1
                </div>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <h3 className="text-2xl font-montserrat font-bold mb-3 text-foreground">
                  Discover
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <span className="block font-medium text-foreground mb-2">We start with you.</span>
                  We take time to understand your business, goals, and where AI can make the biggest impact. It's about solving the right problems — not adding tech for tech's sake.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="grid md:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="md:col-span-4 lg:col-span-3">
                <div className="bg-primary/10 text-primary h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto md:mx-0">
                  2
                </div>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <h3 className="text-2xl font-montserrat font-bold mb-3 text-foreground">
                  Design
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <span className="block font-medium text-foreground mb-2">Tailored, human-centered solutions.</span>
                  We co-create AI tools, agents, and workflows designed around your customers, operations, and needs — using no-code platforms and the latest generative AI.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="grid md:grid-cols-12 gap-8 items-center"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="md:col-span-4 lg:col-span-3">
                <div className="bg-primary/10 text-primary h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto md:mx-0">
                  3
                </div>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <h3 className="text-2xl font-montserrat font-bold mb-3 text-foreground">
                  Deliver
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <span className="block font-medium text-foreground mb-2">Seamless setup and support.</span>
                  We integrate everything with your existing systems, train your team, and provide ongoing support to ensure you feel confident using your new AI tools.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Future Vision Section - Hidden but keeping the code for potential future use
      <section className="py-20 md:py-28 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
      */}

      {/* CTA Section */}
      <motion.section
        variants={itemVariants}
        className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-r from-primary-light to-primary/80 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary/80 animate-gradient bg-[length:200%_200%]" />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <HeartHandshake className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-montserrat font-light mb-4 text-white">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            The time to adopt AI is now, and Wysh AI is your trusted partner in getting started. 
            Let's discuss how we can help your business thrive.
          </p>
          <Button
            size="lg"
            variant="default"
            className="bg-white text-primary hover:bg-gray-50 shadow-lg mx-auto"
            onClick={handleGetStarted}
            data-analytics-id="about-cta-get-started"
          >
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;