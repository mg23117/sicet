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
        fondoSecundario: "var(--fondo-secundario)",
        fondoTerciario: "var(--fondo-terciario)",
        textoPrincipal: "var(--texto-principal)",
        textoSecundario: "var(--texto-secundario)",
        textoTerciario: "var(--texto-terciario)",

        /*fondoPrincipal: "#111214",
        sidebar: "#1E2225",
        header: "#1E2225",*/
        panel: "#1E2225",
        panelSoft: "#262B2E",
        /*optionMenu: "#111214",
        textMenu: "#00E5FF"*/
      }
    },
  },
  plugins: [],
}