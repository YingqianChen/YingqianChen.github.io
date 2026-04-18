import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().max(200),
    date: z.date(),
    updated: z.date().optional(),
    tech: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    cover: z.string().optional(),
    status: z.enum(['shipped', 'in-progress', 'archived']).default('shipped'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
