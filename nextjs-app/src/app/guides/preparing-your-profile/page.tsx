import type { Metadata } from 'next';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Preparing Your Profile',
  description:
    'Prepare your goals and basic profile before requesting a Migration Factor eligibility assessment.',
};

export default function PreparingYourProfilePage() {
  return (
    <>
      <Breadcrumb name="Preparing your profile" desc="Practical next steps" />
      <section className="section">
        <article className="container narrow prose">
          <h2>Start with your objective</h2>
          <p>
            Clarify whether your objective is study, work, partner, parent, visitor, business or
            protection.
          </p>
          <h2>Prepare your basic profile</h2>
          <ul>
            <li>Passport and age</li>
            <li>Education and work history</li>
            <li>English result</li>
            <li>Family details</li>
            <li>Current visa status</li>
          </ul>
          <h2>Request an eligibility assessment</h2>
          <p>
            Ask for the pathway, estimated timeline, professional fee and government charges in
            writing and separately.
          </p>
          <Button text="Request an eligibility assessment" href="/contact/" />
        </article>
      </section>
    </>
  );
}
