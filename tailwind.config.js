/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#181818',
        base: '#0E0E0E',
        elevated: '#111111'
      }
    }
  },
  plugins: []
}
