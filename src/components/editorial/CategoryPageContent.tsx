'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Filter, X, ChevronRight } from 'lucide-react';
import { formatDateShort } from '@/lib/utils';
import EditorialImage from '@/components/shared/EditorialImage';
import type { Article } from '@/types';

interface CategoryPageContentProps {
  title: string;
  subtitle: string;
  badge: string;
  articles: Article[];
  initialFilter?: string;
}

export default function CategoryPageContent({
  title,
  subtitle,
  badge,
  articles,
  initialFilter,
}: CategoryPageContentProps) {
  const [filter, setFilter] = useState<string>(initialFilter || 'All');

  useEffect(() => {
    if (initialFilter) {
      setFilter(initialFilter);
    }
  }, [initialFilter]);

  // Extract unique countries
  const countries = ['All', ...Array.from(new Set(articles.map((a) => a.country)))];

  const filtered = filter === 'All'
    ? articles
    : articles.filter((a) => {
        const f = filter.toLowerCase();
        return (
          a.country.toLowerCase() === f ||
          (a.region && a.region.toLowerCase() === f) ||
          a.category.toLowerCase() === f ||
          a.tags.some((t) => t.toLowerCase().includes(f))
        );
      });

  const featured = filtered[0] || articles[0];
  const list = filtered.length > 0 ? (filtered[0] === featured ? filtered.slice(1) : filtered) : [];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors py-8 sm:py-12">
      <div className="content-container space-y-10 sm:space-y-12">
        
        {/* Navigation Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-[var(--text3)]">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1 font-medium">
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text)] font-semibold">{title}</span>
          {filter !== 'All' && (
            <>
              <span>/</span>
              <span className="text-[var(--accent)] font-bold">{filter}</span>
            </>
          )}
        </nav>

        {/* Editorial Section Header */}
        <header className="border-b-2 border-[var(--text)] pb-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent)]">
              {badge}
            </span>
            {filter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold border border-[var(--accent)]/20">
                Filtered: {filter}
                <button
                  onClick={() => setFilter('All')}
                  className="hover:opacity-75 cursor-pointer ml-1 p-0.5"
                  title="Clear filter"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)] leading-tight">
            {filter !== 'All' ? `${title}: ${filter}` : title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text2)] max-w-3xl leading-relaxed">
            {subtitle}
          </p>

          {/* Quick Filter Bar */}
          {countries.length > 2 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 no-scrollbar text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text3)] mr-2 shrink-0">
                Region / Desk:
              </span>
              {countries.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                    filter.toLowerCase() === c.toLowerCase()
                      ? 'bg-[var(--accent)] text-white shadow-xs'
                      : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:text-[var(--text)] hover:border-[var(--border2)]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Featured Story — Editorial Broadsheet Presentation (Unboxed, Authentic Newspaper Flow) */}
        {featured && (
          <section aria-label="Lead Story" className="pb-8 border-b-2 border-[var(--border)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface2)]">
                <EditorialImage
                  src={featured.image}
                  alt={featured.title}
                  category={featured.category}
                  country={featured.country}
                  fill
                  priority
                  className="object-cover hover:scale-103 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                  {featured.country}
                </span>
              </div>

              <div className="lg:col-span-5 space-y-3.5">
                <div className="flex items-center gap-2 text-xs text-[var(--text3)]">
                  <span className="font-bold text-[var(--accent)] uppercase">{featured.category}</span>
                  <span>•</span>
                  <span>{formatDateShort(featured.publishedAt)}</span>
                  <span>•</span>
                  <span>{featured.readingTime} min read</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--text)] leading-tight hover:text-[var(--accent)] transition-colors">
                  <Link href={`/intelligence/${featured.slug}`}>{featured.title}</Link>
                </h2>

                <p className="text-base text-[var(--text2)] leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="pt-2 text-xs text-[var(--text3)] flex items-center justify-between border-t border-[var(--border)]">
                  <span className="font-medium text-[var(--text)]">Reporting by {featured.author.name}</span>
                  <Link
                    href={`/intelligence/${featured.slug}`}
                    className="font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                  >
                    Read full briefing <ChevronRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Continuous Ordered Vertical Reading River (No Card Boxes, Divided by Thin Hairlines) */}
        <section aria-label="Dispatches Stream" className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
            <h3 className="text-sm font-black uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              {filter !== 'All' ? `All Dispatches for ${filter} (${filtered.length})` : 'Continuous Dispatches & Reporting Archive'}
            </h3>
            {filter !== 'All' && (
              <button
                onClick={() => setFilter('All')}
                className="text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
              >
                Reset to All
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-[var(--text3)] bg-[var(--surface)]/50 rounded-xl border border-[var(--border)] p-8 space-y-3">
              <p className="text-base font-semibold text-[var(--text)]">No dispatches found matching &ldquo;{filter}&rdquo;.</p>
              <p className="text-xs text-[var(--text2)] max-w-md mx-auto">
                Try selecting a different desk or region, or view all stories in this section.
              </p>
              <button
                onClick={() => setFilter('All')}
                className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white text-xs font-bold hover:bg-[var(--accent)]/90 cursor-pointer"
              >
                Show All Stories
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {list.map((article) => (
                <article
                  key={article.id}
                  className="py-6 first:pt-2 last:pb-2 group transition-colors"
                >
                  <div className="flex flex-col-reverse sm:flex-row gap-5 sm:gap-8 items-start justify-between">
                    {/* Story Content Left */}
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-[var(--text3)]">
                        <span className="font-bold text-[var(--accent)] uppercase tracking-wider">
                          {article.country}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-[var(--text2)] uppercase">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span>{formatDateShort(article.publishedAt)}</span>
                        <span>•</span>
                        <span>{article.readingTime} min read</span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                        <Link href={`/intelligence/${article.slug}`}>{article.title}</Link>
                      </h4>

                      <p className="text-xs sm:text-sm text-[var(--text2)] line-clamp-2 sm:line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="pt-2 flex items-center gap-4 text-xs text-[var(--text3)]">
                        <span>By {article.author.name}</span>
                        <span>•</span>
                        <Link
                          href={`/intelligence/${article.slug}`}
                          className="font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                        >
                          Read dispatch <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>

                    {/* Side Thumbnail Right */}
                    <Link
                      href={`/intelligence/${article.slug}`}
                      className="w-full sm:w-48 md:w-56 aspect-[16/10] relative rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)] block"
                    >
                      <EditorialImage
                        src={article.image}
                        alt={article.title}
                        category={article.category}
                        country={article.country}
                        fill
                        className="object-cover group-hover:scale-104 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
