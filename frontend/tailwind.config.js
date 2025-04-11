// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    plugins: [
      require('tailwind-scrollbar-hide')
    ],
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        fontFamily: {
          nunito: ['Nunito', 'sans-serif'],
          roboto: ['Roboto', 'sans-serif'],
        },
        colors: {
          navy: {
            800: '#1A2352',
            900: '#0E1338',
          },
        },
      },
    },
    plugins: [],
  }