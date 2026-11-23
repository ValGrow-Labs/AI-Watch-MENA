import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions governing access to AI Watch MENA content, syndication, and intellectual property.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors py-8 sm:py-12">
      <div className="content-container max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-[var(--text3)]">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text)] font-semibold">Terms of Use</span>
        </nav>

        <header className="border-b-2 border-[var(--text)] pb-6 space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent)]">
            Legal Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
            Terms of Use
          </h1>
          <p className="text-sm text-[var(--text3)]">
            Last updated: November 2026
          </p>
        </header>

        <div className="space-y-6 text-sm text-[var(--text2)] leading-relaxed">
          <p>
            By accessing or reading AI Watch MENA, you agree to comply with and be bound by these Terms of Use.
          </p>
          <h3 className="text-base font-bold text-[var(--text)]">1. Intellectual Property & Syndication</h3>
          <p>
            All original reporting, interviews, photographs, infographics, and editorial compilations published on this site are protected by copyright law. Brief excerpts (up to 150 words) may be quoted with prominent attribution and a direct hyperlink to the original reporting on AI Watch MENA. Full re-publishing or commercial syndication requires prior written authorization from editor@aiwatchmena.com.
          </p>
          <h3 className="text-base font-bold text-[var(--text)]">2. Informational Purpose</h3>
          <p>
            Our journalism is intended solely for educational, research, and informational purposes. It does not constitute investment advice, legal counsel, or financial recommendation.
          </p>
          <h3 className="text-base font-bold text-[var(--text)]">3. Governing Law</h3>
          <p>
            These terms are governed by applicable regional and international intellectual property treaties.
          </p>
        </div>
      </div>
    </div>
  );
}
