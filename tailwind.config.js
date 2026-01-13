/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Critical for our ThemeToggle logic
  theme: {
    extend: {
      colors: {
        // Customizing primary/secondary to match the index.css variables
        brand: {
          primary: '#4f46e5',   /* Indigo 600 */
          secondary: '#9333ea', /* Purple 600 */
          accent: '#ec4899',    /* Pink 500 */
        }
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}