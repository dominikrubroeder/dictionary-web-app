/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          purple: "#A445ED",
          peach: "#FF5252",
          "gray-100": "#F4F4F4",
          "gray-200": "#E9E9E9",
          "gray-500": "#757575",
          "gray-700": "#3A3A3A",
          "gray-800": "#2D2D2D",
          "gray-900": "#1F1F1F",
          "gray-950": "#050505",
        },
      },
    },
  },
  plugins: [],
};
