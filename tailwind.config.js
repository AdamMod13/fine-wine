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
      pouringWine: "url('./assets/Images/pouring_wine.png')",
      wineBottles: "url('./assets/Images/wine_bottles.jpg')",
      wineRack: "url('./assets/Images/wine_rack.jpg')"
    },
    extend: {
      colors: {
        'main': '#5C001E',
        'main-light': '#B76E79',
        'light-bg': '#eae8e8',
        'dark-bg': '#1b1b1b',
        'dark': '#262120',
        'creme': '#f0ece3',
        'medium': '#b0adad',
        'light': '#fcfcfc'
      },
    },
    fontFamily: {
      playfair: ['"Playfair Display"', 'sans-serif'],
      cormorant: ['"Cormorant Garamond"', 'sans-serif',],
      qwigley: ['Qwigley', 'sans-serif'],
      monserrat: ['Montserrat', 'sans-serif'],
      lato: ['Lato', 'sans-serif']
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      superbold: '900',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

