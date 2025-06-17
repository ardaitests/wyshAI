import React from 'react';
import { Link } from 'react-router-dom';

const DemosPage = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-foreground">AI Showroom</h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">Explore our interactive AI products and projects</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          <a 
            href="/demos/Treehouse-home-estimator/index.html" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card rounded-lg border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-md block hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src="/demos/images/Treehouse-home-estimator.jpg" 
                alt="Home Value Estimate AI Chatbot Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                  e.target.src = '/demos/images/treehouse-preview.jpg';
                }}
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">Home Value Estimate AI Chatbot</h2>
              <p className="text-muted-foreground mb-4">Homeowners can quickly get an offer for their home based on real-time market data and financial algorithms.</p>
              <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors">
                View Custom AI Chatbot
              </div>
            </div>
          </a>
          
          <a 
            href="/demos/CRM-demo/index.html" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-card rounded-lg border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-md block hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src="/images/office-collab.png" 
                alt="AI-Driven CRM System Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                  e.target.src = '/images/office-collaboration-in-color.png';
                }}
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">AI-Driven CRM System</h2>
              <p className="text-muted-foreground mb-4">Streamline customer development with AI-powered insights, automated follow-ups, and intelligent lead scoring.</p>
              <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors">
                View AI CRM Demo
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemosPage;
