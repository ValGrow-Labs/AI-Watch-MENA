import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        'lm-bg': '#F5F3EE',
        'lm-surface': '#FFFFFF',
        'lm-surface2': '#EAEFF7',
        'lm-text': '#17253B',
        'lm-text2': '#59677B',
        'lm-accent': '#3159A8',
        'lm-accent2': '#187E86',
        'lm-highlight': '#B58B4A',
        'lm-border': '#DFE3EA',
        // Dark theme
        'dm-bg': '#0A1020',
        'dm-surface': '#111B2D',
        'dm-surface2': '#17243B',
        'dm-text': '#F5F7FF',
        'dm-text2': '#A5B3CC',
        'dm-accent': '#6AA5FF',
        'dm-accent2': '#4DD5CB',
        'dm-highlight': '#E0BB78',
        'dm-border': '#293750',
        // Brand
        'brand-navy': '#17253B',
        'brand-blue': '#3159A8',
        'brand-teal': '#187E86',
        'brand-gold': '#B58B4A',
        'brand-electric': '#6AA5FF',
        'brand-cyan': '#4DD5CB',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        'base': ['0.9375rem', { lineHeight: '1.6rem' }],
        'lg': ['1.0625rem', { lineHeight: '1.75rem' }],
        'xl': ['1.1875rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.375rem', { lineHeight: '1.875rem' }],
        '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.125rem', { lineHeight: '2.625rem' }],
        '5xl': ['2.75rem', { lineHeight: '3.375rem' }],
        '6xl': ['3.5rem', { lineHeight: '4rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'content': '1280px',
        'reading': '720px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 4px 16px 0 rgb(0 0 0 / 0.12), 0 2px 4px -1px rgb(0 0 0 / 0.08)',
        'card-dm': '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
        'card-hover-dm': '0 4px 24px 0 rgb(0 0 0 / 0.5)',
        'glow-blue': '0 0 24px rgb(106 165 255 / 0.3)',
        'glow-teal': '0 0 24px rgb(77 213 203 / 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern-dark': 'radial-gradient(ellipse at 20% 50%, rgba(49, 89, 168, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(24, 126, 134, 0.1) 0%, transparent 50%)',
        'hero-pattern-light': 'radial-gradient(ellipse at 20% 50%, rgba(49, 89, 168, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(24, 126, 134, 0.05) 0%, transparent 50%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.25s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

export default config

