import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FaqSection from '@/components/sections/FaqSection';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Find answers about Migration Factor services, the eligibility assessment process, preparing documents, coaching and contacting our team.',
};

export default function FaqPage() {
  return (
    <>
      <Breadcrumb name="Frequently asked questions" />
      <FaqSection />
    </>
  );
}
