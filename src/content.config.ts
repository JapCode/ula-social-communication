import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    author: z.string(),
    category: z.enum(['investigacion', 'actualidad', 'opinion', 'cronica']),
    excerpt: z.string(),
    coverImage: z.string().optional(),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    endDate: z.string().or(z.date()).optional(),
    location: z.string(),
    type: z.enum(['foro', 'taller', 'charla', 'semana', 'academico', 'cultural']),
    description: z.string(),
    coverImage: z.string().optional(),
  }),
});

const faculty = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/faculty' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    specialization: z.string(),
    email: z.string().email().optional(),
    bio: z.string().optional(),
    photo: z.string().optional(),
    status: z.enum(['active', 'retired']).default('active'),
  }),
});

const staff = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/staff' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    department: z.string(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    photo: z.string().optional(),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    graduationYear: z.number(),
    currentRole: z.string(),
    quote: z.string(),
    photo: z.string().optional(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/courses' }),
  schema: z.object({
    code: z.string(),
    name: z.string(),
    semester: z.number(),
    credits: z.number(),
    description: z.string(),
    pdfUrl: z.string().optional(),
  }),
});

export const collections = {
  articles,
  events,
  faculty,
  staff,
  testimonials,
  courses,
};
