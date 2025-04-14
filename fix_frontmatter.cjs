const fs = require('fs');
const path = require('path');

// Function to process a single file
function processFrontmatter(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');

        // Extract date from filename
        const filename = path.basename(filePath);
        const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
        if (!dateMatch) {
            console.log(`Skipping ${filename} - could not extract date`);
            return;
        }

        // Simple frontmatter extraction
        const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
        if (!frontmatterMatch) {
            console.log(`Skipping ${filename} - could not extract frontmatter`);
            return;
        }

        const frontmatterContent = frontmatterMatch[1];
        const lines = frontmatterContent.split('\n');

        let title = '';
        let description = '';
        let tags = [];
        let style = '';
        let color = '';

        // Extract existing frontmatter values
        lines.forEach(line => {
            if (line.startsWith('title:')) {
                title = line.replace('title:', '').trim();
            } else if (line.startsWith('description:')) {
                description = line.replace('description:', '').trim();
            } else if (line.startsWith('tags:')) {
                tags = line.replace('tags:', '').trim();
            } else if (line.startsWith('style:')) {
                style = line.replace('style:', '').trim();
            } else if (line.startsWith('color:')) {
                color = line.replace('color:', '').trim();
            }
        });

        // If no description, set a placeholder
        if (!description) {
            description = "No description";
        }

        // Create new frontmatter
        const newFrontmatter = `---
title: ${title}
description: ${description}
pubDate: ${dateMatch[1]}T00:00:00Z
language: 'en'
${tags ? `tags: ${tags}` : ''}
${style ? `style: ${style}` : ''}
${color ? `color: ${color}` : ''}`;

        // Replace old frontmatter with new one
        const newContent = content.replace(/^---\s*\n[\s\S]*?\n---/, `${newFrontmatter}
---`);

        // Write back to file
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed frontmatter for: ${filename}`);

    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Process all markdown files in the en directory
const enDirPath = path.join('src', 'content', 'blog', 'en');
const files = fs.readdirSync(enDirPath);

files.forEach(file => {
    if (file.endsWith('.md')) {
        processFrontmatter(path.join(enDirPath, file));
    }
});

console.log('All frontmatters processed!'); 