/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // apps content
    `src/**/*.{js,ts,jsx,tsx}`,
    `./pages/**/*.{js,ts,jsx,tsx}`,
    `./components/**/*.{js,ts,jsx,tsx}`,
    // packages content
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "air-purple": "#771DFF",
        "ocean-blue": "#135DFF",
      },
    },
  },
  plugins: [],
};
