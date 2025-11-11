/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./js/**/*.js",
    "./especialidade-*.html",
    "./programa-*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#00A8E8',
        accent: '#00C9A7',
        dark: '#1A202C',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
