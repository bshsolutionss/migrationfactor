import React from 'react';
import WordReveal from '@/components/shared/WordReveal';

interface SectionHeadingProps {
  label: string;
  heading: React.ReactNode;
  center?: boolean;
}

export default function SectionHeading({
  label,
  heading,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${center ? 'center' : ''}`}>
      <span className="eyebrow">{label}</span>
      <h2 className="split"><WordReveal>{heading}</WordReveal></h2>
    </div>
  );
}
