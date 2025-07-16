/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        move1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(40px, 60px)' },
        },
        move2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, 50px)' },
        },
        move3: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(60px, -40px)' },
        },
      },
      animation: {
        move1: 'move1 12s ease-in-out infinite',
        move2: 'move2 14s ease-in-out infinite',
        move3: 'move3 16s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

