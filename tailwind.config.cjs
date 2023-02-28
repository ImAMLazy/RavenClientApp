/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.njk"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}
