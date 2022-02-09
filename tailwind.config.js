const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      blue: 'hsl(238, 40%, 52%)',
      softRed: 'hsl(358, 79%, 66%)',
      paleRed: 'hsl(357, 100%, 86%)',
      lightBlue: 'hsl(239, 57%, 85%)',
      darkBlue: 'hsl(238, 40%, 52%)',
      grayBlue: 'hsl(211, 10%, 45%)',
      lightGrayBlue: 'hsl(239, 57%, 85%)',
      white: 'hsl(0, 0%, 100%)',
      gray: {
        100: 'hsl(228, 33%, 97%)',
        200: 'hsl(223, 19%, 93%)',
      },
    },
    fontWeight: {
      light: 400,
      normal: 500,
      medium: 700,
    },
    extend: {},
  },
  plugins: [],
};
