import { pageMetadata, pageSchema } from '@/lib/seo';
import JsonLd from '@/components/shared/JsonLd';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';

export const metadata = pageMetadata("/guides/document-checklist", "Your Document Checklist", "Plan your document checklist and review your application details with Migration Factor.");

export default function DocumentChecklistPage() {
  return (
    <>
      <JsonLd data={pageSchema("/guides/document-checklist", "Your Document Checklist", "Plan your document checklist and review your application details with Migration Factor.", 'Article')} />
      <Breadcrumb name="Your document checklist" desc="Practical next steps" />
      <section className="section">
        <article className="container narrow prose">
          <h2>Ask for a checklist</h2>
          <p>
            Obtain a document checklist and confirm validity, translations, certification and
            evidence requirements.
          </p>
          <h2>Review before lodgement</h2>
          <p>
            Read and verify all forms, statements, financial evidence and personal details before
            lodgement.
          </p>
          <h2>Confirm claims and deadlines</h2>
          <p>
            Cross-check success-rate, guaranteed-approval or fast-outcome claims against official
            rules and signed engagement terms. If you have received a refusal or cancellation, check
            the deadline immediately and contact a registered professional without delay.
          </p>
          <Button text="Discuss your documents" href="/contact/" />
        </article>
      </section>
    </>
  );
}
