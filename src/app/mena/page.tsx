import { ARTICLES } from '@/data/articles';
import CategoryPageContent from '@/components/editorial/CategoryPageContent';

export const metadata = {
  title: 'MENA AI News & Sovereign Strategies',
  description: 'In-depth reporting on national AI initiatives, sovereign compute hubs, and emerging startups across the Middle East and North Africa.',
};

export default async function MenaPage({
  searchParams,
}: {
  searchParams?: Promise<{ country?: string; category?: string }>;
}) {
  const resolved = searchParams ? await searchParams : {};
  const articles = ARTICLES.filter((a) => a.region === 'MENA' || a.category === 'MENA');
  return (
    <CategoryPageContent
      title="MENA Artificial Intelligence"
      subtitle="Exclusive reporting on national data strategies, sovereign GPU clusters, and indigenous innovation from Riyadh to Casablanca."
      badge="Regional Bureau"
      articles={articles}
      initialFilter={resolved.country || resolved.category}
    />
  );
}
