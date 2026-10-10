import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CountrySection from '@/components/sections/CountrySection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata = pageMetadata("/countries", "Countries & Destinations", "Explore destinations mentioned by Migration Factor: Australia, United Kingdom, Canada, United States, New Zealand and Europe.");

export default function CountriesPage() {
  return (
    <>
      <JsonLd data={pageSchema("/countries", "Countries & Destinations", "Explore destinations mentioned by Migration Factor: Australia, United Kingdom, Canada, United States, New Zealand and Europe.", 'WebPage')} />
      <Breadcrumb
        name="Countries & destinations"
        desc="Discuss where you want your journey to take you."
      />
      <CountrySection />
      <CtaSection />
    </>
  );
}
