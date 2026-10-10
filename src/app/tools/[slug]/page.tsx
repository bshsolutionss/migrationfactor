import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JsonLd from '@/components/shared/JsonLd';
import ImmigrationTool from '@/components/tools/ImmigrationTool';
import { allTools as tools } from '@/features/immigration-tools/catalog';
import OccupationSearch from '@/components/tools/OccupationSearch';
import { pageMetadata, pageSchema } from '@/lib/seo';
import '@/styles/features.css';
export const dynamicParams = false;
export function generateStaticParams() { return tools.map(tool => ({ slug: tool.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tool = tools.find(item => item.slug === slug);
  if (!tool) return {};
  return pageMetadata(`/tools/${slug}`, tool.name, tool.description);
}
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tool = tools.find(item => item.slug === slug);
  if (!tool) notFound();
  return <><JsonLd data={pageSchema(`/tools/${slug}`, tool.name, tool.description)} /><Breadcrumb name={tool.name} desc={tool.description} /><section className="section"><div className="container">{tool.slug === 'occupation-search' ? <OccupationSearch /> : <ImmigrationTool key={tool.slug} slug={tool.slug} />}</div></section></>;
}
