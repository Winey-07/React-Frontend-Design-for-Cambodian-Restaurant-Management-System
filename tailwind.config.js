/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E67E22",
        dark: "#2C3E50",
        background: "#F8F9FA",
        success: "#27AE60",
        danger: "#E74C3C",
        warning: "#F1C40F",
      },
    },
  },
  plugins: [],
};
