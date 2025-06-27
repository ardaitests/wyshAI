const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Ensure the output directory exists
const outputDir = path.join(__dirname, '../public/images/og');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Define the pages and their respective OG images
const pages = [
  {
    name: 'home',
    title: 'AI-Powered Business Automation Solutions',
    description: 'Transform your business with custom AI agents and workflows',
    bgImage: 'https://wyshai.netlify.app/images/og-bg.jpg'
  },
  {
    name: 'demos',
    title: 'Interactive AI Demos & Showcase',
    description: 'Experience our AI solutions in action',
    bgImage: 'https://wyshai.netlify.app/images/og-bg.jpg'
  },
  {
    name: 'about',
    title: 'About Wysh AI - Our Story & Mission',
    description: 'Transforming businesses through AI innovation',
    bgImage: 'https://wyshai.netlify.app/images/og-bg.jpg'
  },
  {
    name: 'pricing',
    title: 'Pricing Plans - Find Your Perfect Fit',
    description: 'Flexible pricing for custom AI solutions',
    bgImage: 'https://wyshai.netlify.app/images/og-bg.jpg'
  },
  {
    name: 'services',
    title: 'AI Solutions & Services',
    description: 'Custom AI solutions tailored to your business needs',
    bgImage: 'https://wyshai.netlify.app/images/og-bg.jpg'
  }
];

async function generateOGImages() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (const page of pages) {
      console.log(`Generating OG image for ${page.name}...`);
      
      const pageInstance = await browser.newPage();
      await pageInstance.setViewport({ width: 1200, height: 630 });
      
      // Construct the URL with query parameters
      const url = `file://${path.join(__dirname, '../public/og-templates/template.html')}?` + 
        `title=${encodeURIComponent(page.title)}&` +
        `description=${encodeURIComponent(page.description)}&` +
        `bgImage=${encodeURIComponent(page.bgImage)}`;
      
      await pageInstance.goto(url, { waitUntil: 'networkidle0' });
      
      // Wait for fonts to load
      await pageInstance.evaluateHandle('document.fonts.ready');
      
      // Take screenshot
      const outputPath = path.join(outputDir, `og-${page.name}.jpg`);
      await pageInstance.screenshot({
        path: outputPath,
        type: 'jpeg',
        quality: 90,
        fullPage: false
      });
      
      console.log(`Generated: ${outputPath}`);
      await pageInstance.close();
    }
  } catch (error) {
    console.error('Error generating OG images:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

// Run the function
generateOGImages().catch(console.error);
