#!/bin/bash

# Update GitHub raw paths to local paths in demo files
find public/demos -type f -name "*.html" -o -name "*.js" | xargs sed -i '' 's|https://raw.githubusercontent.com/ardaitests/wyshAI/refs/heads/main/public/demos/images/|/src/assets/demos/|g'
