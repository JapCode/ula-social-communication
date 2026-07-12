/**
 * Maps content filename (without extension) to its public URL path.
 *
 * Routes with custom slugs go in `pages2route`. Everything else falls back
 * to the convention: URL path → filename with slashes replaced by dashes.
 *
 * Custom slugs set in TinaCMS frontmatter are auto-detected at build time
 * and included in `slugMap` from generated-router.ts.
 *
 * Examples:
 *   pages2route['program-history']  = '/program/history'   (explicit)
 *   getPageRoute('mi-pagina')       = '/mi-pagina'          (fallback)
 *   getPageFilename('/mi-pagina')   = 'mi-pagina'           (fallback)
 *   getPageFilename('/')            = 'home'                (fallback)
 */
import { slugMap } from '../../tina/generated-router';
export const pages2route: Record<string, string> = {
  home: '/',
  contact: '/contact',
  'program-index': '/program',
  'program-history': '/program/history',
  'program-authorities': '/program/authorities',
  'program-faculty': '/program/faculty',
  'program-mission': '/program/mission',
  'program-graduate-profile': '/program/graduate-profile',
  'admission-process': '/admission/process',
  'admission-requirements': '/admission/requirements',
  'academics-index': '/academics',
  'academics-curriculum': '/academics/curriculum',
  'academics-course-content': '/academics/course-content',
  'academics-internships': '/academics/internships',
  'academics-research': '/academics/research',
  'student-life-index': '/student-life',
  'student-life-association': '/student-life/association',
  'student-life-groups': '/student-life/groups',
  'student-life-community': '/student-life/community',
  'student-life-events-listing': '/student-life/events',
  'alumni-index': '/alumni',
  'alumni-testimonials': '/alumni/testimonials',
  'alumni-continuing-education': '/alumni/continuing-education',
  'portfolio-index': '/portfolio',
  'portfolio-magazine': '/portfolio/magazine',
  'portfolio-media-lab': '/portfolio/media-lab',
  'portfolio-articles': '/portfolio/articles',
  'program-catedra': '/program/catedra',
};

/** Map URL path back to filename (for the catch-all route) */
export const route2page: Record<string, string> =
  Object.fromEntries(
    Object.entries(pages2route).map(([filename, route]) => [route, filename])
  );

/** Return the URL path for a given filename */
export function getPageRoute(filename: string): string {
  return pages2route[filename] ?? `/${filename}`;
}

/** Return the filename for a given URL path */
export function getPageFilename(route: string): string | undefined {
  // 1. Try explicit map first (for custom slugs like /program/history)
  const explicit = route2page[route];
  if (explicit) return explicit;

  // 2. Try generated slug map (for custom slugs from TinaCMS frontmatter)
  const fromSlug = slugMap[route];
  if (fromSlug) return fromSlug;

  // 3. Fallback: /multi/part/path → multi-part-path, / → home
  const slug = route.replace(/^\/|\/$/g, '') || 'home';
  return slug.replace(/\//g, '-');
}
