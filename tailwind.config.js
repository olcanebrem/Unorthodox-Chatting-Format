/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}",
  ],
  theme: {
    extend: {
      // TODO: Define custom colors, animations, etc. for the chat UI
      colors: {
        'bubble-sent': '#DCF8C6', // Example color for sent messages
        'bubble-received': '#FFFFFF', // Example color for received messages
        'horizon-line': '#EEEEEE', // Example color for the horizon line
        'hot-input-bg': '#F5F5F5', // Example color for the hot input background
      },
      keyframes: {
        // Example animation
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        // Example animation usage
        'fade-in': 'fadeIn 0.5s ease-out',
      }
    },
  },
  plugins: [
    // TODO: Add any Tailwind plugins if needed (e.g., forms, typography)
  ],
} 