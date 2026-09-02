/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        white: 'var(--white)',
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          500: 'var(--gray-500)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
        border: {
          dark: 'var(--border-dark)',
          light: 'var(--border-light)',
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sora: ['Syne', 'sans-serif'],
        inter: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
