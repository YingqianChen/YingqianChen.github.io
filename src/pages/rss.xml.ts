import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return rss({
    title: 'Yingqian Chen',
    description: 'A personal blog — projects and ideas I find interesting.',
    site: context.site!,
    items: entries
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((entry) => ({
        title: entry.data.title,
        pubDate: entry.data.date,
        description: entry.data.summary,
        link: `/projects/${entry.slug}/`,
      })),
  });
}
