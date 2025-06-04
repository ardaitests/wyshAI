import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-footer-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top section: Logo/Links and Subscribe */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and Quick Links */}
          <div className="flex flex-col md:flex-row md:col-span-2 gap-8">
            {/* Logo and Company */}
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center gap-2 mb-4" data-analytics-id="footer-logo-wyshAI">
                {/* Replace with an actual logo image if available */}
                <span className="text-3xl font-archivo font-bold text-primary">wysh</span>
                <span className="text-3xl font-archivo font-bold text-white">AI</span>
              </Link>
              <div className="hidden md:block">
                <p className="text-sm text-footer-foreground/80">Quick Links</p>
                <ul className="mt-2 space-y-2">
                  <li><Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link></li>
                  <li><Link to="/about" className="hover:text-primary transition-colors text-sm">About Us</Link></li>
                  <li><Link to="/services" className="hover:text-primary transition-colors text-sm">Services</Link></li>
                </ul>
              </div>
            </div>
            {/* Quick Links for mobile */}
            <div className="md:hidden">
              <p className="text-sm text-footer-foreground/80">Quick Links</p>
              <ul className="mt-2 space-y-2">
                <li><Link to="/" className="hover:text-primary transition-colors text-sm">Home</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors text-sm">About Us</Link></li>
                <li><Link to="/services" className="hover:text-primary transition-colors text-sm">Services</Link></li>
              </ul>
            </div>
          </div>
          {/* Subscribe Section */}
          <div className="">
            <p className="font-semibold text-white mb-3">Subscribe</p>
            <p className="text-sm mb-3 text-footer-foreground/80">Join our newsletter for updates on features and company news.</p>
            <form className="flex gap-2 mb-2">
              <input
                type="email"
                placeholder="Your Email Here"
                className="w-full px-3 py-2 rounded-md text-sm text-foreground focus:ring-primary focus:border-primary border-none bg-footer-foreground/10 placeholder-footer-foreground/60"
                data-analytics-id="footer-newsletter-email-input"
              />
              <button
                type="submit"
                className="bg-footer-foreground/20 text-footer-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                data-analytics-id="footer-newsletter-subscribe-button"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-footer-foreground/60">
              By subscribing, you agree to our <Link to="/privacy-policy" className="underline hover:text-primary">Privacy Policy</Link> and consent to receive updates.
            </p>
          </div>
        </div>
        {/* Bottom row: divider, copyright, privacy, LinkedIn */}
        <div className="border-t border-footer-foreground/20 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1 text-xs text-footer-foreground/70">© {currentYear} wyshAI LLC. All rights reserved.</div>
          <div className="flex-1 flex justify-center">
            <Link to="/privacy-policy" className="text-xs hover:text-primary transition-colors">Privacy Policy</Link>
          </div>
          <div className="flex-1 flex justify-end">
            <a href="https://linkedin.com/company/wyshai" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;