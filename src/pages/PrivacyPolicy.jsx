import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useChatbot } from '@/contexts/ChatbotContext';
import SEO from '@/components/seo/SEO';

export default function PrivacyPolicy() {
  const { openChat } = useChatbot();

  const handleContactClick = () => {
    openChat({ 
      initialMessage: "I have a question about the privacy policy.",
      initialStep: 'getStarted'
    });
  };

  return (
    <>
      <SEO 
        title="Privacy Policy | Wysh AI"
        description="Learn how Wysh AI collects, uses, and protects your personal information. We are committed to maintaining the trust and confidence of our visitors and customers."
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen bg-swiss-coffee-light">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Last updated: June 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-lg max-w-none dark:prose-invert"
          >
            <div className="bg-swiss-coffee-lighter rounded-2xl p-6 md:p-8 shadow-sm">
              <p className="text-muted-foreground mb-6">
                At Wysh AI, we take your privacy seriously. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Register for an account</li>
                <li>Subscribe to our newsletter</li>
                <li>Fill out a contact form</li>
                <li>Use our chatbot or contact support</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We may use the information we collect to:</p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Provide, operate, and maintain our services</li>
                <li>Improve, personalize, and expand our services</li>
                <li>Understand and analyze how you use our services</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you for customer service and support</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Your Data Protection Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, 
                including the right to access, correct, or delete your data. To exercise these rights, 
                please contact us using the information below.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleContactClick}
                  className="w-full sm:w-auto"
                >
                  Chat with Us
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto"
                  onClick={() => window.location.href = 'mailto:adam@wyshai.com'}
                >
                  Email Us
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
