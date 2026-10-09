import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { services } from '@/lib/constants';

export default function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s, i) => (
        <article
          key={s.slug}
          className="service-card reveal"
          style={{ '--delay': `${(i % 3) * 100}ms` } as React.CSSProperties}
        >
          <Icon type={s.icon as any} />
          <span className="eyebrow">{s.group}</span>
          <h2>
            <Link href={`/services/${s.slug}/`}>{s.name}</Link>
          </h2>
          <p>{s.description}</p>
          <Link className="text-link" href={`/services/${s.slug}/`}>
            Explore this service
          </Link>
        </article>
      ))}
    </div>
  );
}
