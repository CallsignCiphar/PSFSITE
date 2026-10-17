import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        line: "#E4E2DC",
        ivory: {
          50: "#FBF9F4",
          100: "#F5F1E8",
          200: "#E9E3D5",
        },
        ink: {
          900: "#14171A",
          700: "#2E3338",
          500: "#5A6169",
          400: "#7A8189",
        },
        green: {
          900: "#022C15",
          800: "#03361A",
          700: "#04411F", // Primary Brand Hex
          600: "#0D6634",
          500: "#198348",
          200: "#BBD3C5",
          100: "#DCE5E0",
          50: "#F2F5F3",
        },
        danger: {
          700: "#A4231A",
          50: "#FBEDEB",
        },
        warning: {
          700: "#9A4A0B",
          50: "#FBF1E6",
        },
        info: {
          700: "#1F4A7A",
          50: "#EAF1F8",
        },
        success: {
          700: "#0D6634",
        },
        crestGold: "#D9A52B", // Restricted to Logo Lockup only
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Source Serif 4", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        button: "2px",
        input: "2px",
        chip: "2px",
        card: "4px",
        modal: "4px",
      },
      maxWidth: {
        container: "1280px",
        reading: "720px",
      },
      boxShadow: {
        level1: "0 1px 3px rgba(20, 23, 26, 0.05)",
        level2: "0 8px 24px rgba(20, 23, 26, 0.08)",
        level3: "0 24px 64px rgba(20, 23, 26, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
