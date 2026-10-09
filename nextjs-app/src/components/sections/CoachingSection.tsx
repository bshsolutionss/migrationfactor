import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import BrandIcon from '@/components/ui/BrandIcon';
import { coaching } from '@/lib/constants';

export default function CoachingSection() {
  return (
    <section className="section coaching-section">
      <div className="container">
        <SectionHeading
          label="IELTS & PTE COACHING"
          heading="Prepare for your English language test."
        />
        <div className="coaching-programs">
          {coaching.map((c) => (
            <Link
              key={c.slug}
              className="coaching-card reveal"
              href={`/coaching/${c.slug}/`}
            >
              <BrandIcon slot={c.slug === 'ielts' ? 'coachingIELTS' : 'coachingPTE'} />
              <h3>{c.name}</h3>
              <p>{c.text}</p>
              {c.slug === 'ielts' && <span className="coaching-arrow" aria-hidden="true">↗</span>}
            </Link>
          ))}
          <div className="coaching-banner reveal reveal-down">
            <Image src="/brand/mark.webp" alt="" width={200} height={200} />
            <h3>IELTS &amp; PTE Coaching</h3>
            <p>Online classes. Personalized preparation.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
