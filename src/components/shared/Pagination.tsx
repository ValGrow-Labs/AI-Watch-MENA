'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  // Build page numbers with ellipsis (max 5 visible pages)
  const getPageNumbers = (): (number | '…')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, '…', totalPages]
    }

    if (currentPage >= totalPages - 2) {
      return [1, '…', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '…', currentPage - 1, currentPage, currentPage + 1, '…', totalPages]
  }

  const pages = getPageNumbers()

  const buttonBase = cn(
    'inline-flex items-center justify-center h-9 w-9 rounded-lg text-sm font-medium',
    'border transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
  )

  const pageButton = (page: number) => {
    const isActive = page === currentPage
    return (
      <button
        key={page}
        onClick={() => onPageChange(page)}
        aria-label={`Page ${page}`}
        aria-current={isActive ? 'page' : undefined}
        disabled={isActive}
        className={cn(
          buttonBase,
          isActive
            ? 'bg-[var(--accent)] text-white border-[var(--accent)] cursor-default'
            : [
                'bg-[var(--surface)] text-[var(--text2)] border-[var(--border)]',
                'hover:border-[var(--accent)] hover:text-[var(--accent)]',
              ]
        )}
      >
        {page}
      </button>
    )
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1.5', className)}
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={cn(
          buttonBase,
          'w-auto px-3 gap-1',
          currentPage === 1
            ? 'bg-[var(--surface)] text-[var(--text3)] border-[var(--border)] opacity-50 cursor-not-allowed'
            : [
                'bg-[var(--surface)] text-[var(--text2)] border-[var(--border)]',
                'hover:border-[var(--accent)] hover:text-[var(--accent)]',
              ]
        )}
      >
        <ChevronLeft size={15} />
        Prev
      </button>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === '…' ? (
          <span
            key={`ellipsis-${idx}`}
            className="inline-flex items-center justify-center h-9 w-9 text-sm text-[var(--text3)]"
          >
            …
          </span>
        ) : (
          pageButton(page)
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={cn(
          buttonBase,
          'w-auto px-3 gap-1',
          currentPage === totalPages
            ? 'bg-[var(--surface)] text-[var(--text3)] border-[var(--border)] opacity-50 cursor-not-allowed'
            : [
                'bg-[var(--surface)] text-[var(--text2)] border-[var(--border)]',
                'hover:border-[var(--accent)] hover:text-[var(--accent)]',
              ]
        )}
      >
        Next
        <ChevronRight size={15} />
      </button>
    </nav>
  )
}
