'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, X } from 'lucide-react';
import { VIDEOS } from '@/data/videos';
import EditorialImage from '@/components/shared/EditorialImage';
import type { VideoArticle } from '@/types';

export default function VideoHubPage() {
  const [activeVideo, setActiveVideo] = useState<VideoArticle | null>(null);

  const featured = VIDEOS[0];
  const list = VIDEOS.slice(1);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors py-8 sm:py-12">
      <div className="content-container space-y-10">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--text3)]">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text)] font-semibold">Video Journalism</span>
        </nav>

        {/* Header */}
        <header className="border-b-2 border-[var(--text)] pb-6 space-y-2">
          <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>AI Watch MENA Broadcast</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Video Journalism & Field Reports
          </h1>
          <p className="text-base sm:text-lg text-[var(--text2)] max-w-3xl leading-relaxed">
            On-the-ground investigations, data centre walkthroughs, executive interviews, and technical demonstrations filmed across the Middle East.
          </p>
        </header>

        {/* Featured Video */}
        {featured && (
          <div
            onClick={() => setActiveVideo(featured)}
            className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-xl bg-black"
          >
            <EditorialImage src={featured.thumbnailUrl} alt={featured.title} fill className="object-cover group-hover:scale-104 transition-transform duration-500 opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Play size={32} className="fill-current ml-1" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-2.5 py-1 rounded bg-red-600 text-[10px] font-bold uppercase tracking-wider">
                Featured Documentary • {featured.duration}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug">
                {featured.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 line-clamp-2 max-w-2xl">
                {featured.description}
              </p>
            </div>
          </div>
        )}

        {/* Video Catalog Grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold tracking-tight text-[var(--text)]">
            All Video Reports & Interviews
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setActiveVideo(vid)}
                className="p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] transition-all cursor-pointer space-y-3 group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-[var(--surface2)]">
                  <EditorialImage src={vid.thumbnailUrl} alt={vid.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-bold">
                    {vid.duration}
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={16} className="fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[var(--accent)] uppercase">{vid.country}</span>
                  <h4 className="text-sm font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors leading-snug line-clamp-2">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-[var(--text2)] line-clamp-2">
                    {vid.description}
                  </p>
                  <div className="pt-2 text-[10px] text-[var(--text3)]">
                    Presented by {vid.presenter} • {vid.views} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-4xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl"
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
                className="p-1.5 rounded-lg hover:bg-[var(--surface2)] text-[var(--text3)] hover:text-[var(--text)]"
              >
                <X size={18} />
              </button>
            </div>

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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
