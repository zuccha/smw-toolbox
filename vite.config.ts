import preact from "@preact/preset-vite";
import analyze from "rollup-plugin-analyzer";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [preact()],
  build: {
    rollupOptions: {
      // plugins: [analyze({ summaryOnly: true })],
      output: {
        manualChunks: {
          codemirror: ["@codemirror/language", "@codemirror/state"],
          uiw: ["@uiw/codemirror-themes", "@uiw/react-codemirror"],
        },
      },
    },
  },
});
