/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            fondoPrincipal: "#111214",
            sidebar: "#1E2225",
            header: "#1E2225",
            optionMenu: "#111214",
            textMenu: "#00E5FF"
        }
    },
  },
  plugins: [],
}