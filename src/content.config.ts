import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Shared sub-schemas ─────────────────────────────────────

const itemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  detail: z.string().optional(),
  icon: z.string().optional(),
  href: z.string().optional(),
  emphasis: z.boolean().optional(),
});

const headingSchema = z.object({
  title: z.string(),
  eyebrow: z.string().optional(),
  description: z.string().optional(),
  items: z.array(z.string()).optional(),
});

const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const contactSchema = z.object({
  name: z.string().optional(),
  role: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

// ── Homepage ───────────────────────────────────────────────

const homeSchema = z.object({
  pageType: z.literal('home'),
  pageId: z.string(),
  title: z.string(),

  hero: z.object({
    eyebrow: z.string(),
    title_line1: z.string(),
    title_line2: z.string(),
    description: z.string(),
    cta_text: z.string(),
    cta_link: z.string(),
    secondary_text: z.string(),
    secondary_link: z.string(),
  }),

  quickAccess: z.object({
    title: z.string(),
    items: z.array(z.object({
      title: z.string(),
      subtitle: z.string(),
      subtitle_desktop: z.string(),
      href: z.string(),
      aria_label: z.string(),
    })),
  }),

  news: z.object({
    tag: z.string(),
    category: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    image_alt: z.string(),
    link_text: z.string(),
    link_href: z.string(),
    secondary: z.array(z.object({
      category: z.string(),
      title: z.string(),
      date: z.string().or(z.date()),
      href: z.string(),
    })),
  }),

  video: z.object({
    eyebrow: z.string(),
    title: z.string(),
    badge: z.string(),
    video_id: z.string(),
    duration: z.string(),
    description: z.string(),
  }),

  footer: z.object({
    email: z.string(),
    phone: z.string(),
    schedule: z.string(),
    social_instagram: z.string(),
    social_twitter: z.string(),
    social_youtube: z.string(),
  }),
});

// ── Index pages (title + subtitle + eyebrow + items) ───────

const indexSchema = z.object({
  pageType: z.literal('index'),
  pageId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  eyebrow: z.string(),
  items: z.array(itemSchema),
});

// ── Index pages with stats ─────────────────────────────────

const indexStatsSchema = z.object({
  pageType: z.literal('index-stats'),
  pageId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  eyebrow: z.string(),
  items: z.array(itemSchema),
  stats: z.array(statSchema),
});

// ── Content pages (title + subtitle + eyebrow + body + items) ──

const contentSchema = z.object({
  pageType: z.literal('content'),
  pageId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  eyebrow: z.string(),
  body: z.string().optional(),
  items: z.array(itemSchema),
});

// ── Content page with headings ─────────────────────────────

const contentHeadingsSchema = z.object({
  pageType: z.literal('content-headings'),
  pageId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  eyebrow: z.string(),
  items: z.array(itemSchema),
  headings: z.array(headingSchema),
});

// ── Minimal (contact) ──────────────────────────────────────

const minimalSchema = z.object({
  pageType: z.literal('minimal'),
  pageId: z.string(),
  title: z.string(),
  subtitle: z.string(),
  items: z.array(itemSchema),
});

// ── Body + items ──────────────────────────────────────────

const bodyItemsSchema = z.object({
  pageType: z.literal('body-items'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  items: z.array(itemSchema),
});

// ── Body + items + stats ──────────────────────────────────

const bodyItemsStatsSchema = z.object({
  pageType: z.literal('body-items-stats'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  items: z.array(itemSchema),
  stats: z.array(statSchema),
});

// ── Body + items + headings ────────────────────────────────

const bodyItemsHeadingsSchema = z.object({
  pageType: z.literal('body-items-headings'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  items: z.array(itemSchema),
  headings: z.array(headingSchema),
});

// ── Body + items + contact ─────────────────────────────────

const bodyItemsContactSchema = z.object({
  pageType: z.literal('body-items-contact'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  items: z.array(itemSchema),
  contact: contactSchema,
});

// ── Body + headings ────────────────────────────────────────

const bodyHeadingsSchema = z.object({
  pageType: z.literal('body-headings'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  headings: z.array(headingSchema),
});

// ── Body only (course content, simple pages) ──────────────

const bodySchema = z.object({
  pageType: z.literal('body'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
});

// ── Research page (body + research lines + thesis + contact) ─

const researchSchema = z.object({
  pageType: z.literal('research'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  items: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
  })),
  thesis: z.object({
    title: z.string(),
    text: z.string(),
    note: z.string().optional(),
  }),
  contact: z.object({
    name: z.string(),
    role: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    office: z.string().optional(),
  }),
});

// ── Internships page (body + requirements + modalities + contact) ─

const internshipsSchema = z.object({
  pageType: z.literal('internships'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  requirements: z.array(z.string()),
  modalities: z.array(z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
  })),
  formUrl: z.string().optional(),
  contact: z.object({
    name: z.string(),
    role: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    office: z.string().optional(),
  }),
});

// ── Association page (body + activities + participation + alert) ─

const associationSchema = z.object({
  pageType: z.literal('association'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  activities: z.array(z.string()),
  participationText: z.string().optional(),
  alert: z.object({
    title: z.string(),
    body: z.string(),
  }).optional(),
});

// ── Groups & Workshops page ────────────────────────────────

const groupItemSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  detail: z.string().optional(),
  icon: z.string().optional(),
});

const groupsSchema = z.object({
  pageType: z.literal('groups'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  groups: z.array(groupItemSchema),
  workshops: z.array(groupItemSchema),
  cta: z.object({
    title: z.string(),
    body: z.string().optional(),
    label: z.string().optional(),
  }).optional(),
});

// ── Community Service page ─────────────────────────────────

const communitySchema = z.object({
  pageType: z.literal('community'),
  pageId: z.string(),
  title: z.string(),
  body: z.string().optional(),
  descriptionItems: z.array(z.string()),
  requirements: z.array(z.string()),
  cta: z.object({
    title: z.string(),
    body: z.string().optional(),
    label: z.string().optional(),
  }).optional(),
  alert: z.object({
    title: z.string(),
    body: z.string(),
  }).optional(),
});

// ── Calendar page (events listing with static sections) ────

const calendarSchema = z.object({
  pageType: z.literal('calendar'),
  pageId: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  cta: z.object({
    title: z.string(),
    body: z.string().optional(),
    label: z.string().optional(),
    secondaryLabel: z.string().optional(),
  }).optional(),
  emptyState: z.object({
    title: z.string(),
    body: z.string().optional(),
    label: z.string().optional(),
  }).optional(),
});

// ── Events listing page ────────────────────────────────────

const eventsListingSchema = z.object({
  pageType: z.literal('events-listing'),
  pageId: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  body: z.string().optional(),
  cta: z.object({
    title: z.string(),
    body: z.string().optional(),
    label: z.string().optional(),
  }).optional(),
  emptyState: z.object({
    title: z.string(),
    body: z.string().optional(),
    label: z.string().optional(),
  }).optional(),
});

// ── Headings only (curriculum) ────────────────────────────

const headingsSchema = z.object({
  pageType: z.literal('headings'),
  pageId: z.string(),
  title: z.string(),
  pdfUrl: z.string().optional(),
  headings: z.array(headingSchema),
});

// ── Headings + items (mission/vision) ─────────────────────

const headingsItemsSchema = z.object({
  pageType: z.literal('headings-items'),
  pageId: z.string(),
  title: z.string(),
  headings: z.array(headingSchema),
  items: z.array(itemSchema),
});

// ── Collection definitions ─────────────────────────────────

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/faculty' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/staff' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    graduationYear: z.number(),
    currentRole: z.string(),
    quote: z.string(),
    photo: z.string().optional(),
  }),
});

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    code: z.string(),
    name: z.string(),
    semester: z.number(),
    credits: z.number(),
    description: z.string(),
    pdfUrl: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema:   z.discriminatedUnion('pageType', [
    homeSchema,
    indexSchema,
    indexStatsSchema,
    contentSchema,
    contentHeadingsSchema,
    minimalSchema,
    bodySchema,
    bodyItemsSchema,
    bodyItemsStatsSchema,
    bodyItemsHeadingsSchema,
    bodyItemsContactSchema,
    bodyHeadingsSchema,
    headingsSchema,
    headingsItemsSchema,
    researchSchema,
    internshipsSchema,
    associationSchema,
    groupsSchema,
    communitySchema,
    calendarSchema,
    eventsListingSchema,
  ]),
});

export const collections = {
  articles,
  events,
  faculty,
  staff,
  testimonials,
  courses,
  pages,
};
