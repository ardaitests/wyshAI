
import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useChatbot } from '@/contexts/ChatbotContext.jsx';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { openChat } = useChatbot();
  const location = useLocation();

  const handleGetStartedClick = () => {
    openChat({ 
      initialMessage: "Thanks for clicking 'Get Started'! To begin, what's your name?",
      initialStep: 'getName' 
    });
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Button 
        asChild 
        variant="ghost" 
        className={`text-foreground hover:text-primary transition-colors ${isActive ? 'text-primary font-semibold' : ''}`}
      >
        <Link to={to}>{children}</Link>
      </Button>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-background/80 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-archivo font-bold text-primary">Wysh AI</h1>
        </Link>
        <div className="space-x-2 md:space-x-4">
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/#about">About</NavLink> {/* Assuming About is a section on homepage */}
          <Button 
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
            onClick={handleGetStartedClick}
          >
            Get Started
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
