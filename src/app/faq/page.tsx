import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import Breadcrumb from '@/components/layout/Breadcrumb';
import FaqSection from '@/components/sections/FaqSection';

export const metadata = pageMetadata("/faq", "Frequently Asked Questions", "Find answers about Migration Factor services, the eligibility assessment process, preparing documents, coaching and contacting our team.");

export default function FaqPage() {
  return (
    <>
      <JsonLd data={pageSchema("/faq", "Frequently Asked Questions", "Find answers about Migration Factor services, the eligibility assessment process, preparing documents, coaching and contacting our team.", 'WebPage')} />
      <Breadcrumb name="Frequently asked questions" />
      <FaqSection />
    </>
  );
}
