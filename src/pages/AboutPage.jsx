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
  HeartHandshake,
  Wrench,
  UserCircle2,
  MessageCircle,
  Users2
} from 'lucide-react';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import vintageShopImage from '@/assets/Vintage-Shop-Collaboration-3b.png';
import designTeamImg from '@/assets/Design-Team-Collaboration.png';
import creativeOfficeCollab from '@/assets/Creative-Office-Collaboration-2.png';
import whimsicalPaperSwirl from '@/assets/Whimsical-Paper-Swirl-2.png';

// Optimized Sparkles component with performance enhancements
const Sparkles = ({ count = 20 }) => {
  // Use React.useMemo to prevent unnecessary re-renders
  const sparkles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1, // Smaller (1-5px)
      posX: Math.random() * 100,
      posY: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    }));
  }, [count]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ contentVisibility: 'auto' }}
      aria-hidden="true"
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white/80 animate-sparkle will-change-transform"
          style={{
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            left: `${sparkle.posX}%`,
            top: `${sparkle.posY}%`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
            opacity: 0,
            transform: 'translateZ(0)', // Promote to its own layer
            backfaceVisibility: 'hidden', // Improve performance on mobile
          }}
        />
      ))}
    </div>
  );
};

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
        style={{
          backgroundImage: `url(${whimsicalPaperSwirl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '--sparkle-color': 'rgba(255, 255, 255, 0.8)'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-foreground/60 z-0" />
        {/* Purple gradient overlay with animation */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary/40 bg-[length:200%_200%] animate-gradient z-0"
          style={{
            animation: 'gradient 15s ease infinite',
          }}
        />
        {/* Sparkles */}
        <Sparkles count={25} />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-semibold mb-6 text-primary-foreground">
              About Wysh AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-primary-foreground/90">
              AI made practical, personal, and powerful — <br className="hidden sm:block" />for small businesses that want real results, fast.
            </p>
          </div>
        </div>
      </motion.section>
      
      {/* Sparkle animation keyframes */}
      <style jsx global>{`
        @keyframes sparkle {
          0% {
            transform: scale(0) translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(-50px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-sparkle {
          animation: sparkle var(--duration, 3s) ease-in-out infinite;
        }
      `}</style>

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
                  alt="Team members collaborating in a vintage shop setting, discussing business strategy"
                  src={vintageShopImage}
                  aria-label="Team collaboration in vintage shop"
                  onError={(e) => {
                    console.error('Vintage shop collaboration image failed to load, using fallback');
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Vintage+Shop+Collaboration';
                    e.target.alt = 'Placeholder image showing vintage shop collaboration';
                    e.target.setAttribute('aria-label', 'Placeholder for vintage shop collaboration');
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
                At Wysh AI, our mission is to make powerful AI simple, accessible, and valuable for small and medium-sized businesses.</p>
                <p>We help you go beyond the hype by building intelligent tools and agents that actually do the work — from automating tasks and generating content to improving customer service and integrating your systems.</p>
                <p> 
                We believe AI should empower you, not overwhelm you. That’s why we work closely with you to create custom solutions that fit the way you already work — no coding, no complexity.
                </p>
                <p>
                Whether you’re ready to follow up with leads automatically, personalize your customer experiences, or securely connect data across your software and tools, we make it effortless to get started. When you’re ready to unlock the power of AI, just Wysh for it.
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
                  After years working in digital experience design and product innovation, we saw a growing gap: while AI tools were rapidly evolving, most small businesses were left behind — overwhelmed by complexity, unsure where to start, and underserved by expensive off-the-shelf solutions. We founded Wysh AI to close that gap and help every small businesses owner.
                </p>
                <p>
                  We are customer obsessed and dedicated to accelerating small businesses success. We blend intuitive software design, business process automation, and AI-powered workflows to deliver simple AI solutions that actually help real businesses grow. No buzzwords. No black boxes. Just practical tools that solve real problems, save time, reduce busywork, and create better experiences for your customers.
                </p>
                <p>
                  Because we believe that when small businesses have the same intelligent capabilities as larger ones, they can do even more amazing things. And we're here to make sure they can — one Wysh at a time.
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
                  src={creativeOfficeCollab} 
                  alt="Creative team collaborating in a modern office environment, discussing and planning a project"
                  aria-label="Creative office collaboration"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Creative office collaboration image failed to load, using fallback');
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x600/1a1a2e/e6e6e6?text=Design+Team';
                    e.target.alt = 'Placeholder image of a design team meeting';
                    e.target.setAttribute('aria-label', 'Placeholder for design team collaboration');
                  }}
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
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-montserrat font-bold mb-3 text-foreground">
                We build real tools that do real work
              </h3>
              <p className="text-gray-700 leading-relaxed">
                While others talk about future potential, we focus on what AI can do for you right now — automating follow-ups, improving customer experiences, and saving you hours of manual work each week.
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
                <UserCircle2 className="h-6 w-6" />
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
                <MessageCircle className="h-6 w-6" />
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
                <Users2 className="h-6 w-6" />
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
      <section className="py-20 md:py-28 bg-white flex justify-center">
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8">
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

          <div className="space-y-12 max-w-5xl mx-auto">
            {/* Step 1 */}
            <motion.div 
              className="grid md:grid-cols-12 gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left side - Number and Title */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary h-14 w-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-foreground">
                    Discover
                  </h3>
                </div>
              </div>
              
              {/* Right side - Description */}
              <div className="md:col-span-9 max-w-2xl">
                <p className="text-gray-700 leading-relaxed">
                  <span className="block font-medium text-foreground mb-2">We start with you.</span>
                  We take time to understand your business, goals, and where AI can make the biggest impact. It's about solving the right problems — not adding tech for tech's sake.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              className="grid md:grid-cols-12 gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Left side - Number and Title */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary h-14 w-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-foreground">
                    Design
                  </h3>
                </div>
              </div>
              
              {/* Right side - Description */}
              <div className="md:col-span-9 max-w-2xl">
                <p className="text-gray-700 leading-relaxed">
                  <span className="block font-medium text-foreground mb-2">Tailored, human-centered solutions.</span>
                  We co-create AI tools, agents, and workflows designed around your customers, operations, and needs — using no-code platforms and the latest generative AI.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              className="grid md:grid-cols-12 gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Left side - Number and Title */}
              <div className="md:col-span-3">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary h-14 w-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-montserrat font-bold text-foreground">
                    Deliver
                  </h3>
                </div>
              </div>
              
              {/* Right side - Description */}
              <div className="md:col-span-9 max-w-2xl">
                <p className="text-gray-700 leading-relaxed">
                  <span className="block font-medium text-foreground mb-2">Real results, delivered.</span>
                  We implement the solution, train your team, and provide ongoing support to ensure you're getting the most value from your AI tools. We measure success by your success.
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