import { defineCollection, z } from 'astro:content';
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    description: z.string(),
    author: z.string().default('Vladislav T.'),
    tags: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
  }),
});
export const collections = { blog };
