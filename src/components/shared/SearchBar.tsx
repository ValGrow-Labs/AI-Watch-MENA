'use client'

import { useState, useRef, KeyboardEvent } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export default function SearchBar({
  placeholder = 'Search intelligence, companies, topics…',
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(query.trim())
    } else if (e.key === 'Escape') {
      setQuery('')
      onSearch('')
      inputRef.current?.blur()
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div
      className={cn(
        'relative flex items-center',
        'rounded-lg border bg-[var(--surface)] transition-all duration-200',
        focused
          ? 'border-[var(--accent)] shadow-[0_0_0_3px_rgba(49,89,168,0.12)]'
          : 'border-[var(--border)] hover:border-[var(--border2)]',
        className
      )}
    >
      <Search
        size={16}
        className={cn(
          'absolute left-3 shrink-0 transition-colors duration-200',
          focused ? 'text-[var(--accent)]' : 'text-[var(--text3)]'
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        aria-label="Search"
        className={cn(
          'w-full bg-transparent pl-9 pr-9 py-2.5 text-sm text-[var(--text)]',
          'placeholder:text-[var(--text3)] outline-none'
        )}
      />
      {query && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className={cn(
            'absolute right-3 p-0.5 rounded-full',
            'text-[var(--text3)] hover:text-[var(--text)] hover:bg-[var(--surface2)]',
            'transition-all duration-200'
          )}
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
