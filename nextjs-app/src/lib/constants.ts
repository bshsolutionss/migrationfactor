// Single business-content source: supplied Migration Factor report, PDF pages 3-5.
// These are summaries of the report, not independently verified migration advice.

export const company = {
  name: 'Migration Factor',
  tagline: 'Your Future Starts with the Right Destination.',
  email: 'info@migrationfactor.com',
  phone: '+61 426 122 786',
  tel: '+61426122786',
  overview:
    'Migration Factor is a migration and visa consultancy based in Perth, Western Australia. We support students, professionals and families with overseas education, employment, permanent residence and family-reunification pathways.',
  mission:
    'To help people achieve their dreams of studying, working and living in Australia through expert migration guidance and ethical consulting.',
  vision:
    'To become a trusted name in migration consultancy, helping clients build new beginnings beyond borders.',
  offices: ['Mirrabooka, Perth, WA 6064', 'Cranbourne, Melbourne, VIC 3951'],
  hours: 'Monday–Friday',
};

export const navigation: [string, string][] = [
  ['Home', '/'],
  ['About', '/about/'],
  ['Services', '/services/'],
  ['Countries', '/countries/'],
  ['FAQ', '/faq/'],
  ['Contact', '/contact/'],
];

export interface Service {
  slug: string;
  name: string;
  icon: string;
  group: string;
  description: string;
}

export const services: Service[] = [
  {
    slug: 'student-visa',
    name: 'Student Visa',
    icon: 'study',
    group: 'Education & travel',
    description:
      'Support for education in Australia and selected European destinations, including university selection, GTE/SOP, financial documents and visa preparation.',
  },
  {
    slug: 'visitor-visa',
    name: 'Visitor Visa',
    icon: 'globe',
    group: 'Education & travel',
    description: 'Guidance for visiting Australia, family visits and travel planning.',
  },
  {
    slug: 'australian-citizenship',
    name: 'Australian Citizenship',
    icon: 'document',
    group: 'Education & travel',
    description: 'Guidance through the Australian citizenship application journey.',
  },
  {
    slug: 'partner-visa',
    name: 'Partner Visa',
    icon: 'people',
    group: 'Family & relationships',
    description:
      'Support for partner and prospective marriage pathways, including relationship evidence, statements and sponsor documentation.',
  },
  {
    slug: 'parent-visa',
    name: 'Parent Visa',
    icon: 'people',
    group: 'Family & relationships',
    description:
      'Guidance for aged parent, contributory parent and sponsored parent pathways.',
  },
  {
    slug: 'employer-sponsored-visa',
    name: 'Employer Sponsored Visa',
    icon: 'case',
    group: 'Work & business',
    description:
      'Support for employer-sponsored pathways, including employer sponsorship, nomination and documentation.',
  },
  {
    slug: 'skilled-visa',
    name: 'GSM & Skilled Visa',
    icon: 'case',
    group: 'Work & business',
    description:
      'Support with expressions of interest, points strategy and skills assessments for skilled migration pathways.',
  },
  {
    slug: 'business-migration',
    name: 'Business Migration',
    icon: 'case',
    group: 'Work & business',
    description:
      'The company report describes business innovation, investment and entrepreneur pathways. Ask the team to confirm current availability.',
  },
  {
    slug: 'humanitarian-protection',
    name: 'Humanitarian & Protection',
    icon: 'shield',
    group: 'Protection & reviews',
    description:
      'Support for protection, refugee, special humanitarian and emergency humanitarian cases.',
  },
  {
    slug: 'appeals-reviews',
    name: 'Appeals & Reviews',
    icon: 'document',
    group: 'Protection & reviews',
    description:
      'Support after a refusal or cancellation, including decision-letter review, evidence and written submissions. Check your deadline immediately.',
  },
];

export const steps: [string, string][] = [
  ['Eligibility Check', 'The team reviews your goals, background and visa preferences.'],
  ['Pathway Planning', 'A potential visa strategy is developed around your skills, experience and future ambitions.'],
  ['Document Support', 'Get assistance organizing documents and meeting immigration standards.'],
  ['Smart Submission', 'Your application is reviewed before submission to reduce common errors and improve presentation.'],
];

export interface Country {
  name: string;
  code: string;
  text: string;
  detail: string;
  href: string;
}

export const countries: Country[] = [
  {
    name: 'Australia',
    code: 'AU',
    text: 'Explore education, employment, permanent residence and family-reunification pathways with Migration Factor.',
    detail: 'View our services',
    href: '/services/',
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    text: 'The company report mentions opportunities related to United Kingdom. Contact the team to confirm the support available for your circumstances.',
    detail: 'Discuss your destination',
    href: '/contact/',
  },
  {
    name: 'Canada',
    code: 'CA',
    text: 'The company report mentions opportunities related to Canada. Contact the team to confirm the support available for your circumstances.',
    detail: 'Discuss your destination',
    href: '/contact/',
  },
  {
    name: 'United States',
    code: 'US',
    text: 'The company report mentions opportunities related to United States. Contact the team to confirm the support available for your circumstances.',
    detail: 'Discuss your destination',
    href: '/contact/',
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    text: 'The company report mentions opportunities related to New Zealand. Contact the team to confirm the support available for your circumstances.',
    detail: 'Discuss your destination',
    href: '/contact/',
  },
  {
    name: 'Europe',
    code: 'EU',
    text: 'The report mentions student support for selected European destinations. Contact the team to discuss the destination you have in mind.',
    detail: 'Discuss your destination',
    href: '/contact/',
  },
];

