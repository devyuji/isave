/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "instagram-blue": "#405DE6",
        "instagram-purple": "#833AB4",
        "instagram-pink": "#FFC107",
        "instagram-orange": "#FD1D1D",
      },
    },
  },
  plugins: [],
};
