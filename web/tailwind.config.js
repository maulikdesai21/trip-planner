/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fbf3ec',
        ink: { DEFAULT: '#3a2b25', soft: '#8a7a70', faint: '#b8a99f' },
        primary: { DEFAULT: '#e76f51', dark: '#cf5836' },
        'warm-amber': '#f0a35e',
        'surface-alt': '#f7ece1',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card:        '0 1px 2px rgba(58,43,37,0.05), 0 10px 30px rgba(58,43,37,0.07)',
        'card-hover':'0 2px 4px rgba(58,43,37,0.06), 0 22px 48px rgba(58,43,37,0.14)',
        chip:        '0 2px 8px rgba(58,43,37,0.10)',
        'btn-primary':'0 6px 16px rgba(231,111,81,0.30)',
        logo:        '0 4px 12px rgba(231,111,81,0.35)',
        menu:        '0 8px 30px rgba(58,43,37,0.22)',
        modal:       '0 20px 60px rgba(58,43,37,0.3)',
        ctrl:        '0 2px 10px rgba(40,24,18,0.18)',
      },
      keyframes: {
        screenIn: { from: { opacity: '0', transform: 'scale(0.985)' }, to: { opacity: '1', transform: 'none' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(14px)' }, to: { opacity: '1', transform: 'none' } },
        rise:     { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'none' } },
        fade:     { from: { opacity: '0' }, to: { opacity: '1' } },
        drift:    { '0%,100%': { transform: 'translate(0,0)' }, '50%': { transform: 'translate(24px,-18px)' } },
        glow:     { '0%': { boxShadow: '0 0 0 0 rgba(255,255,255,.7)' }, '70%': { boxShadow: '0 0 0 6px rgba(255,255,255,0)' }, '100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0)' } },
      },
      animation: {
        'screen-in': 'screenIn 0.42s cubic-bezier(.2,.8,.2,1) both',
        'slide-up':  'slideUp 0.42s cubic-bezier(.2,.8,.2,1) both',
        rise:        'rise 0.9s cubic-bezier(.2,.8,.2,1) both',
        fade:        'fade 0.2s ease',
        'drift-slow':'drift 6s ease-in-out infinite',
        'drift-rev': 'drift 8s ease-in-out infinite reverse',
        'pulse-glow':'glow 1.6s infinite',
      },
    },
  },
  plugins: [],
}
