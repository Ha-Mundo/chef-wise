import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths"; // Sincronizza automaticamente gli alias dal tsconfig

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    fs: {
      allow: ["."]
    }
  }
})