import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { motion } from 'framer-motion';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { openChat } = useChatbot();

  const handleJoinClick = () => {
    openChat({ initialMessage: "Hi! I'm interested in Wysh AI. Can you tell me more?", initialStep: 'getStarted' });
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
    { name: 'About Us', path: '/about', analyticsId: 'navbar-nav-about' },
    { name: 'Services', path: '/services', analyticsId: 'navbar-nav-services' },
    // { name: 'Resources', path: '#', analyticsId: 'navbar-nav-resources' }, // Example for dropdown
    // { name: 'Blog', path: '/blog', analyticsId: 'navbar-nav-blog' }, // Example for blog
  ];

  const Logo = () => (
    <Link to="/" className="text-2xl font-archivo font-bold text-primary" data-analytics-id="navbar-logo-wyshAI">
      wyshAI
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out
                  ${isScrolled || isMenuOpen ? 'bg-white shadow-md py-3' : 'bg-transparent py-4'}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-foreground hover:text-primary/80'
                }`
              }
              data-analytics-id={link.analyticsId}
            >
              {link.name}
            </NavLink>
          ))}
          <Button 
            variant="join" 
            size="sm" 
            onClick={handleJoinClick}
            data-analytics-id="navbar-cta-join"
          >
            Join
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-foreground"
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
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg pb-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-3 pt-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium py-2 transition-colors ${
                    isActive ? 'text-primary' : 'text-foreground hover:text-primary/80'
                  }`
                }
                data-analytics-id={`${link.analyticsId}-mobile`}
              >
                {link.name}
              </NavLink>
            ))}
            <Button 
              variant="join" 
              size="default" 
              className="w-full mt-2" 
              onClick={() => { handleJoinClick(); setIsMenuOpen(false);}}
              data-analytics-id="navbar-cta-join-mobile"
            >
              Join
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;