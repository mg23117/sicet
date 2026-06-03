/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fondoPrincipal: "var(--fondo-principal)",
        sidebar: "var(--sidebar)",
        header: "var(--header)",
        optionMenu: "var(--option-menu)",
        textMenu: "var(--text-menu)"
      }
    },
  },
  plugins: [],
}