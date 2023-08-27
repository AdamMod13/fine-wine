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
      pouringWine: "url('./assets/Images/pouring_wine.png')"
    },
    extend: {
      colors: {
        'main': '#5B0016',
        'background': '#E9DCCD',
        'darker-background': '#242223',
        'active': '#36384C'
      }
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

