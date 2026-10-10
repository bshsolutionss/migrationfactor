import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import VisaAssessmentSection from '@/components/sections/VisaAssessmentSection';
import AboutSection from '@/components/sections/AboutSection';
import ProcessSection from '@/components/sections/ProcessSection';
import EnquirySection from '@/components/sections/EnquirySection';
import CountrySection from '@/components/sections/CountrySection';
import CoachingSection from '@/components/sections/CoachingSection';
import CtaSection from '@/components/sections/CtaSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import SupportSection from '@/components/sections/SupportSection';

export const metadata = pageMetadata("/", "Visa & Migration Consultancy | Migration Factor", "Migration Factor supports students, professionals and families with migration and visa guidance. Explore services, IELTS/PTE coaching and contact our team.");

export default function HomePage() {
  return (
    <>
      <JsonLd data={pageSchema("/", "Visa & Migration Consultancy", "Migration Factor supports students, professionals and families with migration and visa guidance. Explore services, IELTS/PTE coaching and contact our team.", 'WebPage')} />
      <HeroSection />
      <FeaturesSection />
      <VisaAssessmentSection />
      <AboutSection />
      <ProcessSection />
      <EnquirySection />
      <CountrySection />
      <CoachingSection />
      <SupportSection />
      <CtaSection />
      <ArticlesSection />
    </>
  );
}
