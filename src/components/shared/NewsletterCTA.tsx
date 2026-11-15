'use client'

import { useState, FormEvent } from 'react'
import { Mail, CheckCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function NewsletterCTA({ className }: { className?: string }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    // Simulate success (no actual API)
    setSubmitted(true)
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-[var(--accent)] to-[var(--accent2)]',
        'px-6 py-12 md:px-12',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
        {/* Copy */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-white/70 text-sm font-medium uppercase tracking-widest">
            <Mail size={14} />
            <span>Weekly Briefing</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            Stay Ahead of the MENA AI Curve
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-sm">
            Get curated intelligence on AI investments, government strategies, and emerging
            startups across the Middle East & North Africa — delivered every Thursday.
          </p>
          <div className="flex gap-4 mt-1">
            {['5,000+ subscribers', 'No spam, ever'].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-xs text-white/70">
                <CheckCircle size={12} className="text-white/90" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="flex flex-col items-center gap-4 text-center py-6">
              <CheckCircle size={48} className="text-white" />
              <div>
                <p className="text-white font-semibold text-lg">You're in!</p>
                <p className="text-white/80 text-sm mt-1">
                  Welcome to the AI Watch MENA community. Your first briefing arrives Thursday.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError('')
                  }}
                  placeholder="your@email.com"
                  aria-label="Email address"
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className={cn(
                    'w-full px-4 py-3 rounded-lg text-sm bg-white/15 backdrop-blur-sm',
                    'border text-white placeholder:text-white/50 outline-none',
                    'transition-all duration-200',
                    error
                      ? 'border-red-300 focus:border-red-200'
                      : 'border-white/30 focus:border-white focus:bg-white/20'
                  )}
                />
                {error && (
                  <p id="newsletter-error" className="mt-1.5 text-xs text-red-200">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className={cn(
                  'w-full flex items-center justify-center gap-2',
                  'px-6 py-3 rounded-lg text-sm font-semibold',
                  'bg-white text-[var(--accent)] hover:bg-white/90',
                  'transition-all duration-200 group'
                )}
              >
                Subscribe — It's Free
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
              <p className="text-xs text-white/50 text-center">
                Unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
