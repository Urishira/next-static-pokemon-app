/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: ['dark'],
  plugins: [require('daisyui'), require('tailwindcss-animated'), require('@tailwindcss/forms')],
  daisyui: {
    themes: []
  }
}
