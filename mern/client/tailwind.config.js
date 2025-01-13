/** @type {import('tailwindcss').Config} */
export default {
  content: [ // Explicitly defines where tailwind should look for class names.  
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
