import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [preact()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          codemirror: ["@codemirror/language", "@codemirror/state"],
          uiw: ["@uiw/codemirror-themes", "@uiw/react-codemirror"],
        },
      },
    },
  },
});
