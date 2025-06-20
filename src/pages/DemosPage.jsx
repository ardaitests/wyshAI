import React from 'react';
import { Link } from 'react-router-dom';
import officeCollabImage from '@/assets/office-collab.png';
import modernOfficeImage from '@/assets/Modern Office Workspace-2.png';
import treehouseImage from '@/assets/Treehouse-home-estimator.jpg'; // Main image for first card

const DemosPage = () => {
  return (
    <div className="min-h-screen bg-swiss-coffee-lighter py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-montserrat font-semibold mb-6 text-foreground">AI Showroom</h1>
        <p className="text-xl text-muted-foreground-darker max-w-3xl mx-auto leading-relaxed">
          Explore our interactive AI products and projects
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          <a 
            href="/demos/Treehouse-home-estimator/index.html" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full w-full max-w-md transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden mb-6 rounded-lg">
              <img 
                src={treehouseImage}
                alt="Home Value Estimate AI Chatbot Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                  e.target.src = officeCollabImage; // Fallback to office image if main image fails
                }}
              />
            </div>
            <h2 className="text-xl font-montserrat font-bold mb-3 text-foreground">Home Value Estimate AI Chatbot</h2>
            <p className="text-gray-700 leading-relaxed mb-6">Homeowners can quickly get an offer for their home based on real-time market data and financial algorithms.</p>
            <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors">
              View Custom AI Chatbot
            </div>
          </a>
          
          <a 
            href="/demos/CRM-demo/index.html" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full w-full max-w-md transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden mb-6 rounded-lg">
              <img 
                src={modernOfficeImage}
                alt="AI-Driven CRM System Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  console.error('Failed to load image:', e.target.src);
                  e.target.src = officeCollabImage;
                }}
              />
            </div>
            <h2 className="text-xl font-montserrat font-bold mb-3 text-foreground">AI-Driven CRM System</h2>
            <p className="text-gray-700 leading-relaxed mb-6">Streamline customer development with AI-powered insights, automated follow-ups, and intelligent lead scoring.</p>
            <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors">
              View AI CRM Demo
            </div>
          </a>

          {/* Placeholder Card */}
          <div 
            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full w-full max-w-md transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden mb-6 rounded-lg bg-gray-100 flex items-center justify-center">
              <div className="text-gray-400">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="mt-2 text-sm">Coming Soon</p>
              </div>
            </div>
            <h2 className="text-xl font-montserrat font-bold mb-3 text-foreground">New Project in Development</h2>
            <p className="text-gray-700 leading-relaxed mb-6">We're working on something exciting! Check back soon for our latest AI innovation.</p>
            <div className="inline-block px-4 py-2 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemosPage;
