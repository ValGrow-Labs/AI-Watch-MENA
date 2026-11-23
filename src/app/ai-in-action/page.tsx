import { ARTICLES } from '@/data/articles';
import CategoryPageContent from '@/components/editorial/CategoryPageContent';

export const metadata = {
  title: 'AI in Action: Sports, Healthcare & Society',
  description: 'Real-world deployments of artificial intelligence across football, oncology, education, precision agriculture, and smart city infrastructure.',
};

export default function AiInActionPage() {
  const articles = ARTICLES.filter((a) => a.category === 'AI in Action');
  return (
    <CategoryPageContent
      title="AI in Action: Sports & Society"
      subtitle="How computer vision, neural diagnostics, and automated sensors are transforming football pitches, hospital clinics, and desert farmlands."
      badge="Applied AI"
      articles={articles}
    />
  );
}
