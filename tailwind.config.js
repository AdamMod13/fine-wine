/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'main': '#5B0016',
        'background': '#EAE0D5',
        'active': '#22333B'
      }
    },
    fontFamily: {
      title: ['"Playfair Display"', 'sans-serif'],
      main: ['"Cormorant Garamond"', 'sans-serif']
    }
  },
  plugins: [],
}

