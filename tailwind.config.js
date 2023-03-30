/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        // padding: "1rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("flowbite/plugin")],
};
