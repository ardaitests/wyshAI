import React from 'react';
import { Link } from 'react-router-dom';

const DemosPage = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-foreground">AI Showroom</h1>
        <p className="text-muted-foreground text-lg mb-8">Explore our interactive AI products and projects</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src="/demos/images/Treehouse-home-estimator.jpg" 
                alt="Home Value Estimate AI Chatbot Preview"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                  e.target.src = '/demos/images/treehouse-preview.jpg';
                }}
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 text-foreground">Home Value Estimate AI Chatbot</h2>
              <p className="text-muted-foreground mb-4">Homeowners can quickly get an offer for their home based on real-time market data and financial algorithms.</p>
              <a 
                href="/demos/Treehouse-home-estimator/index.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                View Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemosPage;
