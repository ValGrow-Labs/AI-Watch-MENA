'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, Building2, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
          <span className="text-[var(--text)] font-semibold">Contact & Newsroom Tips</span>
        </nav>

        {/* Header */}
        <header className="border-b-2 border-[var(--text)] pb-6 space-y-3">
          <span className="text-[11px] font-black uppercase tracking-wider text-[var(--accent)]">
            Encrypted Tips & Press Bureau
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text)]">
            Contact AI Watch MENA
          </h1>
          <p className="text-base sm:text-lg text-[var(--text2)] leading-relaxed">
            Have a confidential story tip, research report, or press briefing? Contact our editorial bureaus directly.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tip Submission Form */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
              <Lock size={16} />
              <span>Confidential Tip Form</span>
            </div>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Check size={18} />
                  <span>Dispatch Received</span>
                </div>
                <p className="text-xs">
                  Your encrypted tip has been forwarded to our duty editors. If relevant, our investigative team will contact you via your specified channel.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="font-semibold text-[var(--text)] block mb-1">
                    Subject / Story Pitch
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unannounced compute allocation in Riyadh..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[var(--text)] block mb-1">
                    Encrypted Details / Leaks / Documents
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Please include dates, entities involved, documents, or verification details..."
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[var(--text)] block mb-1">
                    Secure Contact (Signal handle / ProtonMail / Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Anonymous if left blank"
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface2)] text-[var(--text)] outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[var(--accent)] text-white font-bold hover:bg-[var(--accent)]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Send Encrypted Dispatch</span>
                </button>
              </form>
            )}
          </div>

          {/* Bureau Contacts */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                <Building2 size={16} className="text-[var(--accent)]" />
                Riyadh Bureau (KSA)
              </h3>
              <p className="text-xs text-[var(--text2)]">
                King Abdullah Financial District, Building 4.02, Riyadh, Kingdom of Saudi Arabia.
              </p>
              <span className="text-[11px] text-[var(--text3)] block">
                Bureau Chief: riyadh@aiwatchmena.com
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                <Building2 size={16} className="text-[var(--accent)]" />
                Abu Dhabi & Dubai Bureau (UAE)
              </h3>
              <p className="text-xs text-[var(--text2)]">
                Abu Dhabi Global Market (ADGM) Square, Al Maryah Island, Abu Dhabi, UAE.
              </p>
              <span className="text-[11px] text-[var(--text3)] block">
                Bureau Chief: abudhabi@aiwatchmena.com
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
              <h3 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
                <Mail size={16} className="text-[var(--accent)]" />
                Press Inquiries & Corrections
              </h3>
              <p className="text-xs text-[var(--text2)]">
                Direct all media licensing, syndication requests, and formal correction notices to:
              </p>
              <span className="text-xs font-semibold text-[var(--accent)] block">
                editor@aiwatchmena.com
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
