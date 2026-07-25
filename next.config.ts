// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // Specifies where Tailwind should look for class names
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom extensions for your strictly black & white brand
      colors: {
        brand: {
          bg: "#ffffff",     // Pure White primary background
          text: "#000000",   // Pure Black primary text
          border: "#000000", // Pure Black borders
        },
      },
    },
  },
  plugins: [],
};

export default config;
