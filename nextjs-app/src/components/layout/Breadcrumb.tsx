import React from 'react';
import Link from 'next/link';
import WordReveal from '@/components/shared/WordReveal';

interface BreadcrumbProps {
  name: string;
  desc?: string;
}

export default function Breadcrumb({ name, desc }: BreadcrumbProps) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          {name}
        </p>
        <h1 className="split"><WordReveal>{name}</WordReveal></h1>
        {desc && <p>{desc}</p>}
      </div>
    </section>
  );
}
