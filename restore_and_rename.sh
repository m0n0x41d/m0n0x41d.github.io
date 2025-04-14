#!/bin/bash

# First, let's restore the backup of the files
cd src/content/blog/en/

# Get a list of all blog posts
ls -la

# Create new filenames without the date prefix
for file in *.md; do
  # Skip if not date prefixed
  if ! [[ $file =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2} ]]; then
    echo "Skipping $file (not date prefixed)"
    continue
  fi
  
  # Get the title from frontmatter
  title=$(grep -m 1 "^title:" "$file" | sed 's/^title:[[:space:]]*//;s/^"\(.*\)"$/\1/;s/^'"'"'\(.*\)'"'"'$/\1/')
  
  # Convert title to filename-friendly format
  # Remove special characters, replace spaces with hyphens, convert to lowercase
  safe_title=$(echo "$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
  
  # New filename
  new_name="$safe_title.md"
  
  # Only rename if the new name is different and doesn't already exist
  if [ "$file" != "$new_name" ] && [ ! -f "$new_name" ]; then
    echo "Renaming: $file → $new_name"
    mv "$file" "$new_name"
  else
    echo "Cannot rename $file to $new_name (target exists or same name)"
  fi
done

echo "Finished renaming files!" 