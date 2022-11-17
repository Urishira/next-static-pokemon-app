/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  important: true, // important in prod is must be
  theme: ['dark'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: []
  }
}
