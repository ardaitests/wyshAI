
import React from 'react';
import { Bot, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border/50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <Bot className="h-7 w-7 text-primary" />
            <h3 className="text-xl font-orbitron font-bold text-primary">Wysh AI</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Empowering businesses with custom AI solutions.
          </p>
        </div>
        <div className="flex space-x-6 mb-6 md:mb-0">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-6 w-6" /></a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-6 w-6" /></a>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Wysh AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
