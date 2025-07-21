import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/seo/SEO';
import officeCollabImage from '@/assets/office-collab.png';
import modernOfficeImage from '@/assets/Modern Office Workspace-2.png';
import treehouseImage from '@/assets/Treehouse-home-estimator.jpg'; // Main image for first card
import infoSheetImage from '@/assets/WyshAI-1pager-2025-06-25.1.jpeg'; // Info sheet thumbnail
import { FileText } from 'lucide-react'; // Importing icon from lucide-react

const DemosPage = () => {
  return (
    <>
      <SEO 
        title="AI Demos & Examples | Wysh AI"
        description="Explore our AI demos and see how Wysh AI can transform your business operations with custom AI solutions."
        image="/images/og/og-wyshAI.jpg"
        noIndex={true}
      />
    <div className="min-h-screen">
      {/* AI Showroom Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-swiss-coffee-lighter">
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
                  /* src={treehouseImage} */
                  src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80"
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

            <a 
              href="/demos/Scheduler-Google-Calendar/index.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full w-full max-w-md transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden mb-6 rounded-lg">
                <img 
                  src="/demos/images/Google-calendar.png"
                  alt="Google Calendar Scheduler Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load image:', e.target.src);
                    e.target.src = officeCollabImage;
                  }}
                />
              </div>
              <h2 className="text-xl font-montserrat font-bold mb-3 text-foreground">Google Calendar Scheduler</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Seamlessly schedule and manage meetings with Google Calendar integration and smart time suggestions.</p>
              <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors">
                View Scheduler Demo
              </div>
            </a>

            {/* Temporarily commented out Rescheduler card
            <a 
              href="/demos/Rescheduler/index.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full w-full max-w-md transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative h-48 w-full overflow-hidden mb-6 rounded-lg">
                <img 
                  src="/demos/images/Contemporary-barbershop.webp"
                  alt="Appointment scheduler"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load image:', e.target.src);
                    e.target.src = officeCollabImage;
                  }}
                />
              </div>
              <h2 className="text-xl font-montserrat font-bold mb-3 text-foreground">Appointment scheduler</h2>
              <p className="text-gray-700 leading-relaxed mb-6">Experience intelligent scheduling tool that finds the perfect time for all participants automatically.</p>
              <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors">
                View Scheduler Demo
              </div>
            </a>
            */}
          </div>
        </div>
      </section>

      {/* Info Sheets Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-swiss-coffee-darker">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-swiss-coffee-light">Info Sheets</h2>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <a 
                href="/resources/WyshAI-1pager-2025-06-25.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#2a2524] p-6 rounded-xl shadow-sm border border-swiss-coffee-darker/50 w-full transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col md:flex-row items-center gap-6 hover:border-swiss-coffee-light/30 min-h-[280px]"
              >
                <div className="w-full md:w-1/3 h-56 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={infoSheetImage}
                    alt="WyshAI Overview Info Sheet"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 object-top"
                    loading="lazy"
                    style={{ objectPosition: 'top' }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-xl font-montserrat font-semibold mb-3 text-swiss-coffee-lighter">Wysh AI Introduction</h3>
                    <p className="text-swiss-coffee-lighter/90 text-base">Read an overview about our AI solutions and how they can benefit your business.</p>
                  </div>
                  <div>
                    <div className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md group-hover:bg-primary/90 transition-colors">
                      View PDF
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default DemosPage;
