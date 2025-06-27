import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useChatbot } from '@/contexts/ChatbotContext';
import SEO from '@/components/seo/SEO';

export default function TermsOfService() {
  const { openChat } = useChatbot();

  const handleContactClick = () => {
    openChat({ 
      initialMessage: "I have a question about the terms of service.",
      initialStep: 'getStarted'
    });
  };

  return (
    <>
      <SEO 
        title="Terms of Service | Wysh AI"
        description="Please read our Terms of Service carefully before using the Wysh AI website and services. By accessing or using our Service, you agree to be bound by these Terms."
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
              Terms of Service
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
            <div className="bg-swiss-coffee-lighter rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
              <p className="text-muted-foreground">
                Please read these Terms of Service ("Terms") carefully before using the Wysh AI website 
                and services (collectively, the "Service") operated by Wysh AI ("us", "we", or "our").
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate and complete information. 
                You are responsible for maintaining the security of your account and for all activities 
                that occur under your account.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Service Usage</h2>
              <p>You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 my-4 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on any intellectual property rights</li>
                <li>Transmit any malicious code or viruses</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain 
                the exclusive property of Wysh AI and its licensors. Our trademarks and trade dress may 
                not be used in connection with any product or service without our prior written consent.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, 
                without prior notice or liability, for any reason whatsoever, including without limitation 
                if you breach these Terms.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
              <p>
                In no event shall Wysh AI, nor its directors, employees, partners, agents, suppliers, 
                or affiliates, be liable for any indirect, incidental, special, consequential, or punitive 
                damages resulting from your access to or use of the Service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. We will provide notice 
                of any changes by posting the new Terms on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about these Terms, please contact us:
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
