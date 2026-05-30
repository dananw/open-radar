import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    stars: z.number().optional(),
    forks: z.number().optional(),
    language: z.string().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    publishedAt: z.coerce.date(),
  }),
})

export const collections = { projects }
