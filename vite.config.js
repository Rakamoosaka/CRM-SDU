import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this matches your deployment root
  build: {
    assetsDir: "assets", // Correct folder for assets
  },
  server: {
    historyApiFallback: true, // Handles client-side routing in dev mode
  },
  preview: {
    historyApiFallback: true, // Ensures fallback during `vite preview`
  },
});
