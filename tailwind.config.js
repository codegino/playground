module.exports = {
  // mode: "jit", // this will enable Tailwind JIT compiler to make the build faster
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? "jit" : undefined,
  purge: ["./app/**/*.{ts,tsx}"], // Here we are going to tell Tailwind to use any .ts or .tsx file to purge the CSS
  darkMode: "media", // Use media queries for dark mode, customize it as you want
  theme: {
    extend: {
      colors: {
        // color scheme is defined in /app.css
        primary: {
          light: "var(--color-primary-light)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          dark: "var(--color-primary-dark)",
        },
      },
    },
  },
  variants: {}, // activate any variant you want here
  plugins: [], // add any plugin you need here
};
