'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          'h-9 w-9 rounded-full bg-[var(--surface2)] animate-pulse',
          className
        )}
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'relative h-9 w-9 rounded-full flex items-center justify-center',
        'bg-[var(--surface2)] border border-[var(--border)]',
        'hover:border-[var(--accent)] hover:bg-[var(--surface)]',
        'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        className
      )}
    >
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-300',
          isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
        )}
      >
        <Sun size={16} className="text-[var(--highlight)]" />
      </span>
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center transition-all duration-300',
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
        )}
      >
        <Moon size={16} className="text-[var(--accent)]" />
      </span>
    </button>
  )
}
