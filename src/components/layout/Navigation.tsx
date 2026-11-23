'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Search,
  Mail,
  ChevronDown,
  ArrowRight,
  Globe2,
  ExternalLink,
} from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { ARTICLES } from '@/data/articles';
import EditorialImage from '@/components/shared/EditorialImage';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
}

// ─── Editorial Publication Navigation Items ───────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'MENA',
    href: '/mena',
    dropdown: [
      { label: 'Saudi Arabia', href: '/mena?country=Saudi+Arabia', description: 'Vision 2030, SDAIA & $40B compute expansion' },
      { label: 'United Arab Emirates', href: '/mena?country=UAE', description: 'G42, sovereign infrastructure & Abu Dhabi' },
      { label: 'Qatar', href: '/mena?country=Qatar', description: 'QIA $1B deeptech venture fund & Doha research' },
      { label: 'Bahrain', href: '/mena?country=Bahrain', description: 'Fintech regulatory sandboxes & open banking AI' },
      { label: 'Kuwait', href: '/mena?country=Kuwait', description: 'Maritime logistics & autonomous port terminal tenders' },
      { label: 'Oman', href: '/mena?country=Oman', description: 'Green compute, subsea cables & Salalah renewables' },
      { label: 'Egypt', href: '/mena?country=Egypt', description: 'Cairo engineering hub & venture ecosystem' },
      { label: 'Jordan', href: '/mena?country=Jordan', description: 'Agritech drone vision & Amman engineering base' },
      { label: 'Morocco', href: '/mena?country=Morocco', description: 'Casablanca Finance City & Afro-Arab AI bridge' },
      { label: 'Regional Analysis', href: '/opinion', description: 'Cross-border geopolitics & sovereign intelligence' },
    ],
  },
  {
    label: 'World',
    href: '/world',
    dropdown: [
      { label: 'United States', href: '/world?country=United+States', description: 'Frontier model labs, silicon packaging & policy' },
      { label: 'Europe', href: '/world?country=European+Union', description: 'EU AI Act statutory audits & compliance' },
      { label: 'China', href: '/world?country=China', description: 'Open-weight reasoning models & domestic hardware' },
      { label: 'India', href: '/world?country=India', description: 'IndiaAI national 20,000 GPU compute grid' },
      { label: 'Asia-Pacific', href: '/world?region=Asia-Pacific', description: 'TSMC silicon fabs & regional supply chains' },
      { label: 'Global AI Policy', href: '/world?category=Policy', description: 'Multilateral governance & export controls' },
      { label: 'Global Research & Innovation', href: '/world?category=Research', description: 'Algorithmic efficiency & model breakthroughs' },
    ],
  },
  { label: 'Business', href: '/business' },
  { label: 'Technology', href: '/technology' },
  { label: 'Innovation', href: '/innovation' },
  { label: 'AI in Action', href: '/ai-in-action' },
  { label: 'Video', href: '/video' },
  { label: 'Opinion & Analysis', href: '/opinion' },
];

// ─── Logo Mark ───────────────────────────────────────────────────────────────

function EditorialLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-md bg-[var(--accent)] text-white flex items-center justify-center font-black text-sm tracking-tighter shadow-xs">
        AW
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold tracking-tight text-lg sm:text-xl leading-none text-[var(--text)]">
          AI WATCH <span className="text-[var(--accent)]">MENA</span>
        </span>
        <span className="text-[9px] uppercase tracking-widest text-[var(--text3)] font-semibold mt-0.5 hidden sm:inline-block">
          Independent AI Journalism
        </span>
      </div>
    </div>
  );
}

