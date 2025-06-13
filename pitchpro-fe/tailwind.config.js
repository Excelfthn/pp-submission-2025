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
      boxShadow: {
        "btn-primary": "0px 2px 0px 0px #0062CC",        
      },
      fontFamily: {
        bevietnam: ['"Be Vietnam Pro"', "sans-serif"],
      },
      spacing: {
        // Based on a 4px scale
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
      },
      fontSize: {
        // fontSize: ["font-size", "line-height"]

        // Display
        "display-d1": ["57px"],
        "display-d2": ["45px"],

        // Headings
        "heading-h1": ["32px", "40px"],
        "heading-h2": ["28px", "36px"],
        "heading-h3": ["24px", "32px"],

        // Title
        title: ["18px", "24px"],

        // Body
        body: ["16px", "24px"],

        // Label
        label: ["14px", "20px"],

        // Caption
        "caption-c1": ["12px", "16px"],
        "caption-c2": ["11px", "13px"],
      },
      colors: {
        primary: {
          1100:'#ADD5FF',
          900: "#004999",
          800: "#0055B2",
          700: "#0062CC",
          600: "#006EE5",
          500: "#007AFF",
          400: "#3395FF",
          300: "#5CAAFF",
          200: "#B2D7FF",
          100: "#D6EAFF",
          50: "#ADD5FF",
        },
        secondary: {
          900: "#7D21AB",
          800: "#8C25C1",
          700: "#9C29D6",
          600: "#A63EDA",
          500: "#AF52DE",
          400: "#BA69E2",
          300: "#C47FE6",
          200: "#CD94EB",
          100: "#D7A9EF",
          50: "#EBD4F7",
        },
        tertiary: {
          900: "#B26800",
          800: "#CC7700",
          700: "#E58600",
          600: "#FF9500",
          500: "#FFAA33",
          400: "#FFB54D",
          300: "#FFBF66",
          200: "#FFCA80",
          100: "#FFD599",
          50: "#FFEACC",
        },
        neutral: {
          900: "#000000",
          800: "#1a1a1a",
          700: "#262626",
          600: "#383838",
          500: "#666666",
          400: "#808080",
          300: "#A6A6A6",
          200: "#E0E0E0",
          100: "#F2F2F2",
          50: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
