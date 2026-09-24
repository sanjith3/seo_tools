import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#07111F",
          deep: "#091525",
        },
        surface: {
          DEFAULT: "#0D1A2B",
          secondary: "#111F32",
          elevated: "#14243A",
          soft: "#17283F",
          code: "#050B14",
        },
        ink: "#F5F8FC",
        navy: "#F5F8FC",
        brand: {
          DEFAULT: "#5B7CFF",
          hover: "#7592FF",
          light: "rgba(91, 124, 255, 0.12)",
          cyan: "#38BDF8",
        },
        neutral: {
          DEFAULT: "#B5C1D1",
          secondary: "#B5C1D1",
          muted: "#7F8DA3",
          veryMuted: "#64748B",
          border: "#22344C",
          "border-strong": "#304762",
          soft: "#111F32",
        },
        state: {
          success: "#2DD4A7",
          "success-bg": "rgba(45, 212, 167, 0.10)",
          warning: "#FBBF24",
          "warning-bg": "rgba(251, 191, 36, 0.10)",
          error: "#FB7185",
          "error-bg": "rgba(251, 113, 133, 0.10)",
        },
        code: "#050B14",
      },
      borderRadius: {
        input: "10px",
        btn: "10px",
        card: "14px",
        workspace: "18px",
        panel: "18px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
        focus: "0 0 0 3px rgba(91, 124, 255, 0.25)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
    },
  },
  plugins: [],
};

export default config;
