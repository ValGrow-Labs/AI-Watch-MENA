import { ARTICLES } from '@/data/articles';
import CategoryPageContent from '@/components/editorial/CategoryPageContent';

export const metadata = {
  title: 'Opinion & Longform Analysis',
  description: 'Essays, investigative longform, and expert perspectives on the cultural, ethical, and geopolitical implications of artificial intelligence.',
};

export default function OpinionPage() {
  const articles = ARTICLES.filter((a) => a.category === 'Opinion & Analysis' || a.editorPick);
  return (
    <CategoryPageContent
      title="Opinion & Longform Analysis"
      subtitle="Critical essays, philosophical inquiries, and investigative dispatches probing sovereign data governance, cultural alignment, and technology ethics."
      badge="Ideas & Commentary"
      articles={articles}
    />
  );
}
