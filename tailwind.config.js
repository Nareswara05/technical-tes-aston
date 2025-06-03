/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#145CC4",
        textPrimary: "#222222",
        border: "#DADCE0",
        bgWhite : "#F7F7FC"
      },
      boxShadow: {
        custom: '6px 6px 54px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}