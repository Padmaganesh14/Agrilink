/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbf7d6',
          300: '#86efb8',
          400: '#34d38c',
          500: '#0B8F62', // Official Primary Agricultural Green
          600: '#097a53',
          700: '#076344',
          800: '#064f37',
          900: '#14532D', // Deep Green
          950: '#03261a',
        },
        navy: {
          800: '#1e293b',
          900: '#0F172A', // Dark Navy
          950: '#020617',
        },
        ai: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366F1', // AI Accent Indigo
          600: '#4f46e5',
          700: '#4338ca',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
