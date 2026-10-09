import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import CountrySection from '@/components/sections/CountrySection';
import CtaSection from '@/components/sections/CtaSection';

export const metadata: Metadata = {
  title: 'Countries & Destinations',
  description:
    'Explore destinations mentioned by Migration Factor: Australia, United Kingdom, Canada, United States, New Zealand and Europe.',
};

export default function CountriesPage() {
  return (
    <>
      <Breadcrumb
        name="Countries & destinations"
        desc="Discuss where you want your journey to take you."
      />
      <CountrySection />
      <CtaSection />
    </>
  );
}
