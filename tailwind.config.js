/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /*Colores del Sidebar*/
        /*Backgroud*/
        sbrBgMain: "var(--sbr-bgmain)",
        sbrBgSeg: "var(--sbr-bgseg)",
        sbrBgThird: "var(--sbr-bgthird)",
        /*Texto*/
        sbrTxtMain: "var(--sbr-txtmain)",
        sbrTxtSeg: "var(--sbr-txtseg)",
        sbrTxtThird: "var(--sbr-txtThird)",

        /*Colores del Header*/
        /*Backgroud*/
        hdrBgMain: "var(--hdr-bgmain)",
        hdrBgSeg: "var(--hdr-bgseg)",
        hdrBgThird: "var(--hdr-bgthird)",
        /*Texto*/
        hdrTxtMain: "var(--hdr-txtmain)",
        hdrTxtSeg: "var(--hdr-txtseg)",
        hdrTxtThird: "var(--hdr-txtThird)",

        /*Colores del Body*/
        /*Background*/
        bodyBgMain: "var(--body-bgmain)",
        bodyBgSeg: "var(--body-bgseg)",
        bodyBgThird: "var(--body-bgthird)",
        /*Texto*/
        bodyTxtMain: "var(--body-txtmain)",
        bodyTxtSeg: "var(--body-txtseg)",
        bodyTxtThird: "var(--body-txtThird)",
      }
    },
  },
  plugins: [],
}