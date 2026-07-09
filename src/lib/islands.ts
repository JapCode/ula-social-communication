import type { IslandRegistry } from '@tinacms/astro/experimental';
import { requestWithMetadata } from '@tinacms/astro/data';
import { client } from '../../tina/__generated__/client';
import IslandHome from '../components/islands/IslandHome.astro';
import IslandArticle from '../components/islands/IslandArticle.astro';
import IslandEvent from '../components/islands/IslandEvent.astro';

export const islands: IslandRegistry = {
  // ── Home page ─────────────────────────────────────────────
  pageHome: {
    fetch: async () => {
      const enriched = await requestWithMetadata(
        client.queries.pageHome({ relativePath: 'home.md' }),
        { priority: 'primary' }
      );
      return enriched.data.pageHome;
    },
    component: IslandHome,
    wrapper: { tag: 'main' },
    propsFromData: (data) => ({ data }),
  },

  // ── Article detail ────────────────────────────────────────
  articleDetail: {
    fetch: async (_req, params) => {
      const slug = params.get('slug');
      if (!slug) throw new Error('Missing slug param');
      const enriched = await requestWithMetadata(
        client.queries.articles({ relativePath: `${slug}.md` })
      );
      return enriched.data.articles;
    },
    component: IslandArticle,
    wrapper: { tag: 'article' },
    propsFromData: (data) => ({ data }),
  },

  // ── Event detail ──────────────────────────────────────────
  eventDetail: {
    fetch: async (_req, params) => {
      const slug = params.get('slug');
      if (!slug) throw new Error('Missing slug param');
      const enriched = await requestWithMetadata(
        client.queries.events({ relativePath: `${slug}.md` })
      );
      return enriched.data.events;
    },
    component: IslandEvent,
    wrapper: { tag: 'article' },
    propsFromData: (data) => ({ data }),
  },
};