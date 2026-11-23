import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How AI Watch MENA handles subscriber data, cookies, and digital privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors py-8 sm:py-12">
      <div className="content-container max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-[var(--text3)]">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-[var(--text)] font-semibold">Privacy Policy</span>
        </nav>

        <header className="border-b-2 border-[var(--text)] pb-6 space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent)]">
            Data Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text)]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text3)]">
            Last updated: November 2026
          </p>
        </header>

        <div className="space-y-6 text-sm text-[var(--text2)] leading-relaxed">
          <p>
            AI Watch MENA respects your privacy. We operate on a strict data-minimisation model: we collect only the necessary data required to deliver newsletter briefings and remember local reading preferences (such as light/dark mode and saved article bookmarks stored directly in your browser’s local storage).
          </p>
          <h3 className="text-base font-bold text-[var(--text)]">1. Information We Collect</h3>
          <p>
            When you subscribe to our newsletter dispatch, we store your email address securely using encrypted transport. We do not sell, rent, or trade subscriber contact details to third-party data brokers or programmatic ad networks.
          </p>
          <h3 className="text-base font-bold text-[var(--text)]">2. Local Storage & Cookies</h3>
          <p>
            This website does not use invasive surveillance cookies. Bookmarked articles and theme preferences are preserved locally on your client machine. You may clear your browser cookies and local storage at any time without compromising basic access to reporting.
          </p>
          <h3 className="text-base font-bold text-[var(--text)]">3. Data Subject Rights</h3>
          <p>
            Under regional data privacy regulations (including Saudi PDPL and UAE Federal Decree-Law No. 45/2021) as well as international standards, you have the right to request deletion of your subscription records by emailing privacy@aiwatchmena.com.
          </p>
        </div>
      </div>
    </div>
  );
}
