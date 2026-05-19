/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#16a34a',
        'brand-primaryDark': '#15803d',
        'brand-secondary': '#0ea5e9',
        'brand-secondaryDark': '#0369a1',
        'brand-accent': '#facc15',
        'brand-accentDark': '#eab308',
        'brand-orange': '#fb923c',
        'brand-surface': '#f8fafc',
        'brand-mint': '#ecfdf5',
        'brand-sky': '#eff6ff',
        'brand-warm': '#fff7ed',
        'brand-border': '#e5e7eb',
        'brand-soft': '#dbeafe',
        'brand-strong': '#86efac',
      },
      fontFamily: {
        sans: [
          '"Be Vietnam Pro"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: 'rgba(15, 23, 42, 0.08) 0px 10px 30px -12px',
        cardHover: 'rgba(15, 23, 42, 0.14) 0px 18px 40px -16px',
        cta: 'rgba(22, 163, 74, 0.28) 0px 12px 28px -10px',
      },
    },
  },
  plugins: [],
};
