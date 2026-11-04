import { defineConfig } from "rolldown";

export default defineConfig({
  input: "src/index.mjs",
  platform: "node",
  output: {
    format: "cjs",
    file: "dist/index.cjs",
    banner: (chunk) => {
      // Add shebang only to the CLI entry point
      if (chunk.name === "index") {
        return "#!/usr/bin/env node";
      }
      return "";
    },
  },
});
