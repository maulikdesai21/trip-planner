/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cream: '#fbf3ec',
        ink: { DEFAULT: '#3a2b25', soft: '#8a7a70', faint: '#b8a99f' },
        primary: { DEFAULT: '#e76f51', dark: '#cf5836' },
        'warm-amber': '#f0a35e',
        'surface-alt': '#f7ece1',
      },
    },
  },
  plugins: [],
}
