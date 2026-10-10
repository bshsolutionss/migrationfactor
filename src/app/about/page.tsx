import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import Breadcrumb from '@/components/layout/Breadcrumb';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CtaSection from '@/components/sections/CtaSection';
import SectionHeading from '@/components/ui/SectionHeading';
import { company } from '@/lib/constants';

export const metadata = pageMetadata("/about", "About Migration Factor", "Learn about Migration Factor, a Perth-based migration and visa consultancy supporting students, professionals and families.");

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageSchema("/about", "About Migration Factor", "Learn about Migration Factor, a Perth-based migration and visa consultancy supporting students, professionals and families.", 'WebPage')} />
      <Breadcrumb
        name="About Migration Factor"
        desc="Personalized, professional and transparent visa support."
      />
      <AboutSection />
      <section className="section soft">
        <div className="container values-grid">
          <article>
            <SectionHeading
              label="OUR MISSION"
              heading="Guidance with purpose."
              center={false}
            />
            <p>{company.mission}</p>
          </article>
          <article>
            <SectionHeading
              label="OUR VISION"
              heading={
                <>
                  New beginnings <br />
                  beyond borders.
                </>
              }
              center={false}
            />
            <p>{company.vision}</p>
          </article>
        </div>
        <div className="container origin-note">
          Supporting clients from Pakistan, India, Bangladesh, Sri Lanka and Nepal.
        </div>
      </section>
      <ProcessSection />
      <CtaSection />
    </>
  );
}
