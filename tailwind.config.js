/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'burgundy': '#800020'
      }
    },
    fontFamily: {
      header: ['"Playfair Display"', 'sans-serif']
    }
  },
  plugins: [],
}

