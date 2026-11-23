'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Cpu,
  TrendingUp,
  Shield,
  Layers,
  Sparkles,
  Rocket,
  Building2,
  Globe2,
  Video,
} from 'lucide-react'

interface EditorialImageProps {
  src: string
  alt: string
  category?: string
  country?: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export default function EditorialImage({
  src,
  alt,
  category = 'Intelligence',
  country = 'MENA',
  fill = true,
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: EditorialImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Curated color schemes for graceful editorial fallback
  const getGradient = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'analysis':
      case 'opinion & analysis':
        return 'from-[#0f2838] via-[#187E86] to-[#0A1020]'
      case 'business':
      case 'funding':
      case 'startups':
        return 'from-[#2c220f] via-[#856128] to-[#0A1020]'
      case 'policy':
      case 'regulation':
        return 'from-[#24133b] via-[#5b21b6] to-[#0A1020]'
      case 'technology':
      case 'research':
        return 'from-[#0b1f3d] via-[#1d4ed8] to-[#0A1020]'
      case 'innovation':
        return 'from-[#06283b] via-[#0284c7] to-[#0A1020]'
      case 'ai in action':
        return 'from-[#06332a] via-[#0d9488] to-[#0A1020]'
      case 'video':
        return 'from-[#330f14] via-[#b91c1c] to-[#0A1020]'
      default:
        return 'from-[#17253B] via-[#2563eb] to-[#0A1020]'
    }
  }

  const getIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'analysis':
      case 'opinion & analysis':
        return <TrendingUp className="w-5 h-5 text-cyan-300" />
      case 'business':
      case 'funding':
        return <Rocket className="w-5 h-5 text-amber-300" />
      case 'policy':
        return <Shield className="w-5 h-5 text-purple-300" />
      case 'technology':
      case 'research':
        return <Cpu className="w-5 h-5 text-sky-300" />
      case 'ai in action':
        return <Layers className="w-5 h-5 text-emerald-300" />
      case 'video':
        return <Video className="w-5 h-5 text-red-300" />
      default:
        return <Globe2 className="w-5 h-5 text-blue-300" />
    }
  }

  if (error || !src) {
    return (
      <div
        className={`w-full h-full min-h-[70px] flex flex-col justify-between p-3 sm:p-4 bg-gradient-to-br ${getGradient(
          category
        )} overflow-hidden select-none relative`}
      >
        {/* Subtle geometric grid backdrop */}
        <svg
          className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Ambient glow orb */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        {/* Top Header in Graphic */}
        <div className="relative z-10 flex items-center justify-between text-white/90">
          <span className="text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-md border border-white/20">
            {country}
          </span>
          <div className="p-1 rounded bg-white/10 backdrop-blur-md">
            {getIcon(category)}
          </div>
        </div>

        {/* Bottom Title watermark */}
        <div className="relative z-10 space-y-0.5 mt-auto">
          <div className="text-[9px] font-bold text-white/60 tracking-wider uppercase">
            AI Watch MENA
          </div>
          <div className="text-xs font-bold text-white line-clamp-2 leading-tight">
            {alt}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-[var(--surface2)]">
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        priority={priority}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={`object-cover w-full h-full transition-all duration-500 ${className} ${
          loaded ? 'opacity-100 scale-100' : 'opacity-90 scale-100'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}
