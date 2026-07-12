#!/usr/bin/env node

/**
 * Migration script: converts existing src/content/pages/*.md to
 * block-based format in src/content/pages/*.md (legacy — src/content/pages moved to blocks)
 *
 * Usage:
 *   node scripts/migrate-to-blocks.mjs            # dry-run (prints diffs)
 *   node scripts/migrate-to-blocks.mjs --apply     # actually write files
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYAML, stringify as stringifyYAML } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src/content/pages');
const DST = path.join(ROOT, 'src/content/pages');

const isApply = process.argv.includes('--apply');

// ─── Route map (inline to avoid TS import issues) ─────────────────────────

const pages2route = {
  home: '/',
  contact: '/contact',
  'program-index': '/program',
  'program-history': '/program/history',
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
};

// ─── Frontmatter helpers ──────────────────────────────────────────────────

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return [{}, text];
  const data = parseYAML(match[1]) || {};
  const body = match[2]?.trim() || '';
  return [data, body];
}

function toFrontmatter(data) {
  const yaml = stringifyYAML(data, {
    lineWidth: 0,     // don't wrap long lines
    indent: 2,
    quotingType: "'",
    forceQuotes: false,
    defaultKeyType: 'PLAIN',
    defaultStringType: 'PLAIN',
  });
  return '---\n' + yaml + '---\n';
}

// ─── Migration logic ──────────────────────────────────────────────────────

const PAGE_FILES = [
  'home', 'contact',
  'program-index', 'program-history', 'program-mission', 'program-graduate-profile',
  'admission-process', 'admission-requirements',
  'academics-index', 'academics-curriculum', 'academics-course-content', 'academics-internships', 'academics-research',
  'student-life-index', 'student-life-association', 'student-life-groups', 'student-life-community', 'student-life-events-listing',
  'alumni-index', 'alumni-testimonials', 'alumni-continuing-education',
  'portfolio-index', 'portfolio-magazine', 'portfolio-media-lab',
];

function convertPage(filename, data, bodyText) {
  const pageType = data.pageType || 'content';
  const title = data.title || '';
  const blocks = [];

  // ── heroBanner ─────────────────────────────────────────────
  function pushHero(overrides = {}) {
    const hero = data.hero || {};
    blocks.push({
      _template: 'heroBanner',
      eyebrow: overrides.eyebrow ?? data.eyebrow ?? hero.eyebrow ?? '',
      titleLine1: overrides.titleLine1 ?? hero.title_line1 ?? '',
      titleLine2: overrides.titleLine2 ?? hero.title_line2 ?? '',
      title: overrides.title ?? title ?? '',
      subtitle: overrides.subtitle ?? data.subtitle ?? '',
      description: overrides.description ?? (typeof data.body === 'string' && data.body.length < 200 ? data.body : '') ?? '',
      ctas: overrides.ctas ?? [],
    });
  }

  // ── richText block helper ──────────────────────────────────
  function pushRichText(text) {
    if (text && text.trim().length > 50) {
      blocks.push({ _template: 'richText', body: text.trim() });
    }
  }

  // ── itemsList block helper ─────────────────────────────────
  function pushItemsList(heading, items, iconMap) {
    if (items && items.length > 0) {
      blocks.push({
        _template: 'itemsList',
        heading: heading || '',
        items: items.map((item, idx) => ({
          title: item.title || '',
          description: item.description || '',
          detail: item.detail || '',
          href: item.href || '',
          icon: iconMap ? (iconMap[idx] || '') : (item.icon || ''),
          emphasis: item.emphasis || false,
        })),
      });
    }
  }

  // ── stats block helper ─────────────────────────────────────
  function pushStats(heading, stats) {
    if (stats && stats.length > 0) {
      blocks.push({
        _template: 'stats',
        heading: heading || '',
        stats: stats.map(s => ({
          value: String(s.value || ''),
          label: s.label || '',
        })),
      });
    }
  }

  // ── cards block helper ─────────────────────────────────────
  function pushCards(heading, items) {
    if (items && items.length > 0 && items.some(i => i.href)) {
      blocks.push({
        _template: 'cards',
        heading: heading || '',
        cards: items.map(item => ({
          title: item.title || '',
          description: item.description || '',
          href: item.href || '',
          icon: item.icon || '',
        })),
      });
    }
  }

  // ── sectionsList block helper ─────────────────────────────
  function pushSections(heading, sections) {
    if (sections && sections.length > 0) {
      blocks.push({
        _template: 'sectionsList',
        heading: heading || '',
        sections: sections.map(s => ({
          title: (s.title || s.heading || ''),
          items: s.items || [],
          description: s.description || '',
          eyebrow: s.eyebrow || '',
        })),
      });
    }
  }

  // ── CTA block helper ───────────────────────────────────────
  function pushCTA(title, body, label, href) {
    if (label) {
      blocks.push({
        _template: 'cta',
        eyebrow: '',
        heading: title || '',
        body: body || '',
        label: label || '',
        href: href || '/contact',
      });
    }
  }

  // ── Alert block helper ─────────────────────────────────────
  function pushAlert(title, body, variant) {
    if (title || body) {
      blocks.push({
        _template: 'alert',
        title: title || '',
        body: body || '',
        variant: variant || 'info',
      });
    }
  }

  // ── Page-type-specific conversions ─────────────────────────

  switch (pageType) {
    // ── HOME ─────────────────────────────────────────────────
    case 'home': {
      const hero = data.hero || {};
      pushHero({
        eyebrow: hero.eyebrow || '',
        titleLine1: hero.title_line1 || '',
        titleLine2: hero.title_line2 || '',
        title: '',
        subtitle: '',
        description: hero.description || '',
        ctas: [
          ...(hero.cta_text ? [{ label: hero.cta_text, href: hero.cta_link || '', isPrimary: true }] : []),
          ...(hero.secondary_text ? [{ label: hero.secondary_text, href: hero.secondary_link || '', isPrimary: false }] : []),
        ],
      });

      // QuickAccess
      const qa = data.quickAccess || {};
      if (qa.items && qa.items.length > 0) {
        blocks.push({
          _template: 'quickAccess',
          heading: qa.title || 'Accesos Rápidos',
          items: qa.items.map(item => ({
            title: item.title || '',
            subtitle: item.subtitle || '',
            subtitleDesktop: item.subtitle_desktop || '',
            href: item.href || '',
            ariaLabel: item.aria_label || '',
          })),
        });
      }
      // NewsSection
      const news = data.news || {};
      if (news.title || news.tag) {
        blocks.push({
          _template: 'newsSection',
          tag: news.tag || '',
          category: news.category || '',
          title: news.title || '',
          description: news.description || '',
          image: news.image || '',
          imageAlt: news.image_alt || '',
          linkText: news.link_text || '',
          linkHref: news.link_href || '',
          secondary: (news.secondary || []).map(s => ({
            category: s.category || '',
            title: s.title || '',
            date: s.date || '',
            href: s.href || '',
          })),
        });
      }
      // VideoSection
      const video = data.video || {};
      if (video.video_id) {
        blocks.push({
          _template: 'videoSection',
          eyebrow: video.eyebrow || '',
          title: video.title || '',
          badge: video.badge || '',
          videoId: video.video_id || '',
          duration: video.duration || '',
          description: video.description || '',
        });
      }
      break;
    }

    // ── program-history ─────────────────────────────────────
    case 'body-items-stats':
      pushHero();
      pushRichText(data.body);
      pushItemsList('Línea de Tiempo', data.items);
      pushStats('Impacto', data.stats);
      break;

    // ── program-mission ──────────────────────────────────────
    case 'headings-items':
      pushHero();
      pushSections('', data.headings);
      pushItemsList('Valores Institucionales', data.items);
      break;

    // ── program-graduate-profile ─────────────────────────────
    case 'body-items-headings':
      pushHero();
      pushRichText(data.body);
      pushItemsList('Competencias', data.items);
      pushSections('Áreas de Desempeño', data.headings);
      break;

    // ── Generic content page (e.g., admission-process, program-index) ─
    case 'content': {
      pushHero();
      if (data.body && typeof data.body === 'string' && data.body.length >= 200) {
        pushRichText(data.body);
      }
      if (data.items && data.items.length > 0) {
        const hasHref = data.items.some(i => i.href);
        if (hasHref) {
          pushCards('', data.items);
        } else {
          pushItemsList('', data.items);
        }
      }
      break;
    }

    // ── admission-requirements ──────────────────────────────
    case 'content-headings':
      pushHero();
      pushItemsList('Documentos Requeridos', data.items);
      pushSections('', data.headings);
      break;

    // ── academics-curriculum ─────────────────────────────────
    case 'headings':
      pushHero();
      if (data.pdfUrl) {
        blocks.push({
          _template: 'files',
          heading: 'Pénsum',
          files: [{ label: 'Descargar Pénsum PDF', url: data.pdfUrl }],
        });
      }
      pushSections('Estructura del Plan de Estudios', data.headings);
      break;

    // ── academics-course-content ─────────────────────────────
    case 'body':
      pushHero();
      pushRichText(data.body || bodyText || '');
      break;

    // ── Index pages with cards ───────────────────────────────
    case 'index': // student-life-index, portfolio-index
      pushHero();
      pushCards('', data.items);
      break;

    case 'index-stats': // academics-index, alumni-index
      pushHero();
      pushCards('', data.items);
      pushStats('', data.stats);
      break;

    // ── student-life-groups ──────────────────────────────────
    case 'groups':
      pushHero();
      blocks.push({
        _template: 'groupsWorkshops',
        groups: (data.groups || []).map(g => ({
          title: g.title || '',
          description: g.description || '',
          detail: g.detail || '',
          icon: g.icon || '',
        })),
        workshops: (data.workshops || []).map(w => ({
          title: w.title || '',
          description: w.description || '',
          detail: w.detail || '',
          icon: w.icon || '',
        })),
        cta: data.cta ? {
          title: data.cta.title || '',
          body: data.cta.body || '',
          label: data.cta.label || '',
        } : undefined,
      });
      break;

    // ── academics-internships ────────────────────────────────
    case 'internships':
      pushHero();
      blocks.push({
        _template: 'modalitiesList',
        heading: 'Pasantías',
        requirements: data.requirements || [],
        modalities: (data.modalities || []).map(m => ({
          title: m.title || '',
          description: m.description || '',
          icon: m.icon || '',
        })),
        formUrl: data.formUrl || '',
        contact: data.contact ? {
          name: data.contact.name || '',
          role: data.contact.role || '',
          email: data.contact.email || '',
          phone: data.contact.phone || '',
          office: data.contact.office || '',
        } : undefined,
      });
      break;

    // ── academics-research ────────────────────────────────────
    case 'research': {
      pushHero();
      const rItems = data.items || [];
      const rHeadings = data.headings || [];
      // Research pages may use either items (as lines) or headings
      const lines = rItems.length > 0 ? rItems : (rHeadings.length > 0 ? rHeadings : []);
      blocks.push({
        _template: 'researchLines',
        lines: lines.map(item => ({
          title: item.title || '',
          description: item.description || '',
        })),
        thesis: data.thesis ? {
          title: data.thesis.title || '',
          text: data.thesis.text || '',
          note: data.thesis.note || '',
        } : undefined,
        contact: data.contact ? {
          name: data.contact.name || '',
          role: data.contact.role || '',
          email: data.contact.email || '',
          phone: data.contact.phone || '',
          office: data.contact.office || '',
        } : undefined,
      });
      break;
    }

    // ── student-life-association ──────────────────────────────
    case 'association':
      pushHero();
      blocks.push({
        _template: 'associationInfo',
        activities: data.activities || [],
        participationText: data.participationText || '',
      });
      if (data.alert) {
        pushAlert(data.alert.title, data.alert.body, 'info');
      }
      break;

    // ── student-life-community ───────────────────────────────
    case 'community':
      pushHero();
      pushRichText(data.body);
      blocks.push({
        _template: 'communityService',
        descriptionItems: data.descriptionItems || [],
        requirements: data.requirements || [],
      });
      if (data.cta) {
        pushCTA(data.cta.title, data.cta.body, data.cta.label, '/contact');
      }
      if (data.alert) {
        pushAlert(data.alert.title, data.alert.body, 'info');
      }
      break;

    // ── student-life-events-listing ─────────────────────────
    case 'events-listing':
      pushHero({ subtitle: data.subtitle || '' });
      pushRichText(data.body);
      if (data.cta) {
        pushCTA(data.cta.title, data.cta.body, data.cta.label, '/contact');
      }
      if (data.emptyState) {
        pushAlert(
          data.emptyState.title || 'No hay eventos',
          data.emptyState.body || '',
          'info'
        );
      }
      break;

    // ── contact ──────────────────────────────────────────────
    case 'minimal':
      pushHero({ subtitle: data.subtitle || '' });
      if (data.items && data.items.length > 0) {
        blocks.push({
          _template: 'contactInfo',
          heading: '',
          contacts: data.items.map(item => ({
            title: item.title || '',
            value: item.description || '',
            detail: item.detail || '',
            icon: item.icon || '',
            href: item.href || '',
          })),
        });
      }
      break;

    // ── Fallback ─────────────────────────────────────────────
    default:
      pushHero();
      if (data.body) pushRichText(data.body);
      if (data.items && data.items.length > 0) pushItemsList('', data.items);
      if (data.stats && data.stats.length > 0) pushStats('', data.stats);
      if (data.headings && data.headings.length > 0) pushSections('', data.headings);
      break;
  }

  // ── Capture bodyText (content after frontmatter) ─────────
  if (bodyText && bodyText.trim().length > 20) {
    // Check if body content was already captured via data.body richText
    const bodyTrim = bodyText.trim();
    const alreadyCaptured = blocks.some(b =>
      b._template === 'richText' && b.body && b.body.includes(bodyTrim.slice(0, 40))
    );
    if (!alreadyCaptured) {
      pushRichText(bodyTrim);
    }
  }

  // Remove empty blocks
  const cleanBlocks = blocks.filter(b => {
    if (b._template === 'heroBanner') return true;
    if (b._template === 'richText') return b.body && b.body.trim().length > 0;
    if (b._template === 'stats') return b.stats && b.stats.length > 0;
    if (b._template === 'cta') return b.label;
    if (b._template === 'alert') return b.title || b.body;
    return true;
  });

  return {
    title: title || data.pageId || filename,
    description: data.subtitle || '',
    blocks: cleanBlocks,
  };
}

// ─── Display helpers ──────────────────────────────────────────────────────

function blockSummary(block) {
  switch (block._template) {
    case 'heroBanner':
      if (block.titleLine1) return `"${block.titleLine1} ${block.titleLine2}"`;
      if (block.title) return `"${block.title}"`;
      return '(hero)';
    case 'richText': return (block.body?.length || 0) > 0 ? `${block.body.length} chars` : 'empty';
    case 'itemsList': return `${block.items?.length || 0} items` + (block.heading ? ` — "${block.heading}"` : '');
    case 'cards': return `${block.cards?.length || 0} cards` + (block.heading ? ` — "${block.heading}"` : '');
    case 'stats': return `${block.stats?.length || 0} stats` + (block.heading ? ` — "${block.heading}"` : '');
    case 'cta': return block.heading || block.label || '';
    case 'alert': return block.title || block.variant || '';
    case 'sectionsList': return `${block.sections?.length || 0} sections`;
    case 'contactInfo': return `${block.contacts?.length || 0} contacts`;
    case 'videoSection': return block.title || block.videoId || '';
    case 'quickAccess': return `${block.items?.length || 0} items`;
    case 'newsSection': return block.title || '';
    case 'files': return `${block.files?.length || 0} files`;
    case 'groupsWorkshops': return `${block.groups?.length || 0} groups, ${block.workshops?.length || 0} workshops`;
    case 'modalitiesList': return `${block.modalities?.length || 0} modalities`;
    case 'researchLines': return `${block.lines?.length || 0} lines`;
    case 'associationInfo': return `${block.activities?.length || 0} activities`;
    case 'communityService': return `${block.descriptionItems?.length || 0} items, ${block.requirements?.length || 0} requirements`;
    default: return '';
  }
}

function formatDiff(filename, oldData, newData) {
  const lines = [];
  lines.push(`\n${'='.repeat(70)}`);
  lines.push(`📄 ${filename}.md`);
  lines.push(`   Route: ${pages2route[filename] || `/${filename}`}`);
  lines.push(`   Old pageType: ${oldData.pageType || '?'}`);
  lines.push(`${'='.repeat(70)}`);

  // Old summary
  const oldFields = [
    oldData.items?.length ? `${oldData.items.length} items` : '',
    oldData.headings?.length ? `${oldData.headings.length} headings` : '',
    oldData.stats?.length ? `${oldData.stats.length} stats` : '',
    oldData.body ? `${oldData.body.length} chars body` : '',
    oldData.subtitle ? 'subtitle' : '',
    oldData.hero ? 'hero' : '',
    oldData.groups?.length ? `${oldData.groups.length} groups` : '',
    oldData.workshops?.length ? `${oldData.workshops.length} workshops` : '',
    oldData.modalities?.length ? `${oldData.modalities.length} modalities` : '',
    oldData.activities?.length ? `${oldData.activities.length} activities` : '',
    oldData.descriptionItems?.length ? `${oldData.descriptionItems.length} descItems` : '',
    oldData.requirements?.length ? `${oldData.requirements.length} requirements` : '',
    oldData.quickAccess?.items?.length ? `${oldData.quickAccess.items.length} qaItems` : '',
    oldData.news ? 'news' : '',
    oldData.video ? 'video' : '',
    oldData.cta ? 'cta' : '',
    oldData.alert ? 'alert' : '',
    oldData.contact ? 'contact' : '',
    oldData.thesis ? 'thesis' : '',
    oldData.pdfUrl ? 'pdf' : '',
    oldData.formUrl ? 'form' : '',
  ].filter(Boolean).join(', ') || '(empty)';
  lines.push(`  BEFORE: ${oldFields}`);

  // New blocks
  lines.push(`  AFTER:  ${newData.blocks.length} blocks`);
  newData.blocks.forEach((b, i) => {
    const detail = blockSummary(b);
    lines.push(`    ${i + 1}. ${b._template}${detail ? ': ' + detail : ''}`);
  });

  // Show final frontmatter
  lines.push(`\n  ── Generated frontmatter ──`);
  const fm = toFrontmatter(newData);
  fm.split('\n').forEach(l => lines.push(`  ${l}`));

  return lines.join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────

let totalOld = 0, totalNew = 0;

console.log(`\n  🔍 Migration dry-run for ${PAGE_FILES.length} pages${isApply ? ' (--apply mode)' : ''}`);
console.log(`  ${'─'.repeat(50)}`);

for (const filename of PAGE_FILES) {
  const filePath = path.join(SRC, `${filename}.md`);
  if (!fs.existsSync(filePath)) {
    console.log(`\n⚠️  ${filename}.md not found — skipping`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const [data, bodyText] = parseFrontmatter(content);
  const newData = convertPage(filename, data, bodyText);

  totalOld++;
  totalNew += newData.blocks.length;

  console.log(formatDiff(filename, data, newData));

  if (isApply) {
    const dstPath = path.join(DST, `${filename}.md`);
    fs.mkdirSync(path.dirname(dstPath), { recursive: true });
    fs.writeFileSync(dstPath, toFrontmatter(newData), 'utf-8');
  }
}

console.log(`\n${'═'.repeat(70)}`);
console.log(`📊 SUMMARY: ${totalOld} files → ${totalNew} total blocks`);
if (isApply) {
  console.log(`✅ Written to src/content/pages2/`);
} else {
  console.log(`🔍 Dry-run mode — use --apply to write files`);
}
console.log(`${'═'.repeat(70)}\n`);
