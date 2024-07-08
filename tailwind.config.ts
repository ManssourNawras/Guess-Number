import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'clr-main-black-1': '#121212',
        'clr-main-black-2': '#3A3937',
        'clr-main-gray-1': '#5C6366',
        'clr-main-gray-2': '#707070',
        'clr-main-gray-3': '#B3B3B3',
        'clr-main-gray-4': '#A1ADB2',
        'clr-main-gray-5': '#ABADAE',
        'clr-main-gray-6': '#BFC1C25F',
      },
      maxWidth: {
        'max-width': '1366px',
        'max-custom': '1437px',
      },
      fontFamily: {
        Ubuntu: ['Ubuntu', 'sans-serif'],
      },
      zIndex: {
        100: '100',
        150: '150',
        200: '200',
        250: '250',
        300: '300',
        400: '400',
        500: '500',
      },
      screens: {
        'S-1000': '1000px',
        'S-900': '900px',
        'S-600': '600px',
        'S-430': '430px',
      },
    },
  },
  plugins: [],
}
export default config;
