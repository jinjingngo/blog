import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        glow: {
          from: {
            "text-shadow": `0 0 10px white,
                            0 0 20px white,
                            0 0 30px salmon,
                            0 0 40px salmon,
                            0 0 50px salmon,
                            0 0 60px salmon,
                            0 0 70px salmon;`,
          },
          to: {
            "text-shadow": `0 0 20px white,
                            0 0 30px salmon,
                            0 0 40px salmon,
                            0 0 50px salmon,
                            0 0 60px salmon,
                            0 0 70px salmon,
                            0 0 80px salmon;`,
          },
        },
      },
      animation: {
        glow: "glow 1s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
export default config;
