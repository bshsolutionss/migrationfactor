import type { Metadata } from 'next';
import '../../../src/styles/site.css';
import '@/styles/motion.css';
import '../../../src/styles/restoration.css';
import '../../../src/styles/assessment.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MotionEffect from '@/components/shared/MotionEffect';

export const metadata: Metadata = {
  title: {
    template: '%s | Migration Factor',
    default: 'Visa & Migration Consultancy | Migration Factor',
  },
  description:
    'Migration Factor supports students, professionals and families with migration and visa guidance. Explore services, IELTS/PTE coaching and contact our team.',
  metadataBase: new URL('https://migrationfactor.com'),
  icons: { icon: { url: '/brand/favicon.png', type: 'image/png', sizes: '64x64' } },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top">
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionEffect />
      </body>
    </html>
  );
}
