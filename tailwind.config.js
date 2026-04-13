/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lime: '#CBFD50',
        magenta: '#E704CA',
        purple: '#959EF5',
        teal: '#10B981',
        blue: '#2563EB',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['EB Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
