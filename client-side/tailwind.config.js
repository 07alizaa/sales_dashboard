/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Navy Blue & Cobalt Blue Theme
        navy: {
          DEFAULT: '#000080',
          light: '#1a1a9e',
          dark: '#000066',
        },
        cobalt: {
          DEFAULT: '#0000FF',
          light: '#3333ff',
          dark: '#0000cc',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}