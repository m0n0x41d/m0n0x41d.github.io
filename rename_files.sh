#!/bin/bash

# Directory path
DIR="src/content/blog/en"

# Loop through all markdown files
for file in $DIR/*.md; do
  # Extract just the date part (YYYY-MM-DD)
  filename=$(basename "$file")
  date_part=$(echo "$filename" | grep -o "^[0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}")
  
  # If date part was successfully extracted
  if [ ! -z "$date_part" ]; then
    # New filename will be just the date plus .md extension
    new_name="$DIR/$date_part.md"
    
    # Only rename if the new name is different
    if [ "$file" != "$new_name" ]; then
      echo "Renaming: $file → $new_name"
      mv "$file" "$new_name"
    fi
  else
    echo "Skipping $file (no date found)"
  fi
done

echo "Finished renaming files!" 