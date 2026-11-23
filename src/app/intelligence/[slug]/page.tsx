import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Quote,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';

import { ARTICLES } from '@/data/articles';
import { formatDateShort } from '@/lib/utils';
import EditorialImage from '@/components/shared/EditorialImage';
import ArticleActions from '@/components/editorial/ArticleActions';

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found' };

  return {
    title: `${article.title} — AI Watch MENA`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter(
    (a) => a.id !== article.id && (a.category === article.category || a.country === article.country)
  ).slice(0, 3);

  return (
    <article className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors py-8 sm:py-12">
      <div className="content-container max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--text3)]">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href={`/${article.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[var(--accent)] transition-colors">
            {article.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--text)] font-semibold">{article.country}</span>
        </nav>

        {/* Editorial Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-wider">
              {article.country}
            </span>
            <span className="px-2.5 py-1 rounded bg-[var(--surface2)] border border-[var(--border)] text-[var(--text2)] text-[10px] font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-[var(--text3)]">
              {article.readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)] leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text2)] leading-relaxed font-serif">
            {article.excerpt}
          </p>

          {/* Byline & Sharing Metadata Bar */}
          <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-[var(--text)] block text-sm">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-[var(--text3)]">
                  {article.author.role} • Published {formatDateShort(article.publishedAt)}
                </span>
              </div>
            </div>

            <ArticleActions slug={article.slug} />
          </div>
        </header>

        {/* Hero Editorial Image with Caption */}
        <div className="space-y-2">
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[var(--surface2)] shadow-sm">
            <EditorialImage
              src={article.image}
              alt={article.imageAlt || article.title}
              priority
              fill
              className="object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="text-xs text-[var(--text3)] italic">
              {article.imageCaption}
            </p>
          )}
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              <BookOpen size={16} />
              <span>Key Intelligence Takeaways</span>
            </div>
            <ul className="space-y-2 text-sm text-[var(--text2)]">
              {article.keyTakeaways.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Journalistic Content Body */}
        <div className="space-y-6 text-base sm:text-lg text-[var(--text)] leading-relaxed font-sans">
          {article.bodyParagraphs && article.bodyParagraphs.length > 0 ? (
            article.bodyParagraphs.map((para, idx) => (
              <p key={idx} className={idx === 0 ? 'first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[var(--accent)]' : ''}>
                {para}
              </p>
            ))
          ) : (
            <>
              <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[var(--accent)]">
                {article.excerpt}
              </p>
              <p>
                The accelerating integration of computational intelligence across sovereign infrastructure is fundamentally restructuring economic trajectories. According to regional technology analysts, the momentum reflects both substantial capital allocation and deliberate regulatory clarity enacted by Gulf and North African leadership.
              </p>
              <p>
                As international enterprises evaluate expansion in the Middle East, access to low-latency compute clusters, sovereign Arabic-first linguistic models, and transparent regulatory frameworks are proving decisive differentiators.
              </p>
            </>
          )}

          {/* Pull Quote Callout */}
          {article.quotes && article.quotes.length > 0 && (
            <div className="my-8 p-6 sm:p-8 rounded-2xl bg-[var(--surface2)]/70 border-l-4 border-[var(--accent)] space-y-3">
              <Quote size={28} className="text-[var(--accent)] opacity-60" />
              <blockquote className="text-xl sm:text-2xl font-serif italic text-[var(--text)] leading-snug">
                &ldquo;{article.quotes[0].quote}&rdquo;
              </blockquote>
              <div className="text-xs text-[var(--text3)]">
                <span className="font-bold text-[var(--text)] block">{article.quotes[0].author}</span>
                {article.quotes[0].role && <span>{article.quotes[0].role}</span>}
              </div>
            </div>
          )}
        </div>

        {/* Journalistic Verification & Sources */}
        {article.sources && article.sources.length > 0 && (
          <div className="pt-6 border-t border-[var(--border)] text-xs text-[var(--text3)] space-y-2">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[var(--text)]">
              <ShieldCheck size={14} className="text-[var(--accent)]" />
              <span>Attribution & Verified Sources</span>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {article.sources.map((src, idx) => (
                <li key={idx}>{src}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[var(--text3)] font-medium mr-2">Topic Tags:</span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded bg-[var(--surface2)] text-[var(--text2)] font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Stories Section */}
        {relatedArticles.length > 0 && (
          <section className="pt-10 border-t border-[var(--border)] space-y-6">
            <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
              Related Reporting & Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article key={rel.id} className="space-y-2.5 group">
                  <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-[var(--surface2)]">
                    <EditorialImage src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[var(--accent)] uppercase">{rel.country}</span>
                    <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/intelligence/${rel.slug}`}>{rel.title}</Link>
                    </h4>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
}
