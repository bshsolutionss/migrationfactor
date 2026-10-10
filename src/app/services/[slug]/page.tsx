import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import ProcessSection from '@/components/sections/ProcessSection';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { services, company } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata(`/services/${slug}`, service.name, `${service.name} support from Migration Factor. ${service.description}`);
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd data={pageSchema(`/services/${slug}`, service.name, service.description, 'Service')} />
      <Breadcrumb name={service.name} desc={service.group} />
      <section className="section">
        <div className="container detail-layout">
          <article>
            <span className="service-icon">
              <Icon type={service.icon} />
            </span>
            <h2>{service.name} support</h2>
            <p className="lead">{service.description}</p>
            <h3>Start with your circumstances</h3>
            <p>
              Prepare your basic profile: passport, age, education, work history, English result,
              family details and current visa status. Request an eligibility assessment and a document
              checklist.
            </p>
            <h3>Understand your next steps</h3>
            <p>
              Ask for your potential pathway, estimated timeline, professional fee and government
              charges in writing and separately.
            </p>
            <p className="source-note">
              Service summary based on the company report. Current requirements and availability
              should be confirmed with an appropriately registered migration professional.
            </p>
            <Button
              text="Discuss this service"
              href={`/contact/?service=${encodeURIComponent(service.name)}`}
            />
          </article>
          <aside className="service-sidebar">
            <h3>Explore our services</h3>
            {services.map((x) => (
              <Link
                key={x.slug}
                href={`/services/${x.slug}/`}
                aria-current={x.slug === service.slug ? 'page' : undefined}
              >
                {x.name}
              </Link>
            ))}
            <a className="sidebar-phone" href={`tel:${company.tel}`}>
              <Icon type="phone" />
              {company.phone}
            </a>
          </aside>
        </div>
      </section>
      <ProcessSection />
    </>
  );
}
