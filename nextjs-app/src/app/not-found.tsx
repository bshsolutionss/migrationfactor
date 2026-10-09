import React from 'react';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <>
      <Breadcrumb
        name="Page not found"
        desc="The page may have moved. Explore our services or return home."
      />
      <section className="section center">
        <Button text="Return home" href="/" />
      </section>
    </>
  );
}
