/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "neon-blue": "#00FFFF",
        "neon-pink": "#FF00FF",
      },
      dropShadow: {
        "neon": "0 0 10px #00FFFF, 0 0 20px #FF00FF",
      },
    },
  },
  plugins: [],
};
