/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lux: {
          bg: '#F8F6F1',
          card: '#FFFFFF',
          text: '#171717',
          muted: '#77736C',
          gold: '#B69A66',
          'gold-light': '#D4C29D',
          'gold-dark': '#8E7343',
          border: '#E8E2D8',
          dark: '#151515',
          'dark-card': '#1E1E1E',
          'dark-border': '#2D2D2D',
          'dark-muted': '#A39E93',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        'widest-plus': '0.25em',
        'luxury': '0.15em',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(23, 23, 23, 0.05)',
        'luxury-hover': '0 25px 50px -12px rgba(182, 154, 102, 0.15)',
        'card': '0 4px 25px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
