import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JsonLd from '@/components/shared/JsonLd';
import { allTools as tools } from '@/features/immigration-tools/catalog';
import { pageMetadata, pageSchema } from '@/lib/seo';
import '@/styles/features.css';
const title = 'Australian Migration Tools';
const description = 'Explore PR points, visa pathways, preliminary eligibility and employer/applicant cost estimates using official Australian migration references.';
export const metadata = pageMetadata('/tools', title, description);
export default function ToolsPage() {
  return <><JsonLd data={pageSchema('/tools', title, description)} /><Breadcrumb name={title} desc="Understand your options, one step at a time." /><section className="section"><div className="container"><p className="feature-note">Free tools to help you prepare. Calculations and checklists are preliminary guidance; they do not replace an individual assessment. Your answers stay in your browser page.</p><div className="tool-directory">{tools.map((tool, i) => <article key={tool.slug} className="tool-card"><span className="tool-number">0{i + 1} / MIGRATION TOOLS</span><h2>{tool.name}</h2><p>{tool.description}</p><Link className="tool-link" href={`/tools/${tool.slug}`}>Open {tool.name} →</Link></article>)}</div></div></section></>;
}
