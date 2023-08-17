/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'burgundy': '#5B0016',
        'creme': '#ECDADF'
      }
    },
    fontFamily: {
      title: ['"Playfair Display"', 'sans-serif'],
      main: ['"Cormorant Garamond"', 'sans-serif']
    }
  },
  plugins: [],
}

