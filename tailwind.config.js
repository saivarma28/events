/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { ink: '#171613', cream: '#f5f0e7', gold: '#c5a46d', muted: '#a9a195' }, fontFamily: { sans: ['DM Sans', 'sans-serif'], serif: ['Playfair Display', 'serif'] } } },
  plugins: [],
}
