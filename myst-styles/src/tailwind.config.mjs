import mystTheme from "@myst-theme/styles";
import typography from "@tailwindcss/typography";

module.exports = {
  darkMode: "selector",
  theme: {
    extend: mystTheme.themeExtensions,
  },
  plugins: [typography],
  corePlugins: {
    preflight: false,
  },
};