export interface CoachingProgram {
  slug: string;
  name: string;
  icon: string;
  text: string;
  items: string[];
}

export const coaching: CoachingProgram[] = [
  {
    slug: 'ielts',
    name: 'IELTS Coaching',
    icon: 'study',
    text: 'Listening, Reading, Writing and Speaking, with mock tests, personalized strategies and tutor feedback.',
    items: [
      'Listening and Reading',
      'Writing and Speaking',
      'Mock tests and tutor feedback',
      'Online classes and resource material',
    ],
  },
  {
    slug: 'pte',
    name: 'PTE Coaching',
    icon: 'screen',
    text: 'Computer-based exam patterns, smart techniques, time management and practice materials.',
    items: [
      'Computer-based exam patterns',
      'Smart techniques and time management',
      'Practice materials',
      'Online classes and tutor-led sessions',
    ],
  },
];

export const faqs: [string, string][] = [
  [
    'How does the process start?',
    'Start with an eligibility check. The team reviews your goals, background and visa preferences before developing a potential pathway.',
  ],
  [
    'What information should I prepare?',
    'Prepare your basic profile: passport, age, education, work history, English result, family details and current visa status. Request a document checklist from the team.',
  ],
  [
    'Can you help with studying overseas?',
    'The report describes student visa support for Australia and selected European destinations, including university selection, GTE/SOP, financial documents and visa preparation.',
  ],
  [
    'Do you provide IELTS and PTE coaching?',
    'Yes. Both programs mention online classes, tutor-led sessions and resource material. IELTS includes mock tests and tutor feedback; PTE focuses on computer-based exam patterns and time management.',
  ],
  [
    'How can I find out about fees and timelines?',
    'Request an eligibility assessment and ask for the pathway, estimated timeline, professional fee and government charges in writing and separately.',
  ],
  [
    'What should I do after a refusal or cancellation?',
    'Check the deadline immediately and contact a registered professional without delay. The report describes support with decision-letter review, evidence and written submissions.',
  ],
  [
    'Where are your offices?',
    'The report lists Mirrabooka, Perth, WA 6064 and Cranbourne, Melbourne, VIC 3951. Contact the team before visiting.',
  ],
  [
    'How can I contact Migration Factor?',
    'Call +61 426 122 786 or email info@migrationfactor.com. Office days are Monday–Friday.',
  ],
];

// Image manifest: maps slot names to /media/ paths with metadata
export interface ImageMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const images: Record<string, ImageMeta> = {
  hero: { src: '/media/hero.webp', alt: 'Family with luggage at an airport', width: 1900, height: 950 },
  about: { src: '/media/about.webp', alt: 'Reference photograph of a visa consultant', width: 800, height: 800 },
  enquiry: { src: '/media/enquiry.webp', alt: 'Traveller holding a passport and travel documents', width: 600, height: 872 },
  cta: { src: '/media/cta.webp', alt: 'Traveller with luggage and a passport', width: 700, height: 729 },
  preparation: { src: '/media/preparation.webp', alt: 'People discussing travel documents', width: 633, height: 402 },
  documents: { src: '/media/documents.webp', alt: 'A consultation about travel documents', width: 633, height: 402 },
  featureStudy: { src: '/media/featureStudy.webp', alt: '', width: 128, height: 128 },
  featureAppointment: { src: '/media/featureAppointment.webp', alt: '', width: 128, height: 128 },
  featureResources: { src: '/media/featureResources.webp', alt: '', width: 128, height: 128 },
  processOne: { src: '/media/processOne.webp', alt: '', width: 200, height: 200 },
  processTwo: { src: '/media/processTwo.webp', alt: '', width: 200, height: 200 },
  processThree: { src: '/media/processThree.webp', alt: '', width: 200, height: 200 },
  processTrack: { src: '/media/processTrack.webp', alt: '', width: 1900, height: 173 },
  flagAustralia: { src: '/media/flagAustralia.webp', alt: '', width: 240, height: 240 },
  flagUK: { src: '/media/flagUK.webp', alt: '', width: 160, height: 160 },
  flagCanada: { src: '/media/flagCanada.webp', alt: '', width: 240, height: 240 },
  coachingIELTS: { src: '/media/coachingIELTS.webp', alt: '', width: 120, height: 120 },
  coachingPTE: { src: '/media/coachingPTE.webp', alt: '', width: 120, height: 120 },
  enquiryBackground: { src: '/media/enquiryBackground.webp', alt: '', width: 1920, height: 1068 },
  countryPattern: { src: '/media/countryPattern.webp', alt: '', width: 1900, height: 171 },
};

export const SITE_URL = 'https://migrationfactor.com';
