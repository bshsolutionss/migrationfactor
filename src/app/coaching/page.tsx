import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CoachingSection from '@/components/sections/CoachingSection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata = pageMetadata("/coaching", "IELTS & PTE Coaching", "Prepare for your English language test with Migration Factor IELTS and PTE coaching. Online classes, mock tests, tutor feedback and personalized preparation.");

export default function CoachingPage() {
  return (
    <>
      <JsonLd data={pageSchema("/coaching", "IELTS & PTE Coaching", "Prepare for your English language test with Migration Factor IELTS and PTE coaching. Online classes, mock tests, tutor feedback and personalized preparation.", 'WebPage')} />
      <Breadcrumb
        name="IELTS & PTE Coaching"
        desc="Online classes and personalized preparation for your English language test."
      />
      <CoachingSection />
      <CtaSection />
    </>
  );
}
