import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CoachingSection from '@/components/sections/CoachingSection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'IELTS & PTE Coaching',
  description:
    'Prepare for your English language test with Migration Factor IELTS and PTE coaching. Online classes, mock tests, tutor feedback and personalized preparation.',
};

export default function CoachingPage() {
  return (
    <>
      <Breadcrumb
        name="IELTS & PTE Coaching"
        desc="Online classes and personalized preparation for your English language test."
      />
      <CoachingSection />
      <CtaSection />
    </>
  );
}
