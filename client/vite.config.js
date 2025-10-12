import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000", // Backend server URL
        changeOrigin: true,
      },
    },
    host: true,
  },
  plugins: [react()],
  build: {
    outDir: "build", // Specify the output directory
  },
});