/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        headerH: "10vh",
        sceneW: "60vw",
        sceneH: "60vh",
        layout_themeW: "15vw",
        layout_themeH: "93vh",
        layoutH: "85vh",
        VW5: "5vw",
        VW1: "1vw",
        VW12: "12vw",
        VH5: "5vh",
      },
      colors: {
        //#4E4B3C gold color alt
        authFormBg: "#2B3434",
        pageHBg: "#2B3434", //#1B1B1B

        //Layout-header/footer border
        lhfBorderNoSelect: "#484C47",
        lhfBorderSelect: "#d1d5db",

        //Layout-header/footer background
        lhfBackgroundNoSelect: "#2A2A2A",
        lhfBackgroundSelect: "#4C4A4A",

        layoutText_Border: "#d1d5db",
        headerNoSelect: "#1B241A",
        headerSelect: "#6E7E65",

        //New App Temp
        button1: "#425948",
        button2: "#06C59C",
        button1Hover: "#4F5C42",
        button2Hover: "#448472",
        cH1: "#364132",
        cH1Hover: "#455240",
      },
      fontFamily: {
        header: ["var(--font-Catamaran)"],
      },
      fontSize: {
        pageTab: "1.3rem",
      },
    },
  },
  plugins: [],
};
