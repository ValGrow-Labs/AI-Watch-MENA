'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Play,
  TrendingUp,
  Bookmark,
  Share2,
  ChevronRight,
  Globe2,
  Cpu,
  Flame,
  Check,
  X,
  Sparkles,
  Layers,
  Activity,
  Zap,
} from 'lucide-react';

import { ARTICLES } from '@/data/articles';
import { VIDEOS } from '@/data/videos';
import { formatDateShort } from '@/lib/utils';
import EditorialImage from '@/components/shared/EditorialImage';
import type { Article, VideoArticle } from '@/types';

export default function EditorialHomePage() {
  const [selectedMenaCountry, setSelectedMenaCountry] = useState<string>('All');
  const [activeVideo, setActiveVideo] = useState<VideoArticle | null>(null);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [visibleNewsCount, setVisibleNewsCount] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aiwatch_bookmarks');
      if (saved) setSavedSlugs(JSON.parse(saved));
    } catch {}
  }, []);

  const toggleBookmark = (slug: string) => {
    let updated: string[];
    if (savedSlugs.includes(slug)) {
      updated = savedSlugs.filter((s) => s !== slug);
    } else {
      updated = [...savedSlugs, slug];
    }
    setSavedSlugs(updated);
    try {
      localStorage.setItem('aiwatch_bookmarks', JSON.stringify(updated));
    } catch {}
  };

  const handleShare = (article: Article) => {
    const url = `${window.location.origin}/intelligence/${article.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedSlug(article.slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleNewsCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 350);
  };

  // ── EDITORIAL CONTENT CURATION ──
  const leadStory = ARTICLES.find((a) => a.leadStory) || ARTICLES[0];
  const topSecondaryStories = ARTICLES.filter((a) => a.id !== leadStory.id && a.featured).slice(0, 3);
  const breakingTickers = [
    { tag: 'RIYADH', text: 'SDAIA accelerates Vision 2030 AI strategy with $40B compute and venture allocation', slug: 'saudi-arabia-national-ai-strategy-2030-accelerates' },
    { tag: 'ABU DHABI', text: 'G42 and Microsoft inaugurate multi-region Sovereign Compute Corridor linking Asia and Africa', slug: 'uae-sovereign-ai-g42-global-expansion' },
    { tag: 'DOHA', text: 'Qatar Investment Authority creates $1B frontier deeptech fund targeting robotics and photonics', slug: 'qatar-qia-ai-fund-1b-deeptech-venture' },
    { tag: 'CAIRO', text: 'Egypt records 40 new venture-backed AI engineering startups in 2026', slug: 'egypt-cairo-ai-tech-hub-talent-surge' },
    { tag: 'BRUSSELS', text: 'European AI Office starts mandatory statutory audits on general-purpose frontier models', slug: 'european-ai-act-strict-enforcement-begins' },
  ];

  // Latest Chronological News
  const latestNews = [...ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Regional MENA Coverage
  const menaCountries = ['All', 'Saudi Arabia', 'UAE', 'Qatar', 'Egypt', 'Bahrain', 'Kuwait', 'Oman', 'Jordan', 'Morocco'];
  const menaArticles = selectedMenaCountry === 'All'
    ? ARTICLES.filter((a) => a.region === 'MENA' || a.category === 'MENA')
    : ARTICLES.filter((a) => a.country === selectedMenaCountry);

  // Global AI News
  const globalArticles = ARTICLES.filter((a) => a.region !== 'MENA' || a.category === 'World');

  // AI & Business
  const businessArticles = ARTICLES.filter((a) => a.category === 'Business');

  // Technology & Innovation
  const techInnovationArticles = ARTICLES.filter(
    (a) => a.category === 'Technology' || a.category === 'Innovation'
  );

  // AI in Sports & Society
  const sportsSocietyArticles = ARTICLES.filter((a) => a.category === 'AI in Action');

  // Features, Opinion & Analysis
  const opinionAnalysisArticles = ARTICLES.filter(
    (a) => a.category === 'Opinion & Analysis' || a.editorPick
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION 02 — BREAKING NEWS / LIVE WIRE TICKER
          ───────────────────────────────────────────────────────────── */}
      <section
        className="w-full h-10 border-b border-[var(--border)] overflow-hidden bg-[var(--surface)] text-xs flex items-center"
        aria-label="Breaking News Ticker"
      >
        <div className="content-container w-full flex items-center h-full">
          <div className="shrink-0 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white font-black tracking-wider uppercase text-[10px] rounded shadow-xs mr-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
            <span className="whitespace-nowrap">LIVE WIRE</span>
          </div>

          <div className="relative flex-1 overflow-hidden h-full flex items-center min-w-0">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[var(--surface)] to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[var(--surface)] to-transparent pointer-events-none z-10" />

            <div className="ticker-content inline-flex items-center gap-8 pl-4 whitespace-nowrap">
              {breakingTickers.concat(breakingTickers).map((item, idx) => (
                <div key={idx} className="inline-flex items-center gap-2.5 shrink-0 whitespace-nowrap">
                  <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--surface2)] border border-[var(--border)] shrink-0">
                    {item.tag}
                  </span>
                  <Link
                    href={`/intelligence/${item.slug}`}
                    className="text-[var(--text)] font-semibold text-xs sm:text-[13px] hover:text-[var(--accent)] transition-colors cursor-pointer whitespace-nowrap shrink-0 hover:underline"
                  >
                    {item.text}
                  </Link>
                  <span className="text-[var(--border2)] text-xs select-none shrink-0" aria-hidden="true">
                    /
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Container */}
      <div className="content-container py-8 space-y-12 sm:space-y-16">

        {/* ─────────────────────────────────────────────────────────────
            SECTION 03 — TOP STORIES (EDITORIAL HERO & ASYMMETRIC RIVER)
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Top Editorial Stories">
          <div className="border-b-2 border-[var(--text)] pb-2 mb-6 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-[var(--text)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full" />
              Lead Stories & Top Analysis
            </h2>
            <span className="text-xs text-[var(--text3)] font-medium">Updated 15 mins ago</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Dominant Lead Story (7 cols) — Unboxed, Broadsheet Photographic Presentation */}
            <article className="lg:col-span-7 space-y-4 group">
              <Link href={`/intelligence/${leadStory.slug}`} className="block relative aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface2)]">
                <EditorialImage
                  src={leadStory.image}
                  alt={leadStory.title}
                  category={leadStory.category}
                  country={leadStory.country}
                  priority
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {leadStory.country}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                    {leadStory.category}
                  </span>
                </div>
              </Link>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs text-[var(--text3)]">
                  <span className="font-semibold text-[var(--text)]">{leadStory.author.name}</span>
                  <span>•</span>
                  <span>{formatDateShort(leadStory.publishedAt)}</span>
                  <span>•</span>
                  <span>{leadStory.readingTime} min read</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[44px] font-extrabold tracking-tight text-[var(--text)] leading-[1.12] group-hover:text-[var(--accent)] transition-colors">
                  <Link href={`/intelligence/${leadStory.slug}`}>{leadStory.title}</Link>
                </h1>

                <p className="text-base text-[var(--text2)] leading-relaxed">
                  {leadStory.excerpt}
                </p>

                {/* Key Points Strip */}
                {leadStory.keyTakeaways && (
                  <div className="mt-3 p-3.5 rounded-lg bg-[var(--surface2)]/60 border-l-3 border-[var(--accent)] text-xs text-[var(--text)] space-y-1.5">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-[var(--accent)] block">
                      Core Briefing Takeaways
                    </span>
                    <ul className="space-y-1 text-[var(--text2)]">
                      {leadStory.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[var(--accent)] font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </article>

            {/* Alongside Secondary Top Headlines (5 cols) — Vertical Stream with Hairlines */}
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--text3)] pb-2 border-b border-[var(--border)]">
                Key Developing Dispatches
              </div>

              <div className="divide-y divide-[var(--border)]">
                {topSecondaryStories.map((story) => (
                  <article key={story.id} className="py-4 first:pt-0 last:pb-0 group space-y-2">
                    <div className="flex gap-4 items-start">
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 text-[10px]">
                          <span className="font-bold text-[var(--accent)] uppercase">{story.country}</span>
                          <span className="text-[var(--text3)]">•</span>
                          <span className="text-[var(--text3)]">{story.readingTime} min</span>
                        </div>
                        <h3 className="text-base font-bold text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                          <Link href={`/intelligence/${story.slug}`}>{story.title}</Link>
                        </h3>
                        <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                          {story.excerpt}
                        </p>
                      </div>

                      <div className="w-24 sm:w-28 h-20 sm:h-24 relative rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)]">
                        <EditorialImage
                          src={story.image}
                          alt={story.title}
                          category={story.category}
                          country={story.country}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Newsroom Dispatch Tip Line */}
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text3)]">
                <div>
                  <span className="font-semibold text-[var(--text)] block">Newsroom Confidential Tips</span>
                  <span>Encrypted channels for leaks & official briefings</span>
                </div>
                <Link
                  href="/contact"
                  className="font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1 shrink-0 ml-3"
                >
                  Submit Briefing <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 04 — LATEST AI NEWS (CONTINUOUS VERTICAL EDITORIAL RIVER)
            NO CARDS, NO BOXES — SCROLL DOWN AND READ STORY BY STORY
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Latest AI News Stream" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Continuous Wire
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                Latest AI News
              </h2>
            </div>
            <span className="text-xs text-[var(--text3)] hidden sm:inline font-medium">
              Live chronological stream from regional and global desks
            </span>
          </div>

          {/* Continuous Ordered Editorial Flow: Left Primary Feed + Right Live Wire Briefs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* The Main Continuous News River (8 cols) — Divided by hairlines */}
            <div className="lg:col-span-8 divide-y divide-[var(--border)]">
              {latestNews.slice(0, visibleNewsCount).map((article, index) => (
                <article
                  key={article.id}
                  className="py-6 first:pt-0 group transition-colors"
                >
                  <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 items-start justify-between">
                    {/* Story Content */}
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

                      <h3 className={`${index === 0 ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'} font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug`}>
                        <Link href={`/intelligence/${article.slug}`}>{article.title}</Link>
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--text2)] line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs text-[var(--text3)]">
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-[var(--text)]">By {article.author.name}</span>
                          <span>•</span>
                          <Link
                            href={`/intelligence/${article.slug}`}
                            className="font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                          >
                            Read report <ChevronRight size={12} />
                          </Link>
                        </div>

                        {/* Interactive Tools */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleBookmark(article.slug)}
                            className={`p-1 rounded hover:bg-[var(--surface2)] transition-colors cursor-pointer ${
                              savedSlugs.includes(article.slug) ? 'text-[var(--accent)]' : 'text-[var(--text3)]'
                            }`}
                            title="Bookmark story"
                            aria-label="Bookmark story"
                          >
                            <Bookmark size={14} className={savedSlugs.includes(article.slug) ? 'fill-current' : ''} />
                          </button>
                          <button
                            onClick={() => handleShare(article)}
                            className="p-1 rounded hover:bg-[var(--surface2)] text-[var(--text3)] transition-colors cursor-pointer"
                            title="Copy link"
                            aria-label="Copy story link"
                          >
                            {copiedSlug === article.slug ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Side Thumbnail */}
                    <Link
                      href={`/intelligence/${article.slug}`}
                      className={`relative rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)] block ${
                        index === 0
                          ? 'w-full sm:w-56 md:w-64 aspect-[16/10]'
                          : 'w-full sm:w-40 md:w-48 aspect-[16/10]'
                      }`}
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

              {/* Load More Reporting Button in the Continuous Flow */}
              {visibleNewsCount < latestNews.length && (
                <div className="pt-8 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="btn-ghost text-xs font-bold uppercase tracking-wider px-6 py-2.5 border border-[var(--border)] hover:border-[var(--accent)] inline-flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {isLoadingMore ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                        <span>Loading subsequent dispatches...</span>
                      </>
                    ) : (
                      <>
                        <span>Load Next Dispatches</span>
                        <ChevronRight size={14} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Right Fast-Wire Sidebar (4 cols) — Chronological Briefs River */}
            <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-[var(--border)] lg:pl-8">
              <div className="flex items-center justify-between pb-2 border-b-2 border-[var(--border)]">
                <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent)] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  Fast Wire Briefs
                </span>
                <span className="text-[10px] text-[var(--text3)] font-semibold uppercase">Real-Time</span>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {latestNews.slice(0, 8).map((item) => (
                  <div key={item.id} className="py-3.5 first:pt-0 group space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-[var(--text3)]">
                      <span className="font-bold text-[var(--accent)] uppercase">{item.country}</span>
                      <span>{formatDateShort(item.publishedAt)}</span>
                    </div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                      <Link href={`/intelligence/${item.slug}`}>{item.title}</Link>
                    </h4>
                    <p className="text-[11px] text-[var(--text2)] line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                ))}
              </div>

              {/* Wire Editorial Stat Callout */}
              <div className="p-4 rounded-lg bg-[var(--surface2)]/40 border-l-2 border-[var(--accent)] text-xs space-y-1 text-[var(--text2)]">
                <span className="font-bold text-[var(--text)] uppercase text-[10px] tracking-wider block">
                  MENA Compute Intelligence
                </span>
                <p className="leading-relaxed">
                  Track regional sovereign cloud commitments, GCC accelerator funding rounds, and Arabic LLM benchmark rankings in real time.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 05 — AI ACROSS MENA (REGIONAL BUREAUS BROADSHEET)
            NO CARDS, NO BOXES — CONTINUOUS REGIONAL STREAM
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="AI Across MENA" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Regional Bureaus
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                AI Across MENA
              </h2>
            </div>
            <p className="text-xs text-[var(--text3)] max-w-md">
              National strategies, compute infrastructure, and startup ecosystems reported by local correspondents.
            </p>
          </div>

          {/* Country Selector Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar text-xs">
            {menaCountries.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedMenaCountry(c)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedMenaCountry === c
                    ? 'bg-[var(--accent)] text-white shadow-xs'
                    : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text2)] hover:text-[var(--text)] hover:border-[var(--border2)]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Continuous Regional River: Lead Regional Story (7 cols) + Vertical Stack (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {menaArticles[0] && (
              <article className="lg:col-span-7 space-y-3.5 group">
                <Link
                  href={`/intelligence/${menaArticles[0].slug}`}
                  className="block relative aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface2)]"
                >
                  <EditorialImage
                    src={menaArticles[0].image}
                    alt={menaArticles[0].title}
                    category={menaArticles[0].category}
                    country={menaArticles[0].country}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {menaArticles[0].country}
                  </span>
                </Link>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[var(--text3)]">
                    <span className="font-bold text-[var(--accent)] uppercase">{menaArticles[0].category}</span>
                    <span>•</span>
                    <span>{formatDateShort(menaArticles[0].publishedAt)}</span>
                    <span>•</span>
                    <span>{menaArticles[0].readingTime} min read</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                    <Link href={`/intelligence/${menaArticles[0].slug}`}>{menaArticles[0].title}</Link>
                  </h3>

                  <p className="text-sm text-[var(--text2)] leading-relaxed line-clamp-3">
                    {menaArticles[0].excerpt}
                  </p>

                  <div className="pt-2 text-xs text-[var(--text3)] flex items-center justify-between border-t border-[var(--border)]">
                    <span>By {menaArticles[0].author.name}</span>
                    <Link
                      href={`/intelligence/${menaArticles[0].slug}`}
                      className="font-bold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
                    >
                      Read full regional briefing <ChevronRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Vertical River of Regional Dispatches with Hairlines */}
            <div className="lg:col-span-5 divide-y divide-[var(--border)]">
              {menaArticles.slice(1, 5).map((article) => (
                <article key={article.id} className="py-4 first:pt-0 last:pb-0 group space-y-2">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-[var(--text3)]">
                        <span className="font-bold text-[var(--accent)] uppercase tracking-wider">
                          {article.country}
                        </span>
                        <span>•</span>
                        <span>{article.readingTime} min</span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        <Link href={`/intelligence/${article.slug}`}>{article.title}</Link>
                      </h4>
                      <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/intelligence/${article.slug}`}
                      className="w-24 sm:w-28 h-20 sm:h-22 relative rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)] block"
                    >
                      <EditorialImage
                        src={article.image}
                        alt={article.title}
                        category={article.category}
                        country={article.country}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 06 — GLOBAL AI NEWS (INTERNATIONAL DESK BROADSHEET)
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Global AI News" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                International Context
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                Global AI Developments
              </h2>
            </div>
            <Link href="/world" className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1">
              View all international reporting <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Primary International Feature (7 cols) */}
            {globalArticles[0] && (
              <article className="lg:col-span-7 space-y-3.5 group">
                <Link
                  href={`/intelligence/${globalArticles[0].slug}`}
                  className="block relative aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface2)]"
                >
                  <EditorialImage
                    src={globalArticles[0].image}
                    alt={globalArticles[0].title}
                    category={globalArticles[0].category}
                    country={globalArticles[0].country}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {globalArticles[0].country}
                  </span>
                </Link>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[var(--text3)]">
                    <span className="font-bold text-[var(--accent)] uppercase">{globalArticles[0].category}</span>
                    <span>•</span>
                    <span>{formatDateShort(globalArticles[0].publishedAt)}</span>
                    <span>•</span>
                    <span>{globalArticles[0].readingTime} min read</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors">
                    <Link href={`/intelligence/${globalArticles[0].slug}`}>{globalArticles[0].title}</Link>
                  </h3>

                  <p className="text-sm text-[var(--text2)] leading-relaxed line-clamp-3">
                    {globalArticles[0].excerpt}
                  </p>
                </div>
              </article>
            )}

            {/* Supporting Global Dispatches Stack (5 cols) */}
            <div className="lg:col-span-5 divide-y divide-[var(--border)]">
              {globalArticles.slice(1, 5).map((story) => (
                <article key={story.id} className="py-3.5 first:pt-0 last:pb-0 group">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] text-[var(--text3)]">
                        <span className="font-bold text-[var(--accent)] uppercase">{story.country}</span>
                        <span>•</span>
                        <span>{story.readingTime} min</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[var(--text)] leading-snug group-hover:text-[var(--accent)] transition-colors line-clamp-2">
                        <Link href={`/intelligence/${story.slug}`}>{story.title}</Link>
                      </h4>
                      <p className="text-[11px] text-[var(--text2)] line-clamp-2 leading-relaxed">
                        {story.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/intelligence/${story.slug}`}
                      className="w-24 sm:w-28 h-20 relative rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)] block"
                    >
                      <EditorialImage
                        src={story.image}
                        alt={story.title}
                        category={story.category}
                        country={story.country}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 07 — AI & BUSINESS (JOURNALISTIC REPORTING)
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="AI and Business" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Corporate Transformation & Capital
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                AI & Business
              </h2>
            </div>
            <Link href="/business" className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1">
              More Business Coverage <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Primary Business Story (7 cols) */}
            {businessArticles[0] && (
              <article className="lg:col-span-7 space-y-3 group">
                <Link
                  href={`/intelligence/${businessArticles[0].slug}`}
                  className="block relative aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface2)]"
                >
                  <EditorialImage
                    src={businessArticles[0].image}
                    alt={businessArticles[0].title}
                    category={businessArticles[0].category}
                    country={businessArticles[0].country}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {businessArticles[0].country}
                  </span>
                </Link>
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-[var(--accent)] uppercase">
                    {businessArticles[0].country} • Enterprise AI Capital
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    <Link href={`/intelligence/${businessArticles[0].slug}`}>{businessArticles[0].title}</Link>
                  </h3>
                  <p className="text-sm text-[var(--text2)] leading-relaxed line-clamp-3">
                    {businessArticles[0].excerpt}
                  </p>
                </div>
              </article>
            )}

            {/* Secondary Business Stories Stream (5 cols) */}
            <div className="lg:col-span-5 divide-y divide-[var(--border)]">
              {businessArticles.slice(1, 5).map((story) => (
                <article key={story.id} className="py-3.5 first:pt-0 last:pb-0 space-y-1.5 group">
                  <div className="text-[10px] text-[var(--text3)] font-semibold uppercase">
                    {story.country} • {formatDateShort(story.publishedAt)}
                  </div>
                  <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    <Link href={`/intelligence/${story.slug}`}>{story.title}</Link>
                  </h4>
                  <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                    {story.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 08 — TECHNOLOGY & INNOVATION (NO CARDS, EDITORIAL RIVER)
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Technology & Innovation" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Foundational Science & Silicon
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                Technology & Innovation
              </h2>
            </div>
            <Link href="/technology" className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1">
              All Deep Tech <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Lead Technical Architecture Feature (7 cols) */}
            {techInnovationArticles[0] && (
              <article className="lg:col-span-7 space-y-3 group">
                <Link
                  href={`/intelligence/${techInnovationArticles[0].slug}`}
                  className="block relative aspect-[16/9] rounded-xl overflow-hidden bg-[var(--surface2)]"
                >
                  <EditorialImage
                    src={techInnovationArticles[0].image}
                    alt={techInnovationArticles[0].title}
                    category={techInnovationArticles[0].category}
                    country={techInnovationArticles[0].country}
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[var(--accent)] text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {techInnovationArticles[0].category}
                  </span>
                </Link>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] text-[var(--accent)] font-bold uppercase">
                    <span>{techInnovationArticles[0].country}</span>
                    <span>•</span>
                    <span>{techInnovationArticles[0].readingTime} min read</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                    <Link href={`/intelligence/${techInnovationArticles[0].slug}`}>{techInnovationArticles[0].title}</Link>
                  </h3>
                  <p className="text-sm text-[var(--text2)] line-clamp-3 leading-relaxed">
                    {techInnovationArticles[0].excerpt}
                  </p>
                </div>
              </article>
            )}

            {/* Vertical Tech Dispatches (5 cols) */}
            <div className="lg:col-span-5 divide-y divide-[var(--border)]">
              {techInnovationArticles.slice(1, 4).map((item) => (
                <article key={item.id} className="py-3.5 first:pt-0 last:pb-0 group">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="text-[10px] text-[var(--accent)] font-bold uppercase">
                        {item.country} • {item.readingTime} min
                      </div>
                      <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug line-clamp-2">
                        <Link href={`/intelligence/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <p className="text-xs text-[var(--text2)] line-clamp-2 leading-relaxed">
                        {item.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/intelligence/${item.slug}`}
                      className="w-24 h-20 relative rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)] block"
                    >
                      <EditorialImage
                        src={item.image}
                        alt={item.title}
                        category={item.category}
                        country={item.country}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 09 — AI IN SPORTS & SOCIETY (BROADSHEET RIVER)
            NO CARDS, NO BOXES — FLOWING APPLIED AI STORIES
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="AI in Sports & Society" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Real-World Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                AI in Sports & Society
              </h2>
            </div>
            <Link href="/ai-in-action" className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1">
              Explore AI in Action <ArrowRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-[var(--border)]">
            {sportsSocietyArticles.slice(0, 3).map((story) => (
              <article key={story.id} className="py-5 first:pt-0 group">
                <div className="flex flex-col-reverse sm:flex-row gap-5 items-start justify-between">
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-[var(--text3)]">
                      <span className="font-bold text-[var(--accent)] uppercase">{story.country}</span>
                      <span>•</span>
                      <span>{formatDateShort(story.publishedAt)}</span>
                      <span>•</span>
                      <span>{story.readingTime} min read</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                      <Link href={`/intelligence/${story.slug}`}>{story.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--text2)] line-clamp-2 leading-relaxed">
                      {story.excerpt}
                    </p>

                    <div className="pt-1 text-xs text-[var(--text3)]">
                      <Link
                        href={`/intelligence/${story.slug}`}
                        className="font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-0.5"
                      >
                        Read dispatch <ChevronRight size={12} />
                      </Link>
                    </div>
                  </div>

                  <Link
                    href={`/intelligence/${story.slug}`}
                    className="w-full sm:w-48 aspect-[16/10] relative rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)] block"
                  >
                    <EditorialImage
                      src={story.image}
                      alt={story.title}
                      category={story.category}
                      country={story.country}
                      fill
                      className="object-cover group-hover:scale-104 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 10 — WATCH / VIDEO JOURNALISM
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Video Journalism" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Video Journalism & Field Reports
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                Watch AI Watch MENA
              </h2>
            </div>
            <Link href="/video" className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1">
              All Video Dispatches <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Featured Playable Video Preview (7 cols) */}
            {VIDEOS[0] && (
              <div
                onClick={() => setActiveVideo(VIDEOS[0])}
                className="lg:col-span-7 relative aspect-[16/9] rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
              >
                <EditorialImage
                  src={VIDEOS[0].thumbnailUrl}
                  alt={VIDEOS[0].title}
                  category={VIDEOS[0].category}
                  country={VIDEOS[0].country}
                  fill
                  className="object-cover group-hover:scale-104 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play size={24} className="fill-current ml-1" />
                  </div>
                </div>

                {/* Video Info Bottom Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-[10px] uppercase font-bold text-white">
                      Featured Documentary
                    </span>
                    <span>{VIDEOS[0].duration}</span>
                    <span>•</span>
                    <span>Presented by {VIDEOS[0].presenter}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold leading-snug group-hover:text-red-400 transition-colors">
                    {VIDEOS[0].title}
                  </h3>
                </div>
              </div>
            )}

            {/* Video Dispatches Stream (5 cols) — No Boxed Tiles, Divided by Hairlines */}
            <div className="lg:col-span-5 divide-y divide-[var(--border)]">
              {VIDEOS.slice(1, 4).map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideo(vid)}
                  className="py-3.5 first:pt-0 last:pb-0 cursor-pointer flex gap-3.5 group items-start"
                >
                  <div className="relative w-32 aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-[var(--surface2)]">
                    <EditorialImage
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      category={vid.category}
                      country={vid.country}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-white text-[9px] font-mono font-bold">
                      {vid.duration}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                      <Play size={16} className="text-white fill-current opacity-80 group-hover:opacity-100" />
                    </div>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold text-[var(--accent)] uppercase">{vid.country}</span>
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-2 leading-snug">
                      {vid.title}
                    </h4>
                    <span className="text-[10px] text-[var(--text3)] block">
                      {vid.presenter} • {vid.views} views
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            SECTION 11 — FEATURES, OPINION & ANALYSIS
            AUTHENTIC OP-ED BROADSHEET WITH SERIF RULES & PULL-QUOTES
            NO CARD BOXES
            ───────────────────────────────────────────────────────────── */}
        <section aria-label="Opinion and Analysis" className="border-t-2 border-[var(--border)] pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] block">
                Ideas, Debates & Longform
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
                Opinion & Analysis
              </h2>
            </div>
            <Link href="/opinion" className="text-xs font-bold text-[var(--accent)] hover:underline flex items-center gap-1">
              Read all opinions <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {opinionAnalysisArticles.slice(0, 2).map((essay, idx) => (
              <article
                key={essay.id}
                className={`space-y-4 group ${
                  idx === 0 ? 'md:border-r md:border-[var(--border)] md:pr-8 lg:pr-12' : ''
                }`}
              >
                <div className="flex items-center justify-between text-xs text-[var(--text3)] border-b border-[var(--border)] pb-2">
                  <span className="font-bold text-[var(--accent)] text-[10px] uppercase tracking-wider">
                    {essay.country} • Editorial Essay
                  </span>
                  <span>{essay.readingTime} min read</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug">
                  <Link href={`/intelligence/${essay.slug}`}>{essay.title}</Link>
                </h3>

                <blockquote className="border-l-3 border-[var(--accent)] pl-4 py-1 text-sm sm:text-base text-[var(--text2)] leading-relaxed italic font-serif">
                  &ldquo;{essay.excerpt}&rdquo;
                </blockquote>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white text-xs font-bold flex items-center justify-center">
                      {essay.author.name.charAt(0)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[var(--text)] block">{essay.author.name}</span>
                      <span className="text-[10px] text-[var(--text3)]">{essay.author.role}</span>
                    </div>
                  </div>
                  <Link
                    href={`/intelligence/${essay.slug}`}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
                  >
                    Read Essay <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            INLINE NEWSROOM DISPATCH SUBSCRIPTION (EDITORIAL TICKER STRIP)
            ───────────────────────────────────────────────────────────── */}
        <section id="newsletter-signup" className="border-y-2 border-[var(--border)] py-8 my-8">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
              Daily Intelligence Briefing
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
              Get the AI Watch MENA Morning Dispatch
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text2)] leading-relaxed">
              Join 45,000+ technology leaders, policymakers, founders, and investors receiving our daily executive briefing on artificial intelligence across the Middle East and worldwide.
            </p>

            {newsletterSubmitted ? (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-semibold">
                Thank you. You have been added to the morning wire distribution list.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) setNewsletterSubmitted(true);
                }}
                className="flex flex-col sm:flex-row items-center gap-2.5 max-w-md mx-auto pt-2"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@enterprise.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[var(--accent)] text-white text-xs font-bold hover:bg-[var(--accent)]/90 transition-colors shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
            <span className="text-[10px] text-[var(--text3)] block">
              Free daily edition • Zero advertising tracking • Unsubscribe at any time
            </span>
          </div>
        </section>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          PLAYABLE VIDEO MODAL PLAYER
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              className="w-full max-w-4xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)] bg-[var(--surface)]">
                <div>
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider block">
                    AI Watch MENA Broadcast
                  </span>
                  <h4 className="text-sm font-bold text-[var(--text)] line-clamp-1">
                    {activeVideo.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-1.5 rounded-lg hover:bg-[var(--surface2)] text-[var(--text3)] hover:text-[var(--text)] cursor-pointer"
                  aria-label="Close video"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Embed */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-4 bg-[var(--surface)] text-xs text-[var(--text2)] space-y-1">
                <p>{activeVideo.description}</p>
                <div className="flex items-center gap-3 pt-2 text-[10px] text-[var(--text3)]">
                  <span>Duration: {activeVideo.duration}</span>
                  <span>•</span>
                  <span>Presenter: {activeVideo.presenter}</span>
                  <span>•</span>
                  <span>{activeVideo.views} views</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
