/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    backgroundImage: {
      winery1: "url('./assets/Images/winery_1.jpg')",
      winery2: "url('./assets/Images/winery_2.jpg')",
      winery3: "url('./assets/Images/winery_3.jpg')",
      winery4: "url('./assets/Images/winery_4.jpg')",
      winery5: "url('./assets/Images/winery_5.jpg')",
    },
    extend: {
      colors: {
        'main': '#5B0016',
        'background': '#EAE0D5',
        'active': '#22333B'
      }
    },
    fontFamily: {
      title: ['"Playfair Display"', 'sans-serif'],
      main: ['"Cormorant Garamond"', 'sans-serif'],
      quote: ['Qwigley', 'sans-serif']
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

