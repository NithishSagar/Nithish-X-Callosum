import type { Config } from 'tailwindcss';

/**
 * Design tokens live here so components stay declarative.
 * Palette is anchored on the CV's deep tech blue (#1F4E78) with an amber
 * accent used sparingly — accent colour marks *evidence* (metrics, matches),
 * never decoration.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B1F33', // deepest navy — hero background floor
          900: '#0B1F33',
          800: '#12304C',
          700: '#1F4E78', // primary brand blue (from CV)
          600: '#2C6CA6',
          500: '#3E8BCC',
        },
        slateink: {
          DEFAULT: '#44546A', // neutral dark grey (from CV)
          700: '#44546A',
          500: '#6B7A91',
          300: '#A7B1C0',
        },
        amber: {
          DEFAULT: '#FF9F43',
          600: '#F08A22',
          500: '#FF9F43',
          400: '#FFB870',
          100: '#FFF1E0',
        },
        paper: {
          DEFAULT: '#F5F5F5',
          50: '#FBFCFD',
          100: '#F5F6F8',
          200: '#EAEDF2',
          300: '#D8DEE7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,31,51,0.04), 0 8px 24px -12px rgba(11,31,51,0.14)',
        lift: '0 2px 4px rgba(11,31,51,0.05), 0 24px 48px -20px rgba(11,31,51,0.28)',
        glow: '0 0 0 1px rgba(255,159,67,0.35), 0 12px 40px -16px rgba(255,159,67,0.55)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(68,84,106,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(68,84,106,0.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(3%, -4%, 0) scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift 26s ease-in-out infinite',
        shimmer: 'shimmer 2.6s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
