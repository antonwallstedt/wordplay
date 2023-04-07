/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
        caveat: ["Caveat", "sans-serif"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
