/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        home: {
          gray: {
            50: '#0000000A',
            100: '#00000029',
            150: '#6A6A6A',
            200: '#707070'
          },
          green: {
            50: '#949C7C',
            100: '#38470B'
          }
        }
      }
    },
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      tc: ['Noto Sans TC', 'sans-serif']
    }
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        h1: { fontSize: '40px', lineHeight: '55px', fontWeight: '600' },
        h2: { fontSize: '24px', lineHeight: '33px', fontWeight: 'bold' },
        h3: { fontSize: '50px', lineHeight: '74px', fontWeight: 'medium' },
        h4: { fontSize: '16px', lineHeight: '24px', fontWeight: 'bold' }
      })
    })
  ]
}
