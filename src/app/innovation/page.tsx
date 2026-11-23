import { ARTICLES } from '@/data/articles';
import CategoryPageContent from '@/components/editorial/CategoryPageContent';

export const metadata = {
  title: 'Innovation & Robotics',
  description: 'Autonomous systems, humanoid robotics, scientific breakthroughs, and frontier hardware deployments.',
};

export default function InnovationPage() {
  const articles = ARTICLES.filter((a) => a.category === 'Innovation' || a.tags.includes('Robotics'));
  return (
    <CategoryPageContent
      title="Innovation & Autonomous Systems"
      subtitle="Coverage of humanoid robotics, bipedal locomotion, extreme-environment actuators, and scientific frontiers."
      badge="Frontier Hardware"
      articles={articles}
    />
  );
}
