/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './common/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: ['dark'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: []
  }
}
