/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      display: 'var(--display-font)',
      body: 'var(--body-font)',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        primary: {
          50: '#fce6e7',
          100: '#f9cdd0',
          200: '#f49ba1',
          300: '#ee6a71',
          400: '#e93842',
          500: '#e30613',
          600: '#cc0511',
          700: '#b6050f',
          800: '#9f040d',
          900: '#88040b',
          950: '#72030a',
        },
        secondary: {
          50: '#fbe6ef',
          100: '#f2b3ce',
          200: '#e980ad',
          300: '#e04d8c',
          400: '#d71a6b',
          500: '#d3005a',
          600: '#d3005a',
          700: '#be0051',
          800: '#a90048',
          900: '#94003f',
          950: '#7f0036',
        },
      },
      height: {
        'main-nav': 'calc(100vh - 18rem)',
        'desktop-nav': 'calc(100vh - 2rem)', // Example: Full viewport height minus 4rem
      },
    },
  },
  plugins: [flowbite.plugin()],
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
}
