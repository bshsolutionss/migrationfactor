import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import WordReveal from '@/components/shared/WordReveal';
import { company } from '@/lib/constants';
import ServiceCount from '@/components/shared/ServiceCount';

export default function AboutSection() {
  return (
    <section className="section about-section">
      <Image className="about-landmarks" src="/media/aboutLandmarks.webp" width={800} height={803} alt="" aria-hidden="true" />
      <div className="container about-grid">
        <div>
          <div className="section-heading">
            <span className="eyebrow">ABOUT MIGRATION FACTOR</span>
            <h2 className="split">
              <WordReveal>
              Guidance for your <br />
              next chapter.
              </WordReveal>
            </h2>
          </div>
          <p className="reveal" style={{ '--delay': '100ms' } as React.CSSProperties}>{company.overview}</p>
          <div className="about-support">
            <ul className="checks">
              <li>Personalized visa support</li>
              <li>Professional and transparent guidance</li>
              <li>Support from planning to submission</li>
            </ul>
          </div>
          <Button text="More about Migration Factor" href="/about/" variant="outline" />
        </div>
        <div className="about-photo reveal" style={{ '--delay': '100ms' } as React.CSSProperties}>
          <Image
            src="/media/about.webp"
            alt="Reference photograph of a visa consultant"
            width={800}
            height={800}
            sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1199px) 45vw, 600px"
            loading="lazy"
            style={{ objectPosition: 'center' }}
          />
          <ServiceCount />
        </div>
      </div>
    </section>
  );
}
