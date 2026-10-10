import type { MetadataRoute } from 'next';
import { services, coaching, SITE_URL } from '@/lib/constants';
import { allTools as tools } from '@/features/immigration-tools/catalog';



export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/about/` },
    { url: `${SITE_URL}/services/` },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}/`,
    })),
    { url: `${SITE_URL}/countries/` },
    { url: `${SITE_URL}/coaching/` },
    ...coaching.map((c) => ({
      url: `${SITE_URL}/coaching/${c.slug}/`,
    })),
    { url: `${SITE_URL}/faq/` },
    { url: `${SITE_URL}/contact/` },
    { url: `${SITE_URL}/consultation` },
    { url: `${SITE_URL}/tools` },
    ...tools.map(tool => ({ url: `${SITE_URL}/tools/${tool.slug}` })),
    { url: `${SITE_URL}/guides/preparing-your-profile/` },
    { url: `${SITE_URL}/guides/document-checklist/` },
  ];

  return routes.map(item => ({ ...item, url: item.url === `${SITE_URL}/` ? item.url : item.url.replace(/\/$/, '') }));
}
