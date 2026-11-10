/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snow: {
          50: '#FBFBFC',
          100: '#F8FAFC',
          200: '#F1F5F9',
          300: '#E2E8F0',
          400: '#CBD5E1',
          500: '#94A3B8',
          600: '#64748B',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        butter: {
          50: '#FFFDF0',
          100: '#FEFCE8',
          200: '#FEF9C3',
          300: '#FEF08A',
          400: '#FDE047',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'snow-sm': '0 1px 2px 0 rgba(15, 23, 42, 0.03), 0 1px 3px 1px rgba(254, 240, 138, 0.15)',
        'snow-md': '0 4px 6px -1px rgba(15, 23, 42, 0.04), 0 2px 4px -2px rgba(234, 179, 8, 0.08)',
        'snow-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.04), 0 4px 6px -4px rgba(234, 179, 8, 0.08)',
        'glow-yellow': '0 0 20px -3px rgba(253, 224, 71, 0.35)',
      }
    },
  },
  plugins: [],
}
