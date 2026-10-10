import React from 'react';
import SiteImage from '@/components/ui/SiteImage';
import EnquiryForm from '@/components/sections/EnquiryForm';

export default function EnquirySection() {
  return (
    <section className="enquiry-section">
      <div className="container enquiry-grid">
        <div className="enquiry-photo">
          <SiteImage slot="enquiry" className="enquiry-cutout reveal" />
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}
