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
    },
  },
  plugins: [],
} satisfies Config;
