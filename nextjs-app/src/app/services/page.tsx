import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ServiceGrid from '@/components/sections/ServiceGrid';
import ProcessSection from '@/components/sections/ProcessSection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Visa & Immigration Services',
  description:
    'Explore Migration Factor student, visitor, partner, parent, skilled, employer-sponsored, citizenship, business, protection and review services.',
};

export default function ServicesPage() {
  return (
    <>
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
