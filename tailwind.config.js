/** ICE colour values are sourced from the live website; see .audit/CONTENT-MAP.md. */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#c1121f",
          dark: "#0b0b0d",
          light: "#ffffff",
          accent: "#f4b942",
        },
      },
    },
  },
  plugins: [],
};
