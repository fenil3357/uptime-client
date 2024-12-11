/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#2563EB',
        background: '#121212',
        text: '#E0E0E0',
        darkGray: '#1F2937',
      },
    },
  },
  plugins: [],
}
