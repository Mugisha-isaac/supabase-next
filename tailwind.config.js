module.exports = {
  purge:[
    './pages/**/*.js',
    './components/**/*js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
