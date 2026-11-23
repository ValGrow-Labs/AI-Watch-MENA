import { ARTICLES } from '@/data/articles';
import CategoryPageContent from '@/components/editorial/CategoryPageContent';

export const metadata = {
  title: 'AI & Business Transformation',
  description: 'Enterprise AI deployment, corporate strategy, venture capital deals, and workplace automation.',
};

export default function BusinessPage() {
  const articles = ARTICLES.filter((a) => a.category === 'Business');
  return (
    <CategoryPageContent
      title="AI & Business"
      subtitle="Financial journalism tracking corporate AI adoption, industrial automation, venture capital flows, and enterprise balance sheet impact."
      badge="Enterprise & Capital"
      articles={articles}
    />
  );
}
