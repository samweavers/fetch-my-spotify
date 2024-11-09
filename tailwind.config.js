/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'dark': '#000000',
        'base': '#121212',
        'elevated': '#161616'
      },
    },
  },
  plugins: [],
}