// ─── Interactive Command Search Overlay ───────────────────────────────────────

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const filtered = query.trim()
    ? ARTICLES.filter((a) => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : ARTICLES.slice(0, 4);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[var(--border)] gap-3 bg-[var(--surface)]">
              <Search size={20} className="text-[var(--text3)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reporting across MENA and global AI..."
                className="w-full bg-transparent text-base text-[var(--text)] outline-none placeholder:text-[var(--text3)]"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results Stream */}
            <div className="max-h-[60vh] overflow-y-auto divide-y divide-[var(--border)] p-2">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--text3)] flex items-center justify-between">
                <span>{query.trim() ? `Search Results (${filtered.length})` : 'Recommended Stories'}</span>
                <span className="text-[10px] font-normal lowercase">Esc to exit</span>
              </div>

              {filtered.map((item) => (
                <Link
                  key={item.id}
                  href={`/intelligence/${item.slug}`}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--surface2)] transition-colors group"
                >
                  <div className="w-16 h-12 relative rounded-md overflow-hidden shrink-0 bg-[var(--surface2)]">
                    <EditorialImage src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-[var(--text3)] mb-1">
                      <span className="font-bold text-[var(--accent)] uppercase">{item.country}</span>
                      <span>•</span>
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{item.readingTime} min</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[var(--text2)] line-clamp-1 mt-0.5">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}

              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-[var(--text3)]">
                  No reporting found matching &ldquo;{query}&rdquo;.
                </div>
              )}
            </div>

            <div className="px-4 py-2.5 bg-[var(--surface2)] border-t border-[var(--border)] text-[11px] text-[var(--text3)] flex items-center justify-between">
              <span>Quick topics: Saudi Arabia, G42, DeepSeek, Robotics, Healthcare</span>
              <span>Press Enter to select</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Mobile Menu Drawer with Expandable Accordions ────────────────────────────

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    MENA: true,
    World: false,
  });

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] z-[160] bg-[var(--surface)] border-l border-[var(--border)] flex flex-col justify-between shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex-1 overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
                <EditorialLogo />
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-3 text-[11px] font-bold uppercase tracking-wider text-[var(--text3)] border-b border-[var(--border)] bg-[var(--surface2)]/50">
                Editorial Navigation
              </div>

              <nav className="p-2 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
                  const isExpanded = Boolean(expandedSections[item.label]);

                  return (
                    <div key={item.label} className="rounded-lg overflow-hidden">
                      {hasDropdown ? (
                        <div>
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--surface2)] transition-colors">
                            <Link
                              href={item.href}
                              onClick={onClose}
                              className={`text-sm font-bold ${
                                pathname.startsWith(item.href)
                                  ? 'text-[var(--accent)]'
                                  : 'text-[var(--text)]'
                              }`}
                            >
                              {item.label}
                            </Link>
                            <button
                              type="button"
                              onClick={() => toggleSection(item.label)}
                              className="p-1 rounded text-[var(--text3)] hover:text-[var(--text)] cursor-pointer"
                              aria-label={`Toggle ${item.label} options`}
                            >
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${
                                  isExpanded ? 'rotate-180 text-[var(--accent)]' : ''
                                }`}
                              />
                            </button>
                          </div>

                          {/* Accordion List */}
                          <AnimatePresence>
                            {isExpanded && item.dropdown && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-4 pr-2 py-1 space-y-0.5 border-l-2 border-[var(--border)] ml-3 my-1"
                              >
                                {item.dropdown.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onClose}
                                    className="block px-2.5 py-1.5 rounded-md text-xs text-[var(--text2)] hover:text-[var(--accent)] hover:bg-[var(--surface2)] transition-colors font-medium"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                            pathname === item.href
                              ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                              : 'text-[var(--text)] hover:bg-[var(--surface2)]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                <div className="pt-3 mt-3 border-t border-[var(--border)]">
                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[var(--accent)] hover:underline"
                  >
                    <span>Intelligence Terminal (Data Archive)</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </nav>
            </div>

            <div className="p-4 border-t border-[var(--border)] bg-[var(--surface2)]/30 space-y-3">
              <Link
                href="#newsletter-signup"
                onClick={onClose}
                className="w-full btn-primary text-xs justify-center py-2.5 font-bold flex items-center gap-2"
              >
                <Mail size={14} />
                <span>Subscribe to Daily Wire</span>
              </Link>
              <div className="flex items-center justify-between text-xs text-[var(--text3)]">
                <span>Display Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Editorial Navigation Component ──────────────────────────────────────

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl/Cmd + K and Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  function handleDropdownToggle(label: string) {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  }

  function handleDropdownEnter(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 250);
  }

  return (
    <>
      <header className="w-full z-50 bg-[var(--surface)] border-b border-[var(--border)] transition-colors duration-200">
        {/* ── TOP UTILITY & EDITION BAR ── */}
        <div className="border-b border-[var(--border)] py-1.5 px-4 text-[11px] bg-[var(--surface2)]/40 text-[var(--text2)] hidden md:block">
          <div className="content-container flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-[var(--text)]">
                Wednesday, November 18, 2026
              </span>
              <span className="text-[var(--border2)]">|</span>
              <span className="flex items-center gap-1.5">
                <Globe2 size={12} className="text-[var(--accent)]" />
                Middle East & Global Edition
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <Link href="/about" className="hover:text-[var(--accent)] transition-colors">
                About Newsroom
              </Link>
              <Link href="/editorial-standards" className="hover:text-[var(--accent)] transition-colors">
                Standards & Verification
              </Link>
              <Link href="/dashboard" className="text-[var(--accent)] hover:underline flex items-center gap-1">
                Data Archive & Terminal
              </Link>
            </div>
          </div>
        </div>

        {/* ── MAIN MASTHEAD ROW ── */}
        <div className="content-container py-3.5 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group" aria-label="AI Watch MENA home">
              <EditorialLogo />
            </Link>

            {/* Quick Actions (Desktop) */}
            <div className="flex items-center gap-2.5">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface2)]/50 text-xs text-[var(--text2)] hover:text-[var(--text)] hover:border-[var(--accent)]/40 transition-all cursor-pointer"
                aria-label="Open search"
              >
                <Search size={14} className="text-[var(--text3)]" />
                <span className="hidden sm:inline">Search reporting...</span>
                <kbd className="hidden lg:inline-block px-1 py-0.2 rounded text-[10px] bg-[var(--surface)] border border-[var(--border)] font-mono text-[var(--text3)]">
                  ⌘K
                </kbd>
              </button>

              {/* Newsletter CTA */}
              <Link
                href="#newsletter-signup"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-bold hover:bg-[var(--accent)]/90 transition-colors shadow-xs"
              >
                <Mail size={13} />
                <span>Daily Dispatch</span>
              </Link>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-lg border border-[var(--border)] text-[var(--text2)] hover:text-[var(--text)] hover:bg-[var(--surface2)] md:hidden cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ── EDITORIAL NAVIGATION BAR (STICKY) ── */}
        <div ref={navRef} className="border-t border-[var(--border)] bg-[var(--surface)] sticky top-0 z-40 hidden md:block">
          <div className="content-container">
            <nav className="flex items-center justify-between text-xs font-bold uppercase tracking-wider overflow-visible py-0.5">
              <div className="flex items-center gap-1 sm:gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const hasDropdown = Boolean(item.dropdown && item.dropdown.length > 0);
                  const isOpen = activeDropdown === item.label;

                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => hasDropdown && handleDropdownEnter(item.label)}
                      onMouseLeave={() => hasDropdown && handleDropdownLeave()}
                    >
                      {hasDropdown ? (
                        <div className="inline-flex items-center">
                          <Link
                            href={item.href}
                            className={`px-3 py-2.5 rounded-l-md transition-colors ${
                              pathname.startsWith(item.href)
                                ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]'
                                : 'text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--surface2)]/60'
                            }`}
                          >
                            <span>{item.label}</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDropdownToggle(item.label)}
                            className={`p-2 py-2.5 rounded-r-md transition-colors cursor-pointer hover:bg-[var(--surface2)] ${
                              isOpen ? 'bg-[var(--surface2)] text-[var(--accent)]' : 'text-[var(--text3)]'
                            }`}
                            aria-expanded={isOpen}
                            aria-label={`Toggle ${item.label} dropdown`}
                          >
                            <ChevronDown
                              size={12}
                              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`inline-flex items-center px-3 py-2.5 rounded-md transition-colors ${
                            pathname === item.href
                              ? 'text-[var(--accent)] border-b-2 border-[var(--accent)] rounded-b-none'
                              : 'text-[var(--text)] hover:text-[var(--accent)] hover:bg-[var(--surface2)]/60'
                          }`}
                        >
                          <span>{item.label}</span>
                        </Link>
                      )}

                      {/* Dropdown Menu Overlay */}
                      {hasDropdown && isOpen && item.dropdown && (
                        <div className="absolute left-0 top-full pt-1.5 z-50 w-72">
                          <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl divide-y divide-[var(--border)] animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="px-3 py-2 bg-[var(--surface2)]/50 rounded-lg mb-1 flex items-center justify-between">
                              <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-wider">
                                {item.label} Desks & Coverage
                              </span>
                              <Link
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="text-[10px] text-[var(--text3)] hover:text-[var(--accent)] flex items-center gap-0.5 normal-case font-semibold"
                              >
                                View All <ArrowRight size={10} />
                              </Link>
                            </div>

                            <div className="py-1 max-h-[380px] overflow-y-auto space-y-0.5">
                              {item.dropdown.map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="block p-2 rounded-lg hover:bg-[var(--surface2)] transition-colors group"
                                >
                                  <div className="font-bold text-xs text-[var(--text)] group-hover:text-[var(--accent)] normal-case">
                                    {sub.label}
                                  </div>
                                  {sub.description && (
                                    <div className="text-[10px] text-[var(--text3)] normal-case mt-0.5 font-normal line-clamp-1">
                                      {sub.description}
                                    </div>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Overlays */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}
