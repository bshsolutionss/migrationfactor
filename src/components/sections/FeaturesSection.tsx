import React from 'react';
import Link from 'next/link';
import BrandIcon from '@/components/ui/BrandIcon';
import { services } from '@/lib/constants';

const featureData = [
  {
    service: services[0], // student-visa
    icon: 'featureStudy',
    title: 'Study overseas',
    desc: 'University selection, financial documents and visa preparation for your education journey.',
  },
  {
    service: services[6], // skilled-visa
    icon: 'featureAppointment',
    title: 'Work & skilled migration',
    desc: 'Support with expressions of interest, points strategy and skills assessments.',
  },
  {
    service: services[3], // partner-visa
    icon: 'featureResources',
    title: 'Bring family together',
    desc: 'Guidance for partner and parent pathways, with relationship and sponsor documentation.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="features container reveal" aria-label="Explore pathways" style={{ '--delay': '200ms' } as React.CSSProperties}>
      {featureData.map((f, i) => (
        <Link
          key={f.service.slug}
          href={`/services/${f.service.slug}/`}
          className={`feature${i === 0 ? ' active' : ''}`}
        >
          <BrandIcon slot={f.icon} />
          <h2>{f.title}</h2>
          <p>{f.desc}</p>
          <div className="feature-number">
            <span>0{i + 1}</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
