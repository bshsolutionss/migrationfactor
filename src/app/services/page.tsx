import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ServiceGrid from '@/components/sections/ServiceGrid';
import ProcessSection from '@/components/sections/ProcessSection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata = pageMetadata("/services", "Visa & Immigration Services", "Explore Migration Factor student, visitor, partner, parent, skilled, employer-sponsored, citizenship, business, protection and review services.");

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={pageSchema("/services", "Visa & Immigration Services", "Explore Migration Factor student, visitor, partner, parent, skilled, employer-sponsored, citizenship, business, protection and review services.", 'WebPage')} />
      <Breadcrumb
        name="Visa & immigration services"
        desc="Support for studying, working, living and bringing family together."
      />
      <section className="section">
        <div className="container">
          <ServiceGrid />
        </div>
      </section>
      <ProcessSection />
      <CtaSection />
    </>
  );
}
