#!/bin/bash

# Update all references to the icon in demo files
find public/demos -type f \( -name "*.html" -o -name "*.js" \) -exec sed -i '' 's|/src/assets/demos/Icon-wyshAI-dark.png|/demos/images/Icon-wyshAI-dark.png|g' {} \;

echo "All references have been updated."
