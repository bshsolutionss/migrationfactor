import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import WordReveal from '@/components/shared/WordReveal';

export default function HeroSection() {
  return (
    <section className="hero">
      <Image
        className="hero-image"
        src="/media/hero.webp"
        alt="Family with luggage at an airport"
        width={1900}
        height={950}
        sizes="100vw"
        fetchPriority="high"
        priority
        loading="eager"
        style={{ objectPosition: 'center' }}
      />
      <div className="hero-shade" />
      <div className="hero-diagonal" aria-hidden="true" />
      <div className="container hero-content">
        <Image className="hero-flights" src="/media/heroFlights.webp" width={800} height={180} sizes="(max-width: 767px) 90vw, 800px" alt="" aria-hidden="true" loading="eager" />
        <h1 className="split">
          <WordReveal>
          Your Future Starts with <br />
          the Right Destination.
          </WordReveal>
        </h1>
        <p className="reveal" style={{ '--delay': '100ms' } as React.CSSProperties}>
          Personalized guidance for studying, working and living in Australia.
          <br className="desktop" /> Supporting students, professionals and families.
        </p>
        <div className="reveal" style={{ '--delay': '300ms' } as React.CSSProperties}>
          <Button text="Start your 2-minute Visa Assessment" href="#visa-assessment" />
        </div>
      </div>
    </section>
  );
}
