/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0f172a',
        'brand-deep': '#1e3a8a',
        'brand-electric': '#3b82f6',
        'brand-cyan': '#06b6d4',
        'brand-yellow': '#fbbf24',
        'brand-yellow-hover': '#f59e0b',
        'brand-surface': '#f8fafc',
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: 'rgba(15, 23, 42, 0.12) 0px 16px 40px -18px',
        cardHover: 'rgba(15, 23, 42, 0.22) 0px 22px 48px -20px',
        cta: '0 0 20px rgba(251,191,36,0.35)',
      },
    },
  },
  plugins: [],
};
