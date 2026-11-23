import Link from 'next/link';
import { ArrowLeft, Shield, Globe2, Award, Users } from 'lucide-react';
import { AUTHORS } from '@/data/authors';

export const metadata = {
  title: 'About Newsroom & Mission',
  description: 'AI Watch MENA is an independent digital news and intelligence platform dedicated to reporting on artificial intelligence across the Middle East and globally.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors py-8 sm:py-12">
      <div className="content-container max-w-4xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[var(--text3)]">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text)] font-semibold">About Newsroom</span>
        </nav>

        {/* Header */}
        <header className="border-b-2 border-[var(--text)] pb-6 space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent)]">
            Our Mission & Independence
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            About AI Watch MENA
          </h1>
          <p className="text-base sm:text-lg text-[var(--text2)] leading-relaxed">
            Independent journalism uncovering the economic, geopolitical, and societal implications of the artificial intelligence revolution across the Middle East, North Africa, and global frontiers.
          </p>
        </header>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <Globe2 className="text-[var(--accent)] w-6 h-6" />
            <h3 className="font-bold text-base text-[var(--text)]">Regional Context</h3>
            <p className="text-xs text-[var(--text2)] leading-relaxed">
              We look beyond Western Silicon Valley orthodoxies, reporting on indigenous Arabic models, sovereign data regimes, and Global South technology diplomacy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <Shield className="text-[var(--accent)] w-6 h-6" />
            <h3 className="font-bold text-base text-[var(--text)]">Journalistic Independence</h3>
            <p className="text-xs text-[var(--text2)] leading-relaxed">
              Strict separation between news reporting and commercial partnerships. We never publish paid PR announcements disguised as verified news.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
            <Award className="text-[var(--accent)] w-6 h-6" />
            <h3 className="font-bold text-base text-[var(--text)]">Technical Rigour</h3>
            <p className="text-xs text-[var(--text2)] leading-relaxed">
              Our reporting is led by correspondents with engineering, research, and economics backgrounds who understand benchmark metrics, compute physics, and regulatory code.
            </p>
          </div>
        </div>

        {/* Newsroom Team */}
        <section className="space-y-6 pt-6 border-t border-[var(--border)]">
          <h2 className="text-2xl font-bold tracking-tight text-[var(--text)]">
            Editorial Leadership & Correspondents
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {AUTHORS.map((author) => (
              <div key={author.id} className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white font-bold flex items-center justify-center text-base">
                  {author.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text)]">{author.name}</h4>
                  <span className="text-[11px] text-[var(--accent)] font-semibold block">{author.role}</span>
                  <p className="text-xs text-[var(--text2)] mt-1.5 line-clamp-3 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
