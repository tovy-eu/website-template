import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  draft: z.boolean().default(false),
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog/en' }),
  schema: blogSchema,
});

const blogNl = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog/nl' }),
  schema: blogSchema,
});

export const collections = { 'blog-en': blogEn, 'blog-nl': blogNl };
