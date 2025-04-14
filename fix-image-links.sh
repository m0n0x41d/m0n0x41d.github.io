#!/bin/bash

# Script to fix image links in markdown files
# - Removes center tags from image captions
# - Removes Jekyll-style refdef formatting

# Path to blog posts
BLOG_DIR="src/content/blog/en"

# Function to process each file
process_file() {
  local file=$1
  echo "Processing $file..."
  
  # Remove <center> tags around image captions
  sed -i '' 's/<center>\(.*\)<\/center>/\1/g' "$file"
  
  # Remove Jekyll-style refdef formatting around images
  awk '
  BEGIN { in_refdef = 0 }
  /^{:refdef.*}/ { in_refdef = 1; next }
  /^{: refdef.*}/ { in_refdef = 0; next }
  /^{:refdef2.*}/ { in_refdef = 1; next }
  /^{: refdef2.*}/ { in_refdef = 0; next }
  { if (!in_refdef) print }
  ' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
  
  # Make sure paths use /public/images/ format
  sed -i '' 's|/assets/images/|/public/images/|g' "$file"
  
  echo "Done processing $file"
}

# Process all markdown files in the blog directory
find "$BLOG_DIR" -name "*.md" | while read -r file; do
  process_file "$file"
done

echo "All files processed successfully!" 