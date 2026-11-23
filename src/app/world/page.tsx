import { ARTICLES } from '@/data/articles';
import CategoryPageContent from '@/components/editorial/CategoryPageContent';

export const metadata = {
  title: 'Global AI News & International Governance',
  description: 'Global artificial intelligence developments across North America, Europe, China, India, and multilateral regulatory bodies.',
};

export default async function WorldPage({
  searchParams,
}: {
  searchParams?: Promise<{ country?: string; region?: string; category?: string }>;
}) {
  const resolved = searchParams ? await searchParams : {};
  const articles = ARTICLES.filter((a) => a.region !== 'MENA' || a.category === 'World');
  return (
    <CategoryPageContent
      title="Global AI Developments"
      subtitle="International technology journalism tracking foundational model laboratories, semiconductor supply chains, and cross-border regulatory diplomacy."
      badge="Global Bureau"
      articles={articles}
      initialFilter={resolved.country || resolved.region || resolved.category}
    />
  );
}
