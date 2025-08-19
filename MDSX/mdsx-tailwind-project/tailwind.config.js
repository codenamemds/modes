module.exports = {
  purge: ['./src/**/*.{html,js}', './src/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-gray': '#1a1a1a',
        'custom-green': '#7cff00',
        'custom-light-green': '#4ade80',
        'custom-dark': '#333',
        'custom-light': '#e0e0e0',
        'custom-muted': '#888',
      },
      borderRadius: {
        'custom': '8px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}