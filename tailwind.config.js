/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          800: '#1F2937',
          950: '#0F172A',
        },
      },
    },
  },
  plugins: [],
}
