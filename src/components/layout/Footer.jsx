import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoImage from '@/assets/wyshAI-Logo-Dark-June-2025.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/', analyticsId: 'footer-nav-home' },
    { name: 'About Us', path: '/about', analyticsId: 'footer-nav-about' },
    { name: 'Services', path: '/services', analyticsId: 'footer-nav-services' },
    // { name: 'Contact', path: '/contact', analyticsId: 'footer-nav-contact' }, // Assuming contact is handled by chatbot for now
  ];

  // const resourcesLinks = [
  //   { name: 'FAQs', path: '/faq', analyticsId: 'footer-nav-faq' },
  //   { name: 'Blog', path: '/blog', analyticsId: 'footer-nav-blog' },
  // ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy', analyticsId: 'footer-legal-privacy' },
    { name: 'Terms of Service', path: '/terms-of-service', analyticsId: 'footer-legal-terms' },
    // { name: 'Cookie Settings', path: '/cookie-settings', analyticsId: 'footer-legal-cookies' }, // Assuming not yet implemented
  ];

  const socialMedia = [
    { icon: <Linkedin size={20} />, name: 'LinkedIn', path: 'https://www.linkedin.com/company/wyshai', analyticsId: 'footer-social-linkedin' },
  ];

  return (
    <footer className="bg-[hsl(256,56%,24%)] text-footer-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo, Company, and Social */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex flex-col">
              <Link to="/" className="block mb-3" data-analytics-id="footer-logo-wyshAI">
                <img 
                  src={logoImage} 
                  alt="wyshAI Logo" 
                  className="h-10 w-auto" 
                />
              </Link>
              <p className="text-sm text-footer-foreground/80 mb-4">
                Want to use AI for your business?<br />
                <span className="italic">Just wysh for it.</span>
              </p>
              <div className="flex space-x-4">
                {socialMedia.map(social => (
                  <a 
                    key={social.name} 
                    href={social.path} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label={social.name} 
                    className="hover:text-primary-lighter transition-colors"
                    data-analytics-id={social.analyticsId}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Empty column to push Quick Links to the right */}
          <div className="hidden md:block"></div>

          {/* Quick Links */}
          <div className="md:col-start-4 lg:col-start-5">
            <p className="font-semibold text-white mb-3">Quick Links</p>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="hover:text-primary-lighter transition-colors text-sm"
                    data-analytics-id={link.analyticsId}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - Commented out for now */}
          {/*
          <div>
            <p className="font-semibold text-white mb-3">Resources</p>
            <ul className="space-y-2">
              {resourcesLinks.map(link => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="hover:text-primary-lighter transition-colors text-sm"
                    data-analytics-id={link.analyticsId}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}
          
          {/* Stay Updated / Subscribe - Commented out for now */}
          {/*
          <div className="col-span-2 md:col-span-1">
             <p className="font-semibold text-white mb-3">Stay Updated</p>
             <p className="text-sm mb-3 text-footer-foreground/80">Join our newsletter for updates on features and company news.</p>
             <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email Here" 
                  className="w-full px-3 py-2 rounded-l-md text-sm text-foreground focus:ring-primary focus:border-primary border-gray-600 bg-slate-700 placeholder-gray-400" 
                  data-analytics-id="footer-newsletter-email-input"
                />
                <button 
                  type="submit" 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md text-sm font-medium hover:bg-primary/90"
                  data-analytics-id="footer-newsletter-subscribe-button"
                >
                  Subscribe
                </button>
             </form>
          </div>
          */}

        </div>

        <div className="border-t border-footer-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-footer-foreground/70 mb-4 md:mb-0">
              &copy; {currentYear} wyshAI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {legalLinks.map(link => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="text-xs text-footer-foreground/70 hover:text-primary-lighter transition-colors"
                  data-analytics-id={link.analyticsId}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
