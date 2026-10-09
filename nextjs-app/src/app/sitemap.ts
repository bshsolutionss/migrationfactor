import type { MetadataRoute } from 'next';
import { services, coaching, SITE_URL } from '@/lib/constants';

const buildDate = new Date('2026-10-09');

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: buildDate },
    { url: `${SITE_URL}/about/`, lastModified: buildDate },
    { url: `${SITE_URL}/services/`, lastModified: buildDate },
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}/`,
      lastModified: buildDate,
    })),
    { url: `${SITE_URL}/countries/`, lastModified: buildDate },
    ...coaching.map((c) => ({
      url: `${SITE_URL}/coaching/${c.slug}/`,
      lastModified: buildDate,
    })),
    { url: `${SITE_URL}/faq/`, lastModified: buildDate },
    { url: `${SITE_URL}/contact/`, lastModified: buildDate },
    { url: `${SITE_URL}/guides/preparing-your-profile/`, lastModified: buildDate },
    { url: `${SITE_URL}/guides/document-checklist/`, lastModified: buildDate },
  ];

  return routes;
}
