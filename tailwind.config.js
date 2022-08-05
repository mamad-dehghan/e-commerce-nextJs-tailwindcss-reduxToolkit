module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./utilities/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors:{
        'primary-red':'#FF626D',
        'primary-orange':'#FCAD72',
        'weef-black':'#232227',
        'secondary':'#333235',
        'weef-white':'#FAFAFA',
        'weef-secondary-light':'#4C4C4C',
        'weef-grey':'#C2C2C2'
      },
      animation: {
        'shake' :'wiggle 200ms cubic-bezier(0, 0, 0.2, 1)'
      },
      keyframes: {
        wiggle: {
          '25%, 75%': { transform: 'rotate(-30deg)' },
          '50%': { transform: 'rotate(30deg)' },
        }

      }
    },
  },
  plugins: [],
}