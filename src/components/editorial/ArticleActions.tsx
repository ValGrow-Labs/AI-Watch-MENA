'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Share2, Check } from 'lucide-react';

export default function ArticleActions({ slug }: { slug: string }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aiwatch_bookmarks');
      if (saved) {
        const list: string[] = JSON.parse(saved);
        setBookmarked(list.includes(slug));
      }
    } catch {}
  }, [slug]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('aiwatch_bookmarks');
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (bookmarked) {
        list = list.filter((s) => s !== slug);
        setBookmarked(false);
      } else {
        list.push(slug);
        setBookmarked(true);
      }
      localStorage.setItem('aiwatch_bookmarks', JSON.stringify(list));
    } catch {}
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleBookmark}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-semibold hover:border-[var(--accent)] transition-colors cursor-pointer ${
          bookmarked
            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
            : 'bg-[var(--surface)] text-[var(--text)]'
        }`}
        aria-label="Bookmark article"
      >
        <Bookmark size={14} className={bookmarked ? 'fill-current' : ''} />
        <span>{bookmarked ? 'Saved' : 'Bookmark'}</span>
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] text-xs font-semibold text-[var(--text)] transition-colors cursor-pointer"
        aria-label="Share article"
      >
        {copied ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
        <span>{copied ? 'Link Copied' : 'Share'}</span>
      </button>
    </div>
  );
}
