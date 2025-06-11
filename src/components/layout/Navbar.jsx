import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { motion } from 'framer-motion';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import { Menu, X } from 'lucide-react';
import logoImage from '@/assets/wyshAI-Logo-Dark-June-2025.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { openChat } = useChatbot();
  const location = useLocation();

  // Scroll to top when location changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleJoinClick = () => {
    openChat({ initialMessage: "Hi! I'm the Wysh AI assistant. Can you tell me more about what you're interested in?", initialStep: 'getStarted' });
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', analyticsId: 'navbar-nav-home' },
    { name: 'Services', path: '/services', analyticsId: 'navbar-nav-services' },
    { name: 'About Us', path: '/about', analyticsId: 'navbar-nav-about' },
    // { name: 'Resources', path: '#', analyticsId: 'navbar-nav-resources' }, // Example for dropdown
    // { name: 'Blog', path: '/blog', analyticsId: 'navbar-nav-blog' }, // Example for blog
  ];

  // Close mobile menu and scroll to top when a nav link is clicked
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const Logo = () => (
    <Link 
      to="/" 
      className="flex items-center" 
      data-analytics-id="navbar-logo-wyshAI"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img 
        src={logoImage} 
        alt="Wysh AI - AI-Powered Business Solutions" 
        className="h-10 w-auto" 
        width="120"
        height="40"
        onError={(e) => {
          console.error('Logo image failed to load');
          e.target.onerror = null;
          e.target.src = 'https://placehold.co/120x40/1a1a2e/e6e6e6?text=WyshAI';
          e.target.alt = 'Wysh AI Logo - Placeholder';
        }}
      />
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-primary-dark h-20 flex items-center
                  ${isScrolled || isMenuOpen ? 'shadow-md' : 'bg-opacity-90 backdrop-blur-sm'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `group relative px-4 py-2 rounded-md text-sm font-montserrat font-medium transition-colors bg-transparent text-primary-foreground/90 hover:bg-white/10 hover:text-primary-foreground`
              }
              data-analytics-id={link.analyticsId}
              onClick={handleNavLinkClick}
            >
              {link.name}
              <motion.div className="absolute bottom-0 left-0 w-full flex justify-center">
                <motion.span 
                  className="h-0.5 bg-primary-light w-1/4"
                  initial={false}
                  animate={{
                    scaleX: (useLocation().pathname === link.path || (link.path === '/' && useLocation().pathname === '/')) ? 1 : 0,
                    transformOrigin: 'center',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              </motion.div>
            </NavLink>
          ))}
          <Button 
            variant="default"
            size="sm" 
            onClick={handleJoinClick}
            data-analytics-id="navbar-cta-contact"
            className="bg-primary-medium text-primary-foreground hover:bg-white/10 font-montserrat font-medium"
          >
            Contact us
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-white"
            data-analytics-id="navbar-mobile-menu-toggle"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 right-0 bg-primary-medium shadow-lg pb-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-3 pt-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={handleNavLinkClick}
                className={({ isActive }) =>
                  `text-sm font-montserrat font-medium py-2 transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                  }`
                }
                data-analytics-id={`${link.analyticsId}-mobile`}
              >
                {link.name}
              </NavLink>
            ))}
            <Button 
              variant="secondary"
              size="default" 
              className="w-full mt-2 bg-[hsl(4_96%_100%)] text-primary hover:bg-card font-montserrat" 
              onClick={() => { handleJoinClick(); setIsMenuOpen(false);}}
              data-analytics-id="navbar-cta-contact-mobile"
            >
              Contact us
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;