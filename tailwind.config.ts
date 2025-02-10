import type { Config } from "tailwindcss";

export default {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "federal-blue": "#03045eff",
        "marian-blue": "#023e8aff",
        "honolulu-blue": "#0077b6ff",
        "blue-green": "#0096c7ff",
        "pacific-cyan": "#00b4d8ff",
        "vivid-sky-blue": "#48cae4ff",
        "non-photo-blue": "#90e0efff",
        "non-photo-blue-2": "#ade8f4ff",
        "light-cyan": "#caf0f8ff",
        oceanBlue: "#0582ca",
      },
      spacing: {
        "1/12": "8.333333%",
        "2/12": "16.666667%",
        "3/12": "25%",
        "4/12": "33.333333%",
        "5/12": "41.666667%",
        "6/12": "50%",
        "7/12": "58.333333%",
        "8/12": "66.666667%",
        "9/12": "75%",
        "10/12": "83.333333%",
        "11/12": "91.666667%",
        "12/12": "100%",
      },
    },
  },
  plugins: [],
} satisfies Config;
