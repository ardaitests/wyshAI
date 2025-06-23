import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to add noindex meta tag to HTML files
function addNoIndexToFile(filePath) {
  try {
    let content = readFileSync(filePath, 'utf8');
    
    // Check if meta robots tag already exists
    if (content.includes('name="robots"')) {
      console.log(`Skipping ${filePath} - already has robots meta tag`);
      return;
    }
    
    // Add noindex meta tag after the viewport meta tag
    if (content.includes('<meta name="viewport"')) {
      content = content.replace(
        /(<meta name="viewport"[^>]*>)/,
        `$1\n  <meta name="robots" content="noindex, nofollow">`
      );
      
      writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    } else {
      console.log(`Skipping ${filePath} - no viewport meta tag found`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

// Process all demo HTML files
function processDemoFiles() {
  const demosDir = join(process.cwd(), 'public/demos');
  
  // Find all HTML files in demos directory
  const findHtmlFiles = (dir) => {
    const files = readdirSync(dir, { withFileTypes: true });
    
    files.forEach(file => {
      const fullPath = join(dir, file.name);
      
      if (file.isDirectory()) {
        findHtmlFiles(fullPath);
      } else if (file.name.endsWith('.html')) {
        addNoIndexToFile(fullPath);
      }
    });
  };
  
  if (existsSync(demosDir)) {
    findHtmlFiles(demosDir);
  } else {
    console.log('Demos directory not found');
  }
}

// Run the script
processDemoFiles();
