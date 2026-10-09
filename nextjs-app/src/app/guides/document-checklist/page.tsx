import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Your Document Checklist',
  description:
    'Plan your document checklist and review your application details with Migration Factor.',
};

export default function DocumentChecklistPage() {
  return (
    <>
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
