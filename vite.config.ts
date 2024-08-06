import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    port: 2333,
  },
  base: mode === "production" ? "/valentine-day/" : "/",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  plugins: [react()],
}));
