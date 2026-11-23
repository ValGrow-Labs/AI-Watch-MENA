import { ARTICLES } from '@/data/articles';
import CategoryPageContent from '@/components/editorial/CategoryPageContent';

export const metadata = {
  title: 'Technology & Frontier AI Architecture',
  description: 'Deep technical analysis of foundational models, semiconductor design, data center cooling, and algorithmic breakthroughs.',
};

export default function TechnologyPage() {
  const articles = ARTICLES.filter((a) => a.category === 'Technology' || a.category === 'Research');
  return (
    <CategoryPageContent
      title="Technology & Architecture"
      subtitle="Engineering-first reporting on neural network architectures, custom accelerator silicon, high-density desert cooling, and algorithmic scaling."
      badge="Deep Tech"
      articles={articles}
    />
  );
}
