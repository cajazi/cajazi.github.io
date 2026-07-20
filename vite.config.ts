/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
    cssMinify: "esbuild",
    chunkSizeWarningLimit: 800,
    modulePreload: {
      resolveDependencies(_, deps) {
        return deps.filter((dep) => !dep.includes("animation-"));
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("framer-motion")) return "animation";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
  resolve: { dedupe: ["react", "react-dom"] },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    fileParallelism: false,
    hookTimeout: 20_000,
    testTimeout: 20_000,
  },
});
