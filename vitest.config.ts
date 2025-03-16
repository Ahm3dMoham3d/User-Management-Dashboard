import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Ensure alias works in tests
    },
  },
  test: {
    globals: true,
    environment: "jsdom", // Needed for Vue component tests
    setupFiles: "src/tests/setup.ts", // Ensure setup file is recognized
  },
});
