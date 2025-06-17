/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // important for theme toggling
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0E1C',        // deep blue black
        darkCard: '#1B1F3B',      // dark navy
        darkText: '#E2E8F0',      // soft white
        accent: '#3B82F6',        // tailwind blue
      },
      boxShadow: {
        glow: '0 0 20px rgba(59, 130, 246, 0.4)',
      },
    },
  },
  plugins: [],
}


