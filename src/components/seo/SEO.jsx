import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Wysh AI - AI Solutions for Modern Businesses',
  description = 'Grow your business with custom AI solutions tailored to your needs.',
  type = 'website',
  image = '/images/og/og-wyshAI.jpg',
  url = 'https://wyshai.netlify.app',
  siteName = 'Wysh AI',
  locale = 'en_US',
  twitterCard = 'summary_large_image',
  noIndex = false,
  canonicalUrl = ''
}) => {
  // Ensure the URL is absolute
  const baseUrl = 'https://wyshai.netlify.app';
  const pageUrl = canonicalUrl || `${baseUrl}${typeof window !== 'undefined' ? window.location.pathname : ''}`;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;
  const pageTitle = title.endsWith('| Wysh AI') ? title : `${title} | Wysh AI`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
      <meta property="twitter:image:alt" content={title} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />
    </Helmet>
  );
};

export default SEO;
