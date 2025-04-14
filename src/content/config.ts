import { defineCollection, z } from 'astro:content';

// Define the schema for the blog collection
const blogCollection = defineCollection({
    type: 'content', // 'content' for markdown, 'data' for json/yaml
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Transform string to Date object
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        tags: z.array(z.string()).optional(),
        language: z.enum(['en', 'ru']), // Add language field
        // Add any other fields you want for your posts
        // Example: author: z.string().default('Admin'),
    }),
});

// Export a single `collections` object to register your collection(s)
export const collections = {
    'blog': blogCollection,
}; 