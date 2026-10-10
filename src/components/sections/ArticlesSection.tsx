import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import SiteImage from '@/components/ui/SiteImage';

const articles = [
  {
    slot: 'preparation',
    title: 'Getting started',
    desc: 'Clarify your goals and prepare your basic profile.',
    slug: 'preparing-your-profile',
  },
  {
    slot: 'documents',
    title: 'Your document checklist',
    desc: 'Discuss documents, fees and application details with the team.',
    slug: 'document-checklist',
  },
];

export default function ArticlesSection() {
  return (
    <section className="section articles-section">
      <div className="container">
        <SectionHeading
          label="BEFORE YOU BEGIN"
          heading={
            <>
              Prepare for the <br />
              conversation ahead.
            </>
          }
        />
        <div className="articles-grid">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="article reveal"
            >
              <Link href={`/guides/${a.slug}/`}>
                <SiteImage slot={a.slot} />
              </Link>
              <div className="article-body">
                <span className="eyebrow">PRACTICAL NEXT STEPS</span>
                <h3>
                  <Link href={`/guides/${a.slug}/`}>{a.title}</Link>
                </h3>
                <p>{a.desc}</p>
                <Link className="text-link" href={`/guides/${a.slug}/`}>
                  Read the guide
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
