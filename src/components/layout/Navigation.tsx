'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Mail, ChevronDown } from 'lucide-react';
import ThemeToggle from '@/components/shared/ThemeToggle';

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

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Intelligence',
    href: '/intelligence',
    dropdown: [
      { label: 'Breaking News', href: '/intelligence/breaking', description: 'Latest developments' },
      { label: 'Regional AI', href: '/intelligence/regional', description: 'Country-level coverage' },
      { label: 'Enterprise AI', href: '/intelligence/enterprise', description: 'Corporate adoption' },
      { label: 'Research', href: '/intelligence/research', description: 'Academic & think-tank' },
    ],
  },
  { label: 'Analysis & Reports', href: '/analysis' },
  { label: 'Funding & Deals', href: '/funding' },
  { label: 'Vendors & Tools', href: '/vendors' },
  { label: 'Policy & Regulation', href: '/regulation' },
  { label: 'Dashboard', href: '/dashboard' },
];

// ─── Logo Mark ───────────────────────────────────────────────────────────────

function LogoMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M2 2 L2 16 M2 2 L7 2 M2 9 L6 9"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2 L16 2 L16 16 M11 16 L16 16 M11 9 L15 9"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Dropdown ────────────────────────────────────────────────────────────────

function DropdownMenu({ items }: { items: DropdownItem[] }) {
  return (
    <motion.div
      className="dropdown-menu"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="dropdown-item">
          <span className="flex flex-col">
            <span className="font-medium" style={{ color: 'var(--text)' }}>{item.label}</span>
            {item.description && (
              <span className="text-xs" style={{ color: 'var(--text3)' }}>{item.description}</span>
            )}
          </span>
        </Link>
      ))}
    </motion.div>
  );
}

// ─── Search Overlay ───────────────────────────────────────────────────────────

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          style={{ background: 'rgba(10,16,32,0.75)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            {/* Search box */}
            <div
              className="relative flex items-center rounded-xl overflow-hidden"
              style={{ background: 'var(--surface)', border: '1px solid var(--border2)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            >
              <Search size={20} className="ml-5 shrink-0" style={{ color: 'var(--text3)' }} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search MENA AI intelligence..."
                className="flex-1 px-4 py-5 text-lg bg-transparent outline-none"
                style={{ color: 'var(--text)', fontSize: '1.125rem' }}
              />
              <button
                onClick={onClose}
                className="mr-4 p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text3)' }}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>
            {/* Hint */}
            <p className="text-center mt-4 text-sm" style={{ color: 'var(--text3)' }}>
              Press <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text2)' }}>Esc</kbd> to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[90]"
            style={{ background: 'rgba(10,16,32,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Panel */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 z-[100] w-80 flex flex-col"
            style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: '1px solid var(--border)', height: '60px' }}
            >
              <div className="flex items-center gap-2">
                <LogoMark />
                <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text)' }}>
                  AI Watch <span style={{ color: 'var(--accent)' }}>MENA</span>
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text3)' }}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-sm transition-colors mb-0.5"
                    style={{
                      color: pathname === item.href ? 'var(--accent)' : 'var(--text2)',
                      background: pathname === item.href ? 'var(--surface2)' : 'transparent',
                    }}
                  >
                    {item.label}
                  </Link>
                  {/* Sub-items for Intelligence */}
                  {item.dropdown && (
                    <div className="ml-3 mb-1 pl-3" style={{ borderLeft: '2px solid var(--border)' }}>
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={onClose}
                          className="block px-2 py-2 text-xs rounded-md transition-colors"
                          style={{ color: 'var(--text3)' }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Footer: Newsletter + Theme toggle */}
            <div
              className="px-5 py-4 flex flex-col gap-3"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <Link
                href="/newsletter"
                onClick={onClose}
                className="btn-primary w-full justify-center text-sm"
              >
                <Mail size={15} />
                Subscribe to Newsletter
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: 'var(--text3)' }}>Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Navigation (main export) ─────────────────────────────────────────────────

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Suppress editorial navigation inside dedicated intelligence terminal
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  function handleDropdownEnter(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  }

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ height: '60px' }}>

            {/* ── LEFT: Logo ── */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group" aria-label="AI Watch MENA home">
              <LogoMark />
              <span
                className="font-bold tracking-tight text-[1.125rem] leading-none"
                style={{ fontFamily: 'var(--font-manrope, Manrope, system-ui, sans-serif)', color: 'var(--text)' }}
              >
                AI Watch{' '}
                <span style={{ color: 'var(--accent)' }}>MENA</span>
              </span>
            </Link>

            {/* ── CENTER: Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const hasDropdown = !!item.dropdown;

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hasDropdown && handleDropdownEnter(item.label)}
                    onMouseLeave={() => hasDropdown && handleDropdownLeave()}
                  >
                    <Link
                      href={item.href}
                      className={`nav-link flex items-center gap-1 px-3 py-1${isActive ? ' active' : ''}`}
                    >
                      {item.label}
                      {hasDropdown && (
                        <ChevronDown
                          size={13}
                          className="transition-transform duration-200"
                          style={{
                            transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)',
                            color: 'var(--text3)',
                          }}
                        />
                      )}
                    </Link>

                    {hasDropdown && (
                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <DropdownMenu items={item.dropdown!} />
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ── RIGHT: Actions ── */}
            <div className="flex items-center gap-2">
              {/* Search button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text3)' }}
                aria-label="Open search (Ctrl+K)"
                title="Search (Ctrl+K)"
              >
                <Search size={18} />
              </button>

              {/* Newsletter — desktop only */}
              <Link
                href="/newsletter"
                className="btn-ghost hidden sm:inline-flex items-center gap-1.5 text-xs py-1.5 px-3"
              >
                <Mail size={13} />
                Newsletter
              </Link>

              {/* Theme toggle — desktop only */}
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-lg transition-colors"
                style={{ color: 'var(--text2)' }}
                aria-label="Open mobile menu"
              >
                <Menu size={22} />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Navigation;
