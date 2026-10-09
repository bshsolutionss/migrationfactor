'use client';

import { useEffect, useRef } from 'react';
import { visaAssessment } from '../../../../src/components/sections/visaAssessment.mjs';
import { initVisaAssessment } from '../../../../src/lib/visa-assessment-client.mjs';

// Trusted, source-generated markup and behavior are shared with the Vercel static build.
const markup = visaAssessment();

export default function VisaAssessmentSection() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const form = root.current?.querySelector<HTMLFormElement>('[data-visa-assessment]');
    if (form) return initVisaAssessment(form);
  }, []);

  return <div ref={root} dangerouslySetInnerHTML={{ __html: markup }} />;
}
