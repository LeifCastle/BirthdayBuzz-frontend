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
        headerH: "7vh",
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
        layoutBg: "#2A2A2A",
        pageHBg: "#1B1B1B",

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
        button1: "#6E7E65",
      },
      fontFamily: {
        header: ["var(--font-Catamaran)"],
      },
    },
  },
  plugins: [],
};
